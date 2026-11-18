/**
 * ITIHASA — MAHABHARATA INTERACTIVE ENGINE
 * js/mahabharata.js
 */

const MAHABHARATA_CHAPTERS = [
  {
    id: 1,
    title: 'The Kuru Dynasty & Shantanu',
    subtitle: 'Ancestral Origins and the Terrible Vow',
    image: 'assets/images/mahabharata/kuru-dynasty.jpg',
    desc: 'The epic begins with the ancient kings of the Lunar Dynasty (Chandravamsha) on the sacred banks of the Ganga. King Shantanu marries the celestial Ganga, and later Satyavati. To enable his father’s marriage and happiness, prince Devavrata takes the awe-inspiring vow of lifelong celibacy and gives up the royal throne, earning the name Bhishma (He of the Terrible Vow).',
    events: ['Shantanu and River Goddess Ganga', 'Devavrata’s Pratigna (Terrible Vow)', 'Lineage of Vichitravirya and Sage Vyasa']
  },
  {
    id: 2,
    title: 'Birth of Pandavas and Kauravas',
    subtitle: 'The Celestial Sons Born in Forest and Palace',
    image: 'assets/images/mahabharata/pandavas-birth.jpg',
    desc: 'Due to a curse on King Pandu, Queen Kunti invokes the sacred mantra given by Sage Durvasa to summon the celestial gods: Dharma (Yudhishthira), Vayu (Bhima), and Indra (Arjuna), while Madri summons the Ashwini Kumaras (Nakula and Sahadeva). Concurrently, Queen Gandhari gives birth to one hundred sons led by Duryodhana and Dushasana in the palace of Hastinapura.',
    events: ['Invocation of the Devas in the wilderness', 'Birth of the 100 Kauravas in Hastinapura', 'Passing of Pandu and Return of Pandavas to Court']
  },
  {
    id: 3,
    title: 'Education under Dronacharya',
    subtitle: 'Martial Mastery and the Eye of the Bird',
    image: 'assets/images/mahabharata/drona-education.jpg',
    desc: 'The princes are trained by Guru Dronacharya in the supreme martial sciences of the Dhanurveda. Arjuna proves himself as the most dedicated and focused student through the iconic test of the wooden bird’s eye. The growing envy of Duryodhana begins to simmer as the Pandavas display superior discipline, valour, and popularity among the citizens.',
    events: ['The Test of the Bird’s Eye', 'The Tournament of Champions in Hastinapura', 'First appearance of Karna challenging Arjuna']
  },
  {
    id: 4,
    title: "Draupadi's Swayamvara",
    subtitle: 'The Matsya Yantra and Alliance with Panchala',
    image: 'assets/images/mahabharata/draupadi-swayamvara.jpg',
    desc: 'After surviving the fiery assassination attempt in the lacquer house (Lakshagriha), the Pandavas live disguised as poor Brahmanas. Travelling to the kingdom of Panchala, Arjuna alone successfully strings the colossal steel bow and pierces the eye of the revolving fish target through its reflection in water, winning the hand of Princess Draupadi.',
    events: ['Survival of the Lakshagriha Fire', 'The Archery Feat of Matsya Yantra', 'Marriage to the Five Pandavas under Kunti’s Words']
  },
  {
    id: 5,
    title: 'The Kingdom of Indraprastha',
    subtitle: 'The Maya Sabha and the Rajasuya Yajna',
    image: 'assets/images/mahabharata/indraprastha-palace.jpg',
    desc: 'To avert civil conflict, the kingdom is divided. The Pandavas receive the arid Khandava forest and, guided by Krishna and architect Mayasura, transform it into Indraprastha, a resplendent imperial wonder. Yudhishthira performs the supreme Rajasuya sacrifice to be acclaimed emperor, where Krishna slays the blasphemous Shishupala with the Sudarshana Chakra.',
    events: ['Clearing of Khandava & Maya’s Architectural Marvel', 'The Rajasuya Sacrifice of Sovereign Dominion', 'Slaying of Shishupala by Krishna']
  },
  {
    id: 6,
    title: 'The Fatal Game of Dice',
    subtitle: 'The Subversion of Dharma in the Royal Assembly',
    image: 'assets/images/mahabharata/game-of-dice.jpg',
    desc: 'Consumed by jealousy upon seeing Indraprastha, Duryodhana invites Yudhishthira to a game of dice in Hastinapura. Wielding magical loaded dice, Shakuni tricks Yudhishthira into staking and losing his kingdom, his brothers, himself, and finally Empress Draupadi. When Dushasana attempts to disrobe her in court, Krishna miraculously supplies an infinite stream of silken robes.',
    events: ['Shakuni’s Deceitful Dice Play', 'The Disrobing of Draupadi in the Royal Court', 'Krishna’s Divine Intervention of Infinite Garments', 'The Vows of Bhima and Draupadi']
  },
  {
    id: 7,
    title: 'The Twelve-Year Forest Exile',
    subtitle: 'Penance, Wisdom, and Agyatavasa in Matsya',
    image: 'assets/images/mahabharata/pandavas-exile.jpg',
    desc: 'Banishment of the Pandavas for twelve years in primeval forests and a thirteenth year in complete disguise (Agyatavasa). During exile, Arjuna obtains the Pashupatastra from Lord Shiva, Yudhishthira answers the cosmic queries of the Yaksha, and the Pandavas serve incognito in the court of King Virata.',
    events: ['Arjuna’s Penance to Lord Shiva on Indrakeela', 'Yaksha Prashna: Riddles of Life and Death', 'Agyatavasa in Virata and Slaying of Keechaka by Bhima']
  },
  {
    id: 8,
    title: "Krishna's Peace Mission",
    subtitle: 'The Divine Envoy and the Rejection of Peace',
    image: 'assets/images/mahabharata/krishna-peace-mission.jpg',
    desc: 'With the exile completed, the Pandavas seek only five humble villages to avoid war. Lord Krishna travels personally as an ambassador of peace (Shanti Duta) to Hastinapura. In arrogant folly, Duryodhana refuses even a needle-point of earth and attempts to bind Krishna, prompting the Lord to reveal his blinding cosmic form (Vishwaroopa) in the assembly.',
    events: ['The Proposal of Five Villages', 'Attempt to Imprison Krishna in the Sabha', 'The First Revelation of the Vishwaroopa Form']
  },
  {
    id: 9,
    title: 'The Bhagavad Gita',
    subtitle: 'The Song Celestial upon the Sacred Field',
    image: 'assets/images/mahabharata/bhagavad-gita.jpg',
    desc: 'On the morning of the war between eleven Akshauhinis of Kauravas and seven of Pandavas, Arjuna collapses in grief and moral despair seeing revered elders and kin arrayed for slaughter. Lord Krishna, holding the reins of the white horses, delivers the immortal 700 verses of the Bhagavad Gita, expounding the paths of Karma Yoga, Bhakti Yoga, and Jnana Yoga.',
    events: ['Arjuna Vishada Yoga: The Warrior’s Crisis of Conscience', 'Expounding the Eternity of the Atman', 'The Cosmic Revelation of the Universal Form (Chapter 11)']
  },
  {
    id: 10,
    title: 'The Kurukshetra War',
    subtitle: 'The Eighteen-Day Apocalypse of Righteousness',
    image: 'assets/images/mahabharata/kurukshetra-war.jpg',
    desc: 'Eighteen days of cataclysmic clash between the greatest warriors of ancient Bharat. Bhishma falls on day 10, Abhimanyu martyrs himself in the Chakra Vyuha on day 13, Drona falls on day 15, Karna is slain by Arjuna on day 17, and Bhima shatters Duryodhana’s thighs in the final mace duel on day 18.',
    events: ['The Bed of Arrows for Bhishma', 'Abhimanyu’s Heroic Stand in Chakra Vyuha', 'Duel of Titans: Karna vs Arjuna', 'Bhima vs Duryodhana at Dvaipayana Lake']
  },
  {
    id: 11,
    title: 'The Aftermath & Final Journey',
    subtitle: 'The Lament, Ashwamedha, and Mahaprasthana',
    image: 'assets/images/mahabharata/war-aftermath.jpg',
    desc: 'The war leaves millions dead. Yudhishthira is crowned emperor with heavy sorrow and receives supreme philosophical guidance from dying Bhishma on Shara-shayya (Shanti and Anushasana Parvas). After decades of just rule, the Pandavas and Draupadi embark on their final pilgrimage (Mahaprasthana) toward Mount Meru, where Yudhishthira alone enters heaven accompanied by Dharma in the form of a dog.',
    events: ['Queen Gandhari’s Heartbreaking Lament', 'Bhishma’s Final Teachings and Vishnu Sahasranama', 'The Imperial Ashwamedha Yajna', 'The Final Ascent into Heaven']
  }
];

