/**
 * ITIHASA — CENTRALIZED ASSET REGISTRY
 * js/assets.js
 * 
 * Centralized, easily maintainable image asset management.
 * All paths can be swapped or updated in this single location.
 * Provides automatic fallback handling for user-supplied images.
 */

const ITIHASA_ASSETS = {
  // HERO
  hero: {
    ramaSita: 'assets/images/hero/rama-sita-hero.webp',
    fallback: 'assets/images/hero/rama-sita-hero.jpg'
  },

  // CHARACTERS (Sensible filenames with clean aliases)
  characters: {
    ram: 'assets/images/characters/ram.webp',
    rama: 'assets/images/characters/ram.webp',
    sita: 'assets/images/characters/sita.webp',
    lakshman: 'assets/images/characters/lakshman.webp',
    lakshmana: 'assets/images/characters/lakshman.webp',
    hanuman: 'assets/images/characters/hanuman.webp',
    bharat: 'assets/images/characters/bharat.webp',
    bharata: 'assets/images/characters/bharat.webp',
    shatrughna: 'assets/images/characters/shatrughna.webp',
    dasharatha: 'assets/images/characters/dasharatha.webp',
    kaushalya: 'assets/images/characters/kaushalya.webp',
    kaikeyi: 'assets/images/characters/kaikeyi.webp',
    valmiki: 'assets/images/characters/valmiki.webp',
    jatayu: 'assets/images/characters/jatayu.webp',
    sugriva: 'assets/images/characters/sugriva.webp',
    vibhishana: 'assets/images/characters/vibhishana.webp',
    ravana: 'assets/images/characters/ravana.webp',
    indrajit: 'assets/images/characters/indrajit.webp',
    kumbhakarna: 'assets/images/characters/kumbhakarna.webp'
  },

  // SEVEN KANDAS
  kandas: {
    bala: 'assets/images/kandas/bala-kanda.webp',
    ayodhya: 'assets/images/kandas/ayodhya-kanda.webp',
    aranya: 'assets/images/kandas/aranya-kanda.webp',
    kishkindha: 'assets/images/kandas/kishkindha-kanda.webp',
    sundara: 'assets/images/kandas/sundara-kanda.webp',
    yuddha: 'assets/images/kandas/yuddha-kanda.webp',
    uttara: 'assets/images/kandas/uttara-kanda.webp'
  },

  // MILESTONE EVENTS
  events: {
    forestExile: 'assets/images/events/forest-exile.webp',
    goldenDeer: 'assets/images/events/golden-deer.webp',
    sitaAbduction: 'assets/images/events/sita-abduction.webp',
    ashokaVatika: 'assets/images/events/ashoka-vatika.webp',
    sanjeevani: 'assets/images/events/sanjeevani.webp',
    ramaSetu: 'assets/images/events/rama-setu.webp',
    ravanaVadha: 'assets/images/events/ravana-vadha.webp',
    ayodhyaReturn: 'assets/images/events/ayodhya-return.webp'
  },

  // SACRED PLACES
  places: {
    ayodhya: 'assets/images/places/ayodhya.webp',
    mithila: 'assets/images/places/mithila.webp',
    chitrakoot: 'assets/images/places/chitrakoot.webp',
    panchavati: 'assets/images/places/panchavati.webp',
    kishkindha: 'assets/images/places/kishkindha.webp',
    rameshwaram: 'assets/images/places/rameshwaram.webp',
    lanka: 'assets/images/places/lanka.webp'
  },

  /**
   * Helper to retrieve image path with automatic fallback
   * @param {string} category - 'characters' | 'kandas' | 'events' | 'places' | 'hero'
   * @param {string} key - asset key
   * @returns {string} resolved asset path
   */
  get(category, key) {
    if (this[category] && this[category][key]) {
      return this[category][key];
    }
    // Return sensible default if not found
    return `assets/images/${category}/${key}.webp`;
  },

  /**
   * Global image error handler to gracefully fallback to JPG or SVG placeholder
   * @param {HTMLImageElement} imgElement
   * @param {string} title
   * @param {string} sanskrit
   */
  handleImageError(imgElement, title = 'Ramayana', sanskrit = 'श्री राम') {
    const src = imgElement.src;
    if (src.endsWith('.webp')) {
      // Try JPG sibling first
      imgElement.src = src.replace('.webp', '.jpg');
    } else {
      // Inline elegant manuscript SVG placeholder
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
          <rect width="100%" height="100%" fill="#FAF6EE"/>
          <rect x="20" y="20" width="560" height="760" fill="none" stroke="#C29D52" stroke-width="1"/>
          <rect x="28" y="28" width="544" height="744" fill="none" stroke="#7D282D" stroke-width="2"/>
          <circle cx="300" cy="360" r="90" fill="none" stroke="#C29D52" stroke-width="1.5"/>
          <text x="300" y="375" font-family="serif" font-size="34" fill="#7D282D" text-anchor="middle">${sanskrit}</text>
          <text x="300" y="600" font-family="serif" font-size="24" letter-spacing="3" fill="#2C221E" text-anchor="middle">${title.toUpperCase()}</text>
          <text x="300" y="635" font-family="serif" font-size="14" font-style="italic" fill="#C29D52" text-anchor="middle">॥ रामायण महाकाव्यम् ॥</text>
        </svg>
      `;
      imgElement.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
  }
};

window.ITIHASA_ASSETS = ITIHASA_ASSETS;
