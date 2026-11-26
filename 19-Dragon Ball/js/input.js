(function (DB) {
  "use strict";

  const KEY_MAP = {
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right",
    ArrowUp: "jump",
    KeyW: "jump",
    KeyJ: "punch",
    KeyK: "kick",
    KeyL: "ki",
    Space: "kame",
    ShiftLeft: "charge",
    ShiftRight: "charge",
    KeyT: "transform",
    Escape: "pause",
  };

  const KEY_NAME_MAP = {
    arrowleft: "left",
    a: "left",
    arrowright: "right",
    d: "right",
    arrowup: "jump",
    w: "jump",
    j: "punch",
    k: "kick",
    l: "ki",
    " ": "kame",
    shift: "charge",
    t: "transform",
    escape: "pause",
  };

  class InputManager {
    constructor() {
      this.down = Object.create(null);
      this.pressed = Object.create(null);
      this.touchDown = Object.create(null);
      this.touchPressed = Object.create(null);
      this._boundKeyDown = this._onKeyDown.bind(this);
      this._boundKeyUp = this._onKeyUp.bind(this);
      this._boundBlur = this._onBlur.bind(this);
      window.addEventListener("keydown", this._boundKeyDown);
      window.addEventListener("keyup", this._boundKeyUp);
      window.addEventListener("blur", this._boundBlur);
    }

    _resolveAction(e) {
      if (e.code && KEY_MAP[e.code]) return KEY_MAP[e.code];
      if (e.key) return KEY_NAME_MAP[e.key.toLowerCase()];
      return null;
    }

    _onKeyDown(e) {
      DB.Audio.unlock();
      const action = this._resolveAction(e);
      if (!action) return;
      if (e.code === "Space" || e.key === " " || (e.code && e.code.startsWith("Arrow")) || (e.key && e.key.startsWith("Arrow"))) {
        e.preventDefault();
      }
      if (e.repeat) return; // Prevent OS auto-repeat triggering attacks
      if (!this.down[action]) {
        this.pressed[action] = true;
      }
      this.down[action] = true;
    }

    _onKeyUp(e) {
      const action = this._resolveAction(e);
      if (!action) return;
      this.down[action] = false;
    }

    _onBlur() {
      for (const k in this.down) this.down[k] = false;
      for (const k in this.touchDown) this.touchDown[k] = false;
    }

    setTouch(action, isActive) {
      DB.Audio.unlock();
      if (isActive && !this.touchDown[action]) {
        this.touchPressed[action] = true;
      }
      this.touchDown[action] = isActive;
    }

    isDown(action) {
      return !!(this.down[action] || this.touchDown[action]);
    }

    justPressed(action) {
      return !!(this.pressed[action] || this.touchPressed[action]);
    }

    endFrame() {
      for (const k in this.pressed) this.pressed[k] = false;
      for (const k in this.touchPressed) this.touchPressed[k] = false;
    }

    destroy() {
      window.removeEventListener("keydown", this._boundKeyDown);
      window.removeEventListener("keyup", this._boundKeyUp);
      window.removeEventListener("blur", this._boundBlur);
    }
  }

  DB.Input = new InputManager();
})(window.DB = window.DB || {});
