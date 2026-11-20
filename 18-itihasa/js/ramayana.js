/**
 * ITIHASA — RAMAYANA INTERACTIVE ENGINE & SCHOLARLY DATA
 * js/ramayana.js
 * 
 * Culturally authentic, minimal, and comprehensive digital experience
 * of the Valmiki Ramayana and its living traditions.
 */

// 1. THE SEVEN KANDAS (Saptakandani)
const RAMAYANA_KANDAS = [
  {
    id: 1,
    title: 'Bala Kanda',
    sanskrit: 'बालकाण्डम्',
    subtitle: 'The Childhood and Divine Awakening',
    image: 'assets/images/kandas/bala-kanda.webp',
    verse: {
      sanskrit: 'तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम्।\nनारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम्॥',
      iast: 'tapaḥ-svādhyāya-nirataṁ tapasvī vāgvidāṁ varam\nnāradaṁ paripapracha vālmīkir-munipuṅgavam',
      meaning: 'Maharishi Valmiki, dedicated to severe penance and Vedic study, inquired of divine sage Narada, the foremost among eloquent masters: "Who in this world is truly endowed with ideal virtues?"'
    },
    desc: 'The opening book of the epic chronicles the celestial origins, the divine birth of Lord Rama and his brothers to King Dasharatha in Ayodhya through the sacred Putrakameshti sacrifice. It recounts their youthful tutelage under Brahmarshi Vishvamitra, the slaying of demons Tataka and Subahu, the redemption of Ahalya, and the momentous wedding in Mithila where young Rama lifts and strings the mighty Shiva Dhanush (Pinaka) to win the hand of Goddess Sita.',
    highlights: [
      'The sacred birth of the four divine princes in the golden city of Ayodhya',
      'Vishvamitra guides Rama and Lakshmana into the enchanted forests',
      'Deliverance of Sage Gautama’s cursed wife, Ahalya, through the touch of Rama’s feet',
      'The lifting and breaking of Lord Shiva’s Pinaka bow in the royal assembly of King Janaka',
      'Fourfold celestial wedding uniting Ayodhya and Videha'
    ],
    characters: 'Lord Rama, Goddess Sita, Lakshmana, Sage Vishvamitra, King Dasharatha, King Janaka, Ahalya'
  },
  {
    id: 2,
    title: 'Ayodhya Kanda',
    sanskrit: 'अयोध्याकाण्डम्',
    subtitle: 'The Royal Expatriation and Filial Vow',
    image: 'assets/images/kandas/ayodhya-kanda.webp',
    verse: {
      sanskrit: 'न वनं गन्तुकामस्य पादौ संस्पृशतो मम।\nअनुकम्पां विना सीता नान्यत्किञ्चित्प्रपद्यते॥',
      iast: 'na vanaṁ gantukāmasya pādau saṁspṛśato mama\nanukampāṁ vinā sītā nānyat-kiñcit-prapadyate',
      meaning: 'As Rama prepares to depart for the wilderness, Goddess Sita touches his feet, choosing to share his forest exile over any palace comfort, asking only for his companionship.'
    },
    desc: 'On the eve of Rama’s joyful coronation as Yuvaraja, Queen Kaikeyi, poisoned by the wicked counsel of maidservant Manthara, invokes two boons granted to her long ago by Dasharatha: to banish Rama to the Dandakaranya forest for fourteen years and crown her own son Bharata. To safeguard his father’s sacred word and Dharma, Rama peacefully renounces the empire without an ounce of bitterness, joined by his steadfast wife Sita and devoted brother Lakshmana.',
    highlights: [
      'Joyous preparations for Rama’s coronation turned to sudden sorrow',
      'Kaikeyi’s fatal demand in the chamber of sorrow (Kopa Griha)',
      'Rama’s serene detachment and refusal to blame destiny or persons',
      'Sita and Lakshmana’s resolute decision to accompany Rama into exile',
      'Heartbroken passing of King Dasharatha and Bharata’s refusal to accept the throne'
    ],
    characters: 'Lord Rama, Goddess Sita, Lakshmana, King Dasharatha, Queen Kaikeyi, Queen Kaushalya, Bharata, Sumantra'
  },
  {
    id: 3,
    title: 'Aranya Kanda',
    sanskrit: 'अरण्यकाण्डम्',
    subtitle: 'Hermitage Life in the Primeval Forest',
    image: 'assets/images/kandas/aranya-kanda.webp',
    verse: {
      sanskrit: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।\nराजा सर्वस्य लोकस्य देवानामिव वासवः॥',
      iast: 'rāmo vigrahavān dharmaḥ sādhuḥ satyaparākramaḥ\nrājā sarvasya lokasya devānāmiva vāsavaḥ',
      meaning: 'Rama is Dharma personified, noble and of unyielding truth in valor. He is the sovereign of all worlds, as Indra is of the gods.'
    },
    desc: 'Rama, Sita, and Lakshmana journey deep into Dandakaranya, visiting holy hermitages of revered sages Agastya, Sharabhanga, and Sutikshna. Settling at serene Panchavati beside the sacred river Godavari, their tranquility is shattered when the demoness Shurpanakha attempts to slay Sita. Her mutilation provokes her demon brothers Khara and Dushana, and ultimately leads King Ravana to deploy the demon Maricha disguised as a shimmering golden deer to lure Rama away and abduct Sita.',
    highlights: [
      'Sacred discourses with Maharishi Agastya and reception of celestial weapons',
      'Peaceful dwelling at Panchavati along the sacred Godavari river',
      'The defeat of 14,000 rakshasas led by Khara and Dushana',
      'The deceptive golden deer Maricha and the breach of hermitage peace',
      'The abduction of Goddess Sita by Ravana and Jatayu’s heroic sacrifice'
    ],
    characters: 'Lord Rama, Goddess Sita, Lakshmana, Sage Agastya, Shurpanakha, Maricha, Jatayu, Ravana'
  },
  {
    id: 4,
    title: 'Kishkindha Kanda',
    sanskrit: 'किष्किन्धाकाण्डम्',
    subtitle: 'The Sacred Alliance with the Vanaras',
    image: 'assets/images/kandas/kishkindha-kanda.webp',
    verse: {
      sanskrit: 'वयस्यं पावकं कृत्वा सख्यमस्यां समाचरत्।\nअन्योन्यं प्रीतिसंयुक्तौ चक्रतुः कार्यसाधनम्॥',
      iast: 'vayasyaṁ pāvakaṁ kṛtvā sakhyam-asyāṁ samācarat\nanyonyaṁ prīti-saṁyuktau cakratuḥ kārya-sādhanam',
      meaning: 'Making the sacred fire their eternal witness, Rama and Sugriva solemnized their unbreakable pact of friendship, pledging mutual aid in devotion and righteousness.'
    },
    desc: 'Wandering in desolation in search of Sita, Rama reaches scenic Pampa lake and meets Hanuman at Mount Rishyamukha. Hanuman introduces Rama to the exiled Vanara prince Sugriva. Rama pledges to liberate Sugriva from his tyrannical brother Vali, while Sugriva promises to mobilize his legions of Vanaras to find Sita. Following Vali’s death, the Vanaras disperse across the four directions, with the southern detachment reaching the shore of the vast southern sea.',
    highlights: [
      'First meeting between Lord Rama and Hanuman disguised as a young ascetic',
      'Sacred pact of eternal friendship struck between Rama and Sugriva over sacred fire',
      'The liberation of Vali and righteous coronation of Sugriva',
      'Mobilization of millions of Vanaras to comb the earth for Sita',
      'Sampati reveals that Sita is held captive across the southern sea in Lanka'
    ],
    characters: 'Lord Rama, Lakshmana, Hanuman, Sugriva, Vali, Tara, Angada, Jambavan, Sampati'
  },
  {
    id: 5,
    title: 'Sundara Kanda',
    sanskrit: 'सुन्दरकाण्डम्',
    subtitle: 'Hanuman’s Miraculous Quest to Lanka',
    image: 'assets/images/kandas/sundara-kanda.webp',
    verse: {
      sanskrit: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
      iast: 'manojavaṁ māruta-tulya-vegaṁ jitendriyaṁ buddhimatāṁ variṣṭham\nvātātmajaṁ vānara-yūtha-mukhyaṁ śrī-rāma-dūtaṁ śaraṇaṁ prapadye',
      meaning: 'I surrender to the messenger of Sri Rama, who is swift as thought, fast as the wind, master of the senses, foremost among the wise, son of the wind God and leader of the Vanaras.'
    },
    desc: 'The heart and crown jewel of the Ramayana. Reminded of his boundless latent powers by Jambavan, Hanuman expands to colossal proportions and leaps across the ocean from Mount Mahendra. Entering the golden island city of Lanka under cover of darkness, he searches the palaces until finding Goddess Sita sitting grief-stricken beneath a Simshapa tree in Ashoka Vatika. He presents Rama’s signet ring (Mudrika), burns Lanka to ash with his flaming tail, and returns to Rama with Sita’s celestial jewel (Chudamani).',
    highlights: [
      'Hanuman’s epic leap over the sea, conquering Surasa, Mainaka, and Simhika',
      'Infiltration of Lanka by night and finding Sita in Ashoka Vatika',
      'The delivery of Rama’s ring and rekindling of divine hope in Sita’s heart',
      'Single-handed destruction of Ashoka Vatika and slaying of Akshakumara',
      'Setting the golden towers of Lanka ablaze with his captured flaming tail'
    ],
    characters: 'Hanuman, Goddess Sita, King Ravana, Indrajit, Vibhishana, Trijata, Jambavan'
  },
  {
    id: 6,
    title: 'Yuddha Kanda',
    sanskrit: 'युद्धकाण्डम्',
    subtitle: 'The Great Battle of Lanka and Triumph of Dharma',
    image: 'assets/images/kandas/yuddha-kanda.webp',
    verse: {
      sanskrit: 'अपि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते।\nजननी जन्मभूमिश्च स्वर्गादपि गरीयसी॥',
      iast: 'api svarṇamayī laṅkā na me lakṣmaṇa rocate\njananī janmabhūmiśca svargādapi garīyasī',
      meaning: 'Even though Lanka is made of pure gold, Lakshmana, it holds no delight for me. Mother and Motherland are far superior even to heaven itself.'
    },
    desc: 'The grand military climax of the epic. Rama’s Vanara army marches to the southern shore. Samudra Deva yields and reveals that architect Nala can build a stone causeway (Rama Setu). The bridge is constructed across the ocean. The siege of Lanka ensues in colossal warfare: Kumbhakarna falls to Rama, Lakshmana slays the illusionist Indrajit, and Rama vanquishes Ravana using the divine Brahmastra revealed by Maharishi Agastya.',
    highlights: [
      'Righteous Vibhishana defects from Lanka and seeks unconditional refuge (Sharanagati)',
      'The architectural wonder of Rama Setu constructed across the roaring ocean',
      'The fierce duel of titans: Kumbhakarna, Indrajit, and Ravana',
      'Hanuman leaps to the Himalayas to bring Mount Dronagiri bearing Sanjeevani',
      'Sage Agastya imparts the sacred Aditya Hridaya Stotram to Rama before final victory'
    ],
    characters: 'Lord Rama, Lakshmana, Hanuman, Ravana, Kumbhakarna, Indrajit, Vibhishana, Nala, Nila, Angada'
  },
  {
    id: 7,
    title: 'Uttara Kanda',
    sanskrit: 'उत्तरकाण्डम्',
    subtitle: 'The Golden Coronation and Eternal Legacy',
    image: 'assets/images/kandas/uttara-kanda.webp',
    verse: {
      sanskrit: 'न पर्यदेवयन् विधवा न च व्यालकृतं भयम्।\nन व्याधिजं भयं चासीद् रामे राज्यं प्रशासति॥',
      iast: 'na paryadevayan vidhavā na ca vyālakṛtaṁ bhayam\nna vyādhijaṁ bhayaṁ cāsīd rāme rājyaṁ praśāsati',
      meaning: 'While Rama ruled the kingdom, no widow wailed in despair, there was no danger from ferocious beasts, and diseases held no dread. Righteousness pervaded all life.'
    },
    desc: 'Having completed the fourteen years of exile, Rama, Sita, and Lakshmana return to Ayodhya aboard the Pushpaka Vimana to a joyous city illuminated with millions of oil lamps (the first Deepavali). Rama is consecrated on the ancestral throne, inaugurating the golden age of Ramrajya where righteousness, prosperity, and joy pervade all nature. The book narrates the birth of twin sons Lava and Kusha in Valmiki’s ashrama, their singing of the Ramayana, and the eternal ascension to Vaikuntha.',
    highlights: [
      'The joyous return to Ayodhya and historic coronation of Lord Rama',
      'Establishment of Ramrajya: a societal order free of sorrow, famine, and injustice',
      'Birth of twins Lava and Kusha at Maharishi Valmiki’s peaceful hermitage',
      'Lava and Kusha sing the sweet verses of the Ramayana in the royal assembly',
      'The eternal legacy of the epic inspiring human civilization across millennia'
    ],
    characters: 'Lord Rama, Goddess Sita, Lakshmana, Bharata, Shatrughna, Hanuman, Valmiki, Lava, Kusha'
  }
];

