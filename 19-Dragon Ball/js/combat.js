(function (DB) {
  "use strict";

  class CombatManager {
    constructor() {
      this.projectiles = [];
      this.beams = [];
      this.comboCount = 0;
      this.comboTimer = 0;
      this.maxCombo = 0;
    }

    reset() {
      this.projectiles.length = 0;
      this.beams.length = 0;
      this.comboCount = 0;
      this.comboTimer = 0;
      this.maxCombo = 0;
    }

    aabb(a, b) {
      return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
      );
    }

    registerPlayerHit() {
      this.comboCount += 1;
      this.comboTimer = 2.2;
      if (this.comboCount > this.maxCombo) {
        this.maxCombo = this.comboCount;
      }
    }

    spawnProjectile(opts) {
      this.projectiles.push({
        owner: opts.owner, // "player" | "enemy"
        x: opts.x,
        y: opts.y,
        vx: opts.vx,
        vy: opts.vy || 0,
        radius: opts.radius || 7,
        damage: opts.damage || 18,
        knockback: opts.knockback || 120,
        cell: opts.cell !== undefined ? opts.cell : 0,
        life: opts.life || 2.0,
        isSuper: !!opts.isSuper,
      });
    }

    spawnBeam(opts) {
      this.beams.push({
        x: opts.x,
        y: opts.y,
        dir: opts.dir,
        length: opts.length || 340,
        height: opts.height || 22,
        damage: opts.damage || 16,
        ssj: !!opts.ssj,
        life: opts.life || 0.55,
        maxLife: opts.life || 0.55,
        tickTimer: 0,
      });
    }

    update(dt, player, enemies, camX, viewW) {
      if (this.comboTimer > 0) {
        this.comboTimer -= dt;
        if (this.comboTimer <= 0) {
          this.comboCount = 0;
        }
      }

      // Update Projectiles
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.life -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.life <= 0 || p.x < camX - 80 || p.x > camX + viewW + 80) {
          this.projectiles.splice(i, 1);
          continue;
        }

        const pBox = {
          x: p.x - p.radius,
          y: p.y - p.radius,
          w: p.radius * 2,
          h: p.radius * 2,
        };

        if (p.owner === "player") {
          let hit = false;
          for (const e of enemies) {
            if (!e.alive) continue;
            if (this.aabb(pBox, e.getHurtbox())) {
              const dir = p.vx >= 0 ? 1 : -1;
              e.takeDamage(p.damage, dir * p.knockback, -75, player);
              this.registerPlayerHit();
              DB.Effects.spawnSpark(p.x, p.y, 4, 1.1);
              DB.Effects.spawnBurst(p.x, p.y, p.cell === 1 ? "#ffd440" : "#58d8ff", 6, 85);
              DB.Effects.addShake(2.5, 0.1);
              DB.Audio.play("hit");
              hit = true;
              break;
            }
          }
          if (hit) {
            this.projectiles.splice(i, 1);
          }
        } else {
          // Enemy projectile vs Goku
          if (player.alive && player.invulnTimer <= 0 && this.aabb(pBox, player.getHurtbox())) {
            const dir = p.vx >= 0 ? 1 : -1;
            player.takeDamage(p.damage, dir * p.knockback);
            DB.Effects.spawnSpark(p.x, p.y, 4, p.isSuper ? 1.5 : 1.0);
            DB.Effects.spawnBurst(p.x, p.y, "#ff5870", p.isSuper ? 12 : 6, 95);
            this.projectiles.splice(i, 1);
          }
        }
      }

      // Update Kamehameha Beams
      for (let i = this.beams.length - 1; i >= 0; i--) {
        const b = this.beams[i];
        b.life -= dt;
        b.tickTimer -= dt;

        // Keep beam anchored to Goku while firing
        b.x = player.x + player.facing * 20;
        b.y = player.y - 23;
        b.dir = player.facing;

        if (b.tickTimer <= 0) {
          b.tickTimer = 0.11;
          const bx = b.dir > 0 ? b.x : b.x - b.length;
          const beamBox = {
            x: bx,
            y: b.y - b.height * 0.65,
            w: b.length,
            h: b.height * 1.3,
          };
          for (const e of enemies) {
            if (!e.alive) continue;
            if (this.aabb(beamBox, e.getHurtbox())) {
              e.takeDamage(b.damage, b.dir * 165, -90, player);
              this.registerPlayerHit();
              DB.Effects.spawnSpark(e.x, e.y - 22, 3, 1.3);
              DB.Effects.addShake(4.5, 0.12);
              DB.Audio.play("hit");
            }
          }
        }

        if (b.life <= 0) {
          this.beams.splice(i, 1);
        }
      }
    }

    render(ctx, camX, assets) {
      const sheet = assets.effects;

      // Render Kamehameha Beams
      for (const b of this.beams) {
        const sx = Math.round(b.x - camX);
        const sy = Math.round(b.y);
        const progress = b.life / b.maxLife;
        const thick = Math.max(4, Math.round(b.height * Math.min(1, progress * 1.8)));
        const ex = sx + b.dir * b.length;
        const leftX = Math.min(sx, ex);
        const w = Math.abs(ex - sx);

        const outerCol = b.ssj ? "#f8b828" : "#2490f0";
        const midCol = b.ssj ? "#ffe868" : "#6ce4ff";
        const coreCol = "#ffffff";

        // Outer beam body
        ctx.fillStyle = outerCol;
        ctx.fillRect(leftX, sy - thick / 2, w, thick);
        // Mid glow
        const midH = Math.max(2, Math.round(thick * 0.64));
        ctx.fillStyle = midCol;
        ctx.fillRect(leftX, sy - midH / 2, w, midH);
        // White hot core
        const coreH = Math.max(2, Math.round(thick * 0.32));
        ctx.fillStyle = coreCol;
        ctx.fillRect(leftX, sy - coreH / 2, w, coreH);

        // Origin plasma ball
        ctx.fillStyle = midCol;
        ctx.fillRect(sx - 8, sy - thick * 0.7, 16, Math.round(thick * 1.4));
        ctx.fillStyle = coreCol;
        ctx.fillRect(sx - 4, sy - thick * 0.4, 8, Math.round(thick * 0.8));
      }

      // Render Projectiles
      for (const p of this.projectiles) {
        const sx = Math.round(p.x - camX);
        const sy = Math.round(p.y);
        const size = p.isSuper ? 38 : 24;
        if (sheet) {
          ctx.drawImage(
            sheet,
            p.cell * 32,
            0,
            32,
            32,
            sx - size / 2,
            sy - size / 2,
            size,
            size
          );
        } else {
          ctx.fillStyle = p.owner === "player" ? "#6ce4ff" : "#ff4060";
          ctx.fillRect(sx - 5, sy - 5, 10, 10);
        }
      }
    }
  }

  DB.Combat = new CombatManager();
})(window.DB = window.DB || {});
