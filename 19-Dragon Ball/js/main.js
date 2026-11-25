(function (DB) {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const ui = {
      hud: document.getElementById("hud"),
      hpFill: document.getElementById("hud-hp-fill"),
      hpVal: document.getElementById("hud-hp-val"),
      kiFill: document.getElementById("hud-ki-fill"),
      kiVal: document.getElementById("hud-ki-val"),
      formBadge: document.getElementById("hud-form"),
      ssjPrompt: document.getElementById("hud-ssj-prompt"),
      stageTag: document.getElementById("hud-stage"),
      stageName: document.getElementById("hud-stage-name"),
      enemiesCount: document.getElementById("hud-enemies"),
      scoreVal: document.getElementById("hud-score"),
      bestVal: document.getElementById("hud-best"),
      comboBox: document.getElementById("hud-combo"),
      comboNum: document.getElementById("hud-combo-num"),
      goArrow: document.getElementById("hud-go-arrow"),
      bossHud: document.getElementById("hud-boss"),
      bossName: document.getElementById("hud-boss-name"),
      bossFill: document.getElementById("hud-boss-fill"),
      hudSoundBtn: document.getElementById("hud-sound-btn"),
      hudPauseBtn: document.getElementById("hud-pause-btn"),

      menuScreen: document.getElementById("menu-screen"),
      howtoScreen: document.getElementById("howto-screen"),
      settingsScreen: document.getElementById("settings-screen"),
      pauseScreen: document.getElementById("pause-screen"),
      gameoverScreen: document.getElementById("gameover-screen"),
      victoryScreen: document.getElementById("victory-screen"),

      stageBanner: document.getElementById("stage-banner"),
      bannerKicker: document.getElementById("banner-kicker"),
      bannerTitle: document.getElementById("banner-title"),
      bannerSub: document.getElementById("banner-sub"),

      gameoverStats: document.getElementById("gameover-stats"),
      victoryStats: document.getElementById("victory-stats"),
      menuHighscore: document.getElementById("menu-highscore"),
      btnMenuSound: document.getElementById("btn-menu-sound"),

      setSfx: document.getElementById("set-sfx"),
      setBgm: document.getElementById("set-bgm"),
      setVol: document.getElementById("set-vol"),
      setDiff: document.getElementById("set-diff"),
      setShake: document.getElementById("set-shake"),
      setTouch: document.getElementById("set-touch"),

      touchControls: document.getElementById("touch-controls"),
    };

    DB.Game.init(ui);

    // Main Menu Buttons
    document.getElementById("btn-start").addEventListener("click", () => {
      DB.Audio.unlock();
      DB.Audio.play("menu");
      DB.Game.startNewGame();
    });

    document.getElementById("btn-howto").addEventListener("click", () => {
      DB.Audio.unlock();
      DB.Audio.play("menu");
      ui.menuScreen.classList.add("hidden");
      ui.howtoScreen.classList.remove("hidden");
    });

    document.getElementById("btn-howto-back").addEventListener("click", () => {
      DB.Audio.play("menu");
      ui.howtoScreen.classList.add("hidden");
      ui.menuScreen.classList.remove("hidden");
    });

    document.getElementById("btn-settings").addEventListener("click", () => {
      DB.Audio.unlock();
      DB.Audio.play("menu");
      DB.Game.prevStateBeforeSettings = "menu";
      ui.menuScreen.classList.add("hidden");
      ui.settingsScreen.classList.remove("hidden");
    });

    document.getElementById("btn-pause-settings").addEventListener("click", () => {
      DB.Audio.play("menu");
      DB.Game.prevStateBeforeSettings = "paused";
      ui.pauseScreen.classList.add("hidden");
      ui.settingsScreen.classList.remove("hidden");
    });

    document.getElementById("btn-settings-back").addEventListener("click", () => {
      DB.Audio.play("menu");
      ui.settingsScreen.classList.add("hidden");
      if (DB.Game.prevStateBeforeSettings === "paused") {
        ui.pauseScreen.classList.remove("hidden");
      } else {
        ui.menuScreen.classList.remove("hidden");
      }
      DB.Game.syncUI();
    });

    const toggleAllSound = () => {
      DB.Audio.unlock();
      const anyOn = DB.Game.settings.sfx || DB.Game.settings.bgm;
      const next = !anyOn;
      DB.Game.updateSetting("sfx", next);
      DB.Game.updateSetting("bgm", next);
      if (next) DB.Audio.play("menu");
    };

    ui.btnMenuSound.addEventListener("click", toggleAllSound);
    ui.hudSoundBtn.addEventListener("click", toggleAllSound);

    // Settings Controls
    ui.setSfx.addEventListener("click", () => {
      DB.Audio.unlock();
      DB.Game.updateSetting("sfx", !DB.Game.settings.sfx);
      DB.Audio.play("menu");
    });

    ui.setBgm.addEventListener("click", () => {
      DB.Audio.unlock();
      DB.Game.updateSetting("bgm", !DB.Game.settings.bgm);
      DB.Audio.play("menu");
    });

    ui.setVol.addEventListener("input", (e) => {
      DB.Audio.unlock();
      DB.Game.updateSetting("volume", Number(e.target.value) / 100);
    });

    ui.setDiff.addEventListener("click", () => {
      DB.Audio.play("menu");
      const next = DB.Game.settings.difficulty === "normal" ? "hard" : "normal";
      DB.Game.updateSetting("difficulty", next);
    });

    ui.setShake.addEventListener("click", () => {
      DB.Audio.play("menu");
      DB.Game.updateSetting("shake", !DB.Game.settings.shake);
    });

    ui.setTouch.addEventListener("click", () => {
      DB.Audio.play("menu");
      const order = ["auto", "on", "off"];
      const next = order[(order.indexOf(DB.Game.settings.touch) + 1) % order.length];
      DB.Game.updateSetting("touch", next);
    });

    // Pause / Game Over / Victory Actions
    ui.hudPauseBtn.addEventListener("click", () => DB.Game.togglePause());
    document.getElementById("btn-resume").addEventListener("click", () => DB.Game.togglePause());
    document.getElementById("btn-restart").addEventListener("click", () => {
      DB.Audio.play("menu");
      DB.Game.restartCurrentStage();
    });
    document.getElementById("btn-quit").addEventListener("click", () => {
      DB.Audio.play("menu");
      DB.Game.goToMenu();
    });

    document.getElementById("btn-retry").addEventListener("click", () => {
      DB.Audio.play("menu");
      DB.Game.startNewGame();
    });
    document.getElementById("btn-go-menu").addEventListener("click", () => {
      DB.Audio.play("menu");
      DB.Game.goToMenu();
    });

    document.getElementById("btn-play-again").addEventListener("click", () => {
      DB.Audio.play("menu");
      DB.Game.startNewGame();
    });
    document.getElementById("btn-vic-menu").addEventListener("click", () => {
      DB.Audio.play("menu");
      DB.Game.goToMenu();
    });

    // Mobile Touch Controls (pointer events handle touch + mouse cleanly)
    const touchBtns = ui.touchControls.querySelectorAll(".touch-btn");
    touchBtns.forEach((btn) => {
      const action = btn.dataset.action;
      const press = (e) => {
        e.preventDefault();
        btn.classList.add("active");
        DB.Input.setTouch(action, true);
      };
      const release = (e) => {
        e.preventDefault();
        btn.classList.remove("active");
        DB.Input.setTouch(action, false);
      };
      btn.addEventListener("pointerdown", press);
      btn.addEventListener("pointerup", release);
      btn.addEventListener("pointercancel", release);
      btn.addEventListener("pointerleave", release);
    });
  });
})(window.DB = window.DB || {});
