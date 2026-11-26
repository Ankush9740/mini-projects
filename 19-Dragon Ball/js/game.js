(function (DB) {
  "use strict";

  const VIEW_W = 480;
  const VIEW_H = 270;
  const STORAGE_KEY = "db_saiyan_legacy_save_v1";

  const ASSET_MANIFEST = {
    gokuBase: "assets/sprites/goku_base.png",
    gokuSSJ: "assets/sprites/goku_ssj.png",
    enemyScout: "assets/sprites/enemy_scout.png",
    enemyGremlin: "assets/sprites/enemy_gremlin.png",
    enemyBlaster: "assets/sprites/enemy_blaster.png",
    enemyBrute: "assets/sprites/enemy_brute.png",
    boss1: "assets/sprites/boss_1.png",
    boss2: "assets/sprites/boss_2.png",
    boss3: "assets/sprites/boss_3.png",
    boss4: "assets/sprites/boss_4.png",
    effects: "assets/effects/effects.png",
    worldProps: "assets/effects/world_props.png",
    stage1Sky: "assets/backgrounds/stage1_sky.png",
    stage1Far: "assets/backgrounds/stage1_far.png",
    stage1Mid: "assets/backgrounds/stage1_mid.png",
    stage1Ground: "assets/backgrounds/stage1_ground.png",
    stage1Fg: "assets/backgrounds/stage1_fg.png",
    stage2Sky: "assets/backgrounds/stage2_sky.png",
    stage2Mid: "assets/backgrounds/stage2_mid.png",
    stage2Ground: "assets/backgrounds/stage2_ground.png",
    stage3Sky: "assets/backgrounds/stage3_sky.png",
    stage3Mid: "assets/backgrounds/stage3_mid.png",
    stage3Ground: "assets/backgrounds/stage3_ground.png",
    stage4Sky: "assets/backgrounds/stage4_sky.png",
    stage4Mid: "assets/backgrounds/stage4_mid.png",
    stage4Ground: "assets/backgrounds/stage4_ground.png",
  };

  class GameEngine {
    constructor() {
      this.canvas = document.getElementById("game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.ctx.imageSmoothingEnabled = false;

      this.portraitCanvas = document.getElementById("portrait-canvas");
      this.portraitCtx = this.portraitCanvas.getContext("2d");
      this.portraitCtx.imageSmoothingEnabled = false;

      this.menuGokuCanvas = document.getElementById("menu-goku-canvas");
      this.menuGokuCtx = this.menuGokuCanvas.getContext("2d");
      this.menuGokuCtx.imageSmoothingEnabled = false;

      this.assets = {};
      DB.Assets = this.assets;

      this.state = "menu"; // menu | stage_intro | playing | paused | stage_clear | gameover | victory
      this.prevStateBeforeSettings = "menu";

      this.stageIndex = 0;
      this.waveIndex = 0;
      this.waveActive = false;
      this.waveLockRight = 480;

      this.camX = 0;
      this.menuScroll = 0;
      this.stateTimer = 0;
      this.lastTime = 0;
      this.elapsedTime = 0;

      this.score = 0;
      this.highScore = 0;
      this.enemiesDefeated = 0;
      this.koDelay = 0;

      this.settings = {
        sfx: true,
        bgm: true,
        volume: 0.75,
        difficulty: "normal", // normal | hard
        shake: true,
        touch: "auto", // auto | on | off
      };

      this.player = new DB.Player(90, 232);
      this.enemies = [];
      this._lastPortraitSSJ = null;
      this._ui = {};

      this._loadSave();
      this._applySettings();
      DB.Environment.loadLevel(DB.Levels[0]);
    }

    init(uiRefs) {
      this._ui = uiRefs;
      this._preloadAssets(() => {
        this._drawPortrait(false);
        this.syncUI();
      });

      this.player._onKillEnemy = (enemy) => {
        this.enemiesDefeated += 1;
        const comboBonus = Math.min(200, DB.Combat.comboCount * 15);
        const pts = enemy.cfg.score + comboBonus;
        this.addScore(pts);
        DB.Effects.spawnPopup(enemy.x, enemy.y - 54, `+${pts}`, "#64f084");
      };

      this.lastTime = performance.now();
      const loop = (now) => {
        const dt = Math.min(0.05, Math.max(0.001, (now - this.lastTime) / 1000));
        this.lastTime = now;
        this.update(dt);
        this.render();
        DB.Input.endFrame();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    _preloadAssets(done) {
      const keys = Object.keys(ASSET_MANIFEST);
      let loaded = 0;
      for (const k of keys) {
        const img = new Image();
        img.onload = () => {
          this.assets[k] = img;
          loaded += 1;
          if (loaded === keys.length && done) done();
        };
        img.onerror = () => {
          loaded += 1;
          if (loaded === keys.length && done) done();
        };
        img.src = ASSET_MANIFEST[k];
      }
    }

    _loadSave() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        if (typeof data.highScore === "number") this.highScore = data.highScore;
        if (data.settings) {
          Object.assign(this.settings, data.settings);
        }
      } catch (_) {}
    }

    _saveData() {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            highScore: this.highScore,
            settings: this.settings,
          })
        );
      } catch (_) {}
    }

    _applySettings() {
      DB.Audio.setSfxEnabled(this.settings.sfx);
      DB.Audio.setBgmEnabled(this.settings.bgm);
      DB.Audio.setVolume(this.settings.volume);
      DB.Effects.shakeEnabled = this.settings.shake;
    }

    updateSetting(key, val) {
      this.settings[key] = val;
      this._applySettings();
      this._saveData();
      this.syncUI();
    }

    addScore(pts) {
      this.score += pts;
      if (this.score > this.highScore) {
        this.highScore = this.score;
        this._saveData();
      }
    }

    startNewGame() {
      DB.Audio.unlock();
      if (this.settings.bgm) DB.Audio.startBgm();
      this.score = 0;
      this.enemiesDefeated = 0;
      this.elapsedTime = 0;
      this.stageIndex = 0;
      DB.Combat.reset();
      DB.Effects.reset();
      this.player.resetForGame(90, DB.Levels[0].groundY);
      this._startStage(0);
    }

    restartCurrentStage() {
      DB.Audio.unlock();
      if (this.settings.bgm) DB.Audio.startBgm();
      DB.Combat.reset();
      DB.Effects.reset();
      this.player.resetForGame(90, DB.Levels[this.stageIndex].groundY);
      this._startStage(this.stageIndex);
    }

    _startStage(idx) {
      this.stageIndex = idx;
      const lvl = DB.Levels[idx];
      this.waveIndex = 0;
      this.waveActive = false;
      this.waveLockRight = VIEW_W;
      this.camX = 0;
      this.enemies.length = 0;
      this.koDelay = 0;
      DB.Combat.projectiles.length = 0;
      DB.Combat.beams.length = 0;
      DB.Effects.reset();
      DB.Environment.loadLevel(lvl);
      if (lvl.collectibles) {
        for (const c of lvl.collectibles) {
          DB.Effects.pickups.push({
            x: c.x,
            y: c.y,
            vx: 0,
            vy: 0,
            kind: c.kind,
            life: 999,
            bob: Math.random() * Math.PI * 2,
            anchored: true,
          });
        }
      }
      this.player.resetForStage(90, lvl.groundY);

      this.state = "stage_intro";
      this.stateTimer = 1.65;
      this.syncUI();
    }

    togglePause() {
      if (this.state === "playing") {
        this.state = "paused";
        DB.Audio.play("menu");
        this.syncUI();
      } else if (this.state === "paused") {
        this.state = "playing";
        DB.Audio.play("menu");
        this.syncUI();
      }
    }

    goToMenu() {
      this.state = "menu";
      DB.Audio.stopBgm();
      DB.Combat.reset();
      DB.Effects.reset();
      this.enemies.length = 0;
      DB.Environment.loadLevel(DB.Levels[0]);
      this.syncUI();
    }

    update(dt) {
      // Pause toggle via Esc
      if (DB.Input.justPressed("pause")) {
        if (this.state === "playing" || this.state === "paused") {
          this.togglePause();
        }
      }

      if (this.state === "menu") {
        this.menuScroll += 24 * dt;
        DB.Environment.update(dt);
        return;
      }

      if (this.state === "paused" || this.state === "gameover" || this.state === "victory") {
        return;
      }

      const lvl = DB.Levels[this.stageIndex];
      DB.Environment.update(dt);

      if (this.state === "stage_intro") {
        this.stateTimer -= dt;
        if (this.stateTimer <= 0) {
          this.state = "playing";
          this.syncUI();
        }
        return;
      }

      if (this.state === "stage_clear") {
        this.stateTimer -= dt;
        DB.Effects.update(dt, lvl.groundY);
        if (this.stateTimer <= 0) {
          if (this.stageIndex + 1 < DB.Levels.length) {
            this._startStage(this.stageIndex + 1);
          } else {
            this.state = "victory";
            DB.Audio.stopBgm();
            this._saveData();
            this.syncUI();
          }
        }
        return;
      }

      // Active gameplay update
      this.elapsedTime += dt;

      // Wave trigger check
      if (!this.waveActive && this.waveIndex < lvl.waves.length) {
        const wave = lvl.waves[this.waveIndex];
        if (this.player.x >= wave.triggerX) {
          this._spawnWave(wave, lvl.groundY);
        }
      }

      // Determine camera & movement boundaries
      const maxCam = Math.max(0, (this.waveActive ? this.waveLockRight : lvl.width) - VIEW_W);
      const targetCam = Math.max(0, Math.min(maxCam, this.player.x - VIEW_W * 0.36));
      this.camX += (targetCam - this.camX) * Math.min(1, 7.5 * dt);

      const bounds = {
        minX: Math.max(20, this.camX + 18),
        maxX: Math.min(lvl.width - 20, this.waveActive ? this.waveLockRight - 18 : this.camX + VIEW_W - 18),
      };

      // Update Player
      this.player.update(dt, DB.Input, this.enemies, bounds);

      // Update Enemies
      const enemyBounds = { minX: Math.max(16, this.camX - 30), maxX: Math.min(lvl.width - 16, this.waveLockRight + 40) };
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const e = this.enemies[i];
        e.update(dt, this.player, enemyBounds);
        if (e.removed) {
          this.enemies.splice(i, 1);
        }
      }

      // Check wave clear
      if (this.waveActive && this.enemies.every((e) => !e.alive)) {
        if (this.enemies.length === 0) {
          this.waveActive = false;
          this.waveIndex += 1;
          if (this.waveIndex >= lvl.waves.length) {
            // Stage Cleared!
            const stageBonus = 500 * (this.stageIndex + 1);
            this.addScore(stageBonus);
            this.state = "stage_clear";
            this.stateTimer = 2.3;
            DB.Audio.play("level_clear");
            this.syncUI();
            return;
          }
        }
      }

      // Combat & Pickups
      DB.Combat.update(dt, this.player, this.enemies, this.camX, VIEW_W);
      DB.Effects.update(dt, lvl.groundY);

      // Player pickup collection
      const pBox = this.player.getHurtbox();
      for (let i = DB.Effects.pickups.length - 1; i >= 0; i--) {
        const orb = DB.Effects.pickups[i];
        const oBox = { x: orb.x - 10, y: orb.y - 10, w: 20, h: 20 };
        if (this.player.alive && DB.Combat.aabb(pBox, oBox)) {
          if (orb.kind === "hp") {
            const heal = 22;
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
            DB.Effects.spawnPopup(this.player.x, this.player.y - 44, `+${heal} HP`, "#64f084");
          } else {
            const gain = 24;
            this.player.ki = Math.min(this.player.maxKi, this.player.ki + gain);
            DB.Effects.spawnPopup(this.player.x, this.player.y - 44, `+${gain} KI`, "#58e0ff");
          }
          this.addScore(50);
          DB.Audio.play("pickup");
          DB.Effects.pickups.splice(i, 1);
        }
      }

      // Player KO -> Game Over
      if (!this.player.alive) {
        this.koDelay += dt;
        if (this.koDelay >= 1.1) {
          this.state = "gameover";
          DB.Audio.stopBgm();
          this._saveData();
          this.syncUI();
          return;
        }
      }

      this._updateHudLive();
    }

    _spawnWave(wave, groundY) {
      this.waveActive = true;
      this.waveLockRight = wave.lockRight;
      const diffScale = this.settings.difficulty === "hard" ? 1.32 : 1.0;

      if (wave.isBossWave) {
        DB.Audio.play("boss_warn");
        DB.Effects.addFlash("#ff4050", 0.35);
      }

      wave.spawns.forEach((sp, i) => {
        const spawnX = Math.min(wave.lockRight - 28, Math.max(this.camX + 320, this.camX + sp.offset));
        const flank = (i % 3 - 1) * 18;
        const surfY = DB.Environment.getTerrainY(spawnX);
        const spawnY = surfY !== null ? surfY : groundY;
        this.enemies.push(new DB.Enemy(sp.type, spawnX, spawnY, diffScale, flank));
      });
    }

    _drawParallax(lvl, scrollX) {
      const ctx = this.ctx;
      ctx.imageSmoothingEnabled = false;

      const drawTiled = (img, factor) => {
        if (!img) return;
        const w = img.width;
        const offset = Math.floor(scrollX * factor) % w;
        const x1 = -offset;
        ctx.drawImage(img, x1, 0);
        if (x1 + w < VIEW_W) {
          ctx.drawImage(img, x1 + w, 0);
        }
      };

      drawTiled(this.assets[lvl.skyKey], 0.08);
      DB.Environment.renderSkyLife(ctx, scrollX, this.assets);
      if (lvl.farKey) drawTiled(this.assets[lvl.farKey], 0.2);
      drawTiled(this.assets[lvl.midKey], 0.48);
      drawTiled(this.assets[lvl.groundKey], 1.0);
      DB.Environment.renderTerrainAndWorld(ctx, scrollX, this.assets, !!lvl.hasCustomTerrain);
    }

    _drawForegroundParallax(lvl, scrollX) {
      DB.Environment.renderWindAtmosphere(this.ctx);
      if (!lvl.fgKey) return;
      const img = this.assets[lvl.fgKey];
      if (!img) return;
      const ctx = this.ctx;
      const w = img.width;
      const offset = Math.floor(scrollX * 1.18) % w;
      const x1 = -offset;
      ctx.drawImage(img, x1, 0);
      if (x1 + w < VIEW_W) {
        ctx.drawImage(img, x1 + w, 0);
      }
    }

    render() {
      const ctx = this.ctx;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, VIEW_W, VIEW_H);

      if (this.state === "menu") {
        // Animated Menu Background + Goku Preview
        this._drawParallax(DB.Levels[0], this.menuScroll);
        this._drawForegroundParallax(DB.Levels[0], this.menuScroll);
        this._renderMenuGokuPreview();
        return;
      }

      const lvl = DB.Levels[this.stageIndex];
      const shake = DB.Effects.getShakeOffset();

      ctx.save();
      ctx.translate(shake.x, shake.y);

      this._drawParallax(lvl, this.camX);

      // Draw fighters, projectiles/beams, effects, and foreground depth layer
      for (const e of this.enemies) {
        e.render(ctx, this.camX, this.assets);
      }
      this.player.render(ctx, this.camX, this.assets);
      DB.Combat.render(ctx, this.camX, this.assets);
      DB.Effects.render(ctx, this.camX, this.assets);
      this._drawForegroundParallax(lvl, this.camX);

      ctx.restore();
      DB.Effects.renderFlash(ctx, VIEW_W, VIEW_H);
    }

    _renderMenuGokuPreview() {
      const sheet = this.assets.gokuBase;
      if (!sheet) return;
      const pctx = this.menuGokuCtx;
      pctx.imageSmoothingEnabled = false;
      pctx.clearRect(0, 0, 96, 96);

      const t = performance.now() / 1000;
      const frame = Math.floor(t * 5) % 4;
      if (this.assets.effects) {
        pctx.save();
        pctx.globalAlpha = 0.45 + Math.sin(t * 6) * 0.15;
        pctx.drawImage(this.assets.effects, 5 * 32, 0, 32, 32, 8, 10, 80, 84);
        pctx.restore();
      }
      pctx.drawImage(sheet, frame * 64, 0, 64, 64, 0, 2, 96, 96);
    }

    _drawPortrait(ssj) {
      if (this._lastPortraitSSJ === ssj && this.assets.gokuBase) return;
      const sheet = ssj ? this.assets.gokuSSJ : this.assets.gokuBase;
      if (!sheet) return;
      this._lastPortraitSSJ = ssj;
      const pctx = this.portraitCtx;
      pctx.imageSmoothingEnabled = false;
      pctx.clearRect(0, 0, 32, 32);
      // Crop Goku's sculpted head & upper shoulders from frame 0 (64x64 cell)
      pctx.drawImage(sheet, 15, 5, 30, 30, 0, 0, 32, 32);
    }

    _getRemainingEnemiesCount() {
      const lvl = DB.Levels[this.stageIndex];
      let count = this.enemies.filter((e) => e.alive).length;
      const startWave = this.waveActive ? this.waveIndex + 1 : this.waveIndex;
      for (let i = startWave; i < lvl.waves.length; i++) {
        count += lvl.waves[i].spawns.length;
      }
      return count;
    }

    _updateHudLive() {
      const u = this._ui;
      if (!u.hud) return;

      const hpPct = Math.max(0, Math.min(100, (this.player.hp / this.player.maxHp) * 100));
      u.hpFill.style.width = `${hpPct}%`;
      u.hpFill.classList.toggle("low", hpPct <= 30);
      u.hpVal.textContent = `${this.player.hp}/${this.player.maxHp}`;

      const kiPct = Math.max(0, Math.min(100, Math.round((this.player.ki / this.player.maxKi) * 100)));
      u.kiFill.style.width = `${kiPct}%`;
      u.kiFill.classList.toggle("full", kiPct >= 100);
      u.kiFill.classList.toggle("ssj", this.player.isSSJ);
      u.kiVal.textContent = `${kiPct}%`;

      u.formBadge.textContent = this.player.isSSJ ? "SUPER SAIYAN" : "BASE";
      u.formBadge.classList.toggle("ssj", this.player.isSSJ);
      u.ssjPrompt.classList.toggle("hidden", this.player.isSSJ || kiPct < 100);
      this._drawPortrait(this.player.isSSJ);

      const lvl = DB.Levels[this.stageIndex];
      u.stageTag.textContent = `STAGE ${lvl.id} / ${DB.Levels.length}`;
      u.stageName.textContent = lvl.name;
      u.enemiesCount.textContent = `FOES: ${this._getRemainingEnemiesCount()}`;

      u.scoreVal.textContent = String(this.score).padStart(6, "0");
      u.bestVal.textContent = String(this.highScore).padStart(6, "0");

      if (DB.Combat.comboCount >= 2) {
        u.comboBox.classList.remove("hidden");
        u.comboNum.textContent = String(DB.Combat.comboCount);
      } else {
        u.comboBox.classList.add("hidden");
      }

      // GO -> indicator when no active wave and not at final boss
      const showGo = !this.waveActive && this.waveIndex < lvl.waves.length && this.state === "playing";
      u.goArrow.classList.toggle("hidden", !showGo);

      // Boss HP Bar
      const boss = this.enemies.find((e) => e.isBoss && e.alive);
      if (boss) {
        u.bossHud.classList.remove("hidden");
        u.bossName.textContent = boss.name;
        u.bossFill.style.width = `${Math.max(0, (boss.hp / boss.maxHp) * 100)}%`;
      } else {
        u.bossHud.classList.add("hidden");
      }
    }

    syncUI() {
      const u = this._ui;
      if (!u.hud) return;

      const inGameplay = ["stage_intro", "playing", "paused", "stage_clear"].includes(this.state);
      u.hud.classList.toggle("hidden", !inGameplay);

      u.menuScreen.classList.toggle("hidden", this.state !== "menu");
      u.pauseScreen.classList.toggle("hidden", this.state !== "paused");
      u.gameoverScreen.classList.toggle("hidden", this.state !== "gameover");
      u.victoryScreen.classList.toggle("hidden", this.state !== "victory");

      // Stage Banner
      if (this.state === "stage_intro") {
        const lvl = DB.Levels[this.stageIndex];
        u.bannerKicker.textContent = `STAGE ${lvl.id}`;
        u.bannerTitle.textContent = lvl.name;
        u.bannerSub.textContent = lvl.subtitle;
        u.stageBanner.classList.remove("hidden");
      } else if (this.state === "stage_clear") {
        const lvl = DB.Levels[this.stageIndex];
        u.bannerKicker.textContent = `STAGE ${lvl.id} COMPLETE!`;
        u.bannerTitle.textContent = "AREA CLEARED";
        u.bannerSub.textContent = `+${500 * (this.stageIndex + 1)} CLEAR BONUS`;
        u.stageBanner.classList.remove("hidden");
      } else {
        u.stageBanner.classList.add("hidden");
      }

      // Summary Stats for Game Over / Victory
      if (this.state === "gameover" || this.state === "victory") {
        const mins = Math.floor(this.elapsedTime / 60);
        const secs = Math.floor(this.elapsedTime % 60);
        const timeStr = `${mins}:${String(secs).padStart(2, "0")}`;
        const html = [
          `<div>STAGE REACHED: <strong>${this.stageIndex + 1} / ${DB.Levels.length}</strong></div>`,
          `<div>FINAL SCORE: <strong>${this.score}</strong></div>`,
          `<div>HIGH SCORE: <strong>${this.highScore}</strong></div>`,
          `<div>FOES DEFEATED: <strong>${this.enemiesDefeated}</strong></div>`,
          `<div>MAX COMBO: <strong>${DB.Combat.maxCombo} HITS</strong></div>`,
          `<div>TIME: <strong>${timeStr}</strong></div>`,
        ].join("");
        u.gameoverStats.innerHTML = html;
        u.victoryStats.innerHTML = html;
      }

      // Menu & Settings Labels
      u.menuHighscore.textContent = String(this.highScore).padStart(6, "0");
      const soundOn = this.settings.sfx || this.settings.bgm;
      u.btnMenuSound.textContent = `SOUND: ${soundOn ? "ON" : "OFF"}`;
      u.hudSoundBtn.textContent = soundOn ? "SFX" : "MUTE";

      u.setSfx.textContent = this.settings.sfx ? "ON" : "OFF";
      u.setBgm.textContent = this.settings.bgm ? "ON" : "OFF";
      u.setVol.value = String(Math.round(this.settings.volume * 100));
      u.setDiff.textContent = this.settings.difficulty.toUpperCase();
      u.setShake.textContent = this.settings.shake ? "ON" : "OFF";
      u.setTouch.textContent = this.settings.touch.toUpperCase();

      // Touch Controls visibility
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const showTouch =
        inGameplay &&
        this.state !== "paused" &&
        (this.settings.touch === "on" || (this.settings.touch === "auto" && isTouchDevice));
      u.touchControls.classList.toggle("hidden", !showTouch);

      if (inGameplay) {
        this._updateHudLive();
      }
    }
  }

  DB.Game = new GameEngine();
})(window.DB = window.DB || {});