// 2. ICONIC MILESTONE EVENTS
const RAMAYANA_EVENTS = [
  {
    title: "Rama's Noble Exile",
    epic: "Ramayana",
    image: "assets/images/events/forest-exile.webp",
    desc: "Renouncing the supreme sovereignty of Ayodhya without sorrow, Rama teaches humanity that upholding parental honor, truth (Satya), and selflessness ranks above all worldly wealth and power.",
    qualities: ["Satya (Truth)", "Nishkama Dharma", "Fraternal Reverence"],
    associated: "Ayodhya Kanda, River Tamasa crossing, Nishadaraja Guha alliance."
  },
  {
    title: "The Golden Deer (Maricha)",
    epic: "Ramayana",
    image: "assets/images/events/golden-deer.webp",
    desc: "The deceitful illusion deployed by Ravana to entice Sita’s gentle heart. Demonstrates how temptation and illusion (Maya) can draw seekers away from the shelter of righteousness.",
    qualities: ["Illusion (Maya)", "Destiny’s Thread", "Vigilance"],
    associated: "Aranya Kanda, Panchavati, Lakshmana Rekha."
  },
  {
    title: "Sita's Abduction",
    epic: "Ramayana",
    image: "assets/images/events/sita-abduction.webp",
    desc: "The pivotal tragedy that set the cosmic destruction of adharma into motion. Ravana approaches in the garb of a wandering mendicant (Bhikshu), violating the sacred hospitality of the forest.",
    qualities: ["Test of Fortitude", "Purity of Spirit", "Karmic Inevitability"],
    associated: "Aranya Kanda, Ravana's Chariot, Jatayu's celestial aerial clash."
  },
  {
    title: "Hanuman in Ashoka Vatika",
    epic: "Ramayana",
    image: "assets/images/events/ashoka-vatika.webp",
    desc: "Finding Goddess Sita weeping beneath the Simshapa tree, Hanuman delivers Rama’s golden signet ring, breathing transcendent hope and courage into her spirit while defying the entire titan empire.",
    qualities: ["Supreme Devotion", "Tactful Eloquence", "Fearlessness"],
    associated: "Sundara Kanda, Mudrika Pradana, Chudamani Mani reception."
  },
  {
    title: "Lifting the Sanjeevani Mountain",
    epic: "Ramayana",
    image: "assets/images/events/sanjeevani.webp",
    desc: "When Lakshmana was mortally struck by Indrajit’s spear, Hanuman flew across India to Mount Dronagiri. Unable to identify the exact glowing herb, he lifted the entire mountain and flew back before sunrise.",
    qualities: ["Boundless Capacity", "Urgency of Love", "Miraculous Strength"],
    associated: "Yuddha Kanda, Vaidya Sushena, Mount Dronagiri, Healing of Lakshmana."
  },
  {
    title: "Construction of Rama Setu",
    epic: "Ramayana",
    image: "assets/images/events/rama-setu.webp",
    desc: "Engineered by Nala and Nila, the Vanaras wrote the sacred name of 'RAMA' on boulders and cast them into the roaring ocean. The stones floated by divine grace, building an ancient bridge across the sea.",
    qualities: ["Unity in Devotion", "Divine Grace", "Architectural Mastery"],
    associated: "Yuddha Kanda, Rameswaram, Samudra Deva submission, Setubandha."
  },
  {
    title: "The Battle with Ravana",
    epic: "Ramayana",
    image: "assets/images/events/ravana-vadha.webp",
    desc: "The climactic cosmic conflict between Lord Rama riding Indra’s celestial chariot (Matali) and the ten-headed Ravana. Rama invokes the Sun God via Aditya Hridaya and releases the flaming Brahmastra.",
    qualities: ["Triumph of Light over Darkness", "Spiritual Equanimity", "Dharmic Victory"],
    associated: "Yuddha Kanda, Aditya Hridaya Stotram, Brahmastra release."
  },
  {
    title: "The Golden Return to Ayodhya",
    epic: "Ramayana",
    image: "assets/images/events/ayodhya-return.webp",
    desc: "Returning victorious after fourteen years, Rama and Sita are crowned in a celestial ceremony. The citizens of Ayodhya illuminate the entire kingdom with earthen lamps, giving birth to Deepavali.",
    qualities: ["Celebration of Righteousness", "Reunion of Love", "Ramrajya Inauguration"],
    associated: "Uttara Kanda, Pushpaka Vimana, Royal Rajyabhisheka, First Diwali."
  }
];

