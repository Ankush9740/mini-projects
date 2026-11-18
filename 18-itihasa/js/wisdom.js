/**
 * ITIHASA — TEACHINGS & WISDOM ENGINE
 * js/wisdom.js
 */

const WISDOM_DATA = [
  {
    category: 'dharma',
    categoryName: 'Dharma and Duty',
    sanskrit: 'धर्मो रक्षति रक्षितः।',
    transliteration: 'dharmo rakṣati rakṣitaḥ',
    translation: 'Dharma protects those who protect it.',
    epic: 'Mahabharata (Vana Parva 313.128)',
    source: 'Mahabharata, Yudhishthira to the Yaksha',
    meaning: 'Righteousness is not a passive ideal, but a living cosmic law. When a human being upholds truth, justice, and moral duty in the face of hardship, that very righteousness becomes their impregnable armor in adversity.',
    context: 'Spoken by Yudhishthira when answering the Yaksha at the enchanted lake to revive his fallen brothers.'
  },
  {
    category: 'dharma',
    categoryName: 'Dharma and Duty',
    sanskrit: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।\nराजा सर्वस्य लोकस्य देवानामिव वासवः॥',
    transliteration: 'rāmo vigrahavān dharmaḥ sādhuḥ satyaparākramaḥ\nrājā sarvasya lokasya devānāmiva vāsavaḥ',
    translation: 'Rama is Dharma personified, noble and of unyielding truth in valor. He is the sovereign of all worlds, as Indra is of the gods.',
    epic: 'Valmiki Ramayana (Aranya Kanda 37.13)',
    source: 'Valmiki Ramayana, Demon Maricha to Ravana',
    meaning: 'True virtue is not an abstract philosophy; it must be manifested in living character, conduct, and everyday action. Even Rama’s foes recognized that his every breath was aligned with cosmic righteousness.',
    context: 'When Ravana demanded Maricha’s help to abduct Sita, Maricha cautioned him that attacking Rama was equivalent to assaulting Dharma itself.'
  },
  {
    category: 'courage',
    categoryName: 'Courage and Sacrifice',
    sanskrit: 'हतो वा प्राप्स्यसि स्वर्गं जित्वा वा भोक्ष्यसे महीम्।\nतस्मादुत्तिष्ठ कौन्तेय युद्धाय कृतनिश्चयः॥',
    transliteration: 'hato vā prāpsyasi svargaṁ jitvā vā bhokṣhyase mahīm\ntasmād uttiṣhṭha kaunteya yuddhāya kṛita-niśhchayaḥ',
    translation: 'If slain, you will attain the celestial realm; if victorious, you will enjoy the earth. Therefore, arise, O son of Kunti, resolved upon righteous battle!',
    epic: 'Bhagavad Gita (Chapter 2, Verse 37)',
    source: 'Bhagavad Gita, Lord Krishna to Arjuna',
    meaning: 'A warrior of truth has nothing to lose when fighting for justice. Defeat in a righteous struggle brings spiritual honor; victory establishes justice on earth. The only failure is cowardice and abandonment of moral responsibility.',
    context: 'Krishna dispelling Arjuna’s paralyzing hesitation on the battlefield of Kurukshetra.'
  },
  {
    category: 'courage',
    categoryName: 'Courage and Sacrifice',
    sanskrit: 'अपि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते।\nजननी जन्मभूमिश्च स्वर्गादपि गरीयसी॥',
    transliteration: 'api svarṇamayī laṅkā na me lakṣmaṇa rocate\njananī janmabhūmiśca svargādapi garīyasī',
    translation: 'Even though Lanka is made of pure gold, Lakshmana, it holds no delight for me. Mother and Motherland are far superior even to heaven itself.',
    epic: 'Valmiki Ramayana (Yuddha Kanda tradition)',
    source: 'Valmiki Ramayana, Lord Rama to Lakshmana',
    meaning: 'Material splendor, conqueror’s wealth, and golden citadels can never replace one’s filial devotion and ancestral soil. Self-respect, roots, and reverence for life surpass imperial vanity.',
    context: 'Spoken by Rama after vanquishing Ravana when Lakshmana marveled at the glittering golden palaces of Lanka.'
  },
  {
    category: 'devotion',
    categoryName: 'Devotion and Loyalty',
    sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥',
    transliteration: 'patraṁ puṣhpaṁ phalaṁ toyaṁ yo me bhaktyā prayachchhati\ntad ahaṁ bhakty-upahṛitam aśhnāmi prayatātmanaḥ',
    translation: 'If one offers Me with love and devotion a simple leaf, a flower, a fruit or water, I accept that offering of the pure in heart.',
    epic: 'Bhagavad Gita (Chapter 9, Verse 26)',
    source: 'Bhagavad Gita, Lord Krishna to Arjuna',
    meaning: 'The Divine measures not the cost or extravagance of an offering, but the sincerity, humility, and love with which it is presented. Pure heart transcends opulent rituals.',
    context: 'Krishna explaining the accessibility and simplicity of Bhakti Yoga.'
  },
  {
    category: 'wisdom',
    categoryName: 'Wisdom and Knowledge',
    sanskrit: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥',
    transliteration: 'na hi jñānena sadṛiśhaṁ pavitram iha vidyate\ntat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati',
    translation: 'In this world, there is nothing so sublime and pure as transcendental knowledge. One who has attained perfection in yoga finds this knowledge within oneself in due course of time.',
    epic: 'Bhagavad Gita (Chapter 4, Verse 38)',
    source: 'Bhagavad Gita, Lord Krishna to Arjuna',
    meaning: 'Wisdom is the ultimate purifier of consciousness. While intellectual study gives directions, true experiential realization blooms when the mind is disciplined through selfless action and meditation.',
    context: 'Expounding the nature of spiritual wisdom (Jnana) over ritual sacrifices.'
  },
  {
    category: 'friendship',
    categoryName: 'Friendship and Relationships',
    sanskrit: 'मित्राणि धनधान्यानि प्रजानां सम्मतान्यपि।\nजननी जन्मभूमिश्च दुर्लभानि पुनर्भवे॥',
    transliteration: 'mitrāṇi dhanadhānyāni prajānāṁ sammatānyapi\njananī janmabhūmiśca durlabhāni punarbhave',
    translation: 'Wealth, grains, and kingdom may be acquired again, but true friends, a mother, and the motherland cannot be regained once lost.',
    epic: 'Mahabharata (Shanti Parva)',
    source: 'Mahabharata, Bhishma Pitamaha’s Rajadharma',
    meaning: 'Material prosperity fluctuates with destiny, but genuine loyalty, fraternal devotion, and authentic friendships are rare cosmic treasures to be guarded with honor.',
    context: 'Bhishma delivering ethical counsel to Yudhishthira on the duties of governance and personal virtue.'
  },
  {
    category: 'leadership',
    categoryName: 'Leadership and Responsibility',
    sanskrit: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरोजनाः।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥',
    transliteration: 'yad yad ācharati śhreṣhṭhas tat tad evetaro janaḥ\nsa yat pramāṇaṁ kurute lokas tad anuvartate',
    translation: 'Whatever action a great leader performs, common men follow in their footsteps. Whatever standard they set by example, the entire world pursues.',
    epic: 'Bhagavad Gita (Chapter 3, Verse 21)',
    source: 'Bhagavad Gita, Lord Krishna to Arjuna',
    meaning: 'True leadership is established solely through personal example, integrity, and ethical standard. Society reflects the values lived by its statesmen and cultural mentors.',
    context: 'Krishna urging Arjuna to set an uncompromising moral standard for humanity rather than abandoning his royal post.'
  },
  {
    category: 'karma',
    categoryName: 'Consequences of Actions (Karma)',
    sanskrit: 'यथा धेनुसहस्रेषु वत्सो विन्दति मातरम्।\nतथा पूर्वकृतं कर्म कर्तारमनुगच्छति॥',
    transliteration: 'yathā dhenusahasreṣu vatso vindati mātaram\ntathā pūrvakṛtaṁ karma kartāramanugacchati',
    translation: 'Just as a calf finds its mother among a thousand cows, so does an action performed in the past unerringly find its author.',
    epic: 'Mahabharata (Anushasana Parva 7.22)',
    source: 'Mahabharata, Sage Vyasa to Yudhishthira',
    meaning: 'Every deed, thought, and word carries an inexorable karmic resonance. No soul can escape the moral harvest of what it has sown, urging human beings to live with conscious responsibility.',
    context: 'Vyasa consoling Yudhishthira on the unavoidable consequences of past deeds and cosmic destiny.'
  }
];