const KURUKSHETRA_WAR_DAYS = [
  {
    day: 'Day 1 to 10',
    title: 'The Supreme Command of Bhishma',
    commander: 'Pitamaha Bhishma',
    image: 'assets/images/mahabharata/bhishma-fall.jpg',
    summary: 'For ten days, the invincible Bhishma decimates thousands of Pandava warriors daily with divine astras. Unable to defeat him head-on, Arjuna places Shikhandi before his chariot. Bound by his sacred vow never to raise weapons against someone born female, Bhishma lowers his bow. Arjuna pierces him with countless arrows until the grand patriarch falls upon a bed of arrows (Shara-shayya), retaining life by his boon of death-at-will (Iccha-Mrityu).',
    significance: 'The fall of the moral pillar of the Kuru dynasty. Bhishma demonstrates that even the greatest champion cannot triumph when standing on the side of Adharma.'
  },
  {
    day: 'Day 11 to 15',
    title: 'The Command of Dronacharya & Chakra Vyuha',
    commander: 'Guru Dronacharya',
    image: 'assets/images/mahabharata/abhimanyu-chakra-vyuha.jpg',
    summary: 'Acharya Drona takes command with ruthless military strategy. On Day 13, while Arjuna is diverted by the Samsaptakas, Drona arrays the impregnable Chakra Vyuha. Sixteen-year-old Abhimanyu breaches it alone, defying seven legendary Maharathis until killed unarmed in an unjust violation of warfare rules. On Day 15, upon hearing the truth-veiled announcement "Ashwatthama is dead (the elephant)", Drona drops his weapons in meditation and is slain by Dhrishtadyumna.',
    significance: 'Exposes how the decay of rules of war on both sides leads to tragedy, testing the very boundaries of truth and human ethics.'
  },
  {
    day: 'Day 16 to 17',
    title: 'The Command of Karna & The Clash of Titans',
    commander: 'Radheya Karna',
    image: 'assets/images/mahabharata/karna-arjuna-duel.jpg',
    summary: 'Karna is anointed supreme commander on Day 16. On Day 17, the long-awaited duel between Karna and Arjuna takes place. As Karna’s chariot wheel sinks into the earth due to an ancient curse and his astras fail him, Krishna reminds Arjuna of Karna’s role in Draupadi’s humiliation and Abhimanyu’s death. Arjuna releases the celestial Anjalika astra, felling the tragic sun-child of Kunti.',
    significance: 'The resolution of the epic’s greatest personal rivalry. Illustrates that sublime personal talent and generosity cannot save one who aligns with tyranny.'
  },
  {
    day: 'Day 18',
    title: 'The Fall of Shalya & The Final Mace Duel',
    commander: 'King Shalya & Duryodhana',
    image: 'assets/images/mahabharata/bhima-duryodhana-mace.jpg',
    summary: 'On the final morning, Yudhishthira slays King Shalya. Duryodhana hides beneath the waters of Dvaipayana Lake using magical breath control. Taunted out by the Pandavas, he accepts a one-on-one mace duel with Bhima. After an earth-shaking duel, Bhima fulfills his sacred vow by striking Duryodhana on the thighs with his mace. The war concludes with the triumph of the Pandavas, leaving only a handful of survivors.',
    significance: 'The ultimate conclusion of the eighteen-day war, fulfilling the cosmic cleansing of Adharma and paving the way for the restoration of righteousness.'
  }
];

