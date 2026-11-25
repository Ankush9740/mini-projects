# DRAGON BALL: SAIYAN LEGACY

A retro 16-bit pixel-art side-scrolling beat 'em up built with **HTML5 Canvas, CSS3, and Vanilla JavaScript**.

## How to Run

Open `index.html` directly in any modern browser, or serve the folder locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Controls

| Key | Action |
|---|---|
| `A` / `ArrowLeft` | Move Left |
| `D` / `ArrowRight` | Move Right |
| `W` / `ArrowUp` | Jump / Double Jump |
| `J` | Punch (3-Hit Combo) |
| `K` | Kick (Knockback) |
| `L` | Ki Blast (12 Ki) |
| `Space` | Kamehameha Beam (45 Ki) |
| `Shift` | Hold to Charge Ki |
| `T` | Transform into Super Saiyan (at 100% Ki, or hold `Shift` at full Ki) |
| `Esc` | Pause / Resume |

Touch controls are automatically shown on mobile devices (and can be toggled in **Settings**).

## Project Structure

- `index.html` — Game shell, HUD, menu overlays, and touch controls
- `css/style.css` — Retro arcade layout and responsive pixel-crisp styling
- `js/audio.js` — Web Audio API retro 16-bit SFX and arcade music synthesizer
- `js/input.js` — Keyboard and touch input manager
- `js/effects.js` — Hit sparks, particles, aura, pickups, floating popups, and screen shake
- `js/combat.js` — Projectiles, Kamehameha beam, hit detection, and combo counter
- `js/player.js` — Goku movement, physics, attacks, Ki energy, and Super Saiyan form
- `js/enemy.js` — 4 enemy classes + 4 unique Stage Bosses with AI behavior
- `js/levels.js` — 4 side-scrolling stages with wave zones and bosses
- `js/game.js` — Core `requestAnimationFrame` loop, parallax renderer, and state machine
- `js/main.js` — UI wiring and event initialization
- `assets/` — Original 16-bit pixel-art spritesheets, parallax backgrounds, effects, and retro WAV files
