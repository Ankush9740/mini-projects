/**
 * GHIBLI WORLDS — Movies Page Controller & Database
 * Interactive Discovery, Search, Categorization & Cinematic Modal
 */

const GHIBLI_MOVIES = [
  {
    id: 'totoro',
    title: 'My Neighbor Totoro',
    originalTitle: 'となりのトトロ',
    romaji: 'Tonari no Totoro',
    year: 1988,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '86 minutes',
    genres: ['Fantasy', 'Family', 'Nature'],
    categories: ['all', 'fantasy', 'miyazaki', 'coming-of-age'],
    image: 'assets/images/movies/totoro.jpg',
    shortDesc: 'Two young sisters move to the countryside to be near their ailing mother and discover their new home is shared with gentle, mystical forest spirits.',
    synopsis: 'When eleven-year-old Satsuki and her spirited four-year-old sister Mei move into a charmingly weathered rural house with their professor father, they uncover an enchanted grove dominated by a colossal ancient camphor tree. Soon Mei stumbles into the hollow roots and meets Totoro—a colossal, benevolent forest king with an unforgettable roar. Together with the magical multi-legged Catbus, the sisters embark on night-time tree-growing rites and discover courage in the face of family hardship.',
    characters: ['Totoro', 'Satsuki Kusakabe', 'Mei Kusakabe', 'Catbus', 'Tatsuo Kusakabe', 'Kanta'],
    quote: '"Trees and people used to be good friends. I saw that tree and decided to buy the house."',
    themes: ['Harmony with Nature', 'Childhood Innocence', 'Family Bonds', 'Pastoral Peace']
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    originalTitle: '千と千尋の神隠し',
    romaji: 'Sen to Chihiro no Kamikakushi',
    year: 2001,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '125 minutes',
    genres: ['Fantasy', 'Adventure', 'Mystery'],
    categories: ['all', 'fantasy', 'miyazaki', 'coming-of-age'],
    image: 'assets/images/movies/spirited-away.jpg',
    shortDesc: 'A sullen ten-year-old girl wanders into an abandoned amusement park ruled by spirits, where she must find the courage to free her transformed parents.',
    synopsis: 'During a move to the suburbs, Chihiro and her parents wander through an eerie tunnel into what appears to be an abandoned theme park. As twilight falls, the lanterns ignite and phantom spirits arrive across the water to soak at the lavish bathhouse of the sorceress Yubaba. After her parents are turned into pigs, Chihiro must sign away part of her name to become "Sen", taking a job scrubbing bathtubs alongside a mysterious boy named Haku to reclaim her identity and escape.',
    characters: ['Chihiro Ogino / Sen', 'Haku / River Spirit', 'No-Face (Kaonashi)', 'Yubaba', 'Kamaji', 'Lin', 'Zeniba'],
    quote: '"Once you\'ve met someone you never really forget them. It just takes a while for your memories to return."',
    themes: ['Identity & Names', 'Spiritual Purity', 'Consumerism', 'Resilience']
  },
  {
    id: 'howls-moving-castle',
    title: "Howl's Moving Castle",
    originalTitle: 'ハウルの動く城',
    romaji: 'Hauru no Ugoku Shiro',
    year: 2004,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '119 minutes',
    genres: ['Fantasy', 'Romance', 'Adventure'],
    categories: ['all', 'fantasy', 'miyazaki', 'adventure'],
    image: 'assets/images/movies/howls-moving-castle.jpg',
    shortDesc: 'A cursed young milliner transformed into an elderly woman finds refuge inside the wandering steampunk fortress of the elusive wizard Howl.',
    synopsis: 'Sophie Hatter works quietly making bonnets in Market Chipping until a spiteful encounter with the Witch of the Waste leaves her trapped in the creaking body of a ninety-year-old woman. Fleeing into the hills, she boards Howl\'s legendary walking fortress—a clanking monstrosity powered by a cheeky fire demon named Calcifer. As a devastating war consumes neighboring kingdoms, Sophie and Howl must heal each other\'s guarded hearts.',
    characters: ['Howl Jenkins', 'Sophie Hatter', 'Calcifer', 'Markl', 'Witch of the Waste', 'Turnip Head', 'Heen'],
    quote: '"They say that the best blaze burns brightest when circumstances are at their worst."',
    themes: ['Self-Worth & Aging', 'Anti-War Pacifism', 'Found Family', 'Compassion']
  },
  {
    id: 'princess-mononoke',
    title: 'Princess Mononoke',
    originalTitle: 'もののけ姫',
    romaji: 'Mononoke-hime',
    year: 1997,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '134 minutes',
    genres: ['Epic Fantasy', 'Action', 'Drama'],
    categories: ['all', 'fantasy', 'miyazaki', 'adventure'],
    image: 'assets/images/movies/princess-mononoke.jpg',
    shortDesc: 'An Emishi prince stricken by a deadly curse becomes entangled in a brutal war between the forest gods and an iron-mining settlement.',
    synopsis: 'While defending his village from a boar demon driven mad by an iron ball, Prince Ashitaka is afflicted by a fatal corrupting mark. Exiled westward to discover its source, he enters the Primeval Forest where animal deities fight for survival against Lady Eboshi\'s industrialized fortress of Iron Town. In the mist, Ashitaka meets San—a fierce human girl raised by the giant white wolf goddess Moro—and strives to see with eyes unclouded by hate.',
    characters: ['Prince Ashitaka', 'San (Princess Mononoke)', 'Lady Eboshi', 'Moro', 'Lord Okkoto', 'Jigo', 'Kodama'],
    quote: '"To see with eyes unclouded by hate."',
    themes: ['Ecology vs Industry', 'Hatred & Forgiveness', 'Balance of Nature', 'Moral Ambiguity']
  },
  {
    id: 'kikis-delivery-service',
    title: "Kiki's Delivery Service",
    originalTitle: '魔女の宅急便',
    romaji: 'Majo no Takkyūbin',
    year: 1989,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '103 minutes',
    genres: ['Fantasy', 'Coming-of-Age', 'Slice of Life'],
    categories: ['all', 'coming-of-age', 'miyazaki'],
    image: 'assets/images/movies/kikis-delivery-service.jpg',
    shortDesc: 'A young witch and her sarcastic black cat move to a bustling seaside town to spend an independent year honing her flying delivery craft.',
    synopsis: 'Upon turning thirteen, tradition dictates that witch-in-training Kiki must spend one full year away from home. Flying south on her mother\'s broomstick alongside her cynical talking cat Jiji, she settles in Koriko, a picturesque seaside European town. Setting up an aerial delivery business above an aromatic bakery, Kiki discovers that growing up means overcoming creative burnout, loneliness, and self-doubt.',
    characters: ['Kiki', 'Jiji', 'Tombo', 'Osono', 'Ursula', 'Madame'],
    quote: '"We each need to find our own inspiration, Kiki. Sometimes it’s not easy."',
    themes: ['Creative Independence', 'Adolescence', 'Self-Reliance', 'Community Warmth']
  },
  {
    id: 'ponyo',
    title: 'Ponyo',
    originalTitle: '崖の上のポニョ',
    romaji: 'Gake no Ue no Ponyo',
    year: 2008,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '101 minutes',
    genres: ['Fantasy', 'Adventure', 'Family'],
    categories: ['all', 'fantasy', 'miyazaki'],
    image: 'assets/images/movies/ponyo.jpg',
    shortDesc: 'A goldfish princess yearns to live among humanity after falling in love with a thoughtful five-year-old boy on a seaside cliff.',
    synopsis: 'Brunhilde, a curious goldfish spirit born of an ancient ocean wizard and the sea goddess Granmamare, escapes her underwater nursery and washes ashore in a glass jar. Rescued and named Ponyo by five-year-old Sosuke, she tastes ham and vows to become human. Her joyful transformation unleashes ancient Devonian tides, flooding the coastal village into an oceanic wonderland of swimming prehistoric creatures.',
    characters: ['Ponyo / Brunhilde', 'Sosuke', 'Lisa', 'Fujimoto', 'Granmamare', 'Koichi'],
    quote: '"Ponyo loves Sosuke! I will be a human now!"',
    themes: ['Unconditional Love', 'Oceanic Majesty', 'Childhood Joy', 'Ecological Restoration']
  },
  {
    id: 'castle-in-the-sky',
    title: 'Castle in the Sky',
    originalTitle: '天空の城ラピュタ',
    romaji: 'Tenkū no Shiro Rapyuta',
    year: 1986,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '124 minutes',
    genres: ['Steampunk', 'Adventure', 'Sci-Fi'],
    categories: ['all', 'adventure', 'miyazaki'],
    image: 'assets/images/movies/castle-in-the-sky.jpg',
    shortDesc: 'A young mining apprentice catches a girl floating from the sky wearing a glowing levitation crystal, leading to a race for a legendary airborne metropolis.',
    synopsis: 'Pazu, an orphan working the engines of a high-altitude mining town, catches Sheeta as she gently descends from an airship raid held aloft by a sapphire aether crystal. Sheeta is the rightful heir to Laputa—a long-lost mythical city adrift inside towering thunderclouds. Pursued by government agents and air pirates led by Mama Dola, the young pair seek the floating utopia before its apocalyptic superweapons fall into tyrant hands.',
    characters: ['Pazu', 'Princess Sheeta (Lusheeta)', 'Captain Dola', 'Colonel Muska', 'General Muoro', 'Laputan Robot'],
    quote: '"Take root in the ground, live in harmony with the wind, bear seeds in the winter and rejoice with the birds in spring."',
    themes: ['Hubris of Technology', 'Freedom of Flight', 'Friendship', 'Greed vs Purity']
  },
  {
    id: 'the-wind-rises',
    title: 'The Wind Rises',
    originalTitle: '風立ちぬ',
    romaji: 'Kaze Tachinu',
    year: 2013,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '126 minutes',
    genres: ['Biography', 'Drama', 'Historical'],
    categories: ['all', 'miyazaki'],
    image: 'assets/images/movies/the-wind-rises.jpg',
    shortDesc: 'A passionate aeronautical engineer pursues his lifelong dream of designing beautiful soaring airplanes during Japan\'s turbulent pre-war era.',
    synopsis: 'Jiro Horikoshi cannot fly planes due to near-sightedness, but inspired by dreams of Italian aeronaut Count Caproni, he devotes his youth to crafting exquisite flying machines with curves as pure as fish bones. Along the way, he navigates the Great Kanto Earthquake, economic depression, and a touching romance with the fragile Naoko Satomi, grappling with the tragedy that machines created for beauty are co-opted for devastation.',
    characters: ['Jiro Horikoshi', 'Naoko Satomi', 'Kiro Honjo', 'Count Caproni', 'Castorp', 'Kayo Horikoshi'],
    quote: '"The wind is rising! We must try to live."',
    themes: ['Artistic Passion vs Consequence', 'Transience of Beauty', 'Devotion in Illness', 'Dreams']
  },
  {
    id: 'nausicaa',
    title: 'Nausicaä of the Valley of the Wind',
    originalTitle: '風の谷のナウシカ',
    romaji: 'Kaze no Tani no Naushika',
    year: 1984,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '117 minutes',
    genres: ['Sci-Fi', 'Post-Apocalyptic', 'Adventure'],
    categories: ['all', 'adventure', 'fantasy', 'miyazaki'],
    image: 'assets/images/movies/nausicaa.jpg',
    shortDesc: 'In a post-apocalyptic world overrun by toxic jungles and giant insects, a compassionate glider-riding princess seeks peace between humankind and nature.',
    synopsis: 'A millennium after the Seven Days of Fire extinguished industrial civilization, surviving humans cling to existence along the edges of the Toxic Jungle—a poisonous spore forest guarded by colossal Ohm creatures. Princess Nausicaä of the seaside Valley of the Wind uses her empathetic heart and glider skills to study the fungal flora, discovering it actually purifies the contaminated earth beneath.',
    characters: ['Princess Nausicaä', 'Lord Yupa', 'Asbel', 'Princess Kushana', 'Kurotowa', 'King Jihl', 'Giant Ohm'],
    quote: '"What a peaceful world this would be if people could just understand the forest."',
    themes: ['Ecological Regeneration', 'Compassion across Species', 'Pacifism', 'Courage']
  },
  {
    id: 'whisper-of-the-heart',
    title: 'Whisper of the Heart',
    originalTitle: '耳をすませば',
    romaji: 'Mimi o Sumaseba',
    year: 1995,
    director: 'Yoshifumi Kondo',
    composer: 'Yuji Nomi',
    runtime: '111 minutes',
    genres: ['Romance', 'Drama', 'Coming-of-Age'],
    categories: ['all', 'coming-of-age', 'other'],
    image: 'assets/images/movies/whisper-of-the-heart.jpg',
    shortDesc: 'A teenage bookworm discovers that all her library books were previously borrowed by the same boy, sparking a summer of creative self-discovery.',
    synopsis: 'Fourteen-year-old Shizuku Tsukishima loves reading fantasy tales and adapting songs. After noticing the name Seiji Amasawa on checkout cards ahead of her, she follows a portly commuter cat on a train to a hillside antique shop run by Seiji\'s grandfather. Meeting Seiji, who dreams of violin craftsmanship in Italy, inspires Shizuku to test her own limits by penning an imaginative novel about an aristocratic feline statuette named Baron.',
    characters: ['Shizuku Tsukishima', 'Seiji Amasawa', 'Baron Humbert', 'Shiro Nishi', 'Moon the Cat', 'Yuko'],
    quote: '"You don\'t need to rush. You have to polish your rough gem step by step."',
    themes: ['Creative Discipline', 'Young Ambition', 'Metropolitan Nostalgia', 'Authentic Romance']
  },
  {
    id: 'arrietty',
    title: 'The Secret World of Arrietty',
    originalTitle: '借りぐらしのアリエッティ',
    romaji: 'Karigurashi no Arietti',
    year: 2010,
    director: 'Hiromasa Yonebayashi',
    composer: 'Cécile Corbel',
    runtime: '94 minutes',
    genres: ['Fantasy', 'Family'],
    categories: ['all', 'fantasy', 'other'],
    image: 'assets/images/movies/arrietty.jpg',
    shortDesc: 'A miniature fourteen-year-old girl living hidden beneath floorboards forms a quiet bond with a sickly human boy recovering in the country house above.',
    synopsis: 'Beneath the wooden floorboards of a lush Tokyo garden home lives Arrietty and her parents—a tiny family of "Borrowers" who survive by quietly taking tiny scraps of sugar, tissue, and needles from "Human Beans". When twelve-year-old Sho spots Arrietty during her first borrowing expedition, a perilous bridge forms between two fragile lives on opposite sides of nature.',
    characters: ['Arrietty Clock', 'Sho', 'Pod Clock', 'Homily Clock', 'Spiller', 'Haru'],
    quote: '"Sometimes you have to fight for the things that are worth fighting for."',
    themes: ['Perspective & Fragility', 'Quiet Empathy', 'Survival', 'Hidden Microcosms']
  },
  {
    id: 'princess-kaguya',
    title: 'The Tale of the Princess Kaguya',
    originalTitle: 'かぐや姫の物語',
    romaji: 'Kaguya-hime no Monogatari',
    year: 2013,
    director: 'Isao Takahata',
    composer: 'Joe Hisaishi',
    runtime: '137 minutes',
    genres: ['Folklore', 'Drama', 'Fantasy'],
    categories: ['all', 'fantasy', 'other'],
    image: 'assets/images/movies/princess-kaguya.jpg',
    shortDesc: 'A bamboo cutter discovers a tiny glowing maiden inside a stalk, raising her into a woman of celestial grace who yearns for the simple joy of mortal life.',
    synopsis: 'Rendered in expressive, charcoal-and-watercolor sumi-e strokes, Isao Takahata\'s final magnum opus brings Japan\'s oldest folktale to life. Raised in wild mountain meadows with local boys, Kaguya is uprooted when her father buys an estate in the capital to make her a noblewoman. Choked by royal suitors and imperial etiquette, her heart aches for the earth she must soon leave behind.',
    characters: ['Princess Kaguya', 'Sutemaru', 'Bamboo Cutter', 'Old Woman', 'Lady Sagami'],
    quote: '"Birds, bugs, beasts, grass, trees, flowers... teach me how to feel."',
    themes: ['The Fleeting Nature of Earthly Joy', 'Parental Expectation', 'Artistic Mastery', 'Grief']
  },
  {
    id: 'when-marnie-was-there',
    title: 'When Marnie Was There',
    originalTitle: '思い出のマーニー',
    romaji: 'Omoide no Mānī',
    year: 2014,
    director: 'Hiromasa Yonebayashi',
    composer: 'Takatsugu Muramatsu',
    runtime: '103 minutes',
    genres: ['Drama', 'Mystery', 'Psychological'],
    categories: ['all', 'coming-of-age', 'other'],
    image: 'assets/images/movies/when-marnie-was-there.jpg',
    shortDesc: 'Sent to a seaside village for her health, an introverted foster girl forms a supernatural connection with a mysterious blonde girl inhabiting a marshland mansion.',
    synopsis: 'Anna Sasaki, a withdrawn girl battling severe asthma and alienation, is sent to stay with relatives in rural Hokkaido. Across the tidal salt marshes stands an ornate Western mansion that seems abandoned by day yet glowing with ballgowns by night. There she meets Marnie—a girl who promises to keep their friendship a secret as deep family secrets emerge through the tides.',
    characters: ['Anna Sasaki', 'Marnie', 'Sayaka', 'Hisako', 'Yoriko Sasaki', 'Setsu Oiwa'],
    quote: '"You are my biggest secret. Please promise me we will always be friends."',
    themes: ['Healing Ancestral Trauma', 'Self-Acceptance', 'Solitude', 'Memory']
  },
  {
    id: 'porco-rosso',
    title: 'Porco Rosso',
    originalTitle: '紅の豚',
    romaji: 'Kurenai no Buta',
    year: 1992,
    director: 'Hayao Miyazaki',
    composer: 'Joe Hisaishi',
    runtime: '94 minutes',
    genres: ['Adventure', 'Comedy', 'Aviation'],
    categories: ['all', 'adventure', 'miyazaki'],
    image: 'assets/images/movies/porco-rosso.jpg',
    shortDesc: 'A cynical World War I ace pilot cursed with a pig’s snout works as an aerial bounty hunter defending the Adriatic Sea from air pirates.',
    synopsis: 'Set amidst the turquoise coves of 1930s Italy, ex-flying ace Marco Pagot now flies a fiery red Savoia S.21 seaplane as Porco Rosso. Balancing his friendship with the glamorous chanteuse Madame Gina and his feud with conceited American ace Curtis, Porco rebuilds his damaged plane with the help of spirited seventeen-year-old aircraft designer Fio Piccolo.',
    characters: ['Porco Rosso (Marco Pagot)', 'Madame Gina', 'Fio Piccolo', 'Donald Curtis', 'Mamma Aiuto Boss', 'Ferrarin'],
    quote: '"I\'d much rather be a pig than a fascist."',
    themes: ['Survivor Guilt', 'Aviation Romance', 'Anti-Fascism', 'Redemption']
  },
  {
    id: 'the-cat-returns',
    title: 'The Cat Returns',
    originalTitle: '猫の恩返し',
    romaji: 'Neko no Ongaeshi',
    year: 2002,
    director: 'Hiroyuki Morita',
    composer: 'Yuji Nomi',
    runtime: '75 minutes',
    genres: ['Fantasy', 'Comedy', 'Adventure'],
    categories: ['all', 'fantasy', 'other'],
    image: 'assets/images/movies/the-cat-returns.jpg',
    shortDesc: 'After saving an odd cat from traffic, an ordinary schoolgirl is showered with bizarre feline gifts and whisked to the magical Cat Kingdom.',
    synopsis: 'Haru Yoshioka uses her lacrosse stick to rescue a black cat from an oncoming truck, unaware she has saved Prince Lune of the Cat Kingdom. Flooded with gifts of live mice and catnip, she is invited to marry the prince. Desperate to escape turning into a cat herself, she seeks the Cat Bureau and the gallant, cane-wielding Baron Humbert von Gikkingen.',
    characters: ['Haru Yoshioka', 'Baron Humbert von Gikkingen', 'Muta / Renaldo Moon', 'Toto', 'The Cat King', 'Prince Lune'],
    quote: '"Always believe in yourself. Do this and no matter where you are, you will have nothing to fear."',
    themes: ['Self-Empowerment', 'Whimsical Fantasy', 'Courage', 'Individuality']
  },
  {
    id: 'tales-from-earthsea',
    title: 'Tales from Earthsea',
    originalTitle: 'ゲド戦記',
    romaji: 'Gedo Senki',
    year: 2006,
    director: 'Goro Miyazaki',
    composer: 'Tamiya Terashima',
    runtime: '115 minutes',
    genres: ['High Fantasy', 'Adventure', 'Drama'],
    categories: ['all', 'fantasy', 'adventure', 'other'],
    image: 'assets/images/movies/tales-from-earthsea.jpg',
    shortDesc: 'As dragons appear above human shores and crops fail, an Archmage and a tormented fugitive prince travel an unraveling world to restore balance.',
    synopsis: 'Based on Ursula K. Le Guin\'s acclaimed fantasy cycle, Tales from Earthsea charts a world where dragons and wizards are succumbing to imbalance. Archmage Sparrowhawk (Ged) rescues Prince Arren, a troubled youth stalked by a shadowy doppelganger. Together with the farm girl Therru, they confront the rogue wizard Cob who seeks eternal life at the expense of universal equilibrium.',
    characters: ['Prince Arren / Lebannen', 'Sparrowhawk (Ged)', 'Therru / Tehanu', 'Tenar', 'Lord Cob', 'Hare'],
    quote: '"Denying death is denying life itself."',
    themes: ['Acceptance of Mortality', 'Shadow Self', 'Balance of Nature', 'Light and Dark']
  }
];

