(function (DB) {
  "use strict";

  class EffectsManager {
    constructor() {
      this.particles = [];
      this.sparks = [];
      this.popups = [];
      this.pickups = [];
      this.shakeTime = 0;
      this.shakeStrength = 0;
      this.shakeEnabled = true;
      this.flashAlpha = 0;
      this.flashColor = "#ffffff";
      this.maxParticles = 90;
    }

    reset() {
      this.particles.length = 0;
      this.sparks.length = 0;
      this.popups.length = 0;
      this.pickups.length = 0;
      this.shakeTime = 0;
      this.shakeStrength = 0;
      this.flashAlpha = 0;
    }

    addShake(strength, duration) {
      if (!this.shakeEnabled) return;
      this.shakeStrength = Math.max(this.shakeStrength, strength);
      this.shakeTime = Math.max(this.shakeTime, duration);
    }

    addFlash(color = "#ffffff", alpha = 0.55) {
      this.flashColor = color;
      this.flashAlpha = Math.max(this.flashAlpha, alpha);
    }

    spawnSpark(x, y, frame = 3, scale = 1) {
      if (this.sparks.length > 24) this.sparks.shift();
      this.sparks.push({ x, y, frame, scale, life: 0.14, maxLife: 0.14 });
    }

    spawnBurst(x, y, color, count = 8, speed = 90) {
      for (let i = 0; i < count; i++) {
        if (this.particles.length >= this.maxParticles) this.particles.shift();
        const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const spd = speed * (0.45 + Math.random() * 0.75);
        this.particles.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 20,
          size: Math.random() < 0.5 ? 2 : 3,
          color,
          life: 0.28 + Math.random() * 0.18,
          maxLife: 0.45,
          gravity: 220,
        });
      }
    }

    spawnDust(x, y, dir = 0) {
      for (let i = 0; i < 4; i++) {
        if (this.particles.length >= this.maxParticles) this.particles.shift();
        this.particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y - 2,
          vx: -dir * 35 + (Math.random() - 0.5) * 40,
          vy: -15 - Math.random() * 25,
          size: 3,
          color: "#d8c8b0",
          life: 0.22,
          maxLife: 0.22,
          gravity: 30,
        });
      }
    }

    spawnPopup(x, y, text, color = "#ffd440") {
      if (this.popups.length > 18) this.popups.shift();
      this.popups.push({ x, y, text, color, vy: -32, life: 0.65, maxLife: 0.65 });
    }

    spawnPickup(x, y, kind = "ki") {
      this.pickups.push({
        x,
        y: y - 10,
        vy: -110,
        vx: (Math.random() - 0.5) * 45,
        kind, // "ki" | "hp"
        life: 12,
        bob: Math.random() * Math.PI * 2,
      });
    }

    update(dt, groundY) {
      if (this.shakeTime > 0) {
        this.shakeTime = Math.max(0, this.shakeTime - dt);
        if (this.shakeTime === 0) this.shakeStrength = 0;
      }
      if (this.flashAlpha > 0) {
        this.flashAlpha = Math.max(0, this.flashAlpha - dt * 1.8);
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        p.vy += p.gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }

      for (let i = this.sparks.length - 1; i >= 0; i--) {
        this.sparks[i].life -= dt;
        if (this.sparks[i].life <= 0) this.sparks.splice(i, 1);
      }

      for (let i = this.popups.length - 1; i >= 0; i--) {
        const pop = this.popups[i];
        pop.life -= dt;
        if (pop.life <= 0) {
          this.popups.splice(i, 1);
          continue;
        }
        pop.y += pop.vy * dt;
      }

      for (let i = this.pickups.length - 1; i >= 0; i--) {
        const orb = this.pickups[i];
        orb.life -= dt;
        if (orb.life <= 0) {
          this.pickups.splice(i, 1);
          continue;
        }
        orb.bob += dt * 5;
        orb.vy += 420 * dt;
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        if (orb.y >= groundY - 8) {
          orb.y = groundY - 8;
          orb.vy = 0;
          orb.vx *= 0.8;
        }
      }
    }

    getShakeOffset() {
      if (!this.shakeEnabled || this.shakeTime <= 0) return { x: 0, y: 0 };
      return {
        x: Math.round((Math.random() - 0.5) * 2 * this.shakeStrength),
        y: Math.round((Math.random() - 0.5) * 2 * this.shakeStrength),
      };
    }

    drawAura(ctx, x, y, gold, time) {
      const sheet = DB.Assets.effects;
      if (!sheet) return;
      const cell = gold ? 6 : 5;
      const bob = Math.sin(time * 24) * 2;
      ctx.save();
      ctx.globalAlpha = 0.72 + Math.sin(time * 30) * 0.15;
      ctx.drawImage(sheet, cell * 32, 0, 32, 32, Math.round(x - 22), Math.round(y - 46 + bob), 44, 48);
      ctx.restore();
    }

    render(ctx, camX, assets) {
      const sheet = assets.effects;

      // Pickups
      for (const orb of this.pickups) {
        if (orb.life < 2 && Math.floor(orb.life * 10) % 2 === 0) continue;
        const sx = Math.round(orb.x - camX);
        const sy = Math.round(orb.y + Math.sin(orb.bob) * 2);
        if (sheet) {
          const cell = orb.kind === "hp" ? 8 : 7;
          ctx.drawImage(sheet, cell * 32, 0, 32, 32, sx - 12, sy - 12, 24, 24);
        }
      }

      // Sparks
      if (sheet) {
        for (const sp of this.sparks) {
          const sx = Math.round(sp.x - camX);
          const sy = Math.round(sp.y);
          const sz = Math.round(28 * sp.scale);
          ctx.drawImage(sheet, sp.frame * 32, 0, 32, 32, sx - sz / 2, sy - sz / 2, sz, sz);
        }
      }

      // Pixel particles
      for (const p of this.particles) {
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x - camX), Math.round(p.y), p.size, p.size);
      }

      // Damage / Score popups
      ctx.font = "bold 9px 'Courier New', monospace";
      ctx.textAlign = "center";
      for (const pop of this.popups) {
        const sx = Math.round(pop.x - camX);
        const sy = Math.round(pop.y);
        ctx.fillStyle = "#000000";
        ctx.fillText(pop.text, sx + 1, sy + 1);
        ctx.fillStyle = pop.color;
        ctx.fillText(pop.text, sx, sy);
      }
      ctx.textAlign = "left";
    }

    renderFlash(ctx, w, h) {
      if (this.flashAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = this.flashAlpha;
        ctx.fillStyle = this.flashColor;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }
    }
  }

  DB.Effects = new EffectsManager();
})(window.DB = window.DB || {});
