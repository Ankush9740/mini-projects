/* ==========================================================================
   POKÉPIXEL - GBA Games Page Script (games.html)
   ========================================================================== */

const GBA_GAMES_DATA = [
  {
    id: "firered",
    name: "Pokémon FireRed",
    region: "Kanto",
    releaseYear: 2004,
    color: "#D95745",
    cartridge: "assets/images/games/cartridge-firered.svg",
    mascot: "Charizard",
    mascotId: 6,
    developer: "Game Freak / Nintendo",
    starters: ["Bulbasaur", "Charmander", "Squirtle"],
    starterIds: [1, 4, 7],
    legendaries: ["Articuno", "Zapdos", "Moltres", "Mewtwo", "Deoxys"],
    legendaryIds: [144, 145, 146, 150, 386],
    villain: "Team Rocket & Giovanni",
    story: "Set off from Pallet Town on an enhanced reimagining of the original Pokémon Red. Collect all 8 Kanto Gym Badges, foil Team Rocket's criminal syndicate across the mainland, and journey across the uncharted Sevii Islands archipelago.",
    keyFeatures: [
      "The Sevii Islands post-game story arc (Islands 1-7)",
      "Wireless Adapter peripheral for cable-free trades & battles",
      "Help System & Teachy TV tutorial guide",
      "Fame Checker key item tracking prominent NPCs"
    ],
    landscape: "Rugged volcanic peaks of Mt. Ember and lush Route 1 countryside."
  },
  {
    id: "leafgreen",
    name: "Pokémon LeafGreen",
    region: "Kanto",
    releaseYear: 2004,
    color: "#426B42",
    cartridge: "assets/images/games/cartridge-leafgreen.svg",
    mascot: "Venusaur",
    mascotId: 3,
    developer: "Game Freak / Nintendo",
    starters: ["Bulbasaur", "Charmander", "Squirtle"],
    starterIds: [1, 4, 7],
    legendaries: ["Articuno", "Zapdos", "Moltres", "Mewtwo", "Deoxys"],
    legendaryIds: [144, 145, 146, 150, 386],
    villain: "Team Rocket & Giovanni",
    story: "Complementing FireRed, LeafGreen introduces version-exclusive wild Pokémon like Slowpoke, Magmar, and Sandshrew. Explore Kanto's vibrant ecosystems with rich Generation 3 graphics and updated Pokémon mechanics.",
    keyFeatures: [
      "Version exclusive wild Pokémon encounters",
      "Network machine connectivity with Hoenn (Ruby/Sapphire)",
      "Berry Crushing and wireless mini-games",
      "Updated Kanto Gym leaders with modern movesets"
    ],
    landscape: "Viridian Forest canopy and serene water routes bordering Fuchsia City."
  },
  {
    id: "emerald",
    name: "Pokémon Emerald",
    region: "Hoenn",
    releaseYear: 2005,
    color: "#1E7D58",
    cartridge: "assets/images/games/cartridge-emerald.svg",
    mascot: "Rayquaza",
    mascotId: 384,
    developer: "Game Freak / Nintendo",
    starters: ["Treecko", "Torchic", "Mudkip"],
    starterIds: [252, 255, 258],
    legendaries: ["Rayquaza", "Kyogre", "Groudon", "Latios", "Latias"],
    legendaryIds: [384, 382, 383, 381, 380],
    villain: "Team Magma & Team Aqua Dual Conflict",
    story: "The definitive third version of Generation 3. As ancient weather titans Groudon and Kyogre clash, threatening cataclysmic climate destruction, the Trainer must awaken the ancient dragon Rayquaza from the ozone layer atop Sky Pillar.",
    keyFeatures: [
      "The legendary Battle Frontier with 7 Frontier Brain facilities",
      "Animated battle sprites for every Pokémon",
      "Simultaneous dual conflict with both Team Magma & Team Aqua",
      "Gym Leader rematches via the enhanced Match Call PokéNav"
    ],
    landscape: "Towering Sky Pillar shrouded in mist and stormy Sootopolis crater."
  },
  {
    id: "ruby",
    name: "Pokémon Ruby",
    region: "Hoenn",
    releaseYear: 2002,
    color: "#C83246",
    cartridge: "assets/images/games/cartridge-ruby.svg",
    mascot: "Groudon",
    mascotId: 383,
    developer: "Game Freak / Nintendo",
    starters: ["Treecko", "Torchic", "Mudkip"],
    starterIds: [252, 255, 258],
    legendaries: ["Groudon", "Latios", "Regirock", "Regice", "Registeel"],
    legendaryIds: [383, 381, 377, 378, 379],
    villain: "Team Magma (Leader Maxie)",
    story: "Embark on an expedition through Hoenn, a tropical continent rich in natural wonders. Stand against Team Magma as they seek the Red Orb to awaken Groudon and evaporate oceans to expand Earth's landmass.",
    keyFeatures: [
      "Introduction of Double Battles and Pokémon Abilities",
      "Secret Bases customizable with furniture, dolls, and mats",
      "Pokémon Contests across Cool, Beauty, Cute, Smart, and Tough categories",
      "Weather effects in overworld and in-battle (Sunlight, Rain, Sandstorm)"
    ],
    landscape: "Jagged Pass volcanic crags and Route 111 desert sandstorms."
  },
  {
    id: "sapphire",
    name: "Pokémon Sapphire",
    region: "Hoenn",
    releaseYear: 2002,
    color: "#2858A6",
    cartridge: "assets/images/games/cartridge-sapphire.svg",
    mascot: "Kyogre",
    mascotId: 382,
    developer: "Game Freak / Nintendo",
    starters: ["Treecko", "Torchic", "Mudkip"],
    starterIds: [252, 255, 258],
    legendaries: ["Kyogre", "Latias", "Regirock", "Regice", "Registeel"],
    legendaryIds: [382, 380, 377, 378, 379],
    villain: "Team Aqua (Leader Archie)",
    story: "Venture through lush rainforests and vast ocean diving routes. Counter Team Aqua's fanatical scheme to awaken the prehistoric titan Kyogre using the Blue Orb to flood the world and restore primordial ocean habitats.",
    keyFeatures: [
      "Underwater diving mechanics with HM Dive across deep sea trenches",
      "Nature system, Pokémon Personalities and Individual Values (IV/EV)",
      "Pokéblock blending with friends to optimize Contest stats",
      "Two distinct bicycle types: Mach Bike for speed and Acro Bike for bunny-hopping"
    ],
    landscape: "Submerged deep trenches of Route 124 and torrential ocean rainfall."
  }
];

