/* ==========================================================================
   POKÉPIXEL - Homepage Script (index.html)
   ========================================================================== */

function initHomePage() {
  // --- 1. HERO ROTATING DIALOGUE ---
  const heroDialogueEl = document.getElementById('heroDialogueText');
  if (!heroDialogueEl) return; // Not on home page
  const dialogueMessages = [
    "Welcome, Trainer! Step into the world of Pokémon GBA.",
    "Your next grand adventure awaits in the tall grass...",
    "Choose your starter and explore legendary Kanto & Hoenn!",
    "Relive the golden era of Game Boy Advance adventures."
  ];
  let currentMsgIdx = 0;

  function cycleDialogue() {
    if (!heroDialogueEl) return;
    const msg = dialogueMessages[currentMsgIdx];
    window.typewriterDialogue(heroDialogueEl, msg, 40, () => {
      setTimeout(() => {
        currentMsgIdx = (currentMsgIdx + 1) % dialogueMessages.length;
        cycleDialogue();
      }, 4500);
    });
  }

  if (heroDialogueEl) {
    cycleDialogue();
  }

  // --- 2. CHOOSE YOUR STARTER PREVIEW (KANTO / HOENN) ---
  const startersData = {
    kanto: [
      { id: 1, name: "Bulbasaur", types: ["Grass", "Poison"], role: "Seed Pokémon", desc: "A calm and reliable grass partner with an ancient seed on its back.", evo: "Bulbasaur ➔ Ivysaur (Lv. 16) ➔ Venusaur (Lv. 32)" },
      { id: 4, name: "Charmander", types: ["Fire"], role: "Lizard Pokémon", desc: "A passionate fire partner whose tail flame indicates its spirited health.", evo: "Charmander ➔ Charmeleon (Lv. 16) ➔ Charizard (Lv. 36)" },
      { id: 7, name: "Squirtle", types: ["Water"], role: "Tiny Turtle Pokémon", desc: "A playful, resilient water turtle capable of shooting high-pressure torrents.", evo: "Squirtle ➔ Wartortle (Lv. 16) ➔ Blastoise (Lv. 36)" }
    ],
    hoenn: [
      { id: 252, name: "Treecko", types: ["Grass"], role: "Wood Gecko Pokémon", desc: "Cool and calm forest ninja that scales vertical tree trunks with ease.", evo: "Treecko ➔ Grovyle (Lv. 16) ➔ Sceptile (Lv. 36)" },
      { id: 255, name: "Torchic", types: ["Fire"], role: "Chick Pokémon", desc: "Spirited chick harboring internal flames that reach 1,800 degrees Fahrenheit.", evo: "Torchic ➔ Combusken (Lv. 16) ➔ Blaziken (Lv. 36)" },
      { id: 258, name: "Mudkip", types: ["Water"], role: "Mud Fish Pokémon", desc: "Endearing amphibious brawler whose head fin senses water currents and danger.", evo: "Mudkip ➔ Marshtomp (Lv. 16) ➔ Swampert (Lv. 36)" }
    ]
  };

  let activeRegion = 'kanto';
  let activeStarter = startersData.kanto[0];

  const regionTabs = document.querySelectorAll('.starter-region-tab');
  const starterCardsContainer = document.getElementById('starterCardsContainer');
  const starterPreviewSprite = document.getElementById('starterPreviewSprite');
  const starterPreviewName = document.getElementById('starterPreviewName');
  const starterPreviewRole = document.getElementById('starterPreviewRole');
  const starterPreviewTypes = document.getElementById('starterPreviewTypes');
  const starterPreviewDesc = document.getElementById('starterPreviewDesc');
  const starterPreviewEvo = document.getElementById('starterPreviewEvo');
  const starterDialogue = document.getElementById('starterDialogueText');

  function renderStarterCards() {
    if (!starterCardsContainer) return;
    starterCardsContainer.innerHTML = '';
    const starters = startersData[activeRegion];

    starters.forEach((pokemon) => {
      const card = document.createElement('div');
      card.className = `starter-choice-card ${pokemon.id === activeStarter.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="starter-choice-sprite-wrap">
          <img src="assets/sprites/${pokemon.id}.png" alt="${pokemon.name}" class="pixelated" />
        </div>
        <h4 class="starter-choice-name">${pokemon.name}</h4>
        <div class="starter-choice-badges">
          ${pokemon.types.map(t => `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`).join('')}
        </div>
      `;

      card.addEventListener('click', () => {
        selectStarter(pokemon);
        document.querySelectorAll('.starter-choice-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      starterCardsContainer.appendChild(card);
    });
  }

  function selectStarter(pokemon) {
    activeStarter = pokemon;
    if (starterPreviewSprite) starterPreviewSprite.src = `assets/sprites/${pokemon.id}.png`;
    if (starterPreviewName) starterPreviewName.textContent = pokemon.name;
    if (starterPreviewRole) starterPreviewRole.textContent = pokemon.role;
    if (starterPreviewDesc) starterPreviewDesc.textContent = pokemon.desc;
    if (starterPreviewEvo) starterPreviewEvo.textContent = pokemon.evo;

    if (starterPreviewTypes) {
      starterPreviewTypes.innerHTML = pokemon.types
        .map(t => `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`)
        .join('');
    }

    if (starterDialogue) {
      starterDialogue.textContent = `You chose ${pokemon.name}! Are you ready to begin your journey together?`;
    }

    if (window.PokeSound) {
      window.PokeSound.starterFanfare();
    }
  }

  regionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      regionTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeRegion = tab.dataset.region;
      activeStarter = startersData[activeRegion][0];
      renderStarterCards();
      selectStarter(activeStarter);
    });
  });

  if (starterCardsContainer) {
    renderStarterCards();
    selectStarter(activeStarter);
  }

  // --- 3. DAILY POKÉMON SHOWCASE ---
  const dailySprite = document.getElementById('dailyPokemonSprite');
  const dailyName = document.getElementById('dailyPokemonName');
  const dailyTypes = document.getElementById('dailyPokemonTypes');
  const dailyDesc = document.getElementById('dailyPokemonDesc');
  const dailyDexLink = document.getElementById('dailyPokemonDexLink');

  if (window.POKEMON_DATABASE && dailySprite && dailyName) {
    // Pick today's Pokémon deterministically using current date
    const today = new Date();
    const daySeed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 50 + today.getDate();
    const dailyIdx = daySeed % window.POKEMON_DATABASE.length;
    const dailyMon = window.POKEMON_DATABASE[dailyIdx];

    dailySprite.src = `assets/sprites/${dailyMon.id}.png`;
    dailyName.textContent = `#${String(dailyMon.id).padStart(3, '0')} ${dailyMon.name}`;
    dailyDesc.textContent = dailyMon.desc;

    if (dailyTypes) {
      dailyTypes.innerHTML = dailyMon.types
        .map(t => `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`)
        .join('');
    }

    if (dailyDexLink) {
      dailyDexLink.href = `pokedex.html?id=${dailyMon.id}`;
    }
  }

  // --- 4. MINI GBA FRAME INTERACTIVE WIDGET ---
  const gbaScreenMsg = document.getElementById('gbaScreenMsg');
  const gbaScreenSprite = document.getElementById('gbaScreenSprite');
  const gbaBtnA = document.getElementById('gbaBtnA');
  const gbaBtnB = document.getElementById('gbaBtnB');

  const gbaMessages = [
    "POKÉPIXEL GBA",
    "POKÉMON READY!",
    "BATTLE START!",
    "GOTCHA! CAUGHT!",
    "LEVEL UP! +3 HP"
  ];
  let gbaMsgIdx = 0;

  if (gbaBtnA && gbaScreenMsg) {
    gbaBtnA.addEventListener('click', () => {
      gbaMsgIdx = (gbaMsgIdx + 1) % gbaMessages.length;
      gbaScreenMsg.textContent = gbaMessages[gbaMsgIdx];
      if (window.PokeSound) window.PokeSound.select();
    });
  }

  if (gbaBtnB && gbaScreenSprite && window.POKEMON_DATABASE) {
    gbaBtnB.addEventListener('click', () => {
      const randomIdx = Math.floor(Math.random() * window.POKEMON_DATABASE.length);
      const randomMon = window.POKEMON_DATABASE[randomIdx];
      gbaScreenSprite.src = `assets/sprites/${randomMon.id}.png`;
      if (gbaScreenMsg) gbaScreenMsg.textContent = randomMon.name.toUpperCase();
      if (window.PokeSound) window.PokeSound.pokemonCry();
    });
  }
}

window.initHomePage = initHomePage;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}
