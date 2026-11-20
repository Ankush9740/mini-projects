# ITIHASA — THE ETERNAL STORIES OF BHARAT
## A Cinematic, Immersive Digital Universe of Ramayana & Mahabharata

> *"Where Dharma Lives Beyond Time."*

---

## ✦ Project Overview

**ITIHASA** is a breathtaking, premium-quality digital museum and storytelling experience celebrating the two greatest epics of Indian civilization: the **Ramayana** and the **Mahabharata**. Built entirely with standard **HTML5, CSS3, and Vanilla JavaScript**, it combines traditional Indian aesthetics, classical miniature art, temple architecture, sacred Devanagari calligraphy, celestial lighting, and authentic instrumental ragas.

Unlike generic religious blogs or modern corporate dashboards, ITIHASA transports visitors into an ancient epic sanctuary designed to convey grandeur, devotion, courage, sacrifice, righteousness, wisdom, love, and the eternal struggle between Dharma and Adharma.

---

## ✦ Architectural Structure

The website comprises seven interconnected pages, each with its own signature atmosphere, animations, and narrative focus:

1. **Home (`index.html`)**
   - **Hero Section**: Prominently features **Lord Rama and Goddess Sita** together in Dandakaranya at dawn, holding the Kodanda bow, with drifting lotus petals and a radiant divine aura.
   - **Two Great Epics Panels**: Dual cinematic portals for Ramayana (warm forest green & antique gold) and Mahabharata (midnight blue & celestial gold).
   - **The Spirit of the Epics**: Eight core values (Dharma, Devotion, Courage, Sacrifice, Loyalty, Wisdom, Justice, Compassion) with traditional icons.
   - **Iconic Moments**: Filterable gallery of legendary milestones from both epics, opening rich modal dialogs.
   - **Closing Section**: *"The Stories End. The Wisdom Remains."* with ancient temple backdrop and golden mandala.

2. **Ramayana (`ramayana.html`)**
   - **Path of Dharma**: Dedicated introduction to Maharishi Valmiki’s Adi Kavya and regional retellings (*Ramcharitmanas*, *Kamba Ramayanam*, etc.).
   - **The Seven Kandas Interactive Journey**: Complete sequential exploration of Bala, Ayodhya, Aranya, Kishkindha, Sundara, Yuddha, and Uttara Kandas with episode highlights and chapter navigation.
   - **Important Characters Gallery**: Detailed profiles of 16 key figures (Lord Rama, Sita, Lakshmana, Hanuman, Bharata, Shatrughna, Dasharatha, Kaushalya, Kaikeyi, Valmiki, Jatayu, Sugriva, Vibhishana, Ravana, Indrajit, Kumbhakarna).
   - **Legendary Events**: In-depth cards for Rama's Exile, Golden Deer, Sita's Abduction, Hanuman in Ashoka Vatika, Sanjeevani Mountain, Rama Setu, Battle with Ravana, and Return to Ayodhya.
   - **Sacred Realms Journey**: Map-styled sequential path from Ayodhya to Lanka.

3. **Mahabharata (`mahabharata.html`)**
   - **Hero Section**: Lord Krishna as Parthasarathi driving the white horses alongside Arjuna with the Gandiva bow on the battlefield of Kurukshetra.
   - **11-Chapter Storyline**: From King Shantanu and Bhishma’s vow to the aftermath and Mahaprasthana ascent.
   - **The Bhagavad Gita (Distinguished Special Section)**: Interactive shloka explorer with Sanskrit verses, English translations, and philosophical explanations across Karma Yoga, Bhakti Yoga, Jnana Yoga, and Dhyana Yoga.
   - **Kurukshetra War (18 Days)**: Interactive timeline across the four supreme commands (Bhishma, Dronacharya, Karna, Shalya/Duryodhana) with turning points and philosophical insights.
   - **Character Profiles**: Rich profiles of Krishna, the five Pandavas, Draupadi, Karna, Bhishma, Drona, Ashwatthama, Abhimanyu, Kunti, Gandhari, Vidura, and Duryodhana.

4. **Divine Characters (`characters.html`)**
   - An illustrated encyclopedia featuring **35+ legendary figures** from both epics.
   - Instant search bar and interactive category filters (All Characters, Ramayana, Mahabharata, Divine Figures, Warriors, Sages, Kings & Queens).
   - Clickable cards opening modal popups with lineage, virtues, key battles, and lore.

5. **Sacred Places & Legendary Worlds (`places.html`)**
   - Architectural and geographic exploration of ancient Bharat.
   - Detailed entries for **13 holy realms**: Ayodhya, Mithila, Chitrakoot, Dandakaranya, Kishkindha, Rameswaram, Lanka, Hastinapura, Indraprastha, Kurukshetra, Dwarka, Mathura, and Panchala.
   - Key architectural features and traditional lore presented respectfully.

