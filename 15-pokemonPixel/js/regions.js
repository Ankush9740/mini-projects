/* ==========================================================================
   POKÉPIXEL - Regions Exploration Engine (regions.html)
   ========================================================================== */

function initRegionsPage() {
  const mapPinsContainer = document.getElementById('regionMapPins');
  if (!mapPinsContainer) return; // Not on regions page
  const regionsData = window.REGIONS_DATA || { kanto: [], hoenn: [] };
  let currentRegion = 'kanto';
  let activeLocation = regionsData.kanto ? regionsData.kanto[0] : null;

  // DOM Elements
  const regionTabs = document.querySelectorAll('.region-tab-btn');
  const mapImage = document.getElementById('regionMapImage');
  const locationListContainer = document.getElementById('regionLocationList');

  // Detail HUD Elements
  const hudLocationName = document.getElementById('hudLocationName');
  const hudLocationTitle = document.getElementById('hudLocationTitle');
  const hudLocationType = document.getElementById('hudLocationType');
  const hudGymLeader = document.getElementById('hudGymLeader');
  const hudGymBadge = document.getElementById('hudGymBadge');
  const hudLocationDesc = document.getElementById('hudLocationDesc');
  const hudLandmarks = document.getElementById('hudLandmarks');
  const hudPokemonSprites = document.getElementById('hudPokemonSprites');
  const hudGameBadge = document.getElementById('hudGameBadge');

  // --- 1. RENDER MAP PINS & LOCATION LIST ---
  function renderRegion() {
    const locations = regionsData[currentRegion] || [];
    if (!locations.length) return;

    // Update Map Image Source
    if (mapImage) {
      mapImage.src = currentRegion === 'kanto'
        ? 'assets/images/regions/kanto-map.svg'
        : 'assets/images/regions/hoenn-map.svg';
      mapImage.alt = `${currentRegion.toUpperCase()} Region Map`;
    }

    // Render Pins on Map
    if (mapPinsContainer) {
      mapPinsContainer.innerHTML = '';
      locations.forEach(loc => {
        const pin = document.createElement('button');
        pin.className = `region-map-pin ${loc.id === activeLocation.id ? 'active' : ''}`;
        pin.style.left = `${loc.x}%`;
        pin.style.top = `${loc.y}%`;
        pin.setAttribute('aria-label', loc.name);
        pin.innerHTML = `
          <span class="pin-marker"></span>
          <span class="pin-label">${loc.name}</span>
        `;

        pin.addEventListener('click', () => {
          selectLocation(loc);
        });

        mapPinsContainer.appendChild(pin);
      });
    }

    // Render Sidebar Location Buttons
    if (locationListContainer) {
      locationListContainer.innerHTML = '';
      locations.forEach(loc => {
        const itemBtn = document.createElement('button');
        itemBtn.className = `region-list-item ${loc.id === activeLocation.id ? 'active' : ''}`;
        itemBtn.innerHTML = `
          <span class="list-item-arrow">▶</span>
          <span class="list-item-name">${loc.name}</span>
          <span class="list-item-badge">${loc.badge !== 'None' ? 'GYM' : 'TOWN'}</span>
        `;

        itemBtn.addEventListener('click', () => {
          selectLocation(loc);
        });

        locationListContainer.appendChild(itemBtn);
      });
    }

    // Default select first location in region
    selectLocation(locations[0], false);
  }

  // --- 2. SELECT LOCATION & UPDATE HUD ---
  function selectLocation(loc, playAudio = true) {
    if (!loc) return;
    activeLocation = loc;

    // Update Active Classes
    document.querySelectorAll('.region-map-pin').forEach(pin => {
      if (pin.getAttribute('aria-label') === loc.name) {
        pin.classList.add('active');
      } else {
        pin.classList.remove('active');
      }
    });

    document.querySelectorAll('.region-list-item').forEach(item => {
      const nameEl = item.querySelector('.list-item-name');
      if (nameEl && nameEl.textContent === loc.name) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update HUD Content
    if (hudLocationName) hudLocationName.textContent = loc.name;
    if (hudLocationTitle) hudLocationTitle.textContent = `"${loc.title}"`;
    if (hudLocationType) hudLocationType.textContent = loc.type;
    if (hudGymLeader) hudGymLeader.textContent = loc.leader;
    if (hudGymBadge) hudGymBadge.textContent = loc.badge;
    if (hudLocationDesc) hudLocationDesc.textContent = loc.desc;
    if (hudGameBadge) hudGameBadge.textContent = loc.game;

    // Landmarks
    if (hudLandmarks) {
      hudLandmarks.innerHTML = loc.landmarks
        .map(lm => `<li>${lm}</li>`)
        .join('');
    }

    // Notable Pokémon Sprites
    if (hudPokemonSprites) {
      hudPokemonSprites.innerHTML = loc.notablePokemon.map(pid => `
        <div class="hud-mon-item" title="Pokédex #${pid}">
          <img src="assets/sprites/${pid}.png" class="pixelated" alt="Pokemon #${pid}" />
        </div>
      `).join('');
    }

    if (playAudio && window.PokeSound) {
      window.PokeSound.select();
    }
  }

  // --- 3. REGION SWITCH TABS ---
  regionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      regionTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRegion = tab.dataset.region;
      renderRegion();
      if (window.PokeSound) window.PokeSound.click();
    });
  });

  // Initial Render
  renderRegion();
}

window.initRegionsPage = initRegionsPage;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRegionsPage);
} else {
  initRegionsPage();
}