const GITA_SHLOKAS = [
  {
    id: 1,
    chapter: 'Chapter 2, Verse 47',
    topic: 'Karma Yoga — The Law of Right Action',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi',
    translation: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to inaction.',
    purport: 'The core axiom of Karma Yoga: act with supreme excellence and dedication as an offering to Dharma, free from the paralyzing anxieties of personal reward or failure.'
  },
  {
    id: 2,
    chapter: 'Chapter 4, Verses 7-8',
    topic: 'The Avataric Purpose — Restoration of Dharma',
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥\nपरित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥',
    transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛijāmy aham\nparitrāṇāya sādhūnāṁ vināśhāya cha duṣhkṛitām\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge',
    translation: 'Whenever and wherever there is a decline in righteousness, O Bharata, and an ascent of unrighteousness, at that time I manifest Myself. For the protection of the good, for the destruction of the wicked, and for the establishment of Dharma, I appear millennium after millennium.',
    purport: 'The eternal promise of the Divine to preserve cosmic balance whenever human moral order is threatened by overwhelming tyranny.'
  },
  {
    id: 3,
    chapter: 'Chapter 2, Verse 20',
    topic: 'The Immortality of the Soul (Atman)',
    sanskrit: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
    transliteration: 'na jāyate mriyate vā kadāchin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śhāśhvato ’yaṁ purāṇo\nna hanyate hanyamāne śharīre',
    translation: 'The soul is neither born, nor does it ever die; nor having once existed, does it ever cease to be. The soul is unborn, eternal, ever-existing, undying and primeval. It is not slain when the body is slain.',
    purport: 'Removes the root cause of Arjuna’s grief by revealing that physical form is merely a garment; the conscious soul within is immortal and indestructible.'
  },
  {
    id: 4,
    chapter: 'Chapter 9, Verse 22',
    topic: 'Bhakti Yoga — Divine Protection',
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    transliteration: 'ananyāśh chintayanto māṁ ye janāḥ paryupāsate\nteṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmy aham',
    translation: 'To those who worship Me with single-minded devotion, meditating on My transcendental form, to them whose minds are always fixed on Me, I carry what they lack and preserve what they have.',
    purport: 'The unconditional refuge offered by the Divine to sincere seekers who center their lives upon righteous devotion.'
  },
  {
    id: 5,
    chapter: 'Chapter 18, Verse 66',
    topic: 'Charama Shloka — Complete Surrender (Sharanagati)',
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    transliteration: 'sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ',
    translation: 'Abandon all varieties of dharmas and simply surrender unto Me alone. I shall deliver you from all sinful reactions; do not grieve.',
    purport: 'The culminating instruction of the Bhagavad Gita: transcending rigid ritual dogmas and resting in supreme trust and alignment with the Divine Supreme.'
  }
];

