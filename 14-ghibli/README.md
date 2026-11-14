# GHIBLI WORLDS — A Magical Studio Ghibli Universe

> *"Somewhere Between Dreams and Reality — Step into a world where forests whisper, spirits wander, and every little moment holds a touch of magic."*

A premium, visually immersive, fully responsive multi-page website capturing the magical atmosphere, lush environments, nostalgic emotions, mystical creatures, and storytelling aesthetics of **Studio Ghibli** movies.

Built entirely using pure **HTML5, CSS3, and Vanilla JavaScript** — without any external frameworks, libraries, or build dependencies.

---

## 🍃 Project Overview & Pages

The project consists of 5 interconnected pages, each maintaining a cohesive storybook visual identity:

1. **Home (`index.html`)**
   - **Hero Section**: Full-screen layered landscape with animated golden sunset, rolling green hills, floating clouds, forest spirit silhouettes, drifting leaves, and glowing fireflies.
   - **Featured Movies**: Interactive cards showcasing Studio Ghibli's greatest masterpieces with release years, Japanese titles, genres, and detail modals.
   - **Magical Quote Section**: Atmospheric cinematic quote carousel with inspirational quotes from Hayao Miyazaki and film characters.
   - **Meet the Spirits**: Character spotlight cards for Totoro, Catbus, Soot Sprites (Susuwatari), Kodama, No-Face, and Calcifer.
   - **Explore the Universe**: Visual portal cards leading into Enchanted Forests, Spirit Worlds, Floating Castles, and Coastal Towns.
   - **Footer**: Landscape silhouette, quick links, credits, and back-to-top navigation.

2. **Movies (`movies.html`)**
   - Cinematic chronicle of **16 Studio Ghibli films**.
   - Real-time instant search by English title, Japanese kanji/romaji, director, composer, and characters.
   - Category filtering (*All Films, Fantasy & Spirits, Adventure & Flight, Coming-of-Age, Hayao Miyazaki, Isao Takahata & Other Directors*).
   - Interactive movie detail modal with full synopsis, themes, quotes, cast, runtime, and directors.

3. **Characters (`characters.html`)**
   - Storybook character discovery featuring **18 beloved characters and mystical beings**.
   - Category filters (*All Entities, Forest Spirits & Deities, Human Wanderers, Sorcerers & Mystics, Familiars & Companions*).
   - Real-time search with instant results count.
   - Character detail modal featuring deep lore, archetypes, relationship webs, and iconic quotes.

