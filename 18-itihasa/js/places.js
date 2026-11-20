/**
 * ITIHASA — SACRED PLACES & LEGENDARY WORLDS
 * js/places.js
 */

const SACRED_PLACES_DATA = [
  // RAMAYANA LOCATIONS
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    epic: 'Ramayana',
    region: 'Kosala Realm (Northern Bharat)',
    image: 'assets/images/places/ayodhya.webp',
    significance: 'Capital of the Solar Dynasty (Suryavansha) on the banks of the sacred Sarayu River.',
    desc: 'Founded by the solar monarch Manu and adorned with soaring towers, broad moats, and grand gateways, Ayodhya is revered as the birthplace of Lord Rama. Celebrated for its unassailable moral splendor, it was governed by righteous sovereigns like Raghu, Harishchandra, and Dasharatha, culminating in the golden era of Ramrajya.',
    lore: 'The city whose name translates to "Unto which war cannot be waged" — celebrated throughout Valmiki Ramayana as a city of harmony, learning, and Vedic chanting.',
    features: ['Sarayu River Embankments', 'Kanak Bhavan & Royal Palaces', 'Shirish Vana Gardens', 'Vedic Altars & Gateway Bastions']
  },
  {
    id: 'mithila',
    name: 'Mithila',
    epic: 'Ramayana',
    region: 'Videha Kingdom (Eastern Bharat)',
    image: 'assets/images/places/mithila.webp',
    desc: 'The ancient capital of King Janaka, known throughout the ancient world as the premier sanctuary of spiritual enlightenment and Vedic philosophy. Here, the sacred bow of Lord Shiva (Pinaka) was preserved, and Goddess Sita appeared in the sacred furrow of the ploughed earth.',
    lore: 'A land where kings like Janaka attained liberation while actively ruling (Rajarshi), symbolizing that supreme spiritual realization is fully compatible with royal duty.',
    features: ['Janakpur Royal Court', 'The Hall of Pinaka Bow', 'Lotus Ponds of Videha', 'Vedic Academy of Rishis']
  },
  {
    id: 'chitrakoot',
    name: 'Chitrakoot',
    epic: 'Ramayana',
    region: 'Vindhya Mountain Foothills',
    image: 'assets/images/places/chitrakoot.webp',
    desc: 'The enchanting forest haven where Rama, Sita, and Lakshmana spent their initial peaceful years of exile on the advice of Sage Bharadwaja. Nestled along the Mandakini River, Chitrakoot was the poignant meeting ground where Bharata came to place Rama’s Padukas on his head.',
    lore: 'Visited by Lord Brahma, Vishnu, and Shiva; home to the hermitage of Sage Atri and his pious wife Anasuya, who gifted Goddess Sita celestial divine garments that never soil.',
    features: ['Mandakini River Ghats', 'Kamadgiri Sacred Hill', 'Atri-Anasuya Hermitage', 'Sphatik Shila Rock']
  },
  {
    id: 'dandakaranya',
    name: 'Dandakaranya & Panchavati',
    epic: 'Ramayana',
    region: 'Godavari Basin & Central Forests',
    image: 'assets/images/places/panchavati.webp',
    desc: 'The vast, dense, primeval forest stretching across central India. At Panchavati on the banks of the Godavari (identified with five ancient banyan trees), Lakshmana built an idyllic bamboo hermitage (Parnashala) for Rama and Sita, where fateful events leading to Sita’s abduction unfolded.',
    lore: 'A sacred haven of austere ascetics constantly defended by Rama against rakshasa invasions, symbolizing the spiritual struggle against primal forces of chaos.',
    features: ['The Five Sacred Banyan Trees (Panchavati)', 'River Godavari Sacred Waters', 'Sage Agastya Hermitage', 'Lush Sal & Teak Canopy']
  },
  {
    id: 'kishkindha',
    name: 'Kishkindha',
    epic: 'Ramayana',
    region: 'Tungabhadra Valley (Near Hampi)',
    image: 'assets/images/places/kishkindha.webp',
    desc: 'The rugged granite kingdom of the Vanaras, characterized by boulder-strewn hills, cavernous palaces, and the scenic Pampa lake. Here on Mount Rishyamukha, Rama met Hanuman and forged the eternal covenant with King Sugriva.',
    lore: 'The natural bastion of the Vanaras, known for its caves, cascading springs, and the impassable fortress of Vali.',
    features: ['Rishyamukha Sacred Hill', 'Pampa Sarovar', 'Matanga Ashrama', 'Sugriva’s Cave']
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram & Rama Setu',
    epic: 'Ramayana',
    region: 'Southern Sea Shore (Tamil Realm)',
    image: 'assets/images/places/rameshwaram.webp',
    desc: 'The sacred land’s edge facing the southern ocean where Rama’s grand Vanara army assembled. Here, Lord Rama consecrated a Shiva Linga (Ramanathaswamy) of sand to seek blessings, and Nala supervised the construction of the legendary floating stone bridge to Lanka.',
    lore: 'The threshold where devotion conquered the untamed ocean, forever commemorated as one of the four supreme Char Dham pilgrimage destinations of Bharat.',
    features: ['Setu-Bandha Bridge Causeways', 'Dhanushkodi Ocean Confluence', 'Agni Theertham', 'Ramanathaswamy Consecration']
  },
  {
    id: 'lanka',
    name: 'Lanka',
    epic: 'Ramayana',
    region: 'Southern Island Realm',
    image: 'assets/images/places/lanka.webp',
    desc: 'The fabled island fortress built of solid gold and crystal upon the Trikuta mountain by celestial architect Vishvakarma. Ruled by the ten-headed King Ravana, Lanka was renowned for its soaring golden ramparts, lush Ashoka Vatika, and impenetrable defenses.',
    lore: 'Originally created for Kubera, Lanka symbolized the zenith of technological and architectural grandeur divorced from moral restraint.',
    features: ['Trikuta Peak Citadel', 'Ashoka Vatika Gardens', 'Ten Golden Gateways', 'Pushpaka Vimana Landing Courtyards']
  },

  // MAHABHARATA LOCATIONS
  {
    id: 'hastinapura',
    name: 'Hastinapura',
    epic: 'Mahabharata',
    region: 'Ganga Valley (Kuru Realm)',
    image: 'assets/images/locations/hastinapura.jpg',
    desc: 'The ancient capital city of the Bharatas, named "City of the Elephants." Situated on the high banks of the sacred Ganga, its magnificent sabhas witnessed the fateful moments of Indian epic history, including the game of dice and Krishna’s diplomatic peace mission.',
    lore: 'The throne of King Shantanu, Vichitravirya, Pandu, and Dhritarashtra, protected for generations by the mighty vow of Bhishma Pitamaha.',
    features: ['The Grand Kuru Sabha', 'Bhishma’s Palace & Armoury', 'Ganga Ghats & Gardens', 'The Royal Dice Pavilion']
  },
  {
    id: 'indraprastha',
    name: 'Indraprastha',
    epic: 'Mahabharata',
    region: 'Yamuna Valley (Modern Delhi Area)',
    image: 'assets/images/locations/indraprastha.jpg',
    desc: 'The magnificent capital founded by the five Pandavas after clearing the Khandava forest. Designed by divine architect Mayasura, its palace of illusions (Maya Sabha) was famed across Bharat for reflecting water that resembled solid crystal and floors that mimicked deep ponds.',
    lore: 'A testament to the visionary statecraft of Yudhishthira and Arjuna, where righteous governance and artistic brilliance reached their zenith.',
    features: ['The Maya Sabha of Optical Marvels', 'Yamuna River Waterfront', 'Towering Golden Ramparts', 'Seven Moats of Crystal Water']
  },
  {
    id: 'kurukshetra',
    name: 'Kurukshetra',
    epic: 'Mahabharata',
    region: 'Sarasvati Basin (Northern Plains)',
    image: 'assets/images/locations/kurukshetra.jpg',
    desc: 'Known as Dharmakshetra — the sacred field sanctified by ancient King Kuru through intense penance. Here, the eighteen-day war between Dharma and Adharma was fought, and Lord Krishna sang the Bhagavad Gita at Jyotisar under the immortal banyan tree.',
    lore: 'An ancient spiritual ground where righteous actions and sacrifices yield eternal spiritual merit, chosen specifically so warriors would fight with noble detachment.',
    features: ['Jyotisar (Site of Bhagavad Gita)', 'Brahma Sarovar', 'Sannihit Sarovar', 'Bhishma Shara-Shayya Grounds']
  },
  {
    id: 'dwarka',
    name: 'Dwarka',
    epic: 'Mahabharata',
    region: 'Western Saurashtra Coast',
    image: 'assets/images/locations/dwarka.jpg',
    desc: 'The golden island metropolis engineered by Vishvakarma for Lord Krishna and the Yadava clan on the western Arabian Sea. Accessible only by boat and defended by naval bastions, Dwarka was renowned for its resplendent marble palaces and marine trade.',
    lore: 'The golden marine citadel that stood for thirty-six years after the Kurukshetra war before submersion beneath the roaring ocean waves as foretold.',
    features: ['Dwarakadheesh Temple Sanctum', 'Gomti River Confluence', 'Submerged Marine Gateways', 'Sudama Setu & Hariti Gardens']
  },
  {
    id: 'mathura',
    name: 'Mathura',
    epic: 'Mahabharata',
    region: 'Yamuna Plains (Surasena Realm)',
    image: 'assets/images/locations/mathura.jpg',
    desc: 'The sacred city on the crescent of the holy Yamuna River, birthplace of Lord Krishna. Ruled originally by the tyrannical King Kamsa, it was liberated when young Krishna vanquished the tyrant in the royal arena.',
    lore: 'Celebrated across millennia as one of the seven holy cities (Sapta Puri) of Bharat that grant liberation to pilgrims.',
    features: ['Krishna Janmabhoomi Sanctum', 'Vishram Ghat on the Yamuna', 'Potra Kund', 'Ancient Yadava Fortifications']
  },
  {
    id: 'panchala',
    name: 'Panchala (Kampilya)',
    epic: 'Mahabharata',
    region: 'Central Gangetic Plains',
    image: 'assets/images/locations/panchala.jpg',
    desc: 'The powerful martial kingdom ruled by King Drupada, lifelong rival of Guru Drona. From its sacred fire altars arose Dhrishtadyumna and Princess Draupadi. Here, the legendary Swayamvara of Draupadi took place in a magnificent amphitheatre.',
    lore: 'A land of renowned Vedic scholars, formidable charioteers, and the birthplace of the fiery empress who reshaped the destiny of Bharat.',
    features: ['Yajna Altar Grounds of Drupada', 'The Swayamvara Archery Arena', 'Ganga Confluence Watchtowers', 'Royal Vedic Seminaries']
  }
];

