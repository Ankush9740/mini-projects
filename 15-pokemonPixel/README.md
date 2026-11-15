# POKÉPIXEL — THE ULTIMATE POKÉMON GBA UNIVERSE

A complete, visually stunning, highly interactive, and responsive retro website celebrating the golden era of Game Boy Advance Pokémon titles:
- **Pokémon FireRed**
- **Pokémon LeafGreen**
- **Pokémon Emerald**
- **Pokémon Ruby**
- **Pokémon Sapphire**

Built entirely using **HTML5, CSS3, and Vanilla JavaScript** with **zero external dependencies**, no frameworks, and full offline functionality.

---

## 🌟 CORE HIGHLIGHTS & PAGES

### 1. Home — `index.html`
- **Authentic Startup Boot Screen**: Fast, skippable Game Boy Advance boot animation with progress bar.
- **Overworld Hero Environment**: Multi-layered pixel art countryside featuring rolling hills, distant mountain ranges, animated pixel clouds, a walking Trainer Red sprite, and wandering Pokémon.
- **Dynamic Dialogue HUD**: Real-time typewriter dialogue box cycling classic trainer greetings and announcements.
- **Interactive Mini GBA Device**: Functional handheld frame with working A/B buttons that cycle custom messages and cry sounds.
- **Daily Pokémon Encounter**: Generates a deterministic daily Pokémon based on calendar dates with direct one-click link into the Pokédex.
- **Featured Cartridges**: 3D lift physical cartridge cards with authentic GBA molded plastic and metallic foil stickers.
- **Choose Your Starter Preview**: Switch between Kanto and Hoenn starter trios with animated sprites, stats, and evolution chains.
- **Legendary Titans Showcase**: Dark atmospheric cards with glowing pixel auras for Rayquaza, Groudon, Kyogre, Mewtwo, Mew, and Deoxys.
- **Nostalgia Tribute**: Classic battle scene mockup and reflections on Generation III's impact.

### 2. GBA Games — `games.html`
- **Comprehensive Game Archives**: Detailed breakdowns for FireRed, LeafGreen, Emerald, Ruby, and Sapphire including release years, regional story arcs, starter trios, legendary mascots, and key innovations.
- **Regional Filtering**: Instant filtering across Kanto and Hoenn adventures.
- **Interactive Head-to-Head Comparison**: Select any two GBA games and compare their regions, starters, mascots, villainous teams (Team Rocket vs Magma vs Aqua), and technical innovations side-by-side with a retro "VS" split-screen interface.

### 3. Pokémon Dex — `pokedex.html`
- **80-Pokémon Roster**: Complete Generation III database covering all Kanto and Hoenn starters, evolutions, legendary titans, and iconic favorites.
- **Live Search & Filters**: Search instantaneously by name or Pokédex number; filter by elemental types (Fire, Water, Grass, Dragon, etc.) and regional generation; sort by Pokédex number, name, or base stat total.
- **Authentic GBA Pokédex Device Modal**:
  - Classic red Pokédex chassis with sensor lens and indicator LEDs.
  - Large animated sprite with pixel background.
  - Height, weight, category, and regional origin.
  - Colorful segmented base combat stat gauges (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed, Total).
  - Visual 3-stage evolution line with level requirements.
  - Left / Right keyboard arrow key navigation and Previous / Next buttons.
  - Direct URL deep linking (`pokedex.html?id=384`).

### 4. Regions — `regions.html`
- **Interactive Kanto & Hoenn Town Maps**: Crisp pixel-art overworld maps styled after the authentic in-game Town Map item.
- **21 Interactive Map Coordinates**:
  - **Kanto**: Pallet Town, Viridian City, Pewter City, Cerulean City, Vermilion City, Lavender Town, Celadon City, Fuchsia City, Cinnabar Island, Indigo Plateau.
  - **Hoenn**: Littleroot Town, Oldale Town, Petalburg City, Rustboro City, Dewford Town, Slateport City, Mauville City, Fortree City, Lilycove City, Sootopolis City, Ever Grande City.
- **Town Map Guide HUD**: Displays location type, Gym Leader, official Badge, famous landmarks, associated GBA version, and notable wild encounter sprites.
- **Quick Location Selector**: Rapid location jumper for mobile and desktop.

### 5. Starters & Team Builder — `starters.html`
- **Starter Selection Showcase**: 3D layered selection panels for Kanto (Bulbasaur, Charmander, Squirtle), Johto bonus (Chikorita, Cyndaquil, Totodile), and Hoenn (Treecko, Torchic, Mudkip).
- **In-Depth Dossier**: Detailed personality profile, description, type affinities, and complete 3-stage evolution progression.
- **Retro Party Menu (Dream Team of 6)**:
  - Add any starter or any Pokémon from the 80-mon Pokédex into your active 6-slot party.
  - Displays party slots with Poké Ball icons, levels, and green HP gauges.
  - Remove individual Pokémon or clear the entire squad.
  - Persistent party state saved automatically via browser `localStorage`.

