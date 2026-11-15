/* ==========================================================================
   POKÉPIXEL - Starters & Party Team Builder Engine (starters.html)
   ========================================================================== */

function initStartersPage() {
  const starterGrid = document.getElementById('starterCardsGrid');
  if (!starterGrid) return; // Not on starters page
  const database = window.POKEMON_DATABASE || [];

  // Group starters by generation
  const startersByRegion = {
    kanto: [
      database.find(p => p.id === 1), // Bulbasaur
      database.find(p => p.id === 4), // Charmander
      database.find(p => p.id === 7)  // Squirtle
    ].filter(Boolean),
    johto: [
      database.find(p => p.id === 152), // Chikorita
      database.find(p => p.id === 155), // Cyndaquil
      database.find(p => p.id === 158)  // Totodile
    ].filter(Boolean),
    hoenn: [
      database.find(p => p.id === 252), // Treecko
      database.find(p => p.id === 255), // Torchic
      database.find(p => p.id === 258)  // Mudkip
    ].filter(Boolean)
  };

  let activeRegion = 'kanto';
  let activeStarter = startersByRegion.kanto[0];

  // DOM Elements - Starter Showcase
  const regionTabs = document.querySelectorAll('.starter-generation-tab');
  const activeSprite = document.getElementById('starterFocusSprite');
  const activeName = document.getElementById('starterFocusName');
  const activeNumber = document.getElementById('starterFocusNumber');
  const activeTypes = document.getElementById('starterFocusTypes');
  const activeCategory = document.getElementById('starterFocusCategory');
  const activePersonality = document.getElementById('starterFocusPersonality');
  const activeDesc = document.getElementById('starterFocusDesc');
  const activeEvoContainer = document.getElementById('starterFocusEvo');
  const addActiveToTeamBtn = document.getElementById('addActiveToTeamBtn');
  const starterDialogue = document.getElementById('starterDialogueText');

  // DOM Elements - Team Builder
  const partySlotsContainer = document.getElementById('partySlotsContainer');
  const partyCountBadge = document.getElementById('partyCountBadge');
  const clearTeamBtn = document.getElementById('clearTeamBtn');
  const teamRosterSelect = document.getElementById('teamRosterSelect');
  const addSelectedMonBtn = document.getElementById('addSelectedMonBtn');
  const teamStatusMsg = document.getElementById('teamStatusMsg');

  // Party state (max 6 Pokémon)
  let myParty = [];
  try {
    const savedParty = localStorage.getItem('pokepixel_party');
    if (savedParty) {
      myParty = JSON.parse(savedParty);
    }
  } catch (e) {
    myParty = [];
  }

  // --- 1. RENDER STARTER CARDS ---
  function renderStarterCards() {
    if (!starterGrid) return;
    starterGrid.innerHTML = '';
    const starters = startersByRegion[activeRegion] || [];

    starters.forEach(mon => {
      const card = document.createElement('div');
      card.className = `starter-panel-card ${mon.id === activeStarter.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="starter-panel-badge">#${String(mon.id).padStart(3, '0')}</div>
        <div class="starter-panel-sprite-wrap">
          <img src="assets/sprites/${mon.id}.png" class="pixelated" alt="${mon.name}" />
        </div>
        <h3 class="starter-panel-name">${mon.name}</h3>
        <div class="starter-panel-types">
          ${mon.types.map(t => `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`).join('')}
        </div>
      `;

      card.addEventListener('click', () => {
        selectStarter(mon);
        document.querySelectorAll('.starter-panel-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      starterGrid.appendChild(card);
    });
  }

  function selectStarter(mon) {
    if (!mon) return;
    activeStarter = mon;

    if (activeSprite) activeSprite.src = `assets/sprites/${mon.id}.png`;
    if (activeName) activeName.textContent = mon.name;
    if (activeNumber) activeNumber.textContent = `#${String(mon.id).padStart(3, '0')}`;
    if (activeCategory) activeCategory.textContent = mon.category;
    if (activePersonality) activePersonality.textContent = mon.personality;
    if (activeDesc) activeDesc.textContent = mon.desc;

    if (activeTypes) {
      activeTypes.innerHTML = mon.types
        .map(t => `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`)
        .join('');
    }

    // Render Evolution Line
    if (activeEvoContainer) {
      // Find stage 2 and stage 3
      let stage1 = mon;
      let stage2 = mon.evolvesTo ? database.find(p => p.id === mon.evolvesTo.id) : null;
      let stage3 = stage2 && stage2.evolvesTo ? database.find(p => p.id === stage2.evolvesTo.id) : null;

      let evoHtml = '<div class="starter-evo-track">';
      evoHtml += `
        <div class="starter-evo-stage active">
          <img src="assets/sprites/${stage1.id}.png" class="pixelated" />
          <span class="evo-name">${stage1.name}</span>
          <span class="evo-req">Basic</span>
        </div>
      `;

      if (stage2) {
        evoHtml += `
          <div class="starter-evo-arrow">➔ ${stage1.evolvesTo.level}</div>
          <div class="starter-evo-stage">
            <img src="assets/sprites/${stage2.id}.png" class="pixelated" />
            <span class="evo-name">${stage2.name}</span>
            <span class="evo-req">${stage1.evolvesTo.level}</span>
          </div>
        `;
      }

      if (stage3) {
        evoHtml += `
          <div class="starter-evo-arrow">➔ ${stage2.evolvesTo.level}</div>
          <div class="starter-evo-stage">
            <img src="assets/sprites/${stage3.id}.png" class="pixelated" />
            <span class="evo-name">${stage3.name}</span>
            <span class="evo-req">${stage2.evolvesTo.level}</span>
          </div>
        `;
      }

      evoHtml += '</div>';
      activeEvoContainer.innerHTML = evoHtml;
    }

    if (starterDialogue) {
      starterDialogue.textContent = `Professor Birch: "So, you choose ${mon.name}? An excellent companion with immense potential!"`;
    }

    if (window.PokeSound) {
      window.PokeSound.starterFanfare();
    }
  }

  // --- 2. TEAM BUILDER ENGINE ---
  function saveParty() {
    localStorage.setItem('pokepixel_party', JSON.stringify(myParty));
    renderPartyMenu();
  }

  function addPokemonToTeam(mon) {
    if (!mon) return;
    if (myParty.length >= 6) {
      if (teamStatusMsg) {
        teamStatusMsg.textContent = "Your party is already full (6/6)! Deposit or remove a Pokémon first.";
      }
      if (window.PokeSound) window.PokeSound.bump();
      return;
    }

    myParty.push({
      id: mon.id,
      name: mon.name,
      types: mon.types,
      level: 50,
      hp: mon.stats.hp,
      maxHp: mon.stats.hp
    });

    saveParty();
    if (teamStatusMsg) {
      teamStatusMsg.textContent = `${mon.name} joined your adventure party! (${myParty.length}/6)`;
    }
    if (window.PokeSound) window.PokeSound.select();
  }

  function removePokemonFromTeam(index) {
    if (index >= 0 && index < myParty.length) {
      const removed = myParty.splice(index, 1)[0];
      saveParty();
      if (teamStatusMsg) {
        teamStatusMsg.textContent = `${removed.name} was returned to the PC Storage box.`;
      }
      if (window.PokeSound) window.PokeSound.click();
    }
  }

  function clearTeam() {
    myParty = [];
    saveParty();
    if (teamStatusMsg) {
      teamStatusMsg.textContent = "Your party was cleared. Build your dream team!";
    }
    if (window.PokeSound) window.PokeSound.click();
  }

  function renderPartyMenu() {
    if (!partySlotsContainer) return;
    partySlotsContainer.innerHTML = '';

    if (partyCountBadge) {
      partyCountBadge.textContent = `${myParty.length} / 6 SLOTS`;
    }

    for (let i = 0; i < 6; i++) {
      const mon = myParty[i];
      const slot = document.createElement('div');
      slot.className = `party-slot ${mon ? 'occupied' : 'empty'}`;

      if (mon) {
        slot.innerHTML = `
          <button class="party-slot-remove-btn" title="Remove ${mon.name}" aria-label="Remove">✕</button>
          <div class="party-slot-sprite-wrap">
            <img src="assets/sprites/${mon.id}.png" class="pixelated" alt="${mon.name}" />
          </div>
          <div class="party-slot-info">
            <div class="party-slot-name-row">
              <span class="party-slot-name">${mon.name}</span>
              <span class="party-slot-lv">Lv. ${mon.level}</span>
            </div>
            <div class="party-hp-bar-wrap">
              <span class="party-hp-text">HP: ${mon.hp}/${mon.maxHp}</span>
              <div class="party-hp-bar">
                <div class="party-hp-fill" style="width: 100%;"></div>
              </div>
            </div>
          </div>
        `;

        const removeBtn = slot.querySelector('.party-slot-remove-btn');
        if (removeBtn) {
          removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removePokemonFromTeam(i);
          });
        }
      } else {
        slot.innerHTML = `
          <div class="party-slot-empty-content">
            <img src="assets/images/icons/pokeball.svg" class="party-empty-ball" alt="Empty Ball" />
            <span class="party-empty-label">SLOT ${i + 1} EMPTY</span>
          </div>
        `;
      }

      partySlotsContainer.appendChild(slot);
    }
  }

  function populateRosterDropdown() {
    if (!teamRosterSelect) return;
    teamRosterSelect.innerHTML = '<option value="">-- Choose Pokémon to Add --</option>';
    database.forEach(mon => {
      const opt = document.createElement('option');
      opt.value = mon.id;
      opt.textContent = `#${String(mon.id).padStart(3, '0')} ${mon.name} (${mon.types.join('/')})`;
      teamRosterSelect.appendChild(opt);
    });
  }

  // --- 3. EVENT LISTENERS ---
  regionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      regionTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeRegion = tab.dataset.region;
      activeStarter = startersByRegion[activeRegion][0];
      renderStarterCards();
      selectStarter(activeStarter);
    });
  });

  if (addActiveToTeamBtn) {
    addActiveToTeamBtn.addEventListener('click', () => {
      addPokemonToTeam(activeStarter);
    });
  }

  if (addSelectedMonBtn && teamRosterSelect) {
    addSelectedMonBtn.addEventListener('click', () => {
      const selectedId = parseInt(teamRosterSelect.value, 10);
      if (!isNaN(selectedId)) {
        const mon = database.find(p => p.id === selectedId);
        if (mon) addPokemonToTeam(mon);
      }
    });
  }

  if (clearTeamBtn) {
    clearTeamBtn.addEventListener('click', clearTeam);
  }

  // Initialize
  renderStarterCards();
  selectStarter(activeStarter);
  populateRosterDropdown();
  renderPartyMenu();
}

window.initStartersPage = initStartersPage;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStartersPage);
} else {
  initStartersPage();
}
