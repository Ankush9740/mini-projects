/* ==========================================================================
   POKÉPIXEL - Pokédex Interactive Engine (pokedex.html)
   ========================================================================== */

function initPokedexPage() {
  const gridContainer = document.getElementById('pokedexGrid');
  if (!gridContainer) return; // Not on pokedex page
  const database = window.POKEMON_DATABASE || [];
  let filteredList = [...database];
  let currentModalMon = null;

  // DOM Elements
  const countBadge = document.getElementById('pokedexCountBadge');
  const searchInput = document.getElementById('pokedexSearchInput');
  const typeFilterSelect = document.getElementById('pokedexTypeFilter');
  const genFilterSelect = document.getElementById('pokedexGenFilter');
  const sortSelect = document.getElementById('pokedexSortSelect');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');

  // Modal Elements
  const modalOverlay = document.getElementById('pokedexModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBottomCloseBtn = document.getElementById('modalBottomCloseBtn');
  const modalSprite = document.getElementById('modalSprite');
  const modalName = document.getElementById('modalName');
  const modalNumber = document.getElementById('modalNumber');
  const modalCategory = document.getElementById('modalCategory');
  const modalTypes = document.getElementById('modalTypes');
  const modalHeight = document.getElementById('modalHeight');
  const modalWeight = document.getElementById('modalWeight');
  const modalRegion = document.getElementById('modalRegion');
  const modalDesc = document.getElementById('modalDesc');
  const modalStatsContainer = document.getElementById('modalStatsContainer');
  const modalEvolutionWrap = document.getElementById('modalEvolutionWrap');
  const modalPrevBtn = document.getElementById('modalPrevBtn');
  const modalNextBtn = document.getElementById('modalNextBtn');

  // --- 1. RENDER POKÉDEX GRID ---
  function renderGrid() {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    if (countBadge) {
      countBadge.textContent = `${filteredList.length} / ${database.length} POKÉMON`;
    }

    if (filteredList.length === 0) {
      gridContainer.innerHTML = `
        <div class="pokedex-no-results pixel-panel-light">
          <p class="dialogue-text">No Pokémon found matching your search criteria, Trainer!</p>
          <button class="btn-pixel btn-pixel-primary btn-pixel-sm" id="resetSearchBtn" style="margin-top:1rem;">RESET FILTERS</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetSearchBtn');
      if (resetBtn) resetBtn.addEventListener('click', resetFilters);
      return;
    }

    filteredList.forEach(pokemon => {
      const card = document.createElement('div');
      card.className = 'pokemon-card interactive';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${pokemon.name} Pokédex entry`);

      const formattedNum = `#${String(pokemon.id).padStart(3, '0')}`;
      const typesHtml = pokemon.types
        .map(t => `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`)
        .join('');

      card.innerHTML = `
        <span class="pokemon-card-id">${formattedNum}</span>
        <div class="pokemon-card-sprite-wrap">
          <img src="assets/sprites/${pokemon.id}.png" alt="${pokemon.name}" class="pokemon-card-sprite pixelated" loading="lazy" />
        </div>
        <h4 class="pokemon-card-name">${pokemon.name}</h4>
        <div class="pokemon-card-types">${typesHtml}</div>
      `;

      card.addEventListener('click', () => {
        openModal(pokemon);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(pokemon);
        }
      });

      gridContainer.appendChild(card);
    });
  }

  // --- 2. FILTER & SORT ENGINE ---
  function applyFilters() {
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    const selectedType = typeFilterSelect ? typeFilterSelect.value : 'all';
    const selectedGen = genFilterSelect ? genFilterSelect.value : 'all';
    const selectedSort = sortSelect ? sortSelect.value : 'id_asc';

    filteredList = database.filter(pokemon => {
      // Query match (Name or ID #)
      const matchesQuery = 
        pokemon.name.toLowerCase().includes(query) ||
        String(pokemon.id).includes(query) ||
        `#${String(pokemon.id).padStart(3, '0')}`.includes(query);

      // Type match
      const matchesType = 
        selectedType === 'all' || 
        pokemon.types.some(t => t.toLowerCase() === selectedType.toLowerCase());

      // Generation match
      const matchesGen = 
        selectedGen === 'all' || 
        String(pokemon.gen) === selectedGen;

      return matchesQuery && matchesType && matchesGen;
    });

    // Sorting
    filteredList.sort((a, b) => {
      if (selectedSort === 'id_asc') return a.id - b.id;
      if (selectedSort === 'id_desc') return b.id - a.id;
      if (selectedSort === 'name_asc') return a.name.localeCompare(b.name);
      if (selectedSort === 'total_desc') return (b.stats.total || 0) - (a.stats.total || 0);
      return 0;
    });

    renderGrid();
  }

  function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (typeFilterSelect) typeFilterSelect.value = 'all';
    if (genFilterSelect) genFilterSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'id_asc';
    applyFilters();
    if (window.PokeSound) window.PokeSound.select();
  }

  // --- 3. DETAIL MODAL ENGINE ---
  function openModal(pokemon) {
    if (!pokemon) return;
    currentModalMon = pokemon;

    if (modalSprite) modalSprite.src = `assets/sprites/${pokemon.id}.png`;
    if (modalName) modalName.textContent = pokemon.name;
    if (modalNumber) modalNumber.textContent = `#${String(pokemon.id).padStart(3, '0')}`;
    if (modalCategory) modalCategory.textContent = pokemon.category;
    if (modalHeight) modalHeight.textContent = pokemon.height;
    if (modalWeight) modalWeight.textContent = pokemon.weight;
    if (modalRegion) modalRegion.textContent = `${pokemon.region} (Gen ${pokemon.gen})`;
    if (modalDesc) modalDesc.textContent = pokemon.desc;

    if (modalTypes) {
      modalTypes.innerHTML = pokemon.types
        .map(t => `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`)
        .join('');
    }

    // Render Stats
    if (modalStatsContainer) {
      const stats = pokemon.stats;
      const statConfigs = [
        { key: 'hp', label: 'HP', max: 250 },
        { key: 'atk', label: 'ATTACK', max: 180 },
        { key: 'def', label: 'DEFENSE', max: 230 },
        { key: 'spAtk', label: 'SP. ATK', max: 180 },
        { key: 'spDef', label: 'SP. DEF', max: 230 },
        { key: 'spd', label: 'SPEED', max: 180 }
      ];

      modalStatsContainer.innerHTML = statConfigs.map(cfg => {
        const val = stats[cfg.key] || 0;
        const pct = Math.min(100, Math.round((val / cfg.max) * 100));
        let colorClass = 'mid';
        if (pct >= 60) colorClass = 'high';
        if (pct <= 30) colorClass = 'low';

        return `
          <div class="stat-row">
            <span class="stat-label">${cfg.label}</span>
            <span class="stat-val">${val}</span>
            <div class="stat-bar-outer">
              <div class="stat-bar-fill ${colorClass}" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');

      modalStatsContainer.innerHTML += `
        <div class="stat-total-row">
          <span class="stat-label">TOTAL</span>
          <span class="stat-total-val">${stats.total}</span>
        </div>
      `;
    }

    // Render Evolution Info
    if (modalEvolutionWrap) {
      let evoHtml = '<div class="evo-chain-display">';
      if (pokemon.evolvesFrom) {
        evoHtml += `
          <div class="evo-stage">
            <img src="assets/sprites/${pokemon.evolvesFrom.id}.png" class="pixelated" />
            <span>${pokemon.evolvesFrom.name}</span>
          </div>
          <span class="evo-arrow">➔</span>
        `;
      }
      evoHtml += `
        <div class="evo-stage current">
          <img src="assets/sprites/${pokemon.id}.png" class="pixelated" />
          <span>${pokemon.name}</span>
        </div>
      `;
      if (pokemon.evolvesTo) {
        evoHtml += `
          <span class="evo-arrow">➔ (${pokemon.evolvesTo.level})</span>
          <div class="evo-stage">
            <img src="assets/sprites/${pokemon.evolvesTo.id}.png" class="pixelated" />
            <span>${pokemon.evolvesTo.name}</span>
          </div>
        `;
      }
      evoHtml += '</div>';
      modalEvolutionWrap.innerHTML = evoHtml;
    }

    if (modalOverlay) {
      modalOverlay.classList.remove('hidden');
      modalOverlay.setAttribute('aria-hidden', 'false');
    }

    if (window.PokeSound) {
      window.PokeSound.modalOpen();
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('hidden');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
    // Clean URL query parameters so refresh doesn't reopen
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    if (window.PokeSound) {
      window.PokeSound.click();
    }
  }

  function navigateModal(direction) {
    if (!currentModalMon) return;
    const currentIdx = database.findIndex(p => p.id === currentModalMon.id);
    if (currentIdx === -1) return;

    let nextIdx = currentIdx + direction;
    if (nextIdx < 0) nextIdx = database.length - 1;
    if (nextIdx >= database.length) nextIdx = 0;

    openModal(database[nextIdx]);
  }

  // Event Listeners for Filters (Idempotent)
  if (searchInput) searchInput.oninput = applyFilters;
  if (typeFilterSelect) typeFilterSelect.onchange = applyFilters;
  if (genFilterSelect) genFilterSelect.onchange = applyFilters;
  if (sortSelect) sortSelect.onchange = applyFilters;
  if (clearFiltersBtn) clearFiltersBtn.onclick = resetFilters;

  // Modal Controls
  if (modalCloseBtn) modalCloseBtn.onclick = closeModal;
  if (modalBottomCloseBtn) modalBottomCloseBtn.onclick = closeModal;
  if (modalPrevBtn) modalPrevBtn.onclick = () => navigateModal(-1);
  if (modalNextBtn) modalNextBtn.onclick = () => navigateModal(1);

  if (modalOverlay) {
    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) closeModal();
    };
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    }
  });

  // Check URL query param (e.g. pokedex.html?id=25) or hash
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = parseInt(urlParams.get('id') || window.location.hash.replace('#', ''), 10);
  if (!isNaN(targetId)) {
    const targetMon = database.find(p => p.id === targetId);
    if (targetMon) {
      setTimeout(() => openModal(targetMon), 300);
    }
  }

  // Initial Grid render
  renderGrid();
}

window.initPokedexPage = initPokedexPage;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPokedexPage);
} else {
  initPokedexPage();
}
