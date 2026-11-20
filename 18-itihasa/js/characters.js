/**
 * ITIHASA — DIVINE CHARACTERS DATA & ENGINE
 * js/characters.js
 * 
 * Features authentic classical art, accurate Sanskrit titles,
 * contextual narrative lore, and responsive card rendering.
 */

const CHARACTERS_DATA = [
  // RAMAYANA CHARACTERS
  {
    id: 'ram',
    name: 'Lord Rama',
    sanskrit: 'श्री रामः',
    epic: 'Ramayana',
    category: ['divine', 'warrior', 'kings'],
    role: 'Maryada Purushottama — Seventh Avatara of Vishnu',
    image: 'assets/images/characters/ram.webp',
    desc: 'The supreme embodiment of Dharma, Lord Rama lived a life of unwavering truth, selfless duty, and supreme righteousness. Born as the eldest prince of Kosala, he willingly accepted fourteen years of forest exile to honor his father’s word, liberated the world from the tyranny of Ravana, and established the golden realm of Ramrajya.',
    qualities: ['Unwavering Dharma', 'Truthfulness (Satya)', 'Compassion (Karuna)', 'Master of Kodanda Bow', 'Magnanimity'],
    associated: 'Breaking Shiva’s Pinaka Bow, Forest Exile, Construction of Rama Setu, Slaying of Ravana, Coronation in Ayodhya.'
  },
  {
    id: 'sita',
    name: 'Goddess Sita',
    sanskrit: 'श्री सीता',
    epic: 'Ramayana',
    category: ['divine', 'kings'],
    role: 'Janaki — Divine Incarnation of Goddess Lakshmi',
    image: 'assets/images/characters/sita.webp',
    desc: 'Found in the sacred furrow of the earth by King Janaka of Mithila, Goddess Sita exemplifies divine fortitude, selfless love, unwavering fidelity, and moral grandeur. She chose forest hardship over royal luxury, retained pure devotion in Ravana’s Ashoka Vatika, and remains the eternal beacon of grace and feminine spiritual sovereignty.',
    qualities: ['Divine Grace', 'Immovable Fortitude', 'Spiritual Purity', 'Devotion to Dharma', 'Sacrifice'],
    associated: 'Swayamvara in Mithila, Voluntary Exile to Dandakaranya, Captivity in Ashoka Vatika, Agni Pariksha, Valmiki Ashrama.'
  },
  {
    id: 'lakshman',
    name: 'Lakshmana',
    sanskrit: 'लक्ष्मणः',
    epic: 'Ramayana',
    category: ['warrior', 'kings'],
    role: 'Saumitri — Incarnation of Sheshanaga & Loyal Brother',
    image: 'assets/images/characters/lakshman.webp',
    desc: 'The inseparable brother of Rama, Lakshmana renounced sleep and all comforts for fourteen years to stand guard over Rama and Sita in the forest. A fierce warrior of unmatched devotion, he defeated the invincible Meghanada (Indrajit) in Lanka through the power of his supreme celibacy and righteous vows.',
    qualities: ['Boundless Loyalty', 'Martial Mastery', 'Unflinching Vigilance', 'Brotherly Devotion', 'Selfless Service'],
    associated: 'Carving Hermitage in Panchavati, Defending Sita, Slaying of Indrajit, Revival with Sanjeevani Herb.'
  },
  {
    id: 'hanuman',
    name: 'Hanuman',
    sanskrit: 'श्री हनुमान्',
    epic: 'Ramayana',
    category: ['divine', 'warrior'],
    role: 'Mahavira — Rudra Avatara, Quintessence of Bhakti & Shakti',
    image: 'assets/images/characters/hanuman.webp',
    desc: 'The son of Vayu and Anjana, Hanuman is the immortal paragon of devotion, immense courage, and selfless service. Blessed with the eight celestial Siddhis, he leapt across the ocean to find Sita, set Lanka ablaze, brought the Sanjeevani mountain to save Lakshmana, and lives eternally where the sacred name of Rama is chanted.',
    qualities: ['Supreme Bhakti', 'Infinite Strength (Bala)', 'Profound Wisdom (Jnana)', 'Humility', 'Chiranjeevi (Immortal)'],
    associated: 'Leap across the Southern Sea, Finding Sita in Ashoka Vatika, Burning of Golden Lanka, Carrying Mount Dronagiri.'
  },
  {
    id: 'bharat',
    name: 'Bharata',
    sanskrit: 'भरतः',
    epic: 'Ramayana',
    category: ['kings'],
    role: 'Righteous Prince and Exemplar of Selflessness',
    image: 'assets/images/characters/bharat.webp',
    desc: 'Though offered the kingdom of Kosala through his mother Kaikeyi’s boons, Bharata refused the crown in anguish. He pursued Rama to Chitrakoot, placed Rama’s sacred wooden sandals (Padukas) on the royal throne of Ayodhya, and governed the empire as an ascetic regent living on the outskirts in Nandigrama.',
    qualities: ['Supreme Selflessness', 'Fraternal Love', 'Disdain for Unjust Power', 'Ascetic Discipline'],
    associated: 'Chitrakoot Meeting, Ruling Ayodhya with Rama’s Padukas, Vow of Self-Immolation if Rama delayed.'
  },
  {
    id: 'shatrughna',
    name: 'Shatrughna',
    sanskrit: 'शत्रुघ्नः',
    epic: 'Ramayana',
    category: ['warrior', 'kings'],
    role: 'Slayer of Enemies and Devoted Brother of Bharata',
    image: 'assets/images/characters/shatrughna.webp',
    desc: 'The fourth brother, twin to Lakshmana, Shatrughna served Bharata with total dedication while protecting Ayodhya during Rama’s exile. Later, he slew the formidable asura Lavanasura and established the kingdom of Mathura, ruling with justice and humility.',
    qualities: ['Silent Duty', 'Loyalty to Bharata', 'Valor in Battle', 'Humility'],
    associated: 'Subjugating Lavanasura, Founding the Realm of Madhupuri (Mathura).'
  },
  {
    id: 'dasharatha',
    name: 'King Dasharatha',
    sanskrit: 'महाराज दशरथः',
    epic: 'Ramayana',
    category: ['kings'],
    role: 'Illustrious Monarch of Kosala and Father of Rama',
    image: 'assets/images/characters/dasharatha.webp',
    desc: 'A noble ruler of the Suryavansha dynasty whose chariot could ride in ten directions. Bound by sacred promises made to Queen Kaikeyi, he endured the heartbreak of exiling his beloved son Rama, illustrating the ancient Indian ethic of honoring truth (Satya) even at the cost of life itself.',
    qualities: ['Unwavering Word', 'Paternal Love', 'Imperial Generosity', 'Chivalry'],
    associated: 'Putrakameshti Yajna, Shravana Kumara Episode, The Granting of Kaikeyi’s Two Boons.'
  },
  {
    id: 'kaushalya',
    name: 'Queen Kaushalya',
    sanskrit: 'महारानी कौशल्या',
    epic: 'Ramayana',
    category: ['kings'],
    role: 'Senior Queen of Ayodhya and Mother of Rama',
    image: 'assets/images/characters/kaushalya.webp',
    desc: 'A lady of serene grace and profound maternal piety, Queen Kaushalya accepted her son’s departure to the forest with stoic prayer and blessed him with the sacred words: "May the Dharma which you cherish with devotion protect you in the wilderness."',
    qualities: ['Maternal Piety', 'Patience', 'Quiet Grace', 'Devotion to Dharma'],
    associated: 'Birth of Rama, Maternal Benediction at Rama’s Exile, Re-union at the Coronation.'
  },
  {
    id: 'kaikeyi',
    name: 'Queen Kaikeyi',
    sanskrit: 'रानी कैकेयी',
    epic: 'Ramayana',
    category: ['kings', 'warrior'],
    role: 'Valiant Warrior Queen Caught in Destiny’s Crucible',
    image: 'assets/images/characters/kaikeyi.webp',
    desc: 'A heroic queen who once saved Dasharatha’s life on the battlefield of celestial conflicts. Manipulated by Manthara’s poisoned counsel, she demanded Rama’s exile and Bharata’s coronation, setting into motion the cosmic destiny of liberating the earth from demonic rule.',
    qualities: ['Battlefield Courage', 'Fierce Maternal Will', 'Destined Instrument of the Gods'],
    associated: 'Saving Dasharatha’s Chariot, Claiming the Two Boons, Bitter Repentance.'
  },
  {
    id: 'valmiki',
    name: 'Maharishi Valmiki',
    sanskrit: 'महर्षि वाल्मीकिः',
    epic: 'Ramayana',
    category: ['sages'],
    role: 'Adi Kavi — Composer of the Ramayana',
    image: 'assets/images/characters/valmiki.webp',
    desc: 'The revered sage who uttered the world’s first poetic shloka upon witnessing a hunter strike a bird. Commanded by Lord Brahma and instructed by Narada Muni, Valmiki composed the 24,000 verses of the Ramayana and later gave sacred sanctuary to Goddess Sita and tutored her sons Lava and Kusha.',
    qualities: ['Poetic Genius', 'Cosmic Vision', 'Sanctuary to the Afflicted', 'Spiritual Mastery'],
    associated: 'Invention of the Shloka Meter, Composition of Ramayana, Mentoring Lava and Kusha.'
  },
  {
    id: 'jatayu',
    name: 'Jatayu',
    sanskrit: 'भक्त जटायुः',
    epic: 'Ramayana',
    category: ['warrior', 'divine'],
    role: 'Noble King of the Vultures & Devotee of Dharma',
    image: 'assets/images/characters/jatayu.webp',
    desc: 'Though aging and outmatched, the heroic bird Jatayu fiercely fought Ravana in the sky to protect Goddess Sita from abduction. Mortally wounded, he survived solely to convey the vital message of Sita’s captor and direction to Rama, earning the supreme privilege of funeral rites performed by Rama himself.',
    qualities: ['Supreme Valour', 'Protection of the Innocent', 'Righteous Defiance', 'Self-Sacrifice'],
    associated: 'Aerial Duel with Ravana, Imparting vital clues to Rama and Lakshmana, Moksha by Rama.'
  },
  {
    id: 'sugriva',
    name: 'King Sugriva',
    sanskrit: 'वानरराज सुग्रीवः',
    epic: 'Ramayana',
    category: ['kings', 'warrior'],
    role: 'King of Kishkindha and Supreme Ally of Rama',
    image: 'assets/images/characters/sugriva.webp',
    desc: 'Exiled by his brother Vali, Sugriva struck an unbreakable friendship with Rama over sacred fire at Rishyamukha mountain. With his throne restored, he mobilized the vast Vanara legions to search the four quarters of the earth and laid siege to Lanka.',
    qualities: ['Sacred Friendship', 'Leadership of Vanaras', 'Courage in Battle', 'Fidelity to Vows'],
    associated: 'Alliance at Rishyamukha, Vanara Search Expedition, Battle of Lanka.'
  },
  {
    id: 'vibhishana',
    name: 'King Vibhishana',
    sanskrit: 'धर्मात्मा विभीषणः',
    epic: 'Ramayana',
    category: ['kings', 'divine'],
    role: 'Righteous Brother of Ravana & Crowned King of Lanka',
    image: 'assets/images/characters/vibhishana.webp',
    desc: 'Surrounded by the decadence of Ravana’s court, Vibhishana remained steadfastly rooted in Dharma. When his wise counsel to return Sita was rejected with insult, he sought shelter (Sharanagati) at Rama’s feet and was crowned the virtuous king of Lanka.',
    qualities: ['Adherence to Truth over Kinship', 'Sharanagati (Surrender to God)', 'Moral Clarity'],
    associated: 'Righteous Counsel in Ravana’s Sabha, Seeking Shelter with Rama, Coronation of Lanka.'
  },
  {
    id: 'ravana',
    name: 'King Ravana',
    sanskrit: 'दशानन रावणः',
    epic: 'Ramayana',
    category: ['kings', 'warrior'],
    role: 'Ten-Headed Sovereign of Lanka & Master of Vedas',
    image: 'assets/images/characters/ravana.webp',
    desc: 'A brilliant scholar, devout devotee of Shiva, and conqueror of the three worlds who composed the Shiva Tandava Stotram. Despite immense learning and ascetic penance, his uncontrolled ego, lust, and hubris led to the downfall of his entire golden empire.',
    qualities: ['Vedic Erudition', 'Unrivaled Penance', 'Architectural Mastery', 'Fatal Hubris'],
    associated: 'Shiva Tandava Stotram, Ten Celestial Crowns, Abduction of Sita, Final Battle with Rama.'
  },
  {
    id: 'indrajit',
    name: 'Indrajit (Meghanada)',
    sanskrit: 'मेघनाद इन्द्रजित्',
    epic: 'Ramayana',
    category: ['warrior'],
    role: 'Conqueror of Indra and Master of Celestial Astras',
    image: 'assets/images/characters/indrajit.webp',
    desc: 'The supreme warrior son of Ravana who defeated the King of Gods (Indra) and possessed all three ultimate weapons: Brahmastra, Vaishnavastra, and Pashupatastra. He could fight invisibly from behind the clouds and challenged the entire Vanara army.',
    qualities: ['Incomparable Illusion (Maya)', 'Mastery of Astras', 'Fierce Loyalty to Father'],
    associated: 'Defeating Indra in Svarga, Nagapasha Stun, Battle at Nikumbhila Yajna against Lakshmana.'
  },
  {
    id: 'kumbhakarna',
    name: 'Kumbhakarna',
    sanskrit: 'कुम्भकर्णः',
    epic: 'Ramayana',
    category: ['warrior'],
    role: 'Colossal Titan of Lanka and Loyal Brother',
    image: 'assets/images/characters/kumbhakarna.webp',
    desc: 'The giant younger brother of Ravana whose physical power shook mountains. Though he openly criticized Ravana’s abduction of Sita as adharma, his profound sense of family loyalty led him to fight bravely for his brother on the battlefield until felled by Rama.',
    qualities: ['Colossal Stature & Strength', 'Frank Moral Honesty', 'Tragic Loyalty'],
    associated: 'Awakening from Deep Sleep, Bold Truth Spoken to Ravana, Fall on Kurukshetra.'
  }
];

