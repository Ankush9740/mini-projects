/**
 * ITIHASA — DIVINE CHARACTERS DATA & ENGINE
 * js/characters.js
 */

const CHARACTERS_DATA = [
  // RAMAYANA CHARACTERS
  {
    id: 'rama',
    name: 'Lord Rama',
    epic: 'Ramayana',
    category: ['divine', 'warrior', 'kings'],
    role: 'Maryada Purushottama — The Seventh Avatara of Vishnu',
    image: 'assets/images/characters/rama.jpg',
    desc: 'The supreme embodiment of Dharma, Lord Rama lived a life of unwavering truth, selfless duty, and supreme righteousness. Born as the eldest prince of Kosala, he willingly accepted fourteen years of forest exile to honor his father’s word, liberated the world from the tyranny of Ravana, and established the golden realm of Ramrajya.',
    qualities: ['Unwavering Dharma', 'Truthfulness (Satya)', 'Compassion (Karuna)', 'Master of Kodanda Bow', 'Magnanimity'],
    associated: 'Breaking Shiva’s Pinaka Bow, Forest Exile, Construction of Rama Setu, Slaying of Ravana, Coronation in Ayodhya.'
  },
  {
    id: 'sita',
    name: 'Goddess Sita',
    epic: 'Ramayana',
    category: ['divine', 'kings'],
    role: 'Janaki — Divine Incarnation of Goddess Lakshmi',
    image: 'assets/images/characters/sita.jpg',
    desc: 'Found in the sacred furrow of the earth by King Janaka of Mithila, Goddess Sita exemplifies divine fortitude, selfless love, unwavering fidelity, and moral grandeur. She chose forest hardship over royal luxury, retained pure devotion in Ravana’s Ashoka Vatika, and remains the eternal beacon of grace and feminine spiritual sovereignty.',
    qualities: ['Divine Grace', 'Immovable Fortitude', 'Spiritual Purity', 'Devotion to Dharma', 'Sacrifice'],
    associated: 'Swayamvara in Mithila, Voluntary Exile to Dandakaranya, Captivity in Ashoka Vatika, Agni Pariksha, Valmiki Ashrama.'
  },
  {
    id: 'lakshmana',
    name: 'Lakshmana',
    epic: 'Ramayana',
    category: ['warrior', 'kings'],
    role: 'Saumitri — Incarnation of Sheshanaga & Loyal Brother',
    image: 'assets/images/characters/lakshmana.jpg',
    desc: 'The inseparable brother of Rama, Lakshmana renounced sleep and all comforts for fourteen years to stand guard over Rama and Sita in the forest. A fierce warrior of unmatched devotion, he defeated the invincible Meghanada (Indrajit) in Lanka through the power of his supreme celibacy and righteous vows.',
    qualities: ['Boundless Loyalty', 'Martial Mastery', 'Unflinching Vigilance', 'Brotherly Devotion', 'Selfless Service'],
    associated: 'Carving Hermitage in Panchavati, Defending Sita, Slaying of Indrajit, Revival with Sanjeevani Herb.'
  },
  {
    id: 'hanuman',
    name: 'Hanuman',
    epic: 'Ramayana',
    category: ['divine', 'warrior'],
    role: 'Mahavira — Rudra Avatara, Quintessence of Bhakti & Shakti',
    image: 'assets/images/characters/hanuman.jpg',
    desc: 'The son of Vayu and Anjana, Hanuman is the immortal paragon of devotion, immense courage, and selfless service. Blessed with the eight celestial Siddhis, he leapt across the ocean to find Sita, set Lanka ablaze, brought the Sanjeevani mountain to save Lakshmana, and lives eternally where the sacred name of Rama is chanted.',
    qualities: ['Supreme Bhakti', 'Infinite Strength (Bala)', 'Profound Wisdom (Jnana)', 'Humility', 'Chiranjeevi (Immortal)'],
    associated: 'Leap across the Southern Sea, Finding Sita in Ashoka Vatika, Burning of Golden Lanka, Carrying Mount Dronagiri.'
  },
  {
    id: 'bharata',
    name: 'Bharata',
    epic: 'Ramayana',
    category: ['kings'],
    role: 'Righteous Prince and Exemplar of Selflessness',
    image: 'assets/images/characters/bharata.jpg',
    desc: 'Though offered the kingdom of Kosala through his mother Kaikeyi’s boons, Bharata refused the crown in anguish. He pursued Rama to Chitrakoot, placed Rama’s sacred wooden sandals (Padukas) on the royal throne of Ayodhya, and governed the empire as an ascetic regent living on the outskirts in Nandigrama.',
    qualities: ['Supreme Selflessness', 'Fraternal Love', 'Disdain for Unjust Power', 'Ascetic Discipline'],
    associated: 'Chitrakoot Meeting, Ruling Ayodhya with Rama’s Padukas, Vow of Self-Immolation if Rama delayed.'
  },
  {
    id: 'shatrughna',
    name: 'Shatrughna',
    epic: 'Ramayana',
    category: ['warrior', 'kings'],
    role: 'Slayer of Enemies and Devoted Brother of Bharata',
    image: 'assets/images/characters/shatrughna.jpg',
    desc: 'The fourth brother, twin to Lakshmana, Shatrughna served Bharata with total dedication while protecting Ayodhya during Rama’s exile. Later, he slew the formidable asura Lavanasura and established the kingdom of Mathura, ruling with justice and humility.',
    qualities: ['Silent Duty', 'Loyalty to Bharata', 'Valor in Battle', 'Humility'],
    associated: 'Subjugating Lavanasura, Founding the Realm of Madhupuri (Mathura).'
  },
  {
    id: 'dasharatha',
    name: 'King Dasharatha',
    epic: 'Ramayana',
    category: ['kings'],
    role: 'Illustrious Monarch of Kosala and Father of Rama',
    image: 'assets/images/characters/dasharatha.jpg',
    desc: 'A noble ruler of the Suryavansha dynasty whose chariot could ride in ten directions. Bound by sacred promises made to Queen Kaikeyi, he endured the heartbreak of exiling his beloved son Rama, illustrating the ancient Indian ethic of honoring truth (Satya) even at the cost of life itself.',
    qualities: ['Unwavering Word', 'Paternal Love', 'Imperial Generosity', 'Chivalry'],
    associated: 'Putrakameshti Yajna, Shravana Kumara Episode, The Granting of Kaikeyi’s Two Boons.'
  },
  {
    id: 'kaushalya',
    name: 'Queen Kaushalya',
    epic: 'Ramayana',
    category: ['kings'],
    role: 'Senior Queen of Ayodhya and Mother of Rama',
    image: 'assets/images/characters/kaushalya.jpg',
    desc: 'A lady of serene grace and profound maternal piety, Queen Kaushalya accepted her son’s departure to the forest with stoic prayer and blessed him with the sacred words: "May the Dharma which you cherish with devotion protect you in the wilderness."',
    qualities: ['Maternal Piety', 'Patience', 'Quiet Grace', 'Devotion to Dharma'],
    associated: 'Birth of Rama, Maternal Benediction at Rama’s Exile, Re-union at the Coronation.'
  },
  {
    id: 'kaikeyi',
    name: 'Queen Kaikeyi',
    epic: 'Ramayana',
    category: ['kings', 'warrior'],
    role: 'Valiant Warrior Queen Caught in Destiny’s Crucible',
    image: 'assets/images/characters/kaikeyi.jpg',
    desc: 'A heroic queen who once saved Dasharatha’s life on the battlefield of celestial conflicts. Manipulated by Manthara’s poisoned counsel, she demanded Rama’s exile and Bharata’s coronation, setting into motion the cosmic destiny of liberating the earth from demonic rule.',
    qualities: ['Battlefield Courage', 'Fierce Maternal Will', 'Destined Instrument of the Gods'],
    associated: 'Saving Dasharatha’s Chariot, Claiming the Two Boons, Bitter Repentance.'
  },
  {
    id: 'valmiki',
    name: 'Maharishi Valmiki',
    epic: 'Ramayana',
    category: ['sages'],
    role: 'Adi Kavi — Composer of the Ramayana',
    image: 'assets/images/characters/valmiki.jpg',
    desc: 'The revered sage who uttered the world’s first poetic shloka upon witnessing a hunter strike a bird. Commanded by Lord Brahma and instructed by Narada Muni, Valmiki composed the 24,000 verses of the Ramayana and later gave sacred sanctuary to Goddess Sita and tutored her sons Lava and Kusha.',
    qualities: ['Poetic Genius', 'Cosmic Vision', 'Sanctuary to the Afflicted', 'Spiritual Mastery'],
    associated: 'Invention of the Shloka Meter, Composition of Ramayana, Mentoring Lava and Kusha.'
  },
  {
    id: 'jatayu',
    name: 'Jatayu',
    epic: 'Ramayana',
    category: ['warrior', 'divine'],
    role: 'Noble King of the Vultures & Devotee of Dharma',
    image: 'assets/images/characters/jatayu.jpg',
    desc: 'Though aging and outmatched, the heroic bird Jatayu fiercely fought Ravana in the sky to protect Goddess Sita from abduction. Mortally wounded, he survived solely to convey the vital message of Sita’s captor and direction to Rama, earning the supreme privilege of funeral rites performed by Rama himself.',
    qualities: ['Supreme Valour', 'Protection of the Innocent', 'Righteous Defiance', 'Self-Sacrifice'],
    associated: 'Aerial Duel with Ravana, Imparting vital clues to Rama and Lakshmana, Moksha by Rama.'
  },
  {
    id: 'sugriva',
    name: 'King Sugriva',
    epic: 'Ramayana',
    category: ['kings', 'warrior'],
    role: 'King of Kishkindha and Supreme Ally of Rama',
    image: 'assets/images/characters/sugriva.jpg',
    desc: 'Exiled by his brother Vali, Sugriva struck an unbreakable friendship with Rama over sacred fire at Rishyamukha mountain. With his throne restored, he mobilized the vast Vanara legions to search the four quarters of the earth and laid siege to Lanka.',
    qualities: ['Sacred Friendship', 'Leadership of Vanaras', 'Courage in Battle', 'Fidelity to Vows'],
    associated: 'Alliance at Rishyamukha, Vanara Search Expedition, Battle of Lanka.'
  },
  {
    id: 'vibhishana',
    name: 'King Vibhishana',
    epic: 'Ramayana',
    category: ['kings', 'divine'],
    role: 'Righteous Brother of Ravana & Crowned King of Lanka',
    image: 'assets/images/characters/vibhishana.jpg',
    desc: 'Surrounded by the decadence of Ravana’s court, Vibhishana remained steadfastly rooted in Dharma. When his wise counsel to return Sita was rejected with insult, he sought shelter (Sharanagati) at Rama’s feet and was crowned the virtuous king of Lanka.',
    qualities: ['Adherence to Truth over Kinship', 'Sharanagati (Surrender to God)', 'Moral Clarity'],
    associated: 'Righteous Counsel in Ravana’s Sabha, Seeking Shelter with Rama, Coronation of Lanka.'
  },
  {
    id: 'ravana',
    name: 'King Ravana',
    epic: 'Ramayana',
    category: ['kings', 'warrior'],
    role: 'Ten-Headed Sovereign of Lanka & Master of Vedas',
    image: 'assets/images/characters/ravana.jpg',
    desc: 'A brilliant scholar, devout devotee of Shiva, and conqueror of the three worlds who composed the Shiva Tandava Stotram. Despite immense learning and ascetic penance, his uncontrolled ego, lust, and hubris led to the downfall of his entire golden empire.',
    qualities: ['Vedic Erudition', 'Unrivaled Penance', 'Architectural Mastery', 'Fatal Hubris'],
    associated: 'Shiva Tandava Stotram, Ten Celestial Crowns, Abduction of Sita, Final Battle with Rama.'
  },
  {
    id: 'indrajit',
    name: 'Indrajit (Meghanada)',
    epic: 'Ramayana',
    category: ['warrior'],
    role: 'Conqueror of Indra and Master of Celestial Astras',
    image: 'assets/images/characters/indrajit.jpg',
    desc: 'The supreme warrior son of Ravana who defeated the King of Gods (Indra) and possessed all three ultimate weapons: Brahmastra, Vaishnavastra, and Pashupatastra. He could fight invisibly from behind the clouds and challenged the entire Vanara army.',
    qualities: ['Incomparable Illusion (Maya)', 'Mastery of Astras', 'Fierce Loyalty to Father'],
    associated: 'Defeating Indra in Svarga, Nagapasha Stun, Battle at Nikumbhila Yajna against Lakshmana.'
  },
  {
    id: 'kumbhakarna',
    name: 'Kumbhakarna',
    epic: 'Ramayana',
    category: ['warrior'],
    role: 'Colossal Titan of Lanka and Loyal Brother',
    image: 'assets/images/characters/kumbhakarna.jpg',
    desc: 'The giant younger brother of Ravana whose physical power shook mountains. Though he openly criticized Ravana’s abduction of Sita as adharma, his profound sense of family loyalty led him to fight bravely for his brother on the battlefield until felled by Rama.',
    qualities: ['Colossal Stature & Strength', 'Frank Moral Honesty', 'Tragic Loyalty'],
    associated: 'Awakening from Deep Sleep, Bold Truth Spoken to Ravana, Fall on Kurukshetra.'
  },

  // MAHABHARATA CHARACTERS
  {
    id: 'krishna',
    name: 'Lord Krishna',
    epic: 'Mahabharata',
    category: ['divine', 'sages', 'kings'],
    role: 'Yogeshwara — Purna Avatara & Charioteer of Arjuna',
    image: 'assets/images/characters/krishna.jpg',
    desc: 'The divine statesman, supreme philosopher, and central figure of the Mahabharata. On the battlefield of Kurukshetra, he imparted the immortal wisdom of the Bhagavad Gita to the despondent Arjuna, steering the war toward the establishment of Dharma without ever taking up arms himself.',
    qualities: ['Supreme Wisdom (Prajna)', 'Transcendental Detachment', 'Divine Statesmanship', 'Universal Compassion', 'Yogic Mastery'],
    associated: 'Draupadi’s Vastrahara Protection, Shanti Duta Peace Mission, Song Celestial (Bhagavad Gita), Vishwaroopa Darshana.'
  },
  {
    id: 'yudhishthira',
    name: 'Yudhishthira',
    epic: 'Mahabharata',
    category: ['kings', 'warrior'],
    role: 'Dharmaraja — Eldest Pandava & King of Indraprastha',
    image: 'assets/images/characters/yudhishthira.jpg',
    desc: 'Born to Kunti by the grace of Yama (Dharma), Yudhishthira was renowned for absolute commitment to truth and righteousness. Despite the tragedy of the dice game, he endured thirteen years of forest life with stoic dignity and finally ascended to Svarga accompanied by a loyal dog.',
    qualities: ['Commitment to Truth (Satya)', 'Compassion for all Beings', 'Moral Patience', 'Equanimity'],
    associated: 'Yaksha Prashna in the Forest, Rajasuya Yajna, Dice Game, Final Ascent of Mahaprasthana.'
  },
  {
    id: 'bhima',
    name: 'Bhima',
    epic: 'Mahabharata',
    category: ['warrior', 'kings'],
    role: 'Vrikodara — The Unyielding Titan of the Pandavas',
    image: 'assets/images/characters/bhima.jpg',
    desc: 'Endowed with the strength of ten thousand elephants, Bhima was the fiercest protector of the Pandavas and Draupadi. He fulfilled every solemn vow he made: slaying Bakasura, Keechaka, Jarasandha, and all one hundred Kaurava brothers, culminating in the duel with Duryodhana.',
    qualities: ['Colossal Strength', 'Fierce Protection of Family', 'Unbreakable Vows', 'Master of the Mace'],
    associated: 'Slaying of Bakasura & Hidimba, Wrestling Jarasandha, Slaying Dushasana, Final Mace Duel with Duryodhana.'
  },
  {
    id: 'arjuna',
    name: 'Arjuna',
    epic: 'Mahabharata',
    category: ['warrior', 'kings'],
    role: 'Partha — Peerless Archer and Devoted Friend of Krishna',
    image: 'assets/images/characters/arjuna.jpg',
    desc: 'The third Pandava and spiritual counterpart (Nara) to Krishna (Narayana). His single-minded focus made him the supreme archer of his age. He secured celestial astras from Shiva, won Draupadi at the Swayamvara, and received the Bhagavad Gita upon Kurukshetra.',
    qualities: ['Singleminded Focus', 'Mastery of Gandiva Bow', 'Spiritual Humility', 'Devotion to Krishna'],
    associated: 'Piercing the Fish Eye (Matsya Yantra), Penance to Lord Shiva (Pashupatastra), Recipient of Bhagavad Gita.'
  },
  {
    id: 'nakula',
    name: 'Nakula',
    epic: 'Mahabharata',
    category: ['warrior', 'kings'],
    role: 'Fourth Pandava — Master of Swordsmanship & Equine Lore',
    image: 'assets/images/characters/nakula.jpg',
    desc: 'Born to Madri through the Ashwini Kumaras, Nakula was acclaimed as the handsomest warrior of his era. He possessed profound knowledge of horse breeding, veterinary medicine, and unparalleled agility with the dual swords.',
    qualities: ['Unmatched Grace', 'Swordsmanship', 'Equine Wisdom', 'Loyalty to Brothers'],
    associated: 'Conquest of Western Kingdoms, Disguise as Granthika in Virata, Valour on Kurukshetra.'
  },
  {
    id: 'sahadeva',
    name: 'Sahadeva',
    epic: 'Mahabharata',
    category: ['warrior', 'sages', 'kings'],
    role: 'Youngest Pandava — Sage of Astrology & Tactical Mind',
    image: 'assets/images/characters/sahadeva.jpg',
    desc: 'Twin to Nakula, Sahadeva was a master astrologer and strategist who could foresee the future yet remained silent unless specifically queried. On the final day of the Kurukshetra war, he fulfilled his vow by slaying the treacherous Shakuni.',
    qualities: ['Cosmic Astrology', 'Profound Discretion', 'Cattle Lore & Management', 'Vengeance on Shakuni'],
    associated: 'Southern Military Campaign, Astrological Consultation by Krishna, Slaying of Shakuni.'
  },
  {
    id: 'draupadi',
    name: 'Draupadi',
    epic: 'Mahabharata',
    category: ['kings', 'divine'],
    role: 'Yagnaseni — Empress of Indraprastha, Born of Sacred Fire',
    image: 'assets/images/characters/draupadi.jpg',
    desc: 'Born fully grown from the sacrificial altar of King Drupada, Draupadi was an empress of extraordinary intellect, fiery dignity, and unbending courage. Humiliated in the royal assembly of Hastinapura, she refused to tie her hair until anointed with the blood of Dushasana, igniting the moral fire of Kurukshetra.',
    qualities: ['Unbending Dignity', 'Fierce Moral Conviction', 'Intellectual Brilliance', 'Devotion to Krishna'],
    associated: 'Birth from Fire Altar, Swayamvara in Panchala, Humiliation in Dyuta Sabha, Slaying of Keechaka.'
  },
  {
    id: 'karna',
    name: 'Karna',
    epic: 'Mahabharata',
    category: ['warrior', 'kings'],
    role: 'Radheya / Vaikartana — The Peerless Archer and Supreme Giver',
    image: 'assets/images/characters/karna.jpg',
    desc: 'The firstborn son of Kunti and the Sun God Surya, Karna was abandoned at birth and raised by a charioteer. Despite lifelong humiliation regarding his birth, his matchless archery rivaled Arjuna, his loyalty to Duryodhana was unbreakable, and his charity was so boundless that he cut away his divine armor for Indra.',
    qualities: ['Boundless Generosity (Danaveera)', 'Supreme Archery', 'Unshakable Loyalty to Friend', 'Tragic Nobility'],
    associated: 'Challenging Arjuna at the Tournament, Donating Kavacha & Kundala, Duel on Day 17 of Kurukshetra.'
  },
  {
    id: 'bhishma',
    name: 'Bhishma Pitamaha',
    epic: 'Mahabharata',
    category: ['warrior', 'sages', 'kings'],
    role: 'The Grand Patriarch of the Bharatas & Devavrata',
    image: 'assets/images/characters/bhishma.jpg',
    desc: 'Son of King Shantanu and River Goddess Ganga, Devavrata took the terrible vow of lifelong celibacy and renunciation of the throne (earning the name Bhishma). Blessed with death at will (Iccha-Mrityu), he led the Kaurava army for ten days before lying on the bed of arrows to deliver the Vishnu Sahasranama.',
    qualities: ['Unbreakable Vow (Bhishma Pratigna)', 'Invincible Martial Might', 'Philosophical Mastery', 'Selfless Sacrifice'],
    associated: 'The Terrible Vow, Defeating Parashurama, General of 10 Days, Vishnu Sahasranama on Shara-Shayya.'
  },
  {
    id: 'dronacharya',
    name: 'Guru Dronacharya',
    epic: 'Mahabharata',
    category: ['sages', 'warrior'],
    role: 'Royal Preceptor in the Science of Celestial Warfare',
    image: 'assets/images/characters/dronacharya.jpg',
    desc: 'A master of the Dhanurveda who trained both Pandavas and Kauravas in martial arts. As supreme commander after Bhishma, he devised the intricate Chakra Vyuha formation and fought with terrifying ferocity until laying down his weapons upon hearing of his son Ashwatthama’s supposed demise.',
    qualities: ['Supreme Weapon Mastery', 'Pedagogical Genius', 'Fierce Battlefield Command'],
    associated: 'Test of the Bird’s Eye, Training of Arjuna, Formulation of Chakra Vyuha, Commander on Days 11-15.'
  },
  {
    id: 'ashwatthama',
    name: 'Ashwatthama',
    epic: 'Mahabharata',
    category: ['warrior'],
    role: 'The Immortal Gem-Born Warrior of Rudra',
    image: 'assets/images/characters/ashwatthama.jpg',
    desc: 'Son of Dronacharya born with a divine jewel on his forehead. In the blinding grief of his father’s death and the fall of Duryodhana, he conducted a devastating midnight raid on the Pandava camp and released the cosmic Brahmashirsha astra, leading to a curse of wandering the earth in agony.',
    qualities: ['Immortality (Chiranjeevi)', 'Rudra Aspect', 'Formidable Astra Mastery'],
    associated: 'Midnight Raid on the Camp, Duel of Cosmic Astras with Arjuna, Removal of the Forehead Jewel.'
  },
  {
    id: 'abhimanyu',
    name: 'Abhimanyu',
    epic: 'Mahabharata',
    category: ['warrior'],
    role: 'The Sixteen-Year-Old Hero Who Pierced the Chakra Vyuha',
    image: 'assets/images/characters/abhimanyu.jpg',
    desc: 'The valiant son of Arjuna and Subhadra who learned how to penetrate the labyrinthine Chakra Vyuha while in his mother’s womb. On the thirteenth day of the war, he broke into the formation alone and fought seven senior Maharathis simultaneously before dying a martyr’s glorious death.',
    qualities: ['Fearless Valour', 'Incomparable Youthful Bravery', 'Martial Genius', 'Chariot Wheel Defense'],
    associated: 'Breaking the Chakra Vyuha, Defeating Duryodhana’s Son Lakshmana, Heroic Stand with Chariot Wheel.'
  },
  {
    id: 'kunti',
    name: 'Queen Kunti',
    epic: 'Mahabharata',
    category: ['kings'],
    role: 'Mother of the Pandavas & Sister of Vasudeva',
    image: 'assets/images/characters/kunti.jpg',
    desc: 'A woman of tremendous endurance and motherly strength who raised the five Pandavas through assassination attempts, exile, and endless conspiracies. Holding the painful secret of Karna’s true birth, she carried the emotional weight of the epic with unmatched majesty.',
    qualities: ['Resilience in Adversity', 'Maternal Dignity', 'Spiritual Insight', 'Endurance of Secret Grief'],
    associated: 'Invocation of the Devas, House of Lac Survival, Emotional Appeal to Karna on the Ganga.'
  },
  {
    id: 'gandhari',
    name: 'Queen Gandhari',
    epic: 'Mahabharata',
    category: ['kings'],
    role: 'Empress of Hastinapura & Exemplar of Sacrificial Virtue',
    image: 'assets/images/characters/gandhari.jpg',
    desc: 'Princess of Gandhara who voluntarily blindfolded herself for life upon marrying the sightless King Dhritarashtra. Possessing formidable tapas (spiritual power), she repeatedly refused to bless Duryodhana with victory, proclaiming only: "Where there is Dharma, there alone is victory (Yato Dharmastato Jayah)."',
    qualities: ['Lifelong Voluntary Blindfold', 'Formidable Tapas', 'Moral Impartiality', 'Tragic Maternal Grief'],
    associated: 'The Blindfold Vow, Hardening Duryodhana’s Body with her Gaze, The Lament of the Dead on Kurukshetra.'
  },
  {
    id: 'vidura',
    name: 'Mahatma Vidura',
    epic: 'Mahabharata',
    category: ['sages', 'kings'],
    role: 'Incarnation of Dharma & Prime Minister of Hastinapura',
    image: 'assets/images/characters/vidura.jpg',
    desc: 'The wisest counselor in the Kuru court, Vidura consistently spoke unpalatable truths to Dhritarashtra and cautioned against the adharmic schemes of Duryodhana. His discourses on ethics, political statecraft, and human conscience are immortalized in the Vidura Niti.',
    qualities: ['Incorruptible Conscience', 'Vidura Niti (Statecraft)', 'Deep Devotion to Krishna'],
    associated: 'Saving Pandavas from the Lacquer Palace (Lakshagriha), Vidura Niti Discourses, Welcoming Krishna with Banana Peels.'
  },
  {
    id: 'duryodhana',
    name: 'Duryodhana',
    epic: 'Mahabharata',
    category: ['kings', 'warrior'],
    role: 'Eldest Kaurava Prince & Sovereign of Hastinapura',
    image: 'assets/images/characters/duryodhana.jpg',
    desc: 'A powerful warrior, formidable mace fighter, and devoted friend to Karna, Duryodhana’s fatal flaw was an all-consuming envy of the Pandavas. Refusing to yield even a needle-point of earth without war, his stubborn hubris plunged Bharatavarsha into catastrophe.',
    qualities: ['Master of the Mace', 'Loyalty to Friends', 'Unyielding Pride', 'Fatal Obstinacy'],
    associated: 'Poisoning of Bhima, Game of Dice, Refusal of Five Villages, Final Mace Duel at Dvaipayana Lake.'
  },
  {
    id: 'shakuni',
    name: 'Shakuni',
    epic: 'Mahabharata',
    category: ['kings'],
    role: 'Prince of Gandhara & Master of the Loaded Dice',
    image: 'assets/images/characters/shakuni.jpg',
    desc: 'The maternal uncle of the Kauravas who wielded the enchanted dice carved from his father’s bones. Guided by a deep desire for vengeance against the Kuru lineage, he engineered the fraudulent dice match that dispossessed the Pandavas and made war inevitable.',
    qualities: ['Psychological Manipulation', 'Master of the Dice', 'Vengeance Driven Strategy'],
    associated: 'Plotting the Lacquer House, The Fraudulent Game of Dice, Fall on Kurukshetra by Sahadeva.'
  },
  {
    id: 'dhritarashtra',
    name: 'King Dhritarashtra',
    epic: 'Mahabharata',
    category: ['kings'],
    role: 'The Blind Sovereign Caught Between Justice and Blind Attachment',
    image: 'assets/images/characters/dhritarashtra.jpg',
    desc: 'The blind monarch of Hastinapura whose physical blindness mirrored his moral blindness toward his sons’ wicked deeds. Possessing the strength of a hundred elephants, his inability to rein in Duryodhana brought ruin to his entire family and dynasty.',
    qualities: ['Physical Might', 'Tragic Blind Attachment (Putra-Moha)', 'Inner Turmoil'],
    associated: 'Hearing Sanjaya’s Live Narration of War, Crushing the Iron Statue of Bhima in Grief.'
  },
  {
    id: 'subhadra',
    name: 'Subhadra',
    epic: 'Mahabharata',
    category: ['kings'],
    role: 'Sister of Krishna and Balarama, Wife of Arjuna',
    image: 'assets/images/characters/subhadra.jpg',
    desc: 'The beloved sister of Krishna and Balarama, Subhadra was spirited away by Arjuna from Dwarka with Krishna’s blessings. She was the mother of the heroic Abhimanyu and grandmother of Parikshit, through whom the royal lineage of the Kurus continued after the great war.',
    qualities: ['Regal Grace', 'Charioteering Skill', 'Devotion to Family', 'Maternal Dignity'],
    associated: 'Abduction Marriage with Arjuna, Mother of Abhimanyu, Grandmother of King Parikshit.'
  }
];