// 3. LIVING TRADITIONS ACROSS BHARAT & ASIA
const RAMAYANA_TRADITIONS = [
  {
    title: "Valmiki Ramayana",
    lang: "Sanskrit • Original Adi Kavya",
    author: "Maharishi Valmiki",
    desc: "Composed in 24,000 verses in the melodious Anushtubh meter. The foundational literary fountainhead from which all subsequent regional retellings draw inspiration."
  },
  {
    title: "Ramcharitmanas",
    lang: "Awadhi • Northern Bharat",
    author: "Goswami Tulsidas (16th Century)",
    desc: "Rendered in poetic Chaupais and Dohas, this masterpiece transformed the epic into a personal devotional hymn across North India, celebrating Rama as the supreme merciful Lord."
  },
  {
    title: "Kamba Ramayanam (Ramavataram)",
    lang: "Tamil • Southern Bharat",
    author: "Kavichakravarthi Kamban (12th Century)",
    desc: "A tour de force of classical Tamil Sangam-influenced poetry with over 10,000 verses, celebrated for its sublime lyrical beauty, emotional depth, and majestic rhythm."
  },
  {
    title: "Krittivasi Ramayana",
    lang: "Bengali • Eastern Bharat",
    author: "Krittibas Ojha (15th Century)",
    desc: "Woven intimately into the folk and cultural fabric of Bengal, introducing distinctive episodes such as the autumnal worship of Goddess Durga (Akalbodhan) by Lord Rama."
  },
  {
    title: "Adhyathma Ramayanam",
    lang: "Malayalam • Kerala",
    author: "Thunchaththu Ramanujan Ezhuthachan",
    desc: "Composed in the lilting Kilippattu (parrot-song) genre, this text serves as both a devotional guide and philosophical treatise, read devoutly during the holy month of Karkidakam."
  },
  {
    title: "Ramakien & Kakawin",
    lang: "Thai & Old Javanese • Southeast Asia",
    author: "King Rama I / Ancient Kawi Masters",
    desc: "The living national epics of Thailand and Indonesia, woven permanently into royal dance drama, shadow puppetry (Wayang Kulit), and the majestic stone reliefs of Prambanan and Wat Phra Kaew."
  }
];