function initPlacesPage() {
  const grid = document.getElementById('places-grid');
  const filterBtns = document.querySelectorAll('.places-filter-btn');

  if (!grid) return;

  let currentFilter = 'all';

  function renderPlaces() {
    grid.innerHTML = '';
    const filtered = SACRED_PLACES_DATA.filter(p => {
      if (currentFilter === 'all') return true;
      return p.epic.toLowerCase() === currentFilter;
    });

    filtered.forEach(place => {
      const card = document.createElement('div');
      card.className = 'card-ancient reveal shimmer-hover';
      card.innerHTML = `
        <div class="card-ancient-img-wrap landscape">
          <img src="${place.image}" alt="${place.name}" loading="lazy" onerror="if(window.ITIHASA_ASSETS) ITIHASA_ASSETS.handleImageError(this, '${place.name}');">
          <span class="card-badge ${place.epic === 'Mahabharata' ? 'badge-mahabharata' : ''}">${place.epic}</span>
        </div>
        <div class="card-ancient-body">
          <h3 class="card-title">${place.name}</h3>
          <p class="card-role">${place.region}</p>
          <p class="card-desc">${place.desc}</p>
          
          <div style="margin-top: 0.5rem; margin-bottom: 1.25rem;">
            <p style="font-size: 0.85rem; color: var(--color-temple-gold); margin-bottom: 0.3rem;">
              <strong>Key Landmarks:</strong>
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${place.features.map(f => `<span class="trait-tag" style="font-size:0.75rem; padding: 2px 6px;">${f}</span>`).join('')}
            </div>
          </div>

          <div class="card-footer">
            <button class="card-link-btn">
              Explore Geography & Lore
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (window.ItihasaModal) {
          window.ItihasaModal.open({
            epic: `${place.epic} Sacred Geography`,
            name: place.name,
            role: place.region,
            image: place.image,
            desc: `${place.desc}\n\n${place.lore}`,
            qualities: place.features,
            associated: place.significance
          });
        }
      });

      grid.appendChild(card);
    });

    setTimeout(() => {
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    }, 50);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderPlaces();
    });
  });

  renderPlaces();
}

document.addEventListener('DOMContentLoaded', initPlacesPage);