6. **Teachings & Wisdom (`wisdom.html`)**
   - Ancient palm-leaf manuscript reading room.
   - Sourced Sanskrit verses with transliterations, translations, and philosophical commentaries across 7 ethical themes (Dharma, Courage, Devotion, Wisdom, Friendship, Leadership, Karma).

7. **About & Heritage (`about.html`)**
   - The vision behind ITIHASA, etymology of *Itihāsa*, artistic and musical pillars, literary lineage, and technical specifications.

---

## ✦ Audio Experience & Engine

The website includes a floating, dockable ambient music controller on every page (`js/music.js`):
- **Ramayana Theme (`assets/audio/ramayana/ramayana-theme.wav`)**: Serene, devotional, and uplifting atmosphere in *Raag Bhoopali* with bansuri flute melodies, a four-stringed tanpura drone, temple bells, and soft nature ambience.
- **Mahabharata Theme (`assets/audio/mahabharata/mahabharata-theme.wav`)**: Majestic, grand, and contemplative atmosphere in *Raag Darbari Kanada* featuring veena plucks, deep low-frequency tanpura drone in C, pakhawaj/mridangam drum cadences, and bronze gongs.
- **Temple Bell (`assets/audio/temple-bell.wav`)**: Interactive chime feedback on key selections.
- **Dual-Engine Architecture**: Employs HTML5 Audio elements with smooth cross-fading and automated fallback to Web Audio API procedural synthesis. Audio starts only after user interaction and preserves preferences across pages via `localStorage`.

---

## ✦ Authentic Visual Direction & Image Organization

The website features an authentic Indian art aesthetic grounded in classical masterpieces (Raja Ravi Varma lithographs, 17th-century Mewar Ramayana manuscripts, and verified heritage photography).

### Centralized Image Registry (`js/assets.js`)
All asset paths are managed centrally in `js/assets.js` with sensible, clean filenames:
- **Hero Artwork**: `assets/images/hero/rama-sita-hero.webp`
- **Character Cards**: `assets/images/characters/ram.webp`, `sita.webp`, `lakshman.webp`, `hanuman.webp`, `bharat.webp`, `dasharatha.webp`, `kaushalya.webp`, `kaikeyi.webp`, `valmiki.webp`, `jatayu.webp`, `sugriva.webp`, `vibhishana.webp`, `ravana.webp`, etc.
- **Seven Kandas**: `assets/images/kandas/bala-kanda.webp`, `ayodhya-kanda.webp`, `aranya-kanda.webp`, `kishkindha-kanda.webp`, `sundara-kanda.webp`, `yuddha-kanda.webp`, `uttara-kanda.webp`.
- **Milestone Events**: `assets/images/events/forest-exile.webp`, `golden-deer.webp`, `sita-abduction.webp`, `ashoka-vatika.webp`, `sanjeevani.webp`, `rama-setu.webp`, `ravana-vadha.webp`, `ayodhya-return.webp`.
- **Sacred Places**: `assets/images/places/ayodhya.webp`, `mithila.webp`, `chitrakoot.webp`, `panchavati.webp`, `kishkindha.webp`, `rameshwaram.webp`, `lanka.webp`.

### How to Add Your Own Images
When you wish to replace any image with your personal collection:
1. Place your `.webp` or `.jpg` file in the corresponding folder under `assets/images/`.
2. Keep the sensible filename (e.g., `ram.webp`, `sita.webp`, `hanuman.webp`) or update the mapping in `js/assets.js`.
3. If an image file is ever missing or fails to load, `ITIHASA_ASSETS.handleImageError()` automatically falls back first to a `.jpg` sibling and then to an elegant inline parchment SVG cartouche with Devanagari lettering, preventing broken image placeholders.

---

---

## ✦ Technical Highlights

- **Pure Vanilla Stack**: Zero frameworks (no React, Tailwind, Bootstrap, or backend servers needed).
- **Responsive Design**: Flawlessly adapts across Desktop (1536px), Laptop (1366px), Tablet (768px), and Mobile (390px).
- **Guaranteed Visibility**: Fallback architecture ensures that all content renders immediately if JavaScript is blocked or `IntersectionObserver` is unavailable.
- **Accessibility & Performance**: Honors `prefers-reduced-motion` and leverages lightweight vector SVGs and optimized imagery.

---

## ✦ How to Run Locally

You can run ITIHASA in two easy ways:

### Option 1: Direct File Opening
Simply extract `ITIHASA.zip` and double-click `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended for audio streaming)
Open a terminal in the project directory and run:

```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve .
```

Then visit: `http://localhost:8000`

---

## ✦ Dedicated to the Eternal Heritage of Bharat
*सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥*
