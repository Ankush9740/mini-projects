/**
 * GHIBLI WORLDS — Characters Page Controller & Database
 * Storybook Character Discovery, Categorization, Search & Detailed Modals
 */

const GHIBLI_CHARACTERS = [
  {
    id: 'totoro',
    name: 'Totoro',
    japaneseName: 'トトロ',
    film: 'My Neighbor Totoro',
    filmId: 'totoro',
    role: 'Ancient Forest Spirit',
    category: 'spirits',
    image: 'assets/images/characters/totoro.jpg',
    personality: 'Gentle, sleepy, benevolent, and deeply connected to the natural rhythm of ancient camphor trees.',
    lore: 'Totoro is the guardian spirit of the forest who has lived for over a thousand years. With his round belly, sharp claws that never scratch, and an ear-splitting roar that summons the rain, he remains unseen by cynical adult eyes, choosing instead to reveal his wonder to children whose hearts are open to innocence.',
    traits: ['Gentle Giant', 'Rain Lover', 'Forest King', 'Innocence Empath'],
    relationship: 'Beloved protector and silent companion to Mei and Satsuki Kusakabe.',
    quote: '"Roaaar! (Summoning the wind and sprouting giant camphor trees under the silver moon)"'
  },
  {
    id: 'chihiro',
    name: 'Chihiro Ogino (Sen)',
    japaneseName: '荻野 千尋 / 千',
    film: 'Spirited Away',
    filmId: 'spirited-away',
    role: 'Heroine & Bathhouse Apprentice',
    category: 'humans',
    image: 'assets/images/characters/chihiro.jpg',
    personality: 'Initially clumsy, petulant, and timid, Chihiro blossoms into an intensely empathetic, resolute, and courageous young girl.',
    lore: 'Trapped in the Spirit Realm after her parents are punished for gluttony, ten-year-old Chihiro strikes a bargain with the sorceress Yubaba to work at the bathhouse under the shortened name "Sen". Through sheer perseverance, unconditional kindness to grotesque patrons, and unyielding loyalty, she restores polluted deities and frees her family.',
    traits: ['Unyielding Kindness', 'Moral Integrity', 'Resilient Spirit', 'Quiet Courage'],
    relationship: 'Deep spiritual bond and mutual savior to the river deity Haku.',
    quote: '"I promise I’ll get you out of here, Mom and Dad. Just please don’t eat any more!"'
  },
  {
    id: 'haku',
    name: 'Haku (Kohaku River)',
    japaneseName: 'ハク / 賑早見琥珀主',
    film: 'Spirited Away',
    filmId: 'spirited-away',
    role: 'River Deity & Dragon Sorcerer',
    category: 'magical',
    image: 'assets/images/characters/haku.jpg',
    personality: 'Stoic, enigmatic, graceful, and fiercely protective of those he holds in his memory.',
    lore: 'Haku appears as a twelve-year-old boy in white kimono and silver dragon form. Originally the deity of the Kohaku River, he lost his home when humans paved it over for apartment complexes. Apprenticed to Yubaba to learn sorcery, he forgot his true name until Chihiro reminded him of their fateful childhood rescue in the stream.',
    traits: ['Dragon Shapeshifter', 'Sincere Protector', 'Ancient River Spirit', 'Graceful Magician'],
    relationship: 'Chihiro’s guardian and true friend, bonded through memory and gratitude.',
    quote: '"You mustn\'t look back, Chihiro, until you\'re out of the tunnel."'
  },
  {
    id: 'no-face',
    name: 'No-Face (Kaonashi)',
    japaneseName: 'カオナシ',
    film: 'Spirited Away',
    filmId: 'spirited-away',
    role: 'Wandering Masked Spirit',
    category: 'spirits',
    image: 'assets/images/characters/no-face.jpg',
    personality: 'Lonely, impressionable, longing for genuine human connection, mirror of surrounding desires.',
    lore: 'No-Face is a phantom entity who reflects the nature of whatever environment he enters. In the greedy bathhouse, he generates false gold to devour servants and gluttonous meals; alongside Chihiro\'s uncorrupted spirit, he turns serene and finds contentment spinning yarn in Zeniba\'s quiet cottage.',
    traits: ['Emotional Mirror', 'Solitary Wanderer', 'Metamorphic Being', 'Patience & Yearning'],
    relationship: 'Obsessively drawn to Chihiro’s purity, eventually finding domestic peace with Zeniba.',
    quote: '"I\'m lonely... I\'m so lonely... Won\'t you take my gold, Sen?"'
  },
  {
    id: 'howl',
    name: 'Howl Jenkins Pendragon',
    japaneseName: 'ハウル',
    film: "Howl's Moving Castle",
    filmId: 'howls-moving-castle',
    role: 'Prodigious Sorcerer',
    category: 'magical',
    image: 'assets/images/characters/howl.jpg',
    personality: 'Flamboyant, vain, charismatic, dramatically theatrical, yet hiding deep self-loathing and pacifist bravery.',
    lore: 'Howl was an exceptionally gifted young wizard who swallowed a falling star, forming a Faustian bargain with the fire demon Calcifer to surrender his heart for magical supremacy. As war erupts, he risks his humanity flying monstrous winged sorties to sabotage warships, until Sophie’s unconditional acceptance grounds him.',
    traits: ['Bird Shapeshifter', 'Charismatic Milliner Refuge', 'Complex Romantic', 'Anti-War Hero'],
    relationship: 'Beloved partner to Sophie Hatter; bonded in magical servitude to Calcifer.',
    quote: '"I\'ve got such a terrible headache... I see no point in living if I can\'t be beautiful."'
  },
  {
    id: 'sophie',
    name: 'Sophie Hatter',
    japaneseName: 'ソフィー・ハッター',
    film: "Howl's Moving Castle",
    filmId: 'howls-moving-castle',
    role: 'Milliner & Heart Healer',
    category: 'humans',
    image: 'assets/images/characters/sophie.jpg',
    personality: 'Practical, self-deprecating, deeply nurturing, stubborn, and fearless when defending loved ones.',
    lore: 'Believing herself plain compared to her sister Lettie, eighteen-year-old Sophie spent her days making hats until cursed into an elderly woman by the jealous Witch of the Waste. Liberated from vanity and youthful hesitation, "Granny Sophie" barges into Howl’s walking castle and tames demons, wizards, and war machines alike.',
    traits: ['Matronly Fearlessness', 'Unshakable Loyalty', 'Secret Magic of Will', 'Heart Healer'],
    relationship: 'Howl’s savior and moral anchor; caring caregiver to Calcifer and Markl.',
    quote: '"A heart\'s a heavy burden, but the best blaze burns brightest in the darkest night."'
  },
  {
    id: 'calcifer',
    name: 'Calcifer',
    japaneseName: 'カルシファー',
    film: "Howl's Moving Castle",
    filmId: 'howls-moving-castle',
    role: 'Fallen Star & Hearth Demon',
    category: 'spirits',
    image: 'assets/images/characters/calcifer.jpg',
    personality: 'Feisty, temperamental, dramatic, greedy for eggshells and bacon, with a soft spark beneath his flame.',
    lore: 'Calcifer is a fallen shooting star saved from fading by Howl in their youth. In return, Calcifer powers the locomotive legs, hot water heaters, and teleportation dials of Howl\'s walking castle. He bickers endlessly with Sophie but is won over by her cleaning and delicious fireplace treats.',
    traits: ['Fire Generator', 'Castle Engine', 'Fallen Meteorite', 'Eggshell Gourmand'],
    relationship: 'Keeper of Howl\'s physical heart; affectionate comrade to Sophie.',
    quote: '"May all your bacon burn! I\'m a scary and powerful fire demon!"'
  },
  {
    id: 'kiki',
    name: 'Kiki',
    japaneseName: 'キキ',
    film: "Kiki's Delivery Service",
    filmId: 'kikis-delivery-service',
    role: 'Young Witch & Courier',
    category: 'humans',
    image: 'assets/images/characters/kiki.jpg',
    personality: 'Optimistic, earnest, vulnerable, independent, and determined to carve her own path in the world.',
    lore: 'At thirteen, Kiki leaves her sheltered countryside home with a radio and broom to complete her traditional year of independent witch training. Settling in Koriko, she creates a flying delivery service. When self-doubt robs her of her ability to fly and speak with Jiji, she learns that inspiration cannot be forced—it must be nurtured.',
    traits: ['Broom Pilot', 'Independent Artisan', 'Persevering Spirit', 'Gentle Heart'],
    relationship: 'Inseparable companion to black cat Jiji; supportive friend to aviation enthusiast Tombo.',
    quote: '"We each need to find our own inspiration, Kiki. Sometimes it’s not easy, but we will fly again."'
  },
  {
    id: 'jiji',
    name: 'Jiji',
    japaneseName: 'ジジ',
    film: "Kiki's Delivery Service",
    filmId: 'kikis-delivery-service',
    role: 'Sarcastic Familiar & Cat',
    category: 'animals',
    image: 'assets/images/characters/jiji.jpg',
    personality: 'Cynical, witty, cautious, loyal, with a weakness for white Persian cats and freshly baked bread.',
    lore: 'Jiji was born on the same day as Kiki and served as her lifelong voice of reason and inner confidant. His dry commentary contrasts with Kiki\'s youthful enthusiasm. As Kiki matures and finds her place in the wider community, Jiji finds love with Lily and transitions into an ordinary, contented feline.',
    traits: ['Talking Familiar', 'Dry Wit', 'Cautious Advisor', 'Romantic at Heart'],
    relationship: 'Kiki’s closest childhood companion and comedic confidant.',
    quote: '"If you can\'t fly, you can\'t deliver. And if you can\'t deliver, how are we going to buy pancakes?"'
  },
  {
    id: 'san',
    name: 'San (Princess Mononoke)',
    japaneseName: 'サン / もののけ姫',
    film: 'Princess Mononoke',
    filmId: 'princess-mononoke',
    role: 'Wolf Princess & Forest Defender',
    category: 'humans',
    image: 'assets/images/characters/san.jpg',
    personality: 'Fierce, unyielding, primal, devoted to her wolf pack, distrusting of humanity but capable of deep compassion.',
    lore: 'Abandoned in the forest as an infant by fleeing humans, San was adopted and raised by the giant white wolf goddess Moro as her own daughter. Wearing a clay mask and riding into battle with bone daggers, she fights to protect the Forest Spirit from human guns, until Ashitaka’s unconditional sacrifice touches her human heart.',
    traits: ['Wolf Pack Warrior', 'Masked Fighter', 'Forest Guardian', 'Primal Honor'],
    relationship: 'Adoptive daughter to Moro; kindred soul to Prince Ashitaka.',
    quote: '"I like you, Ashitaka, but I cannot forgive the humans for what they have done to the trees."'
  },
  {
    id: 'ashitaka',
    name: 'Prince Ashitaka',
    japaneseName: 'アシタカ',
    film: 'Princess Mononoke',
    filmId: 'princess-mononoke',
    role: 'Emishi Prince & Peacemaker',
    category: 'humans',
    image: 'assets/images/characters/ashitaka.jpg',
    personality: 'Noble, composed, fearless, deeply moral, seeking harmony and seeing with eyes unclouded by hate.',
    lore: 'The last prince of the exiled Emishi tribe, Ashitaka is cursed with a rotting demonic bruise that grants him supernatural archery strength while slowly consuming his life. Exiled into the western mountains, he refuses to take sides between Lady Eboshi\'s iron workers and the forest gods, standing alone as an arbiter of peace.',
    traits: ['Master Archer', 'Unclouded Vision', 'Cursed Strength', 'Moral Arbiter'],
    relationship: 'Devoted friend and protector to San; rider of red elk Yakul.',
    quote: '"To see with eyes unclouded by hate, and find a way for both the forest and man to survive."'
  },
  {
    id: 'ponyo',
    name: 'Ponyo (Brunhilde)',
    japaneseName: 'ポニョ / ブリュンヒルデ',
    film: 'Ponyo',
    filmId: 'ponyo',
    role: 'Sea Spirit Princess',
    category: 'magical',
    image: 'assets/images/characters/ponyo.jpg',
    personality: 'Irrepressibly joyful, enthusiastic, curious, loving, and boundless as an ocean wave.',
    lore: 'Daughter of the human sorcerer Fujimoto and the sublime ocean goddess Granmamare, Brunhilde longs for life above the tides. After tasting human blood and ham, she wills herself into a red-haired little girl, sprint-running atop giant ocean tsunamis to rejoin the five-year-old boy Sosuke who promised to protect her.',
    traits: ['Tidal Runner', 'Ham Devourer', 'Ocean Shape-Shifter', 'Pure Joy'],
    relationship: 'Soul companion to Sosuke; daughter to ocean queen Granmamare.',
    quote: '"Ponyo loves Sosuke! I want to have feet, and run, and eat warm ham!"'
  },
  {
    id: 'catbus',
    name: 'Catbus (Nekobasu)',
    japaneseName: 'ネコバス',
    film: 'My Neighbor Totoro',
    filmId: 'totoro',
    role: 'Spectral Transporter',
    category: 'spirits',
    image: 'assets/images/characters/catbus.jpg',
    personality: 'Grinning, energetic, loyal, agile, sprinting silently over power lines and rice paddies.',
    lore: 'Catbus is a mystical twelve-legged feline entity whose hollow fur body serves as a comfortable, living transport. With mouse-head taillights, eyes that cast twin beams of lantern light, and destination roller signs that magically spell out places like "Mei" or "Shichikokuyama Hospital", he moves faster than the wind without rustling a leaf.',
    traits: ['Twelve-Legged Runner', 'Cheshire Smile', 'Lantern Eyes', 'Whispering Wind Speed'],
    relationship: 'Faithful steed and forest ally to Totoro and the Kusakabe girls.',
    quote: '"Destination: MEI! (Gliding across electric telephone wires beneath the moonlight)"'
  },
  {
    id: 'kodama',
    name: 'Kodama',
    japaneseName: 'コダマ (木霊)',
    film: 'Princess Mononoke',
    filmId: 'princess-mononoke',
    role: 'Tree Spirits of Ancient Moss',
    category: 'spirits',
    image: 'assets/images/characters/kodama.jpg',
    personality: 'Curious, peaceful, childlike, rattling their heads in rhythmic harmony to signal the presence of a healthy forest.',
    lore: 'Kodama are miniature, semi-translucent tree spirits with bobbing heads and round hollow eyes who inhabit pristine primeval canopies. Their presence is proof that a woodland is sacred and healthy. When they rattle their skulls in clicking unison, it signals the arrival of the great Shishigami (Forest Spirit).',
    traits: ['Clicking Rattle', 'Indicator of Forest Health', 'Gentle Observers', 'Translucent Souls'],
    relationship: 'Sentinels of the Forest Spirit’s sacred pool.',
    quote: '"*Click-clack-click-clack* (A chorus of gentle head rattles echoing through emerald moss)"'
  },
  {
    id: 'soot-sprites',
    name: 'Soot Sprites (Susuwatari)',
    japaneseName: 'ススワタリ',
    film: 'My Neighbor Totoro & Spirited Away',
    filmId: 'totoro',
    role: 'Dust Spirits & Coal Stakers',
    category: 'spirits',
    image: 'assets/images/characters/soot-sprites.jpg',
    personality: 'Shy, scurrying, easily startled, hard-working, obsessed with colorful star-shaped sugar candies (Konpeito).',
    lore: 'Susuwatari are small, fuzzy black soot spirits that inhabit dark corners of deserted country homes. In Spirited Away, they serve as the industrious coal-stoking labor force of Kamaji\'s boiler room, lifting coal blocks ten times their weight and dropping them instantly whenever someone drops tasty pink and yellow sugar crystals.',
    traits: ['Fuzzy Coal Haulers', 'Sugar Candy Lovers', 'Scurrying Shadows', 'Curious Eyes'],
    relationship: 'Helpers to boiler master Kamaji; friends to Chihiro and Mei.',
    quote: '"*Scurry-scurry-squeak!* (Dropping heavy coal into the boiler fires for sweet Konpeito candies)"'
  },
  {
    id: 'nausicaa',
    name: 'Princess Nausicaä',
    japaneseName: 'ナウシカ',
    film: 'Nausicaä of the Valley of the Wind',
    filmId: 'nausicaa',
    role: 'Wind Rider & Messiah',
    category: 'humans',
    image: 'assets/images/characters/nausicaa.jpg',
    personality: 'Wise beyond her years, deeply compassionate, intrepid glider pilot, empathetic to all living forms.',
    lore: 'Princess of the Valley of the Wind, Nausicaä possesses an uncanny spiritual connection to the giant Ohm insects of the Toxic Jungle. Riding her jet-assisted glider "Mehve" across thermal drafts, she discovers that the jungle is actually purifying humankind’s ancient pollution, sacrificing herself to stop war and turning the prophecy of the blue-robed savior into truth.',
    traits: ['Glider Aviator', 'Ohm Empath', 'Scientific Mind', 'Messianic Peacemaker'],
    relationship: 'Beloved daughter of King Jihl; companion to fox-squirrel Teto.',
    quote: '"The trees are dying to purify the earth for us. How can we ever hate what heals the world?"'
  },
  {
    id: 'porco',
    name: 'Porco Rosso (Marco Pagot)',
    japaneseName: 'ポルコ・ロッソ / マルコ',
    film: 'Porco Rosso',
    filmId: 'porco-rosso',
    role: 'Seaplane Ace & Bounty Hunter',
    category: 'humans',
    image: 'assets/images/characters/porco.jpg',
    personality: 'Gruff, cynical, worldly, gentlemanly, fiercely anti-fascist, harboring a wounded heart.',
    lore: 'A decorated Italian flying ace from World War I, Marco was miraculously spared when his squadron perished in battle, yet was transformed into a pig by his own survivor guilt and disgust with rising militarism. Now operating a scarlet Savoia seaplane from a secluded Adriatic cove, he shoots down air pirates for bounty while drinking wine at Gina’s hotel.',
    traits: ['Crimson Monoplane Pilot', 'Gentleman Bounty Hunter', 'Wounded Cynic', 'Adriatic Legend'],
    relationship: 'Lifelong soulmate to Madame Gina; protective mentor to young aircraft engineer Fio.',
    quote: '"A pig that doesn\'t fly is just an ordinary pig."'
  },
  {
    id: 'baron',
    name: 'Baron Humbert von Gikkingen',
    japaneseName: 'フンベルト・フォン・ジッキンゲン男爵',
    film: 'Whisper of the Heart & The Cat Returns',
    filmId: 'the-cat-returns',
    role: 'Gentleman Cat Aristocrat',
    category: 'magical',
    image: 'assets/images/characters/baron.jpg',
    personality: 'Polished, gallant, chivalrous, perceptive, master swordsman, dressed in an immaculate cream three-piece suit.',
    lore: 'Created in Germany as an artisan feline statuette with green emerald eyes that capture sunlight, the Baron is animated into a living gentleman within the secret Cat Bureau. Armed with a cane that conceals a fencing blade and an unshakeable code of honor, he helps young dreamers find confidence and break free from gilded cages.',
    traits: ['Emerald Eyed Statuette', 'Master Fencer', 'Chivalrous Gentleman', 'Dream Mentor'],
    relationship: 'Inspiration to novelist Shizuku; gallant protector to schoolgirl Haru.',
    quote: '"Always believe in yourself. Do this and no matter where you are, you will have nothing to fear."'
  }
];

