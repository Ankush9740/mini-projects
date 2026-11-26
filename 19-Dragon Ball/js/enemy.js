(function (DB) {
  "use strict";

  const ENEMY_CONFIGS = {
    scout: {
      name: "Frieza Scout",
      spriteKey: "enemyScout",
      cellSize: 64,
      bodySize: 48,
      maxHp: 45,
      speed: 78,
      damage: 9,
      range: 34,
      score: 100,
      kbResist: 1.0,
      isRanged: false,
      isBoss: false,
      windup: 0.28,
      cooldown: 1.05,
    },
    gremlin: {
      name: "Bio-Fighter",
      spriteKey: "enemyGremlin",
      cellSize: 64,
      bodySize: 48,
      maxHp: 34,
      speed: 112,
      damage: 8,
      range: 52,
      score: 120,
      kbResist: 1.15,
      isRanged: false,
      isBoss: false,
      windup: 0.22,
      cooldown: 0.9,
      lunges: true,
    },
    blaster: {
      name: "Ki Trooper",
      spriteKey: "enemyBlaster",
      cellSize: 64,
      bodySize: 48,
      maxHp: 42,
      speed: 68,
      damage: 11,
      range: 185,
      score: 150,
      kbResist: 1.0,
      isRanged: true,
      isBoss: false,
      windup: 0.36,
      cooldown: 1.65,
    },
    brute: {
      name: "Armored Brute",
      spriteKey: "enemyBrute",
      cellSize: 64,
      bodySize: 64,
      maxHp: 110,
      speed: 52,
      damage: 16,
      range: 44,
      score: 260,
      kbResist: 0.4,
      isRanged: false,
      isBoss: false,
      windup: 0.45,
      cooldown: 1.45,
    },
    boss1: {
      name: "SAIYAN VANGUARD",
      spriteKey: "boss1",
      cellSize: 64,
      bodySize: 64,
      maxHp: 240,
      speed: 88,
      damage: 14,
      range: 48,
      score: 800,
      kbResist: 0.35,
      isRanged: false,
      isBoss: true,
      windup: 0.35,
      cooldown: 1.1,
    },
    boss2: {
      name: "BERSERKER TITAN",
      spriteKey: "boss2",
      cellSize: 64,
      bodySize: 64,
      maxHp: 330,
      speed: 78,
      damage: 18,
      range: 50,
      score: 1100,
      kbResist: 0.25,
      isRanged: false,
      isBoss: true,
      windup: 0.38,
      cooldown: 1.15,
    },
    boss3: {
      name: "CRIMSON COMMANDER",
      spriteKey: "boss3",
      cellSize: 64,
      bodySize: 64,
      maxHp: 420,
      speed: 98,
      damage: 18,
      range: 52,
      score: 1400,
      kbResist: 0.3,
      isRanged: false,
      isBoss: true,
      windup: 0.32,
      cooldown: 1.0,
    },
    boss4: {
      name: "EMPEROR FROST",
      spriteKey: "boss4",
      cellSize: 64,
      bodySize: 64,
      maxHp: 560,
      speed: 105,
      damage: 20,
      range: 54,
      score: 2500,
      kbResist: 0.25,
      isRanged: false,
      isBoss: true,
      windup: 0.3,
      cooldown: 0.92,
    },
  };

  class Enemy {
    constructor(type, x, groundY, diffCfg = 1.0, flankOffset = 0) {
      const cfg = ENEMY_CONFIGS[type] || ENEMY_CONFIGS.scout;
      this.type = type;
      this.cfg = cfg;
      this.name = cfg.name;
      this.isBoss = cfg.isBoss;

      // Support either numeric scale (backwards compat) or full Difficulty object
      const diff =
        typeof diffCfg === "object" && diffCfg !== null
          ? diffCfg
          : {
              hpMult: diffCfg,
              bossHpMult: diffCfg,
              dmgMult: diffCfg > 1 ? 1.2 : 1.0,
              speedMult: 1.0,
              windupMult: 1.0,
              cooldownMult: 1.0,
              rageThreshold: 0.5,
              aggroLevel: diffCfg > 1 ? 2 : 1,
            };
      this.diff = diff;

      this.x = x;
      this.y = groundY;
      this.groundY = groundY;
      this.vx = 0;
      this.vy = 0;
      this.facing = -1;

      const hpScale = this.isBoss ? diff.bossHpMult : diff.hpMult;
      this.maxHp = Math.round(cfg.maxHp * hpScale);
      this.hp = this.maxHp;
      this.damage = Math.max(1, Math.round(cfg.damage * diff.dmgMult));
      this.flankOffset = flankOffset;

      this.alive = true;
      this.removed = false;
      this.grounded = true;

      this.state = "idle"; // idle, move, windup, attack, special, hit, ko
      this.stateTimer = 0;
      this.attackCooldown = (0.55 + Math.random() * 0.45) * diff.cooldownMult;
      this.animTimer = Math.random() * 2;
      this.hitFlash = 0;
      this.hasDealtHit = false;
      this.bossPattern = 0;
      this.koTimer = 0.75;
      this.evadeCooldown = 0;
    }

    getHurtbox() {
      const w = this.cfg.bodySize === 64 ? 30 : 22;
      const h = this.cfg.bodySize === 64 ? 48 : 36;
      return { x: this.x - w / 2, y: this.y - h, w, h };
    }

    takeDamage(amount, kbVx, kbVy, player) {
      if (!this.alive) return;
      this.hp = Math.max(0, this.hp - Math.round(amount));
      this.hitFlash = 0.14;
      const resist = this.cfg.kbResist;
      this.vx = kbVx * resist;
      if (kbVy < 0 && resist > 0.35) {
        this.vy = kbVy * resist;
        this.grounded = false;
      }

      DB.Effects.spawnPopup(this.x, this.y - (this.cfg.bodySize === 64 ? 54 : 42), `${Math.round(amount)}`, "#fff480");

      if (this.hp <= 0) {
        this.alive = false;
        this.state = "ko";
        this.vx = (kbVx >= 0 ? 1 : -1) * 95;
        this.vy = -130;
        this.grounded = false;
        DB.Effects.spawnBurst(this.x, this.y - 22, this.isBoss ? "#ffd440" : "#ff9c50", this.isBoss ? 22 : 10, 120);
        if (this.isBoss) {
          DB.Effects.addShake(7, 0.45);
          DB.Effects.addFlash("#ffffff", 0.55);
        }
        // Drop Energy or Health orb
        const dropRoll = Math.random();
        if (dropRoll < 0.25) {
          DB.Effects.spawnPickup(this.x, this.y - 8, "hp");
        } else if (dropRoll < 0.72) {
          DB.Effects.spawnPickup(this.x, this.y - 8, "ki");
        }
        if (player && player._onKillEnemy) {
          player._onKillEnemy(this);
        }
      } else if (!this.isBoss || resist > 0.3 || this.state === "idle" || this.state === "move") {
        // Hard AI: aggressive enemies may perform an evasive hop-back counter instead of staying stunned
        if (this.diff.aggroLevel >= 2 && this.grounded && this.evadeCooldown <= 0 && Math.random() < 0.32) {
          this.evadeCooldown = 2.4;
          this.vx = (kbVx >= 0 ? 1 : -1) * 145;
          this.vy = -175;
          this.grounded = false;
          this.attackCooldown = Math.min(this.attackCooldown, 0.35);
          this.state = "idle";
        } else if (this.state !== "special") {
          this.state = "hit";
          this.stateTimer = this.isBoss ? 0.14 : 0.24;
        }
      }
    }

    update(dt, player, bounds) {
      this.animTimer += dt;
      if (this.hitFlash > 0) this.hitFlash = Math.max(0, this.hitFlash - dt);
      if (this.attackCooldown > 0) this.attackCooldown = Math.max(0, this.attackCooldown - dt);
      if (this.evadeCooldown > 0) this.evadeCooldown = Math.max(0, this.evadeCooldown - dt);

      if (!this.alive) {
        this.koTimer -= dt;
        this._applyPhysics(dt, bounds);
        if (this.koTimer <= 0) this.removed = true;
        return;
      }

      const dx = player.x - this.x;
      const dist = Math.abs(dx);
      const dirToPlayer = dx >= 0 ? 1 : -1;

      if (this.state === "hit") {
        this.stateTimer -= dt;
        this.vx *= Math.pow(0.01, dt);
        if (this.stateTimer <= 0) {
          this.state = "idle";
        }
        this._applyPhysics(dt, bounds);
        return;
      }

      if (this.state === "windup") {
        this.stateTimer -= dt;
        this.vx *= 0.82;
        if (this.stateTimer <= 0) {
          this._executeAttack(player, dirToPlayer);
        }
        this._applyPhysics(dt, bounds);
        return;
      }

      if (this.state === "attack" || this.state === "special") {
        this.stateTimer -= dt;
        if (!this.hasDealtHit && this.state === "attack" && this.stateTimer < 0.18) {
          const reach = this.cfg.range + 14;
          const atkBox = {
            x: this.facing > 0 ? this.x : this.x - reach,
            y: this.y - 44,
            w: reach,
            h: 42,
          };
          if (player.alive && DB.Combat.aabb(atkBox, player.getHurtbox())) {
            player.takeDamage(this.damage, this.facing * (this.isBoss ? 150 : 105));
            this.hasDealtHit = true;
          }
        }
        this.vx *= Math.pow(0.03, dt);
        if (this.stateTimer <= 0) {
          this.state = "idle";
        }
        this._applyPhysics(dt, bounds);
        return;
      }

      // AI Movement & Target Selection (Difficulty-aware speed, windups, and attack patterns)
      this.facing = dirToPlayer;
      const rageMult = this.isBoss && this.hp < this.maxHp * this.diff.rageThreshold ? 1.3 : 1.0;
      const moveSpeed = this.cfg.speed * this.diff.speedMult * rageMult;
      const windupDur = this.cfg.windup * this.diff.windupMult;

      if (this.cfg.isRanged) {
        const idealDist = 165 + this.flankOffset;
        if (dist < 85) {
          // Back away from Goku
          this.vx = -dirToPlayer * moveSpeed;
          this.state = "move";
        } else if (dist > idealDist + 25) {
          this.vx = dirToPlayer * moveSpeed;
          this.state = "move";
        } else {
          this.vx *= 0.7;
          this.state = "idle";
          if (this.attackCooldown <= 0 && player.alive) {
            this.state = "windup";
            this.stateTimer = windupDur;
            this.hasDealtHit = false;
          }
        }
      } else {
        // Melee or Boss AI
        const stopDist = this.cfg.range - 6 + Math.abs(this.flankOffset) * 0.25;
        // Hard AI: melee & brute enemies launch mid-range lunge/dash strikes!
        const hardMidLunge =
          !this.isBoss &&
          this.diff.aggroLevel >= 2 &&
          dist > stopDist + 10 &&
          dist < 105 &&
          this.attackCooldown <= 0 &&
          player.alive;

        if (hardMidLunge) {
          this.state = "windup";
          this.stateTimer = windupDur;
          this.hasDealtHit = false;
        } else if (this.isBoss && dist > 100 && dist < 280 && this.attackCooldown <= 0 && player.alive) {
          // Boss ranged / dash special trigger
          this.bossPattern = (this.bossPattern + 1) % 3;
          this.state = "windup";
          this.stateTimer = windupDur / rageMult;
          this.hasDealtHit = false;
        } else if (dist > stopDist) {
          this.vx = dirToPlayer * moveSpeed;
          this.state = "move";
          // Terrain awareness: jump over gaps, obstacles, or up onto Goku's elevated ledge
          if (this.grounded && DB.Environment) {
            const needJump =
              DB.Environment.isGapAhead(this.x, dirToPlayer, 22) ||
              DB.Environment.hasObstacleAhead(this.x, this.y, dirToPlayer, 24) ||
              (player.y < this.y - 26 && dist < 110 && Math.random() < 0.08);
            if (needJump) {
              this.vy = -270;
              this.grounded = false;
            }
          }
        } else {
          this.vx *= 0.7;
          this.state = "idle";
          if (this.attackCooldown <= 0 && player.alive) {
            this.state = "windup";
            this.stateTimer = windupDur / rageMult;
            this.hasDealtHit = false;
            if (this.isBoss) this.bossPattern = (this.bossPattern + 1) % 3;
          }
        }
      }

      this._applyPhysics(dt, bounds);
    }

    _executeAttack(player, dir) {
      const rage = this.isBoss && this.hp < this.maxHp * this.diff.rageThreshold;
      const cdMult = (rage ? 0.72 : 1.0) * this.diff.cooldownMult;
      this.facing = dir;
      this.attackCooldown = this.cfg.cooldown * cdMult;

      if (this.cfg.isRanged) {
        this.state = "special";
        this.stateTimer = 0.25;
        DB.Audio.play("ki");
        const boltSpeed = this.diff.aggroLevel >= 2 ? 250 : 210;
        DB.Combat.spawnProjectile({
          owner: "enemy",
          x: this.x + dir * 18,
          y: this.y - 24,
          vx: dir * boltSpeed,
          damage: this.damage,
          knockback: 90,
          cell: 2,
          radius: 7,
        });
        // Hard AI: Ki Troopers fire a twin angled spread bolt!
        if (this.diff.aggroLevel >= 2) {
          DB.Combat.spawnProjectile({
            owner: "enemy",
            x: this.x + dir * 18,
            y: this.y - 28,
            vx: dir * (boltSpeed - 25),
            vy: -32,
            damage: Math.max(4, Math.round(this.damage * 0.75)),
            knockback: 75,
            cell: 2,
            radius: 6,
          });
        }
        return;
      }

      if (this.isBoss && this.bossPattern === 1) {
        // Boss Energy Volley / Supernova
        this.state = "special";
        this.stateTimer = 0.34;
        DB.Audio.play("ki");
        const isFinal = this.type === "boss4";
        const spd = this.diff.aggroLevel >= 2 ? 255 : 210;
        DB.Combat.spawnProjectile({
          owner: "enemy",
          x: this.x + dir * 24,
          y: this.y - 28,
          vx: dir * (isFinal ? spd + 25 : spd),
          damage: this.damage + 4,
          knockback: 140,
          cell: 2,
          radius: isFinal ? 13 : 9,
          isSuper: isFinal,
        });
        if (rage || this.type === "boss3" || this.diff.aggroLevel >= 2) {
          DB.Combat.spawnProjectile({
            owner: "enemy",
            x: this.x + dir * 24,
            y: this.y - 36,
            vx: dir * (spd - 15),
            vy: -36,
            damage: this.damage,
            knockback: 100,
            cell: 2,
            radius: 7,
          });
        }
        if (this.diff.aggroLevel >= 2 && rage) {
          DB.Combat.spawnProjectile({
            owner: "enemy",
            x: this.x + dir * 24,
            y: this.y - 20,
            vx: dir * (spd - 25),
            vy: 26,
            damage: this.damage,
            knockback: 100,
            cell: 2,
            radius: 7,
          });
        }
        return;
      }

      if (this.isBoss && this.bossPattern === 2) {
        // Boss Dash Lunge Strike
        this.state = "attack";
        this.stateTimer = 0.32;
        this.vx = dir * (this.diff.aggroLevel >= 2 ? 275 : 240);
        DB.Audio.play("kick");
        return;
      }

      // Standard Melee Strike (or Gremlin / Hard AI lunge)
      this.state = "attack";
      this.stateTimer = 0.26;
      if (this.cfg.lunges || (this.diff.aggroLevel >= 2 && Math.abs(player.x - this.x) > 48)) {
        this.vx = dir * (this.diff.aggroLevel >= 2 ? 210 : 185);
        this.vy = -85;
        this.grounded = false;
      } else {
        this.vx = dir * 75;
      }
      DB.Audio.play("punch");
    }

    _applyPhysics(dt, bounds) {
      const prevX = this.x;
      const prevY = this.y;
      if (!this.grounded) {
        this.vy += 760 * dt;
      }
      this.x += this.vx * dt;
      this.y += this.vy * dt;

      if (DB.Environment) {
        DB.Environment.resolveHorizontal(this, prevX, this.cfg.bodySize === 64 ? 13 : 9);
        DB.Environment.resolveVertical(this, prevY, this.cfg.bodySize === 64 ? 13 : 9, false);
      } else if (this.y >= this.groundY) {
        this.y = this.groundY;
        this.vy = 0;
        this.grounded = true;
      }

      if (bounds) {
        this.x = Math.max(bounds.minX, Math.min(bounds.maxX, this.x));
      }
    }

    _getFrameIndex() {
      switch (this.state) {
        case "idle":
          return Math.floor(this.animTimer * 4) % 2;
        case "move":
          return 2 + (Math.floor(this.animTimer * 9) % 4);
        case "windup":
          return 6;
        case "attack":
          return 7;
        case "special":
          return 8;
        case "hit":
          return 9;
        case "ko":
          return this.grounded ? 11 : 10;
        default:
          return 0;
      }
    }

    render(ctx, camX, assets) {
      const sheet = assets[this.cfg.spriteKey];
      if (!sheet) return;

      const sz = this.cfg.cellSize;
      const sx = Math.round(this.x - camX);
      const sy = Math.round(this.y);

      ctx.save();
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.36)";
      const sw = this.cfg.bodySize === 64 ? 30 : 22;
      ctx.fillRect(sx - sw / 2, this.groundY - 2, sw, 4);

      // Boss Rage aura at <50% HP
      if (this.isBoss && this.alive && this.hp < this.maxHp * 0.5) {
        DB.Effects.drawAura(ctx, sx, sy, true, this.animTimer);
      }

      // KO blink fade
      if (!this.alive && Math.floor(this.koTimer * 18) % 2 === 0) {
        ctx.globalAlpha = 0.4;
      }

      const frame = this._getFrameIndex();
      ctx.translate(sx, sy);
      ctx.scale(this.facing, 1);

      const drawOffsetY = -56;
      ctx.drawImage(sheet, frame * sz, 0, sz, sz, -sz / 2, drawOffsetY, sz, sz);

      // Crisp white hit-flash indicator
      if (this.hitFlash > 0) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.fillRect(-sz / 2, drawOffsetY, sz, sz);
      }

      ctx.restore();

      // Small overhead HP bar for damaged non-boss enemies
      if (this.alive && !this.isBoss && this.hp < this.maxHp) {
        const bw = 24;
        const bx = sx - bw / 2;
        const by = sy - (this.cfg.bodySize === 64 ? 54 : 42);
        ctx.fillStyle = "#181020";
        ctx.fillRect(bx - 1, by - 1, bw + 2, 4);
        ctx.fillStyle = "#e83848";
        ctx.fillRect(bx, by, Math.round((this.hp / this.maxHp) * bw), 2);
      }
    }
  }

  DB.Enemy = Enemy;
})(window.DB = window.DB || {});