// 4. SANSKRIT GLOSSARY (Shabdakosha)
const RAMAYANA_GLOSSARY = [
  {
    term: "Dharma",
    sanskrit: "धर्मः",
    iast: "Dharma",
    def: "Cosmic order, inherent righteousness, sacred moral law, and the conscientious duty that sustains the universe and human society."
  },
  {
    term: "Maryada Purushottama",
    sanskrit: "मर्यादा पुरुषोत्तमः",
    iast: "Maryādā Puruṣottama",
    def: "The supreme ideal human being who strictly abides by societal ethics, constitutional bounds, and moral righteousness under all circumstances."
  },
  {
    term: "Satya",
    sanskrit: "सत्यम्",
    iast: "Satya",
    def: "Unyielding truthfulness in thought, speech, and conduct. The bedrock virtue for which Rama willingly sacrificed his royal inheritance."
  },
  {
    term: "Sharanagati",
    sanskrit: "शरणागतिः",
    iast: "Śaraṇāgati",
    def: "Unconditional surrender and seeking divine shelter. Exemplified by Vibhishana, who was embraced by Rama regardless of his demonic lineage."
  },
  {
    term: "Vanavasa",
    sanskrit: "वनवासः",
    iast: "Vanavāsa",
    def: "Voluntary forest exile. The fourteen-year period of ascetic simplicity, spiritual growth, and purification undertaken by Rama, Sita, and Lakshmana."
  },
  {
    term: "Kodanda",
    sanskrit: "कोदण्डम्",
    iast: "Kodaṇḍa",
    def: "The legendary divine bow of Lord Rama. Symbolizes invincible power wielded purely in defense of innocence and righteous cosmic balance."
  },
  {
    term: "Ramrajya",
    sanskrit: "रामराज्यम्",
    iast: "Rāmarājya",
    def: "The ideal, sovereign welfare state characterized by just governance, absence of fear, natural abundance, and equal spiritual dignity for all beings."
  },
  {
    term: "Tapasya",
    sanskrit: "तपस्या",
    iast: "Tapasyā",
    def: "Spiritual austerity, inner heat, and meditative discipline through which sages and seekers elevate their consciousness beyond mundane desires."
  },
  {
    term: "Nishkama Karma",
    sanskrit: "निष्काम कर्म",
    iast: "Niṣkāma Karma",
    def: "Selfless righteous action performed out of sacred duty without craving personal reward or bitter resentment toward outcomes."
  },
  {
    term: "Seva",
    sanskrit: "सेवा",
    iast: "Sevā",
    def: "Selfless, humble, and reverent service offered to the Divine and all creatures, embodied to perfection in the devotion of Hanuman and Lakshmana."
  }
];

