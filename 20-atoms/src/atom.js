import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (t) => 1 - Math.pow(1 - t, 3)
const seeded = (s) => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
const ORBITS = [
  { r: 2.4, tilt: [1.2, 0.2, 0.1], speed: 1.3 },
  { r: 3.2, tilt: [0.3, 0, -0.9], speed: 0.95 },
  { r: 4.0, tilt: [-0.6, 0.4, 0.8], speed: 0.7 },
]
const TRAIL = 56
const kf = (s, k) => {
  if (s <= k[0][0]) return k[0][1]
  for (let i = 1; i < k.length; i++) if (s <= k[i][0]) {
    const [a, va] = k[i - 1], [b, vb] = k[i], t = clamp((s - a) / (b - a))
    return va + (vb - va) * t * t * (3 - 2 * t)
  }
  return k[k.length - 1][1]
}
// Scroll choreography: 0 hero -> electrons -> protons -> neutrons -> reassembly
const K_ORBIT = [[0, 1], [0.12, 1], [0.3, 1.9], [0.42, 1.9], [0.52, 1], [1, 1]]
const K_VIS = [[0, 1], [0.4, 1], [0.52, 0], [0.88, 0], [0.98, 1]]
const K_EF = [[0.12, 0], [0.3, 1], [0.42, 1], [0.52, 0]]
const K_SPREAD = [[0, 0], [0.45, 0], [0.62, 1], [0.78, 1], [0.9, 0]]
const K_PROTON = [[0, 1], [0.6, 1], [0.68, 0.15], [0.78, 0.15], [0.9, 1]]
const K_NEUTRON = [[0, 1], [0.45, 1], [0.55, 0.15], [0.68, 1]]
const K_ZOOM = [[0, 0], [0.12, 0], [0.3, 5], [0.44, 5], [0.6, -3.5], [0.78, -3.5], [0.95, 1], [1, 0]]

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const x = c.getContext('2d')
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g
  x.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