function initWisdomPage() {
  const container = document.getElementById('wisdom-cards-container');
  const tabs = document.querySelectorAll('.wisdom-tab-btn');

  if (!container) return;

  let currentCategory = 'all';

  function renderWisdom() {
    container.innerHTML = '';
    const filtered = WISDOM_DATA.filter(w => {
      if (currentCategory === 'all') return true;
      return w.category === currentCategory;
    });

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'wisdom-manuscript-card reveal';
      card.innerHTML = `
        <div class="manuscript-header">
          <span class="manuscript-category-pill">${item.categoryName}</span>
          <span class="manuscript-source-ref">${item.epic}</span>
        </div>
        
        <div class="manuscript-body">
          <div class="manuscript-shloka">${item.sanskrit.replace(/\n/g, '<br>')}</div>
          <div class="manuscript-translit">${item.transliteration.replace(/\n/g, '<br>')}</div>
          <div class="manuscript-meaning">"${item.translation}"</div>
          
          <div class="manuscript-commentary">
            <h6>Philosophical Insight</h6>
            <p>${item.meaning}</p>
            <p style="font-size: 0.88rem; color: #9FAEB8; margin-top: 0.5rem; font-style: italic;">
              <strong>Context:</strong> ${item.context}
            </p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    setTimeout(() => {
      container.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    }, 50);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderWisdom();
    });
  });

  renderWisdom();
}

document.addEventListener('DOMContentLoaded', initWisdomPage);