### 6. About & Retrospective — `about.html`
- **Editorial Retrospective**: *"MORE THAN A GAME. A CHILDHOOD ADVENTURE."*
- Explores the magic of Kanto, the untamed beauty of Hoenn, the acoustic identity of trumpets and chiptunes, and the camaraderie of link cables and playground trades.
- **Retro GBA Trainer Trivia Minigame**: Interactive 4-question quiz testing your Gen 3 knowledge with real-time score tracking and 8-bit sound effects.

---

## 🎵 8-BIT AUDIO SYNTHESIZER & ASSETS

- **Web Audio API Chiptune Synth**: Synthesizes genuine 8-bit square and sawtooth waves on the fly for menu navigation, button clicks, modal transitions, wall bumps, and a 4-note victory starter fanfare.
- **100% Offline & Copyright-Safe**: Built-in Web Audio synthesis plus local fallback `.wav` files in `assets/audio/`.
- **Sound Toggle**: Speaker button in the header allows visitors to mute or unmute at any time with persistent state in `localStorage`.

---

## 🎨 PALETTE & PIXEL DESIGN

- **Deep Retro Navy**: `#17283C` / `#0E1A29`
- **Game Boy Green**: `#8BAC65`
- **Forest Green**: `#426B42`
- **Pixel Grass**: `#A5C96B`
- **Cream / Parchment**: `#F4E8C8`
- **Retro Gold**: `#E9B94E`
- **Ocean Blue**: `#5B9BC6`
- **Fire Red**: `#D95745`
- **Dark Pixel Brown**: `#49372B`

---

## 📁 PROJECT DIRECTORY STRUCTURE

```
pokepixel/
├── index.html
├── games.html
├── pokedex.html
├── regions.html
├── starters.html
├── about.html
│
├── css/
│   ├── style.css
│   ├── pixel-art.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── games.js
│   ├── pokedex.js
│   ├── regions.js
│   ├── starters.js
│   ├── interactions.js
│   ├── pokemon-data.js
│   └── regions-data.js
│
├── assets/
│   ├── images/
│   │   ├── backgrounds/
│   │   │   ├── hero-bg.svg
│   │   │   └── battle-bg.svg
│   │   ├── games/
│   │   │   ├── cartridge-firered.svg
│   │   │   ├── cartridge-leafgreen.svg
│   │   │   ├── cartridge-emerald.svg
│   │   │   ├── cartridge-ruby.svg
│   │   │   └── cartridge-sapphire.svg
│   │   ├── icons/
│   │   │   ├── pokeball.svg
│   │   │   ├── greatball.svg
│   │   │   ├── ultraball.svg
│   │   │   ├── masterball.svg
│   │   │   └── cursor-pokeball.svg
│   │   └── regions/
│   │       ├── kanto-map.svg
│   │       └── hoenn-map.svg
│   │
│   ├── sprites/
│   │   ├── 1.png ... 386.png (80 authentic Gen 3 GBA sprites)
│   │   └── trainer-red.svg
│   │
│   └── audio/
│       ├── click.wav
│       ├── select.wav
│       ├── modal.wav
│       ├── starter.wav
│       ├── bump.wav
│       └── littlewood.mp3
│
└── README.md
```

---

## 🚀 HOW TO RUN THE PROJECT

### Option 1: Direct File Launch (No Server Required!)
Simply open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Brave):
1. Navigate to the extracted folder.
2. Double-click `index.html`.
3. All interactive features, sprites, audio synthesis, and Pokédex entries will function immediately.

### Option 2: Using a Local Web Server (Recommended for Best Performance)
Using Python (pre-installed on most systems):
```bash
# Inside the pokepixel folder
python -m http.server 8000
```
Then visit:
```
http://localhost:8000
```

Using Node.js:
```bash
npx serve pokepixel
```

---

## 📱 RESPONSIVE BREAKPOINTS

Optimized with pixel-art aesthetics across:
- **Ultra-Wide & Desktop**: 1536px+
- **Standard Laptop**: 1366px
- **Tablet**: 768px - 992px (Collapsible mobile navigation, multi-column flex grids)
- **Mobile Smartphone**: 390px - 420px (Touch-optimized targets, stacked cards)

---
*“Some adventures never end. They simply live on in pixels.”*
