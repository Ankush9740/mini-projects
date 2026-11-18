/**
 * ITIHASA — RAMAYANA INTERACTIVE ENGINE
 * js/ramayana.js
 */

const RAMAYANA_KANDAS = [
  {
    id: 1,
    title: 'Bala Kanda',
    sanskrit: 'बालकाण्डम्',
    subtitle: 'The Childhood and Divine Awakening',
    image: 'assets/images/ramayana/bala-kanda.jpg',
    desc: 'The opening book of the epic chronicles the celestial origins, the divine birth of Lord Rama and his brothers to King Dasharatha in Ayodhya through the sacred Putrakameshti sacrifice. It recounts their youthful tutelage under Brahmarshi Vishvamitra, the slaying of demons Tataka and Subahu, the redemption of Ahalya, and the momentous wedding in Mithila where young Rama lifts and strings the mighty Shiva Dhanush (Pinaka) to win the hand of Goddess Sita.',
    highlights: [
      'The sacred birth of the four divine princes in the city of Ayodhya',
      'Vishvamitra guides Rama and Lakshmana into the enchanted forests',
      'Deliverance of Sage Gautama’s cursed wife, Ahalya',
      'The lifting and breaking of Shiva’s Pinaka bow in the court of King Janaka',
      'Fourfold celestial wedding uniting Ayodhya and Videha'
    ],
    characters: 'Lord Rama, Goddess Sita, Lakshmana, Sage Vishvamitra, King Dasharatha, King Janaka, Ahalya'
  },
  {
    id: 2,
    title: 'Ayodhya Kanda',
    sanskrit: 'अयोध्याकाण्डम्',
    subtitle: 'The Royal Expatriation and Departure',
    image: 'assets/images/ramayana/ayodhya-kanda.jpg',
    desc: 'On the eve of Rama’s joyful coronation as Yuvaraja, Queen Kaikeyi, instigated by the wicked maidservant Manthara, invokes two boons granted to her long ago by Dasharatha: to banish Rama to the Dandakaranya forest for fourteen years and crown her own son Bharata. To safeguard his father’s sacred word and Dharma, Rama peacefully renounces the empire without an ounce of bitterness, joined by his steadfast wife Sita and devoted brother Lakshmana.',
    highlights: [
      'The joyous preparations for Rama’s coronation turned to sudden sorrow',
      'Kaikeyi’s fatal demand in the chamber of anger (Kopa Griha)',
      'Rama’s serene detachment and refusal to blame anyone for destiny',
      'Sita and Lakshmana’s resolute decision to follow Rama into exile',
      'Heartbroken passing of King Dasharatha and Bharata’s refusal of the throne'
    ],
    characters: 'Lord Rama, Goddess Sita, Lakshmana, King Dasharatha, Queen Kaikeyi, Queen Kaushalya, Bharata, Sumantra'
  },
  {
    id: 3,
    title: 'Aranya Kanda',
    sanskrit: 'अरण्यकाण्डम्',
    subtitle: 'Hermitage Life in the Primeval Forest',
    image: 'assets/images/ramayana/aranya-kanda.jpg',
    desc: 'Rama, Sita, and Lakshmana journey deep into Dandakaranya, visiting holy hermitages of revered sages Agastya, Sharabhanga, and Sutikshna. Settling at serene Panchavati beside the river Godavari, their tranquility is shattered when the demoness Shurpanakha attempts to slay Sita. Her mutilation provokes her demon brothers Khara and Dushana, and ultimately leads King Ravana to deploy the demon Maricha disguised as a shimmering golden deer to lure Rama away and abduct Sita.',
    highlights: [
      'Sacred discourses with Maharishi Agastya and reception of celestial weapons',
      'Peaceful dwelling at Panchavati along the sacred Godavari river',
      'The defeat of 14,000 rakshasas led by Khara and Dushana',
      'The deceptive golden deer Maricha and Lakshmana Rekha',
      'The abduction of Goddess Sita by Ravana and Jatayu’s heroic sacrifice'
    ],
    characters: 'Lord Rama, Goddess Sita, Lakshmana, Sage Agastya, Shurpanakha, Maricha, Jatayu, Ravana'
  },
  {
    id: 4,
    title: 'Kishkindha Kanda',
    sanskrit: 'किष्किन्धाकाण्डम्',
    subtitle: 'The Sacred Alliance with the Vanaras',
    image: 'assets/images/ramayana/kishkindha-kanda.jpg',
    desc: 'Wandering in desolation in search of Sita, Rama reaches the scenic Pampa lake and meets Hanuman at Mount Rishyamukha. Hanuman introduces Rama to the exiled Vanara prince Sugriva. Rama pledges to liberate Sugriva from his tyrannical brother Vali, while Sugriva promises to mobilize his global legions of Vanaras to find Sita. Following Vali’s death, the Vanaras disperse across the four directions, with the southern detachment under Angada, Hanuman, and Jambavan reaching the edge of the boundless ocean.',
    highlights: [
      'First meeting between Lord Rama and Hanuman disguised as a young ascetic',
      'Sacred pact of eternal friendship struck between Rama and Sugriva over fire',
      'The liberation of Vali and coronation of Sugriva as king of Kishkindha',
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
    image: 'assets/images/ramayana/sundara-kanda.jpg',
    desc: 'The heart and crown jewel of the Ramayana. Reminded of his boundless latent powers by Jambavan, Hanuman expands to colossal proportions and leaps across the ocean from Mahendra Mountain. Entering the golden island city of Lanka under cover of darkness, he searches the palace until finding Goddess Sita sitting grief-stricken beneath a Simshapa tree in Ashoka Vatika. He presents Rama’s signet ring (Mudrika), burns Lanka to ash with his flaming tail, and returns to Rama with Sita’s celestial jewel (Chudamani).',
    highlights: [
      'Hanuman’s epic leap over the sea, conquering Surasa, Mainaka, and Simhika',
      'Infiltration of Lanka by night and finding Sita in Ashoka Vatika',
      'The delivery of Rama’s ring and rekindling of divine hope in Sita’s heart',
      'The single-handed destruction of Ashoka Vatika and slaying of Akshakumara',
      'Setting the golden towers of Lanka ablaze with his captured flaming tail'
    ],
    characters: 'Hanuman, Goddess Sita, King Ravana, Indrajit, Vibhishana, Trijata, Jambavan'
  },
  {
    id: 6,
    title: 'Yuddha Kanda',
    sanskrit: 'युद्धकाण्डम्',
    subtitle: 'The Great Battle of Lanka and Triumph of Dharma',
    image: 'assets/images/ramayana/yuddha-kanda.jpg',
    desc: 'The grand military climax of the epic. Rama’s Vanara army marches to the southern shore. When the ocean does not part, Rama prepares the celestial Brahmastra, compelling Samudra Deva to yield and reveal that architect Nala can build a stone causeway (Rama Setu). The bridge is constructed in five days. The siege of Lanka ensues in apocalyptic warfare: Kumbhakarna falls to Rama, Lakshmana slays the illusionist Indrajit, and Rama vanquishes Ravana using the divine Brahmastra revealed by Agastya Muni.',
    highlights: [
      'Righteous Vibhishana defects from Lanka and seeks unconditional refuge (Sharanagati)',
      'The architectural wonder of Rama Setu constructed across the roaring ocean',
      'The fierce duel of titans: Kumbhakarna, Indrajit, and Ravana',
      'Hanuman leaps to the Himalayas to bring Mount Dronagiri bearing Sanjeevani',
      'Sage Agastya imparts the sacred Aditya Hridaya Stotram to Rama before victory'
    ],
    characters: 'Lord Rama, Lakshmana, Hanuman, Ravana, Kumbhakarna, Indrajit, Vibhishana, Nala, Nila, Angada'
  },
  {
    id: 7,
    title: 'Uttara Kanda',
    sanskrit: 'उत्तरकाण्डम्',
    subtitle: 'The Golden Coronation and Eternal Legacy',
    image: 'assets/images/ramayana/uttara-kanda.jpg',
    desc: 'Having completed the fourteen years of exile, Rama, Sita, and Lakshmana return to Ayodhya aboard the Pushpaka Vimana to a joyous city illuminated with millions of oil lamps (the first Deepavali). Rama is consecrated on the ancestral throne, inaugurating the golden age of Ramrajya where righteousness, prosperity, and joy pervade all nature. The book narrates the birth of twin sons Lava and Kusha in Valmiki’s ashrama, their singing of the Ramayana, and the eternal ascension to Vaikuntha.',
    highlights: [
      'The joyous return to Ayodhya and historic coronation of Lord Rama',
      'The establishment of Ramrajya: a societal order free of sorrow, famine, and injustice',
      'Birth of twins Lava and Kusha at Maharishi Valmiki’s peaceful hermitage',
      'Lava and Kusha sing the sweet verses of the Ramayana in the royal assembly',
      'The ultimate return of the divine avatars to the eternal celestial realm'
    ],
    characters: 'Lord Rama, Goddess Sita, Lakshmana, Bharata, Shatrughna, Hanuman, Valmiki, Lava, Kusha'
  }
];

const RAMAYANA_EVENTS = [
  {
    title: "Rama's Noble Exile",
    epic: "Ramayana",
    image: "assets/images/ramayana/rama-exile.jpg",
    desc: "Renouncing the supreme sovereignty of Ayodhya without sorrow, Rama teaches humanity that upholding parental honor, truth (Satya), and selflessness ranks above all worldly wealth and power.",
    qualities: ["Satya (Truth)", "Nishkama Dharma", "Fraternal Reverence"],
    associated: "Ayodhya Kanda, River Tamasa crossing, Nishadaraja Guha alliance."
  },
  {
    title: "The Golden Deer (Maricha)",
    epic: "Ramayana",
    image: "assets/images/ramayana/golden-deer.jpg",
    desc: "The deceitful illusion deployed by Ravana to entice Sita’s gentle heart. Demonstrates how temptation and illusion (Maya) can draw seekers away from the shelter of righteousness.",
    qualities: ["Illusion (Maya)", "Destiny’s Thread", "Vigilance"],
    associated: "Aranya Kanda, Panchavati, Lakshmana Rekha."
  },
  {
    title: "Sita's Abduction",
    epic: "Ramayana",
    image: "assets/images/ramayana/sita-abduction.jpg",
    desc: "The pivotal tragedy that set the cosmic destruction of adharma into motion. Ravana approaches in the garb of a wandering mendicant (Bhikshu), violating the sacred hospitality of the forest.",
    qualities: ["Test of Fortitude", "Purity of Spirit", "Karmic Inevitability"],
    associated: "Aranya Kanda, Ravana's Chariot, Jatayu's celestial aerial clash."
  },
  {
    title: "Hanuman in Ashoka Vatika",
    epic: "Ramayana",
    image: "assets/images/ramayana/hanuman-ashoka-vatika.jpg",
    desc: "Finding Goddess Sita weeping beneath the Simshapa tree, Hanuman delivers Rama’s golden signet ring, breathing transcendent hope and courage into her spirit while defying the entire titan empire.",
    qualities: ["Supreme Devotion", "Tactful Eloquence", "Fearlessness"],
    associated: "Sundara Kanda, Mudrika Pradana, Chudamani Mani reception."
  },
  {
    title: "Lifting the Sanjeevani Mountain",
    epic: "Ramayana",
    image: "assets/images/ramayana/hanuman-sanjeevani.jpg",
    desc: "When Lakshmana was mortally struck by Indrajit’s spear, Hanuman flew across India to Mount Dronagiri. Unable to identify the exact glowing herb, he lifted the entire mountain and flew back before sunrise.",
    qualities: ["Boundless Capacity", "Urgency of Love", "Miraculous Strength"],
    associated: "Yuddha Kanda, Vaidya Sushena, Mount Dronagiri, Healing of Lakshmana."
  },
  {
    title: "Construction of Rama Setu",
    epic: "Ramayana",
    image: "assets/images/ramayana/rama-setu.jpg",
    desc: "Engineered by Nala and Nila, the Vanaras wrote the sacred name of 'RAMA' on boulders and cast them into the roaring ocean. The stones floated by divine grace, building an ancient bridge across the sea.",
    qualities: ["Unity in Devotion", "Divine Grace", "Architectural Mastery"],
    associated: "Yuddha Kanda, Rameswaram, Samudra Deva submission, Setubandha."
  },
  {
    title: "The Battle with Ravana",
    epic: "Ramayana",
    image: "assets/images/ramayana/rama-ravana-battle.jpg",
    desc: "The climactic cosmic conflict between Lord Rama riding Indra’s celestial chariot (Matali) and the ten-headed Ravana. Rama invokes the Sun God via Aditya Hridaya and releases the flaming Brahmastra.",
    qualities: ["Triumph of Light over Darkness", "Spiritual Equanimity", "Dharmic Victory"],
    associated: "Yuddha Kanda, Aditya Hridaya Stotram, Brahmastra release."
  },
  {
    title: "The Golden Return to Ayodhya",
    epic: "Ramayana",
    image: "assets/images/ramayana/return-ayodhya.jpg",
    desc: "Returning victorious after fourteen years, Rama and Sita are crowned in a celestial ceremony. The citizens of Ayodhya illuminate the entire kingdom with earthen lamps, giving birth to Deepavali.",
    qualities: ["Celebration of Righteousness", "Reunion of Love", "Ramrajya Inauguration"],
    associated: "Uttara Kanda, Pushpaka Vimana, Royal Rajyabhisheka, First Diwali."
  }
];

function initRamayanaPage() {
  // Kandas interactive timeline switcher
  const navBtns = document.querySelectorAll('.kanda-nav-btn');
  const showcaseContainer = document.getElementById('kandas-showcase-container');

  if (showcaseContainer && navBtns.length) {
    function renderKanda(index) {
      const kanda = RAMAYANA_KANDAS[index];
      if (!kanda) return;

      showcaseContainer.innerHTML = `
        <div class="kanda-showcase-card active">
          <div class="kanda-visual-col">
            <img src="${kanda.image}" alt="${kanda.title}">
            <div class="kanda-number-badge">Kanda ${kanda.id} of 7</div>
          </div>
          <div class="kanda-text-col">
            <div class="kanda-sanskrit">${kanda.sanskrit}</div>
            <h3 class="kanda-title">${kanda.title}</h3>
            <p class="kanda-subtitle">${kanda.subtitle}</p>
            <p class="kanda-desc">${kanda.desc}</p>
            
            <div class="kanda-highlights">
              <h5>Significant Events & Episodes</h5>
              <ul>
                ${kanda.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>

            <p style="font-size: 0.9rem; color: var(--color-temple-gold); margin-bottom: 1.5rem;">
              <strong>Key Figures:</strong> ${kanda.characters}
            </p>

            <div class="kanda-pagination-nav">
              <button class="btn-kanda-prev" ${index === 0 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
                ← Previous Kanda
              </button>
              <span style="font-family: var(--font-heading); font-size: 0.85rem; color: var(--color-temple-gold);">
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

  // Ramayana Events Grid
  const eventsGrid = document.getElementById('ramayana-events-grid');
  if (eventsGrid) {
    eventsGrid.innerHTML = '';
    RAMAYANA_EVENTS.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'card-ancient reveal shimmer-hover';
      card.innerHTML = `
        <div class="card-ancient-img-wrap landscape">
          <img src="${ev.image}" alt="${ev.title}" loading="lazy">
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
}

document.addEventListener('DOMContentLoaded', initRamayanaPage);