function initMahabharataPage() {
  // 11 Chapters Switcher
  const navBtns = document.querySelectorAll('.chapter-nav-btn');
  const chapterContainer = document.getElementById('mb-chapters-container');

  if (chapterContainer && navBtns.length) {
    function renderChapter(index) {
      const ch = MAHABHARATA_CHAPTERS[index];
      if (!ch) return;

      chapterContainer.innerHTML = `
        <div class="mb-chapter-card active">
          <div class="kanda-visual-col">
            <img src="${ch.image}" alt="${ch.title}">
            <div class="kanda-number-badge" style="background: rgba(23, 43, 67, 0.9);">Chapter ${ch.id} of 11</div>
          </div>
          <div class="kanda-text-col">
            <div class="kanda-sanskrit" style="color: var(--color-celestial-blue);">पर्व अध्यायः ${ch.id}</div>
            <h3 class="kanda-title">${ch.title}</h3>
            <p class="kanda-subtitle">${ch.subtitle}</p>
            <p class="kanda-desc">${ch.desc}</p>
            
            <div class="kanda-highlights" style="border-left-color: var(--color-celestial-blue); background: rgba(14, 26, 41, 0.7);">
              <h5 style="color: var(--color-celestial-blue);">Crucial Moments in this Chapter</h5>
              <ul>
                ${ch.events.map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>

            <div class="kanda-pagination-nav">
              <button class="btn-kanda-prev" ${index === 0 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
                ← Previous Chapter
              </button>
              <span style="font-family: var(--font-heading); font-size: 0.85rem; color: var(--color-temple-gold);">
                ${index + 1} / 11
              </span>
              <button class="btn-kanda-next" ${index === MAHABHARATA_CHAPTERS.length - 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
                Next Chapter →
              </button>
            </div>
          </div>
        </div>
      `;

      navBtns.forEach((b, i) => {
        if (i === index) b.classList.add('active');
        else b.classList.remove('active');
      });

      const prevBtn = chapterContainer.querySelector('.btn-kanda-prev');
      const nextBtn = chapterContainer.querySelector('.btn-kanda-next');

      if (prevBtn && index > 0) {
        prevBtn.addEventListener('click', () => {
          renderChapter(index - 1);
          if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
            window.ItihasaMusic.playTempleBell();
          }
        });
      }
      if (nextBtn && index < MAHABHARATA_CHAPTERS.length - 1) {
        nextBtn.addEventListener('click', () => {
          renderChapter(index + 1);
          if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
            window.ItihasaMusic.playTempleBell();
          }
        });
      }
    }

    navBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        renderChapter(idx);
        if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
          window.ItihasaMusic.playTempleBell();
        }
      });
    });

    renderChapter(0);
  }

  // 18-Day Kurukshetra War Interactive Section
  const warDaysList = document.getElementById('war-days-list');
  const warDisplay = document.getElementById('war-detail-display');

  if (warDaysList && warDisplay) {
    warDaysList.innerHTML = '';

    KURUKSHETRA_WAR_DAYS.forEach((phase, idx) => {
      const btn = document.createElement('button');
      btn.className = `btn-war-day ${idx === 0 ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="war-day-num">${phase.day}</span>
        <span class="war-day-title">${phase.title}</span>
      `;
      btn.addEventListener('click', () => {
        warDaysList.querySelectorAll('.btn-war-day').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderWarPhase(phase);
        if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
          window.ItihasaMusic.playTempleBell();
        }
      });
      warDaysList.appendChild(btn);
    });

    function renderWarPhase(phase) {
      warDisplay.innerHTML = `
        <div class="war-display-banner">
          <img src="${phase.image}" alt="${phase.title}">
        </div>
        <div class="war-display-body">
          <span class="war-commander-tag">${phase.commander} — ${phase.day}</span>
          <h3 class="war-day-heading">${phase.title}</h3>
          <p class="war-day-summary">${phase.summary}</p>
          <div class="war-significance-box">
            <h6>Philosophical & Strategic Significance</h6>
            <p>${phase.significance}</p>
          </div>
        </div>
      `;
    }

    renderWarPhase(KURUKSHETRA_WAR_DAYS[0]);
  }

  // Bhagavad Gita Verse Explorer
  const gitaTabsContainer = document.getElementById('gita-shloka-tabs');
  const gitaDisplay = document.getElementById('gita-shloka-display');

  if (gitaTabsContainer && gitaDisplay) {
    gitaTabsContainer.innerHTML = '';

    GITA_SHLOKAS.forEach((shloka, idx) => {
      const tab = document.createElement('button');
      tab.className = `btn-shloka-tab ${idx === 0 ? 'active' : ''}`;
      tab.textContent = shloka.topic;
      tab.addEventListener('click', () => {
        gitaTabsContainer.querySelectorAll('.btn-shloka-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderShloka(shloka);
        if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
          window.ItihasaMusic.playTempleBell();
        }
      });
      gitaTabsContainer.appendChild(tab);
    });

    function renderShloka(shloka) {
      gitaDisplay.innerHTML = `
        <div class="shloka-display-card">
          <div class="shloka-reference">${shloka.chapter} • ${shloka.topic}</div>
          <div class="shloka-sanskrit">${shloka.sanskrit.replace(/\n/g, '<br>')}</div>
          <div class="shloka-transliteration">${shloka.transliteration.replace(/\n/g, '<br>')}</div>
          <div class="shloka-translation-box">
            <h6>Meaning in English</h6>
            <p class="shloka-translation">"${shloka.translation}"</p>
            <h6>Philosophical Essence</h6>
            <p class="shloka-purport">${shloka.purport}</p>
          </div>
        </div>
      `;
    }

    renderShloka(GITA_SHLOKAS[0]);
  }
}

document.addEventListener('DOMContentLoaded', initMahabharataPage);