// =========================================================================
// CHARACTERS PAGE CONTROLLER
// =========================================================================
function initCharactersPage() {
  const charactersGrid = document.getElementById('characters-grid');
  const searchInput = document.getElementById('character-search');
  const clearSearchBtn = document.getElementById('clear-character-search');
  const filterBtns = document.querySelectorAll('.character-filter-btn');
  const countIndicator = document.getElementById('characters-count');
  const modalBackdrop = document.getElementById('character-modal');

  // Featured spirit cards on Homepage "Meet the Spirits"
  const homeSpiritsGrid = document.getElementById('home-spirits-grid');
  if (homeSpiritsGrid) {
    const featuredSpirits = GHIBLI_CHARACTERS.filter(c => ['totoro', 'catbus', 'soot-sprites', 'kodama', 'no-face', 'calcifer'].includes(c.id));
    homeSpiritsGrid.innerHTML = featuredSpirits.map(createSpiritCardHTML).join('');
    attachSpiritClickListeners(homeSpiritsGrid);
    if (window.initScrollReveals) {
      window.initScrollReveals();
    } else {
      homeSpiritsGrid.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('in-view'));
    }
  }

  // Full Characters Page
  if (charactersGrid) {
    let currentFilter = 'all';
    let currentSearch = '';

    function renderCharacters() {
      const filtered = GHIBLI_CHARACTERS.filter((char) => {
        const matchesCategory = currentFilter === 'all' || 
          char.category === currentFilter || 
          (currentFilter === 'spirits' && ['spirits', 'magical'].includes(char.category));
        
        const searchTarget = `${char.name} ${char.japaneseName} ${char.film} ${char.role} ${char.traits.join(' ')}`.toLowerCase();
        const matchesSearch = !currentSearch || searchTarget.includes(currentSearch);
        return matchesCategory && matchesSearch;
      });

      if (countIndicator) {
        countIndicator.textContent = `Showing ${filtered.length} of ${GHIBLI_CHARACTERS.length} characters`;
      }

      if (filtered.length === 0) {
        charactersGrid.innerHTML = `
          <div class="empty-state">
            <svg class="empty-state-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              <circle cx="32" cy="32" r="28" stroke-width="2"/>
              <path d="M22 28C22 28 26 34 32 34C38 34 42 28 42 28" stroke-width="2" stroke-linecap="round"/>
              <circle cx="24" cy="22" r="3" fill="currentColor"/>
              <circle cx="40" cy="22" r="3" fill="currentColor"/>
            </svg>
            <h3 class="empty-state-title">No Spirits Found in this Clearing</h3>
            <p class="empty-state-desc">Try searching for another name like "Totoro", "Haku", or "Kiki".</p>
            <button class="btn btn-secondary btn-pill" id="reset-char-filters">Reset Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-char-filters');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            currentFilter = 'all';
            currentSearch = '';
            if (searchInput) searchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
            renderCharacters();
          });
        }
        return;
      }

      charactersGrid.innerHTML = filtered.map(createCharacterCardHTML).join('');
      attachCharacterClickListeners(charactersGrid);
      if (window.initScrollReveals) {
        window.initScrollReveals();
      } else {
        charactersGrid.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('in-view'));
      }
    }

    // Filter Buttons
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter || 'all';
        renderCharacters();
      });
    });

    // Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim().toLowerCase();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = currentSearch ? 'block' : 'none';
        }
        renderCharacters();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentSearch = '';
        clearSearchBtn.style.display = 'none';
        renderCharacters();
      });
    }

    renderCharacters();
  }

  // Spirit Card for Homepage
  function createSpiritCardHTML(spirit) {
    return `
      <article class="spirit-card reveal-on-scroll" data-id="${spirit.id}" tabindex="0" role="button" aria-label="Learn about ${spirit.name}">
        <div class="spirit-avatar-wrapper">
          <img src="${spirit.image}" alt="${spirit.name}" class="spirit-avatar" loading="lazy">
        </div>
        <h3 class="spirit-name font-serif">${spirit.name}</h3>
        <span class="spirit-role">${spirit.role}</span>
        <p class="spirit-desc">${spirit.personality}</p>
      </article>
    `;
  }

  // Full Character Card for Characters Page
  function createCharacterCardHTML(char) {
    return `
      <article class="character-card reveal-on-scroll" data-id="${char.id}" tabindex="0" role="button" aria-label="View lore for ${char.name}">
        <div class="character-thumb-wrapper">
          <img src="${char.image}" alt="${char.name}" class="character-thumb" loading="lazy">
          <span class="character-movie-tag">${char.film}</span>
        </div>
        <div class="character-card-body">
          <div class="character-names">
            <span class="character-jp-name">${char.japaneseName}</span>
            <h3 class="character-name font-serif">${char.name}</h3>
          </div>
          <span class="character-role">${char.role}</span>
          <p class="character-desc">${char.personality}</p>
          <div class="character-quote-snippet">${char.quote}</div>
          <div class="character-card-footer">
            <span class="movie-card-btn">
              View Lore 
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </article>
    `;
  }

  // Attach click listeners for homepage spirits
  function attachSpiritClickListeners(container) {
    const cards = container.querySelectorAll('.spirit-card');
    cards.forEach((card) => {
      const char = GHIBLI_CHARACTERS.find(c => c.id === card.dataset.id);
      if (char) {
        card.addEventListener('click', () => openCharacterModal(char));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCharacterModal(char);
          }
        });
      }
    });
  }

  // Attach click listeners for characters page
  function attachCharacterClickListeners(container) {
    const cards = container.querySelectorAll('.character-card');
    cards.forEach((card) => {
      const char = GHIBLI_CHARACTERS.find(c => c.id === card.dataset.id);
      if (char) {
        card.addEventListener('click', () => openCharacterModal(char));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCharacterModal(char);
          }
        });
      }
    });
  }

  // Character Detail Modal
  function openCharacterModal(char) {
    if (!modalBackdrop) return;
    const modalContent = modalBackdrop.querySelector('.modal-container');
    if (!modalContent) return;

    modalContent.innerHTML = `
      <button class="modal-close-btn" id="char-modal-close" aria-label="Close modal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
          <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="modal-hero-artwork">
        <img src="${char.image}" alt="${char.name}" class="modal-artwork-img">
        <div class="modal-hero-gradient"></div>
        <div class="modal-hero-meta">
          <div class="modal-hero-jp-title">${char.japaneseName}</div>
          <h2 class="modal-hero-title">${char.name}</h2>
        </div>
      </div>

      <div class="modal-content-body">
        <div class="modal-badges-row">
          <span class="modal-badge">${char.film}</span>
          <span class="modal-badge" style="background: rgba(217, 155, 105, 0.15); color: #B36830;">${char.role}</span>
        </div>

        <div class="modal-meta-grid">
          <div>
            <div class="modal-meta-item-label">Archetype & Traits</div>
            <div class="modal-meta-item-value">${char.traits.join(', ')}</div>
          </div>
          <div>
            <div class="modal-meta-item-label">Key Connection</div>
            <div class="modal-meta-item-value">${char.relationship}</div>
          </div>
        </div>

        <div class="modal-synopsis-section">
          <h3 class="modal-section-heading font-serif">Character Lore & Essence</h3>
          <p class="modal-synopsis-text">${char.lore}</p>
        </div>

        <div class="modal-quote-box">
          ${char.quote}
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('char-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCharacterModal);
      closeBtn.focus();
    }
  }

  function closeCharacterModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalBackdrop && !modalBackdrop._hasModalListener) {
    modalBackdrop._hasModalListener = true;
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeCharacterModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeCharacterModal();
      }
    });
  }

  window.openCharacterModalById = function(id) {
    const char = GHIBLI_CHARACTERS.find(c => c.id === id);
    if (char) openCharacterModal(char);
  };
}

window.initCharactersPage = initCharactersPage;
document.addEventListener('DOMContentLoaded', initCharactersPage);