// MAIN INITIALIZER
function initRamayanaPage() {
  // 1. Kandas interactive timeline switcher
  const navBtns = document.querySelectorAll('.kanda-nav-btn');
  const showcaseContainer = document.getElementById('kandas-showcase-container');

  if (showcaseContainer && navBtns.length) {
    function renderKanda(index) {
      const kanda = RAMAYANA_KANDAS[index];
      if (!kanda) return;

      const fallbackJpg = kanda.image.replace('.webp', '.jpg');

      showcaseContainer.innerHTML = `
        <div class="kanda-showcase-card active">
          <div class="kanda-visual-col">
            <img src="${kanda.image}" alt="${kanda.title}" onerror="if(window.ITIHASA_ASSETS) ITIHASA_ASSETS.handleImageError(this, '${kanda.title}', '${kanda.sanskrit}');">
            <div class="kanda-number-badge">Kanda ${kanda.id} of 7</div>
          </div>
          <div class="kanda-text-col">
            <div class="kanda-sanskrit">${kanda.sanskrit}</div>
            <h3 class="kanda-title">${kanda.title}</h3>
            <p class="kanda-subtitle">${kanda.subtitle}</p>

            ${kanda.verse ? `
              <div style="background: var(--bg-manuscript-panel); border-left: 3px solid var(--accent-vermilion); padding: 1rem 1.25rem; margin-bottom: 1.5rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
                <div style="font-family: var(--font-sanskrit); color: var(--accent-vermilion); font-size: 1.05rem; line-height: 1.6; margin-bottom: 0.35rem; white-space: pre-line;">${kanda.verse.sanskrit}</div>
                <div style="font-family: var(--font-heading); font-size: 0.8rem; font-style: italic; color: var(--text-ink-muted); margin-bottom: 0.45rem;">${kanda.verse.iast}</div>
                <div style="font-size: 0.88rem; color: var(--text-ink-secondary); line-height: 1.5;">${kanda.verse.meaning}</div>
              </div>
            ` : ''}

            <p class="kanda-desc">${kanda.desc}</p>
            
            <div class="kanda-highlights">
              <h5>Significant Events & Episodes</h5>
              <ul>
                ${kanda.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>

            <p style="font-size: 0.9rem; color: var(--accent-gold); margin-bottom: 1.5rem;">
              <strong>Key Figures:</strong> ${kanda.characters}
            </p>

            <div class="kanda-pagination-nav">
              <button class="btn-kanda-prev" ${index === 0 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
                ← Previous Kanda
              </button>
              <span style="font-family: var(--font-heading); font-size: 0.85rem; color: var(--accent-gold);">
                ${index + 1} / 7
              </span>
              <button class="btn-kanda-next" ${index === RAMAYANA_KANDAS.length - 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
                Next Kanda →
              </button>
            </div>
          </div>
        </div>
      `;

      navBtns.forEach((b, i) => {
        if (i === index) b.classList.add('active');
        else b.classList.remove('active');
      });

      const prevBtn = showcaseContainer.querySelector('.btn-kanda-prev');
      const nextBtn = showcaseContainer.querySelector('.btn-kanda-next');

      if (prevBtn && index > 0) {
        prevBtn.addEventListener('click', () => {
          renderKanda(index - 1);
          if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
            window.ItihasaMusic.playTempleBell();
          }
        });
      }
      if (nextBtn && index < RAMAYANA_KANDAS.length - 1) {
        nextBtn.addEventListener('click', () => {
          renderKanda(index + 1);
          if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
            window.ItihasaMusic.playTempleBell();
          }
        });
      }
    }

    navBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        renderKanda(idx);
        if (window.ItihasaMusic && window.ItihasaMusic.playTempleBell) {
          window.ItihasaMusic.playTempleBell();
        }
      });
    });

    renderKanda(0);
  }

  // 2. Ramayana Events Grid
  const eventsGrid = document.getElementById('ramayana-events-grid');
  if (eventsGrid) {
    eventsGrid.innerHTML = '';
    RAMAYANA_EVENTS.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'card-ancient reveal shimmer-hover';
      card.innerHTML = `
        <div class="card-ancient-img-wrap landscape">
          <img src="${ev.image}" alt="${ev.title}" loading="lazy" onerror="if(window.ITIHASA_ASSETS) ITIHASA_ASSETS.handleImageError(this, '${ev.title}');">
          <span class="card-badge">Epic Milestone</span>
        </div>
        <div class="card-ancient-body">
          <h3 class="card-title">${ev.title}</h3>
          <p class="card-desc">${ev.desc}</p>
          <div class="card-footer">
            <button class="card-link-btn">
              Explore Event
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (window.ItihasaModal) {
          window.ItihasaModal.open({
            epic: 'Ramayana Event',
            name: ev.title,
            role: 'Sacred Milestone in the Path of Rama',
            image: ev.image,
            desc: ev.desc,
            qualities: ev.qualities,
            associated: ev.associated
          });
        }
      });

      eventsGrid.appendChild(card);
    });
  }

  // 3. Living Traditions Grid
  const traditionsGrid = document.getElementById('traditions-grid');
  if (traditionsGrid) {
    traditionsGrid.innerHTML = '';
    RAMAYANA_TRADITIONS.forEach(tr => {
      const card = document.createElement('div');
      card.className = 'tradition-card reveal';
      card.innerHTML = `
        <div class="tradition-lang">${tr.lang}</div>
        <h3 class="tradition-title">${tr.title}</h3>
        <p class="tradition-author">${tr.author}</p>
        <p class="tradition-desc">${tr.desc}</p>
      `;
      traditionsGrid.appendChild(card);
    });
  }

  // 4. Sanskrit Glossary (Shabdakosha)
  const glossaryGrid = document.getElementById('glossary-grid');
  const glossarySearch = document.getElementById('glossary-search');

  function renderGlossary(filter = '') {
    if (!glossaryGrid) return;
    glossaryGrid.innerHTML = '';
    const lower = filter.trim().toLowerCase();

    const filtered = RAMAYANA_GLOSSARY.filter(g => 
      !lower || 
      g.term.toLowerCase().includes(lower) || 
      g.sanskrit.includes(lower) || 
      g.iast.toLowerCase().includes(lower) || 
      g.def.toLowerCase().includes(lower)
    );

    if (filtered.length === 0) {
      glossaryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-ink-muted);">
          No glossary terms match your search. Try "Dharma", "Satya", or "Rama".
        </div>
      `;
      return;
    }

    filtered.forEach(g => {
      const card = document.createElement('div');
      card.className = 'glossary-card reveal';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
          <h4 style="margin: 0; font-family: var(--font-display); font-size: 1.15rem; color: var(--text-ink-primary);">${g.term}</h4>
          <span class="glossary-term">${g.sanskrit}</span>
        </div>
        <div class="glossary-iast">${g.iast}</div>
        <p class="glossary-def">${g.def}</p>
      `;
      glossaryGrid.appendChild(card);
    });
  }

  if (glossarySearch) {
    glossarySearch.addEventListener('input', (e) => {
      renderGlossary(e.target.value);
    });
  }
  renderGlossary();

  // 5. Reading Mode Toggle
  const readingModeBtn = document.getElementById('btn-toggle-reading-mode');
  if (readingModeBtn) {
    readingModeBtn.addEventListener('click', () => {
      const isReading = document.body.classList.toggle('reading-mode');
      readingModeBtn.classList.toggle('active', isReading);
      readingModeBtn.innerHTML = isReading 
        ? '<span>📖</span> Reading Mode: Active' 
        : '<span>📖</span> Toggle Reading Sanctum';
    });
  }
}

document.addEventListener('DOMContentLoaded', initRamayanaPage);
