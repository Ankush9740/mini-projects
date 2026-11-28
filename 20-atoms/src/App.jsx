import { useEffect, useRef, useState } from 'react'
import { createAtom } from './atom.js'

const PANELS = [
  { n: '02', t: 'ELECTRONS', h: 'Clouds of charge, always in motion.', c: '#7fd0ff',
    p: 'Nearly weightless, electrons decide chemistry, light and electricity through the way they move and bond.', s: '−1 e  ·  1/1836 PROTON MASS' },
  { n: '03', t: 'PROTONS', h: 'The identity of every element.', c: '#5b8cff',
    p: 'Each proton carries one positive charge. Count them and you know exactly which element you are looking at.', s: '+1 e  ·  1.6726 × 10⁻²⁷ KG' },
  { n: '04', t: 'NEUTRONS', h: 'The quiet stabilizers.', c: '#c9d3ff',
    p: 'Neutral and heavy, neutrons buffer the repulsion between protons and help hold the nucleus together.', s: '0 e  ·  1.6749 × 10⁻²⁷ KG' },
  { n: '05', t: 'TOGETHER', h: 'Everything, from almost nothing.', c: '#b58cff',
    p: 'Three particles. Every star, every ocean, every breath.', s: 'ONE ATOM  ·  INFINITE WORLDS' },
]
const stageOf = (s) => (s < 0.1 ? 0 : s < 0.44 ? 1 : s < 0.7 ? 2 : s < 0.88 ? 3 : 4)

export default function App() {
  const canvas = useRef(null)
  const [ready, setReady] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const atom = createAtom(canvas.current, { reduced, onReveal: () => setReady(true) })
    const root = document.documentElement
    const move = (e) => {
      if (reduced) return
      root.style.setProperty('--mx', ((e.clientX / innerWidth - 0.5) * 2).toFixed(3))
      root.style.setProperty('--my', ((e.clientY / innerHeight - 0.5) * 2).toFixed(3))
    }
    const scroll = () => {
      const max = root.scrollHeight - innerHeight
      const s = max > 0 ? scrollY / max : 0
      atom.setScroll(s)
      setStage(stageOf(s))
    }
    addEventListener('pointermove', move, { passive: true })
    addEventListener('scroll', scroll, { passive: true })
    scroll()
    return () => { removeEventListener('pointermove', move); removeEventListener('scroll', scroll); atom.dispose() }
  }, [])

  return (
    <>
      <main className={`hero${ready ? ' in' : ''}${stage > 0 ? ' away' : ''}`}>
        <canvas ref={canvas} className="stage" aria-label="Animated 3D atom with orbiting electrons" role="img" />
        <div className="rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="shade" aria-hidden="true" />
        <div className="loader" aria-hidden="true">ASSEMBLING MATTER</div>

        <section className="content">
          <p className="eyebrow"><b />01 — THE BUILDING BLOCKS OF EXISTENCE</p>
          <h1>
            <span className="line"><span>THE UNIVERSE</span></span>
            <span className="line"><span>BEGINS WITH <em>AN ATOM.</em></span></span>
          </h1>
          <p className="sub">Explore the fundamental building blocks of everything that exists.</p>
          <a className="cta" href="#explore" onClick={(e) => { e.preventDefault(); scrollTo({ top: innerHeight * 1.2, behavior: 'smooth' }) }}>
            <span>EXPLORE THE UNKNOWN</span><i>→</i>
          </a>
        </section>

        {PANELS.map((d, i) => (
          <section key={d.t} className={`panel${stage === i + 1 ? ' on' : ''}`} style={{ '--c': d.c }} aria-hidden={stage !== i + 1}>
            <p className="eyebrow"><b />{d.n} — {d.t}</p>
            <h2>{d.h}</h2>
            <p>{d.p}</p>
            <span className="stat">{d.s}</span>
          </section>
        ))}

        <div className="cue" aria-hidden="true">SCROLL</div>
        <nav className="rail" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <i key={i} className={stage === i ? 'on' : ''} />)}</nav>
      </main>
      <div className="track" />
    </>
  )
}