function initCharactersPage() {
  const grid = document.getElementById('characters-grid');
  const filterBtns = document.querySelectorAll('.character-filter-btn');
  const searchInput = document.getElementById('character-search');
  const countDisplay = document.getElementById('character-count');

  if (!grid) return;

  let currentFilter = 'all';
  let searchQuery = '';

  function renderCharacters() {
    grid.innerHTML = '';
    const filtered = CHARACTERS_DATA.filter(char => {
      let matchesCategory = false;
      if (currentFilter === 'all') matchesCategory = true;
      else if (currentFilter === 'ramayana') matchesCategory = char.epic.toLowerCase() === 'ramayana';
      else if (currentFilter === 'mahabharata') matchesCategory = char.epic.toLowerCase() === 'mahabharata';
      else matchesCategory = char.category.includes(currentFilter);

      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch = char.name.toLowerCase().includes(q) ||
                        (char.sanskrit && char.sanskrit.includes(searchQuery)) ||
                        char.role.toLowerCase().includes(q) ||
                        char.desc.toLowerCase().includes(q) ||
                        char.epic.toLowerCase().includes(q);
      }

      return matchesCategory && matchesSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${CHARACTERS_DATA.length} Legendary Figures`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.25rem; color: var(--text-ink-primary); font-family: var(--font-heading);">No figures match your search.</p>
          <p style="color: var(--text-ink-muted);">Try adjusting your search terms or filter selection.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(char => {
      const card = document.createElement('div');
      card.className = 'card-ancient reveal';
      card.innerHTML = `
        <div class="card-ancient-img-wrap">
          <img src="${char.image}" alt="${char.name}" loading="lazy" onerror="if(window.ITIHASA_ASSETS) ITIHASA_ASSETS.handleImageError(this, '${char.name}', '${char.sanskrit || 'श्री राम'}')">
          <span class="card-badge ${char.category.includes('divine') ? 'badge-divine' : ''}">${char.epic}</span>
        </div>
        <div class="card-ancient-body">
          <div class="card-sanskrit-tag">${char.sanskrit || ''}</div>
          <h3 class="card-title">${char.name}</h3>
          <p class="card-role">${char.role}</p>
          <p class="card-desc">${char.desc.substring(0, 140)}...</p>
          <div class="card-footer">
            <button class="card-link-btn" data-id="${char.id}">
              Explore Character
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.card-link-btn').addEventListener('click', () => {
        if (window.ItihasaModal) {
          window.ItihasaModal.open(char);
        }
      });

      card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-link-btn')) {
          if (window.ItihasaModal) {
            window.ItihasaModal.open(char);
          }
        }
      });

      grid.appendChild(card);
    });

    setTimeout(() => {
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    }, 40);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderCharacters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCharacters();
    });
  }

  renderCharacters();
}

document.addEventListener('DOMContentLoaded', initCharactersPage);
