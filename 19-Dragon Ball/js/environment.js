(function (DB) {
  "use strict";

  const VIEW_W = 480;
  const VIEW_H = 270;

  class EnvironmentManager {
    constructor() {
      this.time = 0;
      this.terrain = [];
      this.platforms = [];
      this.obstacles = [];
      this.flora = [];
      this.clouds = [];
      this.birds = [];
      this.windMotes = [];
      this.defaultGroundY = 232;
      this.worldWidth = 2400;
      this._initAtmosphere();
    }

    _initAtmosphere() {
      this.clouds.length = 0;
      const cloudSpecs = [
        { x: 60, y: 34, speed: 7, cell: 0, parallax: 0.12, scale: 1.0 },
        { x: 250, y: 62, speed: 11, cell: 1, parallax: 0.18, scale: 0.9 },
        { x: 430, y: 28, speed: 6, cell: 0, parallax: 0.1, scale: 1.15 },
        { x: 650, y: 74, speed: 13, cell: 1, parallax: 0.22, scale: 0.85 },
        { x: 840, y: 42, speed: 8, cell: 0, parallax: 0.14, scale: 1.0 },
        { x: 1030, y: 56, speed: 10, cell: 1, parallax: 0.17, scale: 0.95 },
      ];
      for (const c of cloudSpecs) this.clouds.push({ ...c });

      this.birds.length = 0;
      // Foreground/midground flocks + distant horizon birds
      const flockSpecs = [
        { x: 140, y: 58, vx: 26, vy: -1.5, scale: 0.65, phase: 0.0, horizon: false },
        { x: 158, y: 64, vx: 26, vy: -1.2, scale: 0.6, phase: 1.4, horizon: false },
        { x: 172, y: 55, vx: 27, vy: -1.8, scale: 0.55, phase: 2.6, horizon: false },
        { x: 460, y: 84, vx: -20, vy: 1.0, scale: 0.5, phase: 0.8, horizon: false },
        { x: 478, y: 90, vx: -20, vy: 0.8, scale: 0.45, phase: 2.1, horizon: false },
        // Distant horizon birds gradually receding toward horizon
        { x: 280, y: 112, vx: 12, vy: 2.6, scale: 0.38, phase: 0.4, horizon: true },
        { x: 294, y: 116, vx: 12, vy: 2.5, scale: 0.34, phase: 1.9, horizon: true },
      ];
      for (const b of flockSpecs) this.birds.push({ ...b, startX: b.x, startY: b.y });

      this.windMotes.length = 0;
      for (let i = 0; i < 20; i++) {
        this.windMotes.push({
          x: (i * 53) % VIEW_W,
          y: 120 + ((i * 37) % 120),
          vx: 18 + (i % 5) * 4,
          phase: i * 0.7,
          isLeaf: i % 4 === 0,
        });
      }
    }

    loadLevel(lvl) {
      this.defaultGroundY = lvl.groundY || 232;
      this.worldWidth = lvl.width || 2400;
      this.terrain = (lvl.terrain || [{ x1: 0, x2: this.worldWidth, y1: this.defaultGroundY, y2: this.defaultGroundY }]).map(
        (seg) => ({ ...seg })
      );
      this.platforms = (lvl.platforms || []).map((p) => ({ ...p }));
      this.obstacles = (lvl.obstacles || []).map((o) => ({
        ...o,
        hp: o.hp || 35,
        maxHp: o.hp || 35,
        broken: false,
        hitFlash: 0,
        shakeTimer: 0,
      }));
      this.flora = (lvl.flora || []).map((f) => ({ ...f }));
    }

    update(dt) {
      this.time += dt;

      // Drifting clouds
      const cloudSpan = 1200;
      for (const c of this.clouds) {
        c.x += c.speed * dt;
        if (c.x > cloudSpan) c.x -= cloudSpan;
      }

      // Flying birds & horizon fade
      const birdSpan = 720;
      for (const b of this.birds) {
        b.x += b.vx * dt;
        b.y += b.vy * dt + Math.sin(this.time * 2.2 + b.phase) * 2.5 * dt;
        if (b.vx > 0 && b.x > birdSpan) {
          b.x = -40;
          b.y = b.startY;
        } else if (b.vx < 0 && b.x < -60) {
          b.x = birdSpan;
          b.y = b.startY;
        }
        if (b.horizon && b.y > 144) {
          b.y = 104;
          b.x = (b.x + 180) % birdSpan;
        }
      }

      // Subtle wind dust & leaves
      for (const m of this.windMotes) {
        m.x += m.vx * dt;
        m.y += Math.sin(this.time * 2.5 + m.phase) * 8 * dt;
        if (m.x > VIEW_W + 10) m.x = -10;
        if (m.y > 250) m.y = 135;
        if (m.y < 110) m.y = 220;
      }

      // Obstacle hit timers
      for (const o of this.obstacles) {
        if (o.hitFlash > 0) o.hitFlash = Math.max(0, o.hitFlash - dt);
        if (o.shakeTimer > 0) o.shakeTimer = Math.max(0, o.shakeTimer - dt);
      }
    }

    getTerrainY(x) {
      for (const seg of this.terrain) {
        if (x >= seg.x1 && x <= seg.x2) {
          if (seg.gap) return null;
          const span = Math.max(1, seg.x2 - seg.x1);
          const t = (x - seg.x1) / span;
          return seg.y1 + (seg.y2 - seg.y1) * t;
        }
      }
      return this.defaultGroundY;
    }

    getSafeSpotNear(x) {
      for (let offset = 16; offset < 220; offset += 16) {
        for (const dir of [-1, 1]) {
          const tx = Math.max(24, Math.min(this.worldWidth - 24, x + dir * offset));
          const gy = this.getTerrainY(tx);
          if (gy !== null) return { x: tx, y: gy };
        }
      }
      return { x: 90, y: this.defaultGroundY };
    }

    isGapAhead(x, dir, dist = 22) {
      return this.getTerrainY(x + dir * dist) === null;
    }

    hasObstacleAhead(x, y, dir, dist = 24) {
      const probeX = x + dir * dist;
      for (const o of this.obstacles) {
        if (o.broken) continue;
        if (probeX >= o.x - 4 && probeX <= o.x + o.w + 4 && y > o.y - o.h + 4) {
          return true;
        }
      }
      const curY = this.getTerrainY(x);
      const nextY = this.getTerrainY(probeX);
      if (curY !== null && nextY !== null && curY - nextY > 14) {
        return true;
      }
      return false;
    }

    resolveHorizontal(entity, prevX, halfW = 9) {
      const footY = entity.y;
      for (const o of this.obstacles) {
        if (o.broken) continue;
        const obsTop = o.y - o.h;
        // Only block horizontally if entity's body overlaps obstacle vertically (not standing above it!)
        if (footY > obsTop + 5 && footY - 34 < o.y) {
          if (entity.x + halfW > o.x && entity.x - halfW < o.x + o.w) {
            if (prevX <= o.x) {
              entity.x = o.x - halfW;
              entity.vx = 0;
            } else if (prevX >= o.x + o.w) {
              entity.x = o.x + o.w + halfW;
              entity.vx = 0;
            } else {
              // Push out toward nearest side
              const mid = o.x + o.w / 2;
              entity.x = entity.x < mid ? o.x - halfW : o.x + o.w + halfW;
              entity.vx = 0;
            }
          }
        }
      }
    }

    resolveVertical(entity, prevY, halfW = 9, isPlayer = false) {
      let landingSurface = null;
      const gY = this.getTerrainY(entity.x);
      if (gY !== null && entity.y >= gY && prevY <= gY + 14 && entity.vy >= 0) {
        landingSurface = gY;
      }

      // Check one-way elevated platforms
      for (const p of this.platforms) {
        if (entity.x + halfW > p.x && entity.x - halfW < p.x + p.w) {
          if (prevY <= p.y + 5 && entity.y >= p.y && entity.vy >= 0) {
            if (landingSurface === null || p.y < landingSurface) {
              landingSurface = p.y;
            }
          }
        }
      }

      // Check solid obstacle tops (boulders, fallen logs, intact destructibles)
      for (const o of this.obstacles) {
        if (o.broken) continue;
        const topY = o.y - o.h;
        if (entity.x + halfW > o.x + 2 && entity.x - halfW < o.x + o.w - 2) {
          if (prevY <= topY + 6 && entity.y >= topY && entity.vy >= 0) {
            if (landingSurface === null || topY < landingSurface) {
              landingSurface = topY;
            }
          }
        }
      }

      if (landingSurface !== null) {
        const impactVy = entity.vy;
        entity.y = landingSurface;
        entity.vy = 0;
        entity.groundY = landingSurface;
        if (!entity.grounded) {
          entity.grounded = true;
          if (isPlayer) {
            entity.jumpsLeft = 2;
            if (impactVy > 110) {
              entity.landingTimer = 0.11;
              DB.Effects.spawnDust(entity.x, landingSurface, 0);
              if (impactVy > 230) {
                DB.Effects.spawnBurst(entity.x, landingSurface - 2, "#c87842", 4, 55);
              }
            }
          }
        }
      } else {
        entity.grounded = false;
        entity.groundY = gY !== null ? gY : VIEW_H + 40;
      }

      // Gap pit recovery (player takes minor gorge hazard and leaps back to safe ledge)
      if (entity.y > VIEW_H + 14) {
        const safe = this.getSafeSpotNear(entity.x);
        entity.x = safe.x;
        entity.y = safe.y - 18;
        entity.vy = -170;
        entity.grounded = false;
        if (isPlayer && entity.alive) {
          entity.takeDamage(10, 0);
        }
      }
    }

    hitObstaclesInBox(box, damage, dir = 1) {
      let hitAny = false;
      for (const o of this.obstacles) {
        if (o.broken || !o.destructible) continue;
        const oBox = { x: o.x, y: o.y - o.h, w: o.w, h: o.h };
        if (DB.Combat.aabb(box, oBox)) {
          o.hp -= damage;
          o.hitFlash = 0.14;
          o.shakeTimer = 0.18;
          hitAny = true;
          const cx = o.x + o.w / 2;
          const cy = o.y - o.h / 2;
          DB.Effects.spawnSpark(cx - dir * 6, cy, 3, 1.0);
          DB.Effects.spawnBurst(cx, cy, "#c47644", 5, 85);
          DB.Audio.play("hit");

          if (o.hp <= 0) {
            o.broken = true;
            DB.Effects.addShake(4.0, 0.22);
            DB.Effects.spawnBurst(cx, cy, "#d6844e", 14, 130);
            DB.Effects.spawnBurst(cx, cy, "#7c4224", 8, 95);
            DB.Effects.spawnPopup(cx, o.y - o.h - 8, "SMASH!", "#ffd440");
            if (o.drop) {
              DB.Effects.spawnPickup(cx, o.y - 6, o.drop);
            }
          }
        }
      }
      return hitAny;
    }

    renderSkyLife(ctx, camX, assets) {
      const props = assets.worldProps;
      if (!props) return;

      // Drifting Clouds (two depth speeds)
      for (const c of this.clouds) {
        const sx = Math.round(((c.x - camX * c.parallax) % 1200 + 1200) % 1200 - 80);
        if (sx > VIEW_W + 70 || sx < -90) continue;
        const w = Math.round(64 * c.scale);
        const h = Math.round(64 * c.scale);
        ctx.drawImage(props, c.cell * 64, 0, 64, 64, sx, Math.round(c.y), w, h);
      }

      // Flying Birds & Distant Horizon Birds
      const flapFrame = Math.floor(this.time * 7) % 2;
      for (const b of this.birds) {
        const pFactor = b.horizon ? 0.14 : 0.28;
        const sx = Math.round(b.x - camX * pFactor);
        if (sx < -30 || sx > VIEW_W + 30) continue;
        const sy = Math.round(b.y);
        const sz = Math.round(32 * b.scale);
        ctx.save();
        if (b.horizon) {
          const distFade = Math.max(0.2, 1 - (b.y - 104) / 50);
          ctx.globalAlpha = distFade * 0.7;
        }
        ctx.drawImage(props, 2 * 64 + 16, flapFrame * 32, 32, 32, sx - sz / 2, sy - sz / 2, sz, sz);
        ctx.restore();
      }
    }

    renderTerrainAndWorld(ctx, camX, assets, hasCustomTerrain) {
      const props = assets.worldProps;

      // 1. Render Terrain Segments (flat, elevated, slopes, canyon gaps)
      if (hasCustomTerrain) {
        for (const seg of this.terrain) {
          const sx1 = Math.round(seg.x1 - camX);
          const sx2 = Math.round(seg.x2 - camX);
          if (sx2 < -10 || sx1 > VIEW_W + 10) continue;

          if (seg.gap) {
            // Deep shadowy canyon chasm
            ctx.fillStyle = "#26120c";
            ctx.fillRect(sx1, 214, sx2 - sx1, VIEW_H - 214);
            ctx.fillStyle = "#482214";
            ctx.fillRect(sx1, 214, 3, VIEW_H - 214);
            ctx.fillRect(sx2 - 3, 214, 3, VIEW_H - 214);
            continue;
          }

          const y1 = Math.round(seg.y1);
          const y2 = Math.round(seg.y2);

          // Main earth fill polygon
          ctx.fillStyle = "#8e4c24";
          ctx.beginPath();
          ctx.moveTo(sx1, y1);
          ctx.lineTo(sx2, y2);
          ctx.lineTo(sx2, VIEW_H);
          ctx.lineTo(sx1, VIEW_H);
          ctx.closePath();
          ctx.fill();

          // Deeper lower soil band
          ctx.fillStyle = "#6e381a";
          ctx.beginPath();
          ctx.moveTo(sx1, y1 + 18);
          ctx.lineTo(sx2, y2 + 18);
          ctx.lineTo(sx2, VIEW_H);
          ctx.lineTo(sx1, VIEW_H);
          ctx.closePath();
          ctx.fill();

          // Upper dirt lip
          ctx.fillStyle = "#c8783e";
          ctx.beginPath();
          ctx.moveTo(sx1, y1);
          ctx.lineTo(sx2, y2);
          ctx.lineTo(sx2, y2 + 8);
          ctx.lineTo(sx1, y1 + 8);
          ctx.closePath();
          ctx.fill();

          // Sunlit top rim line
          ctx.strokeStyle = "#f2b66c";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sx1, y1 + 1);
          ctx.lineTo(sx2, y2 + 1);
          ctx.stroke();

          // Natural pebble & crack details along visible segment
          const step = 36;
          const startWorld = Math.ceil(seg.x1 / step) * step;
          for (let wx = startWorld; wx < seg.x2 - 8; wx += step) {
            const screenX = Math.round(wx - camX);
            if (screenX < -20 || screenX > VIEW_W + 20) continue;
            const gy = Math.round(this.getTerrainY(wx));
            ctx.fillStyle = "#562a14";
            ctx.fillRect(screenX + 4, gy + 12 + (wx % 7), 7, 2);
            ctx.fillRect(screenX + 10, gy + 14 + (wx % 7), 4, 2);
            ctx.fillStyle = "#e09a56";
            ctx.fillRect(screenX + 18, gy + 5, 3, 2);
          }
        }
      }

      // 2. Render Elevated Rock Platforms + subtle ground shadow beneath
      for (const p of this.platforms) {
        const sx = Math.round(p.x - camX);
        if (sx + p.w < -10 || sx > VIEW_W + 10) continue;
        const sy = Math.round(p.y);

        // Ground shadow below platform
        const gY = this.getTerrainY(p.x + p.w / 2);
        if (gY !== null) {
          ctx.fillStyle = "rgba(20, 10, 12, 0.28)";
          ctx.fillRect(sx + 4, Math.round(gY - 2), p.w - 8, 4);
        }

        // 16-bit layered rock slab platform
        ctx.fillStyle = "#16101e";
        ctx.fillRect(sx - 1, sy - 1, p.w + 2, 13);
        ctx.fillStyle = "#8a4a26";
        ctx.fillRect(sx, sy, p.w, 11);
        ctx.fillStyle = "#c8783e";
        ctx.fillRect(sx, sy, p.w, 5);
        ctx.fillStyle = "#f2b86e";
        ctx.fillRect(sx + 1, sy, p.w - 2, 2);
        ctx.fillStyle = "#5e2e16";
        for (let px = 8; px < p.w - 8; px += 14) {
          ctx.fillRect(sx + px, sy + 5, 2, 5);
        }
      }

      // 3. Render Swaying Trees, Bushes & Grass
      for (const f of this.flora) {
        const sx = Math.round(f.x - camX);
        if (sx < -64 || sx > VIEW_W + 64) continue;
        const gy = this.getTerrainY(f.x);
        if (gy === null) continue;
        const sy = Math.round(gy);
        const sway = Math.sin(this.time * (f.kind === "tree" ? 1.8 : 2.9) + f.x * 0.05);

        if (f.kind === "tree" && props) {
          const swayPx = Math.round(sway * 1.8);
          // Animated subtle tree shadow
          ctx.fillStyle = "rgba(20, 10, 12, 0.25)";
          ctx.fillRect(sx - 15 + swayPx, sy - 2, 32, 4);
          // Trunk (anchored firmly to ground)
          ctx.drawImage(props, 3 * 64 + 16, 32, 32, 32, sx - 16, sy - 31, 32, 32);
          // Canopy (sways gently in the wind!)
          ctx.drawImage(props, 3 * 64 + 4, 2, 56, 32, sx - 28 + swayPx, sy - 58, 56, 32);
        } else if (f.kind === "bush") {
          const swayPx = Math.round(sway * 1.4);
          ctx.fillStyle = "rgba(20, 10, 12, 0.22)";
          ctx.fillRect(sx - 9, sy - 2, 18, 3);
          ctx.fillStyle = "#3c682c";
          ctx.fillRect(sx - 8, sy - 9, 16, 9);
          ctx.fillStyle = "#5c923c";
          ctx.fillRect(sx - 7 + swayPx, sy - 11, 14, 7);
          ctx.fillStyle = "#84ba54";
          ctx.fillRect(sx - 4 + swayPx, sy - 12, 8, 3);
        } else {
          // Animated grass blades
          const tip = Math.round(sway * 2);
          ctx.fillStyle = "#8a9442";
          ctx.fillRect(sx - 3, sy - 4, 1, 4);
          ctx.fillRect(sx, sy - 5, 1, 5);
          ctx.fillRect(sx + 3, sy - 4, 1, 4);
          ctx.fillStyle = "#c4cc64";
          ctx.fillRect(sx - 3 + tip, sy - 6, 1, 2);
          ctx.fillRect(sx + tip, sy - 7, 1, 2);
          ctx.fillRect(sx + 3 + tip, sy - 6, 1, 2);
        }
      }

      // 4. Render Obstacles (Solid Boulders, Fallen Logs, Destructible Cracked Boulders)
      if (props) {
        for (const o of this.obstacles) {
          if (o.broken) continue;
          const shakeX = o.shakeTimer > 0 ? Math.round((Math.random() - 0.5) * 4) : 0;
          const sx = Math.round(o.x - camX) + shakeX;
          if (sx + o.w < -40 || sx > VIEW_W + 40) continue;
          const sy = Math.round(o.y);

          // Ground shadow
          ctx.fillStyle = "rgba(18, 10, 12, 0.34)";
          ctx.fillRect(sx - 2, sy - 2, o.w + 4, 4);

          let cell = 4;
          if (o.kind === "fallen_log") cell = 7;
          else if (o.destructible) cell = o.hp <= o.maxHp * 0.55 ? 6 : 5;

          const drawX = sx + Math.round(o.w / 2) - 32;
          const drawY = sy - 62;
          ctx.drawImage(props, cell * 64, 0, 64, 64, drawX, drawY, 64, 64);

          if (o.hitFlash > 0) {
            ctx.save();
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(sx, sy - o.h, o.w, o.h);
            ctx.restore();
          }
        }
      }
    }

    renderWindAtmosphere(ctx) {
      for (const m of this.windMotes) {
        const sx = Math.round(m.x);
        const sy = Math.round(m.y);
        if (m.isLeaf) {
          ctx.fillStyle = "#88a84e";
          ctx.fillRect(sx, sy, 3, 2);
        } else {
          ctx.fillStyle = "rgba(255, 224, 172, 0.45)";
          ctx.fillRect(sx, sy, 2, 1);
        }
      }
    }
  }

  DB.Environment = new EnvironmentManager();
})(window.DB = window.DB || {});
