(function (DB) {
  "use strict";

  class Player {
    constructor(x, groundY) {
      this.x = x;
      this.y = groundY;
      this.groundY = groundY;
      this.vx = 0;
      this.vy = 0;
      this.facing = 1; // 1 right, -1 left

      this.maxHp = 100;
      this.hp = 100;
      this.maxKi = 100;
      this.ki = 40;

      this.isSSJ = false;
      this.alive = true;
      this.grounded = true;
      this.jumpsLeft = 2;

      this.state = "idle"; // idle, walk, jump, punch, kick, ki, kame_charge, kame_fire, charge, hit, transform, ko
      this.stateTimer = 0;
      this.animTimer = 0;
      this.invulnTimer = 0;
      this.hitFlash = 0;

      this.punchStep = 0;
      this.comboWindow = 0;
      this.attackCooldown = 0;
      this.hasHitThisSwing = false;
      this.chargeFullHold = 0;
      this.kameFired = false;
    }

    resetForGame(x, groundY) {
      this.x = x;
      this.y = groundY;
      this.groundY = groundY;
      this.vx = 0;
      this.vy = 0;
      this.facing = 1;
      this.maxHp = 100;
      this.hp = 100;
      this.ki = 40;
      this.isSSJ = false;
      this.alive = true;
      this.grounded = true;
      this.jumpsLeft = 2;
      this.state = "idle";
      this.stateTimer = 0;
      this.invulnTimer = 0;
      this.hitFlash = 0;
      this.punchStep = 0;
      this.comboWindow = 0;
      this.attackCooldown = 0;
      this.chargeFullHold = 0;
    }

    resetForStage(x, groundY) {
      this.x = x;
      this.y = groundY;
      this.groundY = groundY;
      this.vx = 0;
      this.vy = 0;
      this.facing = 1;
      this.grounded = true;
      this.jumpsLeft = 2;
      this.state = "idle";
      this.stateTimer = 0;
      this.invulnTimer = 0.5;
      this.hp = Math.min(this.maxHp, this.hp + 35);
      this.ki = Math.min(this.maxKi, Math.max(this.ki, 40));
    }

    getMoveSpeed() {
      return this.isSSJ ? 185 : 145;
    }

    getDamageMult() {
      return this.isSSJ ? 1.45 : 1.0;
    }

    getHurtbox() {
      return { x: this.x - 10, y: this.y - 36, w: 20, h: 36 };
    }

    getMeleeHitbox() {
      if (this.state === "punch") {
        const reach = this.punchStep === 2 ? 32 : 28;
        return {
          x: this.facing > 0 ? this.x + 2 : this.x - 2 - reach,
          y: this.y - 34,
          w: reach,
          h: 22,
        };
      }
      if (this.state === "kick") {
        const reach = 34;
        return {
          x: this.facing > 0 ? this.x + 2 : this.x - 2 - reach,
          y: this.y - 36,
          w: reach,
          h: 26,
        };
      }
      return null;
    }

    takeDamage(amount, knockVx = 0) {
      if (!this.alive || this.invulnTimer > 0 || this.state === "transform") return;
      this.hp = Math.max(0, this.hp - Math.round(amount));
      this.hitFlash = 0.16;
      this.invulnTimer = 0.55;
      this.vx = knockVx;
      this.vy = -120;
      this.grounded = false;
      DB.Effects.addShake(3.5, 0.14);
      DB.Effects.spawnPopup(this.x, this.y - 42, `-${Math.round(amount)}`, "#ff5858");
      DB.Audio.play("player_hit");

      if (this.hp <= 0) {
        this.alive = false;
        this.isSSJ = false;
        this.state = "ko";
        this.stateTimer = 999;
      } else {
        this.state = "hit";
        this.stateTimer = 0.24;
      }
    }

    triggerTransform() {
      if (this.isSSJ || this.ki < this.maxKi || !this.alive) return false;
      this.state = "transform";
      this.stateTimer = 0.65;
      this.vx = 0;
      this.invulnTimer = 0.9;
      this.isSSJ = true;
      DB.Audio.play("transform");
      DB.Effects.addFlash("#fff2a0", 0.65);
      DB.Effects.addShake(6, 0.4);
      DB.Effects.spawnBurst(this.x, this.y - 22, "#ffd440", 18, 150);
      DB.Effects.spawnPopup(this.x, this.y - 48, "SUPER SAIYAN!", "#ffe858");
      return true;
    }

    update(dt, input, enemies, bounds) {
      this.animTimer += dt;
      if (this.invulnTimer > 0) this.invulnTimer = Math.max(0, this.invulnTimer - dt);
      if (this.hitFlash > 0) this.hitFlash = Math.max(0, this.hitFlash - dt);
      if (this.attackCooldown > 0) this.attackCooldown = Math.max(0, this.attackCooldown - dt);
      if (this.comboWindow > 0) this.comboWindow = Math.max(0, this.comboWindow - dt);

      if (!this.alive) {
        this._applyPhysics(dt, bounds);
        return;
      }

      // Passive Ki regen (Base) vs Ki drain (Super Saiyan)
      if (this.isSSJ) {
        this.ki -= 4.2 * dt;
        if (this.ki <= 0) {
          this.ki = 0;
          this.isSSJ = false;
          DB.Effects.spawnPopup(this.x, this.y - 44, "SSJ ENDED", "#b8b0c8");
        }
      } else if (this.state !== "charge") {
        this.ki = Math.min(this.maxKi, this.ki + 2.5 * dt);
      }

      const lockedStates = ["punch", "kick", "ki", "kame_charge", "kame_fire", "hit", "transform"];
      const isLocked = lockedStates.includes(this.state);

      // Transform shortcut [T]
      if (input.justPressed("transform") && !this.isSSJ && this.ki >= this.maxKi && this.state !== "hit") {
        this.triggerTransform();
        this._applyPhysics(dt, bounds);
        return;
      }

      // Handle locked state timers
      if (isLocked) {
        this.stateTimer -= dt;

        // Active melee hit checks
        if ((this.state === "punch" || this.state === "kick") && !this.hasHitThisSwing) {
          const hitActive =
            (this.state === "punch" && this.stateTimer < 0.14) ||
            (this.state === "kick" && this.stateTimer < 0.19);
          if (hitActive) {
            const box = this.getMeleeHitbox();
            let landed = false;
            for (const e of enemies) {
              if (!e.alive) continue;
              if (DB.Combat.aabb(box, e.getHurtbox())) {
                const isFinisher = this.state === "kick" || this.punchStep === 2;
                const baseDmg = this.state === "kick" ? 20 : this.punchStep === 2 ? 18 : 12;
                const dmg = Math.round(baseDmg * this.getDamageMult());
                const kbX = this.facing * (isFinisher ? 175 : 85);
                const kbY = isFinisher ? -120 : -35;
                e.takeDamage(dmg, kbX, kbY, this);
                DB.Combat.registerPlayerHit();
                DB.Effects.spawnSpark(
                  e.x - this.facing * 6,
                  e.y - 24,
                  isFinisher ? 4 : 3,
                  isFinisher ? 1.2 : 0.9
                );
                if (isFinisher) DB.Effects.addShake(3.0, 0.1);
                landed = true;
              }
            }
            if (landed) {
              this.hasHitThisSwing = true;
              this.ki = Math.min(this.maxKi, this.ki + (this.isSSJ ? 3 : 5));
              DB.Audio.play("hit");
            }
          }
        }

        // Kamehameha firing transition
        if (this.state === "kame_charge" && this.stateTimer <= 0) {
          this.state = "kame_fire";
          this.stateTimer = 0.55;
          DB.Audio.play("kame_fire");
          DB.Effects.addShake(6, 0.35);
          DB.Combat.spawnBeam({
            x: this.x + this.facing * 20,
            y: this.y - 23,
            dir: this.facing,
            length: 340,
            height: this.isSSJ ? 28 : 22,
            damage: Math.round((this.isSSJ ? 22 : 16) * 1),
            ssj: this.isSSJ,
            life: 0.55,
          });
        } else if (this.stateTimer <= 0) {
          this.state = this.grounded ? "idle" : "jump";
        }

        // Friction during ground attacks
        if (this.grounded && this.state !== "hit") {
          this.vx *= Math.pow(0.002, dt);
        }
        this._applyPhysics(dt, bounds);
        return;
      }

      // Free movement & combat input
      const moveDir = (input.isDown("right") ? 1 : 0) - (input.isDown("left") ? 1 : 0);

      // Hold Shift to Charge Ki (grounded)
      if (input.isDown("charge") && this.grounded && moveDir === 0) {
        this.state = "charge";
        this.vx *= 0.6;
        if (!this.isSSJ) {
          this.ki = Math.min(this.maxKi, this.ki + 34 * dt);
          if (this.ki >= this.maxKi) {
            this.chargeFullHold += dt;
            if (this.chargeFullHold >= 0.38) {
              this.chargeFullHold = 0;
              this.triggerTransform();
            }
          } else {
            this.chargeFullHold = 0;
          }
        } else {
          this.ki = Math.min(this.maxKi, this.ki + 22 * dt);
        }
        this._applyPhysics(dt, bounds);
        return;
      } else {
        this.chargeFullHold = 0;
      }

      // Horizontal movement with smooth acceleration
      const targetVx = moveDir * this.getMoveSpeed();
      const accel = this.grounded ? 14 : 9;
      this.vx += (targetVx - this.vx) * Math.min(1, accel * dt);
      if (Math.abs(this.vx) < 4 && moveDir === 0) this.vx = 0;
      if (moveDir !== 0) this.facing = moveDir;

      // Jump & Double Jump
      if (input.justPressed("jump") && this.jumpsLeft > 0) {
        this.vy = this.jumpsLeft === 2 ? -295 : -255;
        this.grounded = false;
        this.jumpsLeft -= 1;
        DB.Audio.play("jump");
        DB.Effects.spawnDust(this.x, this.y, this.facing);
      }

      // Attacks
      if (this.attackCooldown <= 0) {
        if (input.justPressed("kame") && this.ki >= 45 && this.grounded) {
          this.ki -= 45;
          this.state = "kame_charge";
          this.stateTimer = 0.42;
          this.attackCooldown = 0.55;
          this.vx = 0;
          DB.Audio.play("kame_charge");
          DB.Effects.spawnPopup(this.x, this.y - 46, "KAMEHAMEHA!", this.isSSJ ? "#ffe858" : "#58e0ff");
          this._applyPhysics(dt, bounds);
          return;
        }
        if (input.justPressed("ki") && this.ki >= 12) {
          this.ki -= 12;
          this.state = "ki";
          this.stateTimer = 0.22;
          this.attackCooldown = 0.28;
          DB.Audio.play("ki");
          DB.Combat.spawnProjectile({
            owner: "player",
            x: this.x + this.facing * 20,
            y: this.y - 23,
            vx: this.facing * (this.isSSJ ? 360 : 300),
            damage: Math.round(22 * this.getDamageMult()),
            knockback: 110,
            cell: this.isSSJ ? 1 : 0,
            radius: 8,
          });
          this._applyPhysics(dt, bounds);
          return;
        }
        if (input.justPressed("punch")) {
          this.punchStep = this.comboWindow > 0 ? (this.punchStep + 1) % 3 : 0;
          this.comboWindow = 0.55;
          this.state = "punch";
          this.stateTimer = this.punchStep === 2 ? 0.26 : 0.19;
          this.attackCooldown = 0.18;
          this.hasHitThisSwing = false;
          if (this.grounded) this.vx = this.facing * 55;
          DB.Audio.play("punch");
          this._applyPhysics(dt, bounds);
          return;
        }
        if (input.justPressed("kick")) {
          this.state = "kick";
          this.stateTimer = 0.27;
          this.attackCooldown = 0.28;
          this.hasHitThisSwing = false;
          if (this.grounded) this.vx = this.facing * 75;
          DB.Audio.play("kick");
          this._applyPhysics(dt, bounds);
          return;
        }
      }

      this._applyPhysics(dt, bounds);

      // Animation state selection
      if (!this.grounded) {
        this.state = "jump";
      } else if (Math.abs(this.vx) > 18) {
        this.state = "walk";
      } else {
        this.state = "idle";
      }
    }

    _applyPhysics(dt, bounds) {
      if (!this.grounded) {
        this.vy += 760 * dt;
      }
      this.x += this.vx * dt;
      this.y += this.vy * dt;

      if (this.y >= this.groundY) {
        if (!this.grounded && this.vy > 140) {
          DB.Effects.spawnDust(this.x, this.groundY, 0);
        }
        this.y = this.groundY;
        this.vy = 0;
        this.grounded = true;
        this.jumpsLeft = 2;
      }

      if (bounds) {
        this.x = Math.max(bounds.minX, Math.min(bounds.maxX, this.x));
      }
    }

    _getFrameIndex() {
      switch (this.state) {
        case "idle":
          return Math.floor(this.animTimer * 5) % 4;
        case "walk": {
          const speed = Math.abs(this.vx);
          if (speed >= 108) {
            return 8 + (Math.floor(this.animTimer * 12) % 4);
          }
          return 4 + (Math.floor(this.animTimer * 9) % 4);
        }
        case "jump":
          if (this.vy < -180) return 12;
          return this.vy < 20 ? 13 : 14;
        case "punch":
          if (this.punchStep === 2) {
            return this.stateTimer > 0.16 ? 17 : 18;
          }
          return this.stateTimer > 0.12 ? 15 : 16;
        case "kick":
          if (!this.grounded) return 22;
          if (this.stateTimer > 0.2) return 19;
          if (this.stateTimer > 0.07) return 20;
          return 21;
        case "ki":
          return this.stateTimer > 0.14 ? 23 : 24;
        case "kame_charge":
          return this.stateTimer > 0.2 ? 25 : 26;
        case "kame_fire":
          return 27;
        case "charge":
          return 28 + (Math.floor(this.animTimer * 12) % 2);
        case "hit":
          return this.stateTimer > 0.12 ? 30 : 31;
        case "transform":
          return this.stateTimer > 0.35 ? 32 : 33;
        case "ko":
          return this.grounded ? 35 : 34;
        default:
          return 0;
      }
    }

    render(ctx, camX, assets) {
      const sheet = this.isSSJ ? assets.gokuSSJ : assets.gokuBase;
      if (!sheet) return;

      // Flicker when invulnerable
      if (this.invulnTimer > 0 && this.state !== "transform" && Math.floor(this.invulnTimer * 18) % 2 === 0) {
        ctx.save();
        ctx.globalAlpha = 0.55;
      } else {
        ctx.save();
      }

      const sx = Math.round(this.x - camX);
      const sy = Math.round(this.y);

      // Ground shadow (scales softly with height)
      const heightAbove = Math.max(0, this.groundY - this.y);
      const shadowW = Math.max(10, Math.round(24 - heightAbove * 0.14));
      ctx.fillStyle = "rgba(0, 0, 0, 0.36)";
      ctx.fillRect(sx - shadowW / 2, this.groundY - 2, shadowW, 4);

      // Aura behind Goku during Charge, SSJ, or Transform
      if (this.state === "charge" || this.isSSJ || this.state === "transform") {
        DB.Effects.drawAura(ctx, sx, sy, this.isSSJ || this.state === "transform", this.animTimer);
      }

      const frame = this._getFrameIndex();
      ctx.translate(sx, sy);
      ctx.scale(this.facing, 1);
      ctx.drawImage(sheet, frame * 64, 0, 64, 64, -32, -56, 64, 64);

      // Kamehameha charging energy ball at Goku's cupped hands
      if (this.state === "kame_charge") {
        const chargePct = 1 - Math.max(0, this.stateTimer / 0.42);
        const r = Math.round(4 + chargePct * 10);
        ctx.fillStyle = this.isSSJ ? "#ffd440" : "#58e0ff";
        ctx.fillRect(-15 - r / 2, -16 - r / 2, r, r);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-15 - r / 4, -16 - r / 4, Math.max(2, r / 2), Math.max(2, r / 2));
      }

      ctx.restore();
    }
  }

  DB.Player = Player;
})(window.DB = window.DB || {});