4. **Magical Worlds (`worlds.html`)**
   - Dedicated landscape exploration of 6 legendary settings:
     1. *The Forest of Totoro* (Tokorozawa Countryside & Ancient Camphor Tree)
     2. *The Spirit World & Bathhouse* (Yubaba's Aburaya & The Sixth Station Ocean Railway)
     3. *The Wastes & Moving Castle* (Howl's Steampunk Citadel & Star Lake)
     4. *The Valley of the Wind & Toxic Jungle* (Windmills & Sea of Decay)
     5. *The Coastal Town of Koriko* (Gutiokipanja Bakery & Clock Tower)
     6. *Ponyo's Ocean & Devonian Sea* (Flooded Cliffs & Prehistoric Waters)
   - Interactive sanctuary landmarks, points of interest, and atmospheric sound triggers.

5. **About (`about.html`)**
   - Editorial-style essay on the philosophy of Studio Ghibli.
   - Explores the Japanese aesthetic of **"Ma" (間)** — the beauty of quiet pauses.
   - Four thematic pillars: *Ecological Reverence, Childhood Autonomy, The Miracle of Flight, and Sensory Warmth & Food*.
   - The legacy of hand-drawn cel painting with traditional Nicker poster colors.
   - Curated art gallery tapestry with hover descriptions.

---

## 🎨 Color Palette & Design Identity

Carefully balanced to avoid harsh shadows, neon gradients, or generic dashboard aesthetics:

- **Forest Green**: `#426B50` (Earthy deep foliage)
- **Sage Green**: `#A7B99A` (Soft morning moss & accents)
- **Cream**: `#F5EEDC` (Warm parchment background)
- **Warm Beige**: `#E8DCC3` (Storybook card tones)
- **Sky Blue**: `#A8C9DB` (Atmospheric horizons & mist)
- **Sunset Orange**: `#D99B69` (Golden-hour glow & Calcifer warmth)
- **Soft Brown**: `#80644D` (Organic timber & woodland pathways)
- **Deep Forest**: `#253D32` (Rich shadows & cinematic contrast)

### Typography
- Headings: `Cinzel` & `Cormorant Garamond` paired with `Noto Serif JP`
- Body: `Quicksand` (friendly, rounded, legible, storybook feel)

---

## ✨ Atmospheric Animations & Interactions

- **"Always with Me" (Flute Melody — Spirited Away)**:
  - Features the peaceful flute rendition of *"Always with Me"* (*Itsumo Nando Demo* / いつも何度でも) from *Spirited Away*.
  - Volume is controlled directly on the user's PC master volume, providing a clean and unobtrusive navbar experience.
  - Features smooth volume fade-in when starting and smooth fade-out when pausing.
  - Seamless looping playback (`loop = true`).
  - Toggle anytime via the audio button in the navigation bar.
- **Interactive Magic Canvas Particle System**:
  - Soft glowing fireflies with sinusoidal swaying.
  - Gently drifting sakura petals and forest leaves.
  - Magical sparkling golden dust trailing behind desktop mouse movements.
- **Scroll-Triggered Reveals**:
  - Smooth fade-up reveals powered by `IntersectionObserver`.
- **3D Card Hover Tilt**:
  - Realistic perspective tilt on cards when hovering with a mouse.
- **Accessibility**:
  - Fully supports `prefers-reduced-motion: reduce` by disabling particle systems, parallax, and heavy transforms.

---

## 📁 File Structure

```
GHIBLI-WORLDS/
│
├── index.html                   # Homepage: Hero, Featured Masterpieces, Spirits, Universe
├── movies.html                  # 16 Films with live search, filters & detail modal
├── characters.html              # 18 Characters with filters, search & lore modal
├── worlds.html                  # 6 Magical Worlds with environmental highlights
├── about.html                   # Editorial essay, philosophy of "Ma", & art gallery
│
├── css/
│   ├── style.css                # Core design system, parchment cards, typography, navigation
│   ├── animations.css           # Keyframes, floating clouds, firefly glow, reduced-motion
│   └── responsive.css           # Breakpoints for mobile (320px+), tablets, & laptops
│
├── js/
│   ├── main.js                  # Navigation, Web Audio soundscape, particle canvas
│   ├── movies.js                # Movie catalog, search filter engine, movie modal
│   ├── characters.js            # Character catalog, filter engine, character modal
│   └── interactions.js          # Quote carousel, 3D tilt hover, world sound triggers
│
├── assets/
│   ├── images/
│   │   ├── backgrounds/         # Hero landscapes, quote backgrounds, footer scenery
│   │   ├── movies/              # 16 High-res official stills for films
│   │   ├── characters/          # 18 High-res character portraits & scenes
│   │   └── worlds/              # 6 Panoramic world landscapes
│   │
│   └── icons/                   # Custom handcrafted SVGs (Totoro, Soot, Kodama, Calcifer, etc.)
│
└── README.md                    # Project documentation & instructions
```

---

## 🚀 How to Run the Website

The website is static and requires no build tools or package managers.

### Method 1: Direct File Opening
Extract the ZIP archive and simply double-click `index.html` to open it in any modern browser (Chrome, Firefox, Safari, Edge).

### Method 2: Local Web Server (Recommended)
Running through a local web server provides the smoothest audio context and font rendering:

```bash
# Using Python (built-in on macOS / Windows / Linux)
python -m http.server 8000

# Open in browser:
http://localhost:8000/
```

Or using Node.js:
```bash
npx serve .
```

---

## 📜 Credits & Fair Use Notice

This is a non-commercial educational fan tribute created in honor of Studio Ghibli, Hayao Miyazaki, Isao Takahata, Toshio Suzuki, and Joe Hisaishi.

Scene stills are sourced from the official Studio Ghibli release gallery under the studio's common sense fair use guidelines (*"常識の範囲でご自由にお使いください"*). All trademarks and character designs belong to Studio Ghibli, Tokuma Shoten, and Nippon Television Network.