function initGamesPage() {
  const filterBtns = document.querySelectorAll('.game-filter-btn');
  const gameCards = document.querySelectorAll('.game-detail-card');
  if (!filterBtns.length && !gameCards.length) return; // Not on games page

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const region = btn.dataset.region;

      gameCards.forEach(card => {
        if (region === 'all' || card.dataset.region === region) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      if (window.PokeSound) window.PokeSound.select();
    });
  });

  // --- 2. INTERACTIVE GAME COMPARISON TOOL ---
  const selectGame1 = document.getElementById('compareGame1Select');
  const selectGame2 = document.getElementById('compareGame2Select');
  const compareCol1 = document.getElementById('compareCol1');
  const compareCol2 = document.getElementById('compareCol2');

  function populateSelectOptions() {
    if (!selectGame1 || !selectGame2) return;
    selectGame1.innerHTML = '';
    selectGame2.innerHTML = '';

    GBA_GAMES_DATA.forEach((game, index) => {
      const opt1 = document.createElement('option');
      opt1.value = game.id;
      opt1.textContent = game.name;
      if (index === 0) opt1.selected = true; // FireRed default
      selectGame1.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = game.id;
      opt2.textContent = game.name;
      if (index === 2) opt2.selected = true; // Emerald default
      selectGame2.appendChild(opt2);
    });
  }

  function renderGameCompareColumn(container, game) {
    if (!container || !game) return;
    container.innerHTML = `
      <div class="compare-card-head" style="border-top: 4px solid ${game.color};">
        <div class="compare-cartridge-img">
          <img src="${game.cartridge}" alt="${game.name}" />
        </div>
        <h3 class="compare-game-title">${game.name}</h3>
        <span class="cartridge-year-badge">${game.releaseYear} • ${game.region}</span>
      </div>

      <div class="compare-rows">
        <div class="compare-row">
          <div class="compare-row-label">REGION</div>
          <div class="compare-row-val"><strong>${game.region}</strong> (${game.region === 'Kanto' ? 'Gen 1 Remake' : 'Gen 3 Original'})</div>
        </div>

        <div class="compare-row">
          <div class="compare-row-label">STARTER POKÉMON</div>
          <div class="compare-row-val compare-sprites-row">
            ${game.starterIds.map(id => `
              <div class="compare-mini-mon">
                <img src="assets/sprites/${id}.png" class="pixelated" />
              </div>
            `).join('')}
          </div>
        </div>

        <div class="compare-row">
          <div class="compare-row-label">MASCOT &amp; LEGENDARIES</div>
          <div class="compare-row-val compare-sprites-row">
            <div class="compare-mini-mon mascot-highlight">
              <img src="assets/sprites/${game.mascotId}.png" class="pixelated" />
              <span>${game.mascot}</span>
            </div>
          </div>
        </div>

        <div class="compare-row">
          <div class="compare-row-label">ANTAGONIST GROUP</div>
          <div class="compare-row-val text-fire">${game.villain}</div>
        </div>

        <div class="compare-row">
          <div class="compare-row-label">KEY INNOVATION</div>
          <ul class="compare-feature-list">
            ${game.keyFeatures.map(feat => `<li>${feat}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  function updateComparison() {
    if (!selectGame1 || !selectGame2) return;
    const g1 = GBA_GAMES_DATA.find(g => g.id === selectGame1.value);
    const g2 = GBA_GAMES_DATA.find(g => g.id === selectGame2.value);
    renderGameCompareColumn(compareCol1, g1);
    renderGameCompareColumn(compareCol2, g2);
  }

  if (selectGame1 && selectGame2) {
    populateSelectOptions();
    updateComparison();

    selectGame1.addEventListener('change', () => {
      updateComparison();
      if (window.PokeSound) window.PokeSound.select();
    });

    selectGame2.addEventListener('change', () => {
      updateComparison();
      if (window.PokeSound) window.PokeSound.select();
    });
  }
}

window.initGamesPage = initGamesPage;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGamesPage);
} else {
  initGamesPage();
}