// Character Engine initialization
function initCharactersPage() {
  const grid = document.getElementById('characters-grid');
  const filterBtns = document.querySelectorAll('.character-filter-btn');
  const searchInput = document.getElementById('character-search');
  const countDisplay = document.getElementById('character-count');

  if (!grid) return;

  let currentFilter = 'all';
  let searchQuery = '';

  function renderCharacters() {
    grid.innerHTML = '';
    const filtered = CHARACTERS_DATA.filter(char => {
      // Filter category check
      let matchesCategory = false;
      if (currentFilter === 'all') matchesCategory = true;
      else if (currentFilter === 'ramayana') matchesCategory = char.epic.toLowerCase() === 'ramayana';
      else if (currentFilter === 'mahabharata') matchesCategory = char.epic.toLowerCase() === 'mahabharata';
      else matchesCategory = char.category.includes(currentFilter);

      // Search check
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch = char.name.toLowerCase().includes(q) ||
                        char.role.toLowerCase().includes(q) ||
                        char.desc.toLowerCase().includes(q) ||
                        char.epic.toLowerCase().includes(q);
      }

      return matchesCategory && matchesSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${CHARACTERS_DATA.length} Legends`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.3rem; color: var(--color-temple-gold); font-family: var(--font-heading);">No legends match your criteria.</p>
          <p style="color: #BAA993;">Try adjusting your search terms or filter selection.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(char => {
      const card = document.createElement('div');
      card.className = 'card-ancient reveal shimmer-hover';
      card.innerHTML = `
        <div class="card-ancient-img-wrap">
          <img src="${char.image}" alt="${char.name}" loading="lazy">
          <span class="card-badge ${char.epic === 'Mahabharata' ? 'badge-mahabharata' : ''}">${char.epic}</span>
        </div>
        <div class="card-ancient-body">
          <h3 class="card-title">${char.name}</h3>
          <p class="card-role">${char.role}</p>
          <p class="card-desc">${char.desc.substring(0, 140)}...</p>
          <div class="card-footer">
            <button class="card-link-btn" data-id="${char.id}">
              Explore Legend
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.card-link-btn').addEventListener('click', () => {
        if (window.ItihasaModal) {
          window.ItihasaModal.open(char);
        }
      });

      card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-link-btn')) {
          if (window.ItihasaModal) {
            window.ItihasaModal.open(char);
          }
        }
      });

      grid.appendChild(card);
    });

    // Animate newly added cards
    setTimeout(() => {
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    }, 50);
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderCharacters();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCharacters();
    });
  }

  renderCharacters();
}

document.addEventListener('DOMContentLoaded', initCharactersPage);
