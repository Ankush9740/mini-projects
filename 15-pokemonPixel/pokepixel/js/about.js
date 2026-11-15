/* ==========================================================================
   POKÉPIXEL - About Page & Retro Trivia Engine (about.html)
   ========================================================================== */

function initAboutPage() {
  const triviaContainer = document.getElementById('triviaContainer');
  const scoreBadge = document.getElementById('triviaScoreBadge');
  if (!triviaContainer) return;

  const triviaQuestions = [
    {
      q: "Which legendary Pokémon stops the catastrophic battle between Kyogre and Groudon in Pokémon Emerald?",
      opts: ["Rayquaza", "Mewtwo", "Lugia", "Deoxys"],
      correct: 0,
      explanation: "Correct! Rayquaza descends from the ozone layer atop Sky Pillar to pacify the primordial titans."
    },
    {
      q: "What archipelago region was introduced as a new post-game expansion in Pokémon FireRed & LeafGreen?",
      opts: ["Orange Islands", "Sevii Islands", "Decolore Islands", "Alola Islands"],
      correct: 1,
      explanation: "Correct! The Sevii Islands (One to Seven Island) introduced new quests, lore, and Johto Pokémon!"
    },
    {
      q: "Which game mechanic was introduced for the very first time in Generation III (Ruby & Sapphire)?",
      opts: ["Shiny Pokémon", "Double Battles & Abilities", "Day/Night Cycle", "Breeding & Eggs"],
      correct: 1,
      explanation: "Correct! Gen 3 introduced Abilities, Natures, and Double Battles, revolutionizing combat forever."
    },
    {
      q: "What city in Hoenn is famous for being constructed entirely into tree branches and suspended wooden rope bridges?",
      opts: ["Sootopolis City", "Fortree City", "Fallarbor Town", "Pacifidlog Town"],
      correct: 1,
      explanation: "Correct! Fortree City is the iconic canopy city overseen by Flying Gym Leader Winona."
    }
  ];

  let triviaScore = 0;
  let currentTriviaIdx = 0;

  function renderQuestion() {
    if (!triviaContainer) return;

    if (currentTriviaIdx >= triviaQuestions.length) {
      triviaContainer.innerHTML = `
        <div class="pixel-panel-light" style="padding: 1.5rem; text-align: center;">
          <h4 style="font-family: var(--font-pixel); font-size: 1.1rem; color: var(--forest-green); margin-bottom: 0.75rem;">
            CHALLENGE COMPLETE!
          </h4>
          <p class="dialogue-text" style="font-size: 1.1rem; margin-bottom: 1rem;">
            You scored ${triviaScore} out of ${triviaQuestions.length}! You possess true GBA Pokémon Master knowledge!
          </p>
          <button class="btn-pixel btn-pixel-primary btn-pixel-sm" id="restartTriviaBtn">RESTART TRIVIA</button>
        </div>
      `;
      const restartBtn = document.getElementById('restartTriviaBtn');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          triviaScore = 0;
          currentTriviaIdx = 0;
          if (scoreBadge) scoreBadge.textContent = `SCORE: 0 / ${triviaQuestions.length}`;
          renderQuestion();
        });
      }
      if (window.PokeSound) window.PokeSound.starterFanfare();
      return;
    }

    const item = triviaQuestions[currentTriviaIdx];
    triviaContainer.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span style="font-family: var(--font-pixel); font-size: 0.7rem; color: var(--retro-gold); display: block; margin-bottom: 6px;">
          QUESTION ${currentTriviaIdx + 1} OF ${triviaQuestions.length}:
        </span>
        <p style="font-size: 1.05rem; color: #FFFFFF; font-weight: bold; line-height: 1.5; margin: 0;">
          ${item.q}
        </p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;" class="trivia-options-grid">
        ${item.opts.map((opt, i) => `
          <button class="btn-pixel btn-pixel-navy trivia-opt-btn" data-opt="${i}" style="text-align: left; justify-content: flex-start; font-size: 0.75rem;">
            ${String.fromCharCode(65 + i)}. ${opt}
          </button>
        `).join('')}
      </div>
      <div id="triviaFeedback" style="min-height: 24px; font-family: var(--font-retro); font-size: 0.85rem;"></div>
    `;

    const optBtns = triviaContainer.querySelectorAll('.trivia-opt-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const picked = parseInt(btn.dataset.opt, 10);
        const feedback = document.getElementById('triviaFeedback');
        optBtns.forEach(b => b.disabled = true);

        if (picked === item.correct) {
          triviaScore++;
          btn.style.backgroundColor = 'var(--forest-green)';
          btn.style.borderColor = 'var(--pixel-grass)';
          if (feedback) {
            feedback.style.color = 'var(--pixel-grass)';
            feedback.textContent = item.explanation;
          }
          if (window.PokeSound) window.PokeSound.select();
        } else {
          btn.style.backgroundColor = 'var(--fire-red)';
          if (feedback) {
            feedback.style.color = 'var(--fire-red)';
            feedback.textContent = `Not quite! The correct answer was: ${item.opts[item.correct]}`;
          }
          if (window.PokeSound) window.PokeSound.bump();
        }

        if (scoreBadge) scoreBadge.textContent = `SCORE: ${triviaScore} / ${triviaQuestions.length}`;

        setTimeout(() => {
          currentTriviaIdx++;
          renderQuestion();
        }, 2200);
      });
    });
  }

  renderQuestion();
}

window.initAboutPage = initAboutPage;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
  initAboutPage();
}