export function createAtom(canvas, { reduced = false, onReveal = () => {} } = {}) {
  const R = seeded(42)
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#030408')
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 0.4
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)

  const key = new THREE.PointLight(0x4a7bff, 120, 0, 2); key.position.set(5, 4, 6)
  const rim = new THREE.PointLight(0x9b5cff, 90, 0, 2); rim.position.set(-6, -3, -4)
  scene.add(key, rim, new THREE.AmbientLight(0x223055, 0.6))

  const tex = glowTexture()
  const sprite = (color, size, opacity) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity }))
    s.scale.setScalar(size)
    return s
  }

  const root = new THREE.Group()
  const solid = new THREE.Group()
  root.add(solid)
  scene.add(root)

  // Nucleus: tightly packed protons (energy blue) and neutrons (brushed silver)
  const nucleus = new THREE.Group()
  solid.add(nucleus)
  const sphere = new THREE.SphereGeometry(1, 48, 32)
  const proton = new THREE.MeshPhysicalMaterial({ transparent: true, color: 0x2a6bff, emissive: 0x1a45ff, emissiveIntensity: 0.7, metalness: 0.3, roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.1 })
  const neutron = new THREE.MeshPhysicalMaterial({ transparent: true, emissive: 0x7f8fff, emissiveIntensity: 0, color: 0xcfd6ff, metalness: 0.9, roughness: 0.22, clearcoat: 0.6 })
  const nucs = []
  const pts = []
  for (let t = 0; pts.length < 16 && t < 6000; t++) {
    const v = new THREE.Vector3(R() * 2 - 1, R() * 2 - 1, R() * 2 - 1)
    if (v.length() > 1) continue
    v.multiplyScalar(0.85)
    if (pts.every((p) => p.distanceTo(v) > 0.56)) pts.push(v)
  }
  pts.forEach((p, i) => {
    const m = new THREE.Mesh(sphere, i % 2 ? neutron : proton)
    m.position.copy(p)
    m.scale.setScalar(0.3)
    nucleus.add(m)
    nucs.push({ m, base: p.clone(), isP: i % 2 === 0 })
  })
  nucleus.add(sprite(0x4a7bff, 4.4, 0.85), sprite(0x9b5cff, 2.3, 0.7))

  // Orbits, electrons and fading energy trails
  const electronMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x8fd0ff, emissiveIntensity: 3 })
  const electrons = [], rings = []
  ORBITS.forEach((o) => {
    const g = new THREE.Group()
    g.rotation.set(...o.tilt)
    solid.add(g)
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(o.r, 0.008, 6, 240),
      new THREE.MeshBasicMaterial({ color: 0x5b8cff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    ring.rotation.x = Math.PI / 2
    g.add(ring)
    rings.push(ring)
    for (let k = 0; k < 2; k++) {
      const el = new THREE.Group()
      const ball = new THREE.Mesh(sphere, electronMat)
      ball.scale.setScalar(0.12)
      el.add(ball, sprite(0x7fc4ff, 1.1, 1))
      const pos = new Float32Array(TRAIL * 3)
      const col = new Float32Array(TRAIL * 3)
      for (let i = 0; i < TRAIL; i++) {
        const f = Math.pow(1 - i / TRAIL, 2.2)
        col.set([0.35 * f, 0.7 * f, 1 * f], i * 3)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
      const trail = new THREE.Line(geo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }))
      trail.frustumCulled = false
      g.add(el, trail)
      electrons.push({ el, geo, trail, o, phase: k * Math.PI + R() })
    }
  })

  // Assembly particles (intro)
  const N = 3200
  const start = new Float32Array(N * 3), target = new Float32Array(N * 3), delay = new Float32Array(N)
  const live = new Float32Array(N * 3)
  const v = new THREE.Vector3(), e = new THREE.Euler()
  for (let i = 0; i < N; i++) {
    if (i < N * 0.3) {
      v.set(R() - 0.5, R() - 0.5, R() - 0.5).normalize().multiplyScalar(0.4 + R() * 0.9)
    } else {
      const o = ORBITS[i % 3], a = R() * Math.PI * 2
      v.set(Math.cos(a) * o.r + (R() - 0.5) * 0.05, (R() - 0.5) * 0.05, Math.sin(a) * o.r)
      v.applyEuler(e.set(...o.tilt))
    }
    target.set([v.x, v.y, v.z], i * 3)
    v.set(R() - 0.5, R() - 0.5, R() - 0.5).normalize().multiplyScalar(10 + R() * 14)
    start.set([v.x, v.y, v.z], i * 3)
    delay[i] = R() * 0.4
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(live, 3))
  const pMat = new THREE.PointsMaterial({ map: tex, color: 0x9ec0ff, size: 0.12, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
  const burst = new THREE.Points(pGeo, pMat)
  burst.frustumCulled = false
  root.add(burst)

  // Ambient dust
  const D = 700, dust = new Float32Array(D * 3)
  for (let i = 0; i < D; i++) {
    v.set(R() - 0.5, R() - 0.5, R() - 0.5).normalize().multiplyScalar(6 + R() * 16)
    dust.set([v.x, v.y, v.z], i * 3)
  }
  const dGeo = new THREE.BufferGeometry()
  dGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3))
  const dustPts = new THREE.Points(dGeo, new THREE.PointsMaterial({ map: tex, color: 0x7aa2ff, size: 0.09, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }))
  scene.add(dustPts)

  // Post-processing
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.9, 0.7, 0.15))
  composer.addPass(new OutputPass())

  let baseZ = 14.5, offX = 0, offY = 0
  const resize = () => {
    const w = innerWidth, h = innerHeight, portrait = w / h < 0.9
    renderer.setSize(w, h, false)
    composer.setSize(w, h)
    camera.aspect = w / h
    baseZ = portrait ? 21 : 14.5
    offX = portrait ? 0 : 2
    offY = portrait ? 2.6 : 0.2
    root.position.set(offX, offY, 0)
    camera.updateProjectionMatrix()
  }
  resize()
  addEventListener('resize', resize)

  let scrollTarget = 0, sp = 0, tx = 0, ty = 0, mx = 0, my = 0, T = 0, raf, revealed = false
  const onMove = (ev) => { tx = (ev.clientX / innerWidth - 0.5) * 2; ty = (ev.clientY / innerHeight - 0.5) * 2 }
  if (!reduced) addEventListener('pointermove', onMove, { passive: true })

  const born = performance.now()
  let last = born
  const frame = (now) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    const p = reduced ? 1 : clamp((now - born - 300) / 3800)
    T += dt * (reduced ? 0.15 : 1)
    mx += (tx - mx) * 0.04
    my += (ty - my) * 0.04

    if (p < 1) {
      for (let i = 0; i < N * 3; i++) {
        const t = ease(clamp((p - delay[(i / 3) | 0]) / 0.5))
        live[i] = start[i] + (target[i] - start[i]) * t
      }
      pGeo.attributes.position.needsUpdate = true
      pMat.opacity = 1 - clamp((p - 0.75) / 0.25)
    } else if (burst.visible) burst.visible = false
    const s = ease(clamp((p - 0.6) / 0.4))
    solid.scale.setScalar(Math.max(s, 0.0001))
    solid.visible = s > 0
    if (!revealed && p > 0.55) { revealed = true; onReveal() }

    sp += (scrollTarget - sp) * (reduced ? 1 : 0.07)
    const k = kf(sp, K_ORBIT), ov = kf(sp, K_VIS), ef = kf(sp, K_EF), spread = kf(sp, K_SPREAD)
    const pa = kf(sp, K_PROTON), na = kf(sp, K_NEUTRON), zoom = kf(sp, K_ZOOM)

    for (const { el, geo, trail, o, phase } of electrons) {
      const r = o.r * k, a0 = T * o.speed + phase
      el.position.set(Math.cos(a0) * r, 0, Math.sin(a0) * r)
      el.visible = trail.visible = ov > 0.01
      el.scale.setScalar(Math.max(ov, 0.001) * (1 + 0.8 * ef))
      trail.material.opacity = ov
      const arr = geo.attributes.position.array
      for (let i = 0; i < TRAIL; i++) {
        const a = a0 - i * 0.032
        arr[i * 3] = Math.cos(a) * r
        arr[i * 3 + 1] = 0
        arr[i * 3 + 2] = Math.sin(a) * r
      }
      geo.attributes.position.needsUpdate = true
    }
    for (const r of rings) { r.scale.setScalar(k); r.visible = ov > 0.01; r.material.opacity = (0.35 + 0.3 * ef) * ov }
    proton.opacity = 0.12 + 0.88 * pa; proton.emissiveIntensity = 0.7 + 1.6 * spread * pa
    neutron.opacity = 0.12 + 0.88 * na; neutron.emissiveIntensity = 1.4 * spread * na
    for (const { m, base, isP } of nucs) {
      m.position.copy(base).multiplyScalar(1 + spread * 2.8)
      m.scale.setScalar(0.3 * (1 + 0.3 * spread * (isP ? pa : na)))
    }

    root.rotation.set(0.3 + my * 0.2 + Math.sin(T * 0.2) * 0.05 + sp * 0.5, T * 0.12 + mx * 0.45 + sp * Math.PI * 1.5, 0.08)
    nucleus.rotation.y = -T * 0.3
    dustPts.rotation.y = T * 0.015
    dustPts.position.y = sp * 6
    camera.position.set(mx * 0.7, -my * 0.45, baseZ + zoom * (baseZ / 14.5) + (1 - ease(p)) * 3)
    camera.lookAt(offX * 0.4, offY * 0.4, 0)
    composer.render()
  }
  raf = requestAnimationFrame(frame)

  return {
    setScroll(v) { scrollTarget = clamp(v) },
    dispose() {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onMove)
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.() })
      tex.dispose(); pmrem.dispose(); composer.dispose(); renderer.dispose()
    },
  }
}