// =========================================================================
// RENDER & FILTER CONTROLLER
// =========================================================================
function initMoviesPage() {
  const moviesGrid = document.getElementById('movies-grid');
  const searchInput = document.getElementById('movie-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const filterBtns = document.querySelectorAll('.movie-filter-btn');
  const resultsCount = document.getElementById('movies-count');
  const modalBackdrop = document.getElementById('movie-modal');

  // Featured grid on homepage (render top 8 films)
  const homeFeaturedGrid = document.getElementById('featured-movies-grid');
  if (homeFeaturedGrid) {
    const featuredList = GHIBLI_MOVIES.slice(0, 8);
    homeFeaturedGrid.innerHTML = featuredList.map(createMovieCardHTML).join('');
    attachCardClickListeners(homeFeaturedGrid);
    if (window.initScrollReveals) {
      window.initScrollReveals();
    } else {
      homeFeaturedGrid.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('in-view'));
    }
  }

  // Full movies discovery page
  if (moviesGrid) {
    let currentCategory = 'all';
    let currentSearchTerm = '';

    function renderMovies() {
      const filtered = GHIBLI_MOVIES.filter((movie) => {
        const matchesCategory = currentCategory === 'all' || movie.categories.includes(currentCategory);
        const searchTarget = `${movie.title} ${movie.originalTitle} ${movie.director} ${movie.genres.join(' ')} ${movie.characters.join(' ')}`.toLowerCase();
        const matchesSearch = !currentSearchTerm || searchTarget.includes(currentSearchTerm);
        return matchesCategory && matchesSearch;
      });

      if (resultsCount) {
        resultsCount.textContent = `Showing ${filtered.length} of ${GHIBLI_MOVIES.length} films`;
      }

      if (filtered.length === 0) {
        moviesGrid.innerHTML = `
          <div class="empty-state">
            <svg class="empty-state-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              <circle cx="32" cy="32" r="28" stroke-width="2"/>
              <path d="M22 28C22 28 26 34 32 34C38 34 42 28 42 28" stroke-width="2" stroke-linecap="round"/>
              <circle cx="24" cy="22" r="3" fill="currentColor"/>
              <circle cx="40" cy="22" r="3" fill="currentColor"/>
            </svg>
            <h3 class="empty-state-title">No Films Found in this Meadow</h3>
            <p class="empty-state-desc">Try searching with a different title, character, or director keyword.</p>
            <button class="btn btn-secondary btn-pill" id="reset-filter-btn">Reset All Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-filter-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            currentCategory = 'all';
            currentSearchTerm = '';
            if (searchInput) searchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === 'all'));
            renderMovies();
          });
        }
        return;
      }

      moviesGrid.innerHTML = filtered.map(createMovieCardHTML).join('');
      attachCardClickListeners(moviesGrid);
      if (window.initScrollReveals) {
        window.initScrollReveals();
      } else {
        moviesGrid.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('in-view'));
      }
    }

    // Filter clicks
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.filter || 'all';
        renderMovies();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim().toLowerCase();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = currentSearchTerm ? 'block' : 'none';
        }
        renderMovies();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentSearchTerm = '';
        clearSearchBtn.style.display = 'none';
        renderMovies();
      });
    }

    renderMovies();
  }

  // Card HTML template
  function createMovieCardHTML(movie) {
    return `
      <article class="movie-card reveal-on-scroll" data-id="${movie.id}" tabindex="0" role="button" aria-label="View details for ${movie.title}">
        <div class="movie-card-thumb-wrapper">
          <img src="${movie.image}" alt="${movie.title} scene still" class="movie-card-thumb" loading="lazy">
          <span class="movie-year-badge">${movie.year}</span>
        </div>
        <div class="movie-card-body">
          <div class="movie-card-titles">
            <span class="movie-card-jp">${movie.originalTitle}</span>
            <h3 class="movie-card-title">${movie.title}</h3>
          </div>
          <p class="movie-card-desc">${movie.shortDesc}</p>
          <div class="movie-card-footer">
            <span class="movie-genre-tag">${movie.genres[0]}</span>
            <span class="movie-card-btn">
              Explore 
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </article>
    `;
  }

  // Attach card click handlers for modal
  function attachCardClickListeners(container) {
    const cards = container.querySelectorAll('.movie-card');
    cards.forEach((card) => {
      const id = card.dataset.id;
      const movie = GHIBLI_MOVIES.find(m => m.id === id);
      if (movie) {
        card.addEventListener('click', () => openMovieModal(movie));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openMovieModal(movie);
          }
        });
      }
    });
  }

  // Open Movie Detail Modal
  function openMovieModal(movie) {
    if (!modalBackdrop) return;
    const modalContent = modalBackdrop.querySelector('.modal-container');
    if (!modalContent) return;

    modalContent.innerHTML = `
      <button class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
          <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="modal-hero-artwork">
        <img src="${movie.image}" alt="${movie.title}" class="modal-artwork-img">
        <div class="modal-hero-gradient"></div>
        <div class="modal-hero-meta">
          <div class="modal-hero-jp-title">${movie.originalTitle} (${movie.romaji})</div>
          <h2 class="modal-hero-title">${movie.title}</h2>
        </div>
      </div>

      <div class="modal-content-body">
        <div class="modal-badges-row">
          <span class="modal-badge">${movie.year}</span>
          <span class="modal-badge">${movie.runtime}</span>
          ${movie.genres.map(g => `<span class="modal-badge" style="background: rgba(217, 155, 105, 0.15); color: #B36830;">${g}</span>`).join('')}
        </div>

        <div class="modal-meta-grid">
          <div>
            <div class="modal-meta-item-label">Director</div>
            <div class="modal-meta-item-value">${movie.director}</div>
          </div>
          <div>
            <div class="modal-meta-item-label">Music & Score</div>
            <div class="modal-meta-item-value">${movie.composer}</div>
          </div>
          <div>
            <div class="modal-meta-item-label">Core Themes</div>
            <div class="modal-meta-item-value">${movie.themes.join(', ')}</div>
          </div>
        </div>

        <div class="modal-synopsis-section">
          <h3 class="modal-section-heading font-serif">The Story</h3>
          <p class="modal-synopsis-text">${movie.synopsis}</p>
        </div>

        <div class="modal-synopsis-section">
          <h4 class="modal-section-heading font-serif" style="font-size: 1.1rem;">Memorable Characters</h4>
          <div class="modal-characters-tags">
            ${movie.characters.map(c => `<span class="modal-char-tag">${c}</span>`).join('')}
          </div>
        </div>

        ${movie.quote ? `
          <div class="modal-quote-box">
            ${movie.quote}
          </div>
        ` : ''}
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Close handlers
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMovieModal);
      closeBtn.focus();
    }
  }

  function closeMovieModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalBackdrop && !modalBackdrop._hasModalListener) {
    modalBackdrop._hasModalListener = true;
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeMovieModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeMovieModal();
      }
    });
  }

  window.openMovieModalById = function(id) {
    const movie = GHIBLI_MOVIES.find(m => m.id === id);
    if (movie) openMovieModal(movie);
  };
}

window.initMoviesPage = initMoviesPage;
document.addEventListener('DOMContentLoaded', initMoviesPage);

