import os
from generate_epic_art import generate_art_card, generate_landscape_banner

# Color Palettes
GOLD = (230, 199, 122)
DIVINE_GOLD = (201, 154, 69)
MAROON = (87, 31, 39)
CRIMSON = (142, 48, 55)
FOREST = (52, 78, 61)
MIDNIGHT = (23, 43, 67)
CELESTIAL = (104, 139, 167)
SANDALWOOD = (243, 231, 208)
CHARCOAL = (56, 42, 37)
DARK_BG = (18, 12, 10)

def generate_all():
    print("Generating Ramayana Character Artwork...")
    ramayana_characters = [
        ('rama.jpg', 'Lord Rama', 'Maryada Purushottama — The Ideal of Dharma', 'Ramayana', 'bow', (MAROON, FOREST), GOLD),
        ('sita.jpg', 'Goddess Sita', 'Janaki — Divine Incarnation of Grace & Virtue', 'Ramayana', 'lotus', (MAROON, CRIMSON), GOLD),
        ('lakshmana.jpg', 'Lakshmana', 'Saumitri — Supreme Loyalty and Vigilance', 'Ramayana', 'bow', (FOREST, CHARCOAL), GOLD),
        ('hanuman.jpg', 'Hanuman', 'Anjaneya — Purest Devotion and Boundless Might', 'Ramayana', 'mace', (CRIMSON, DIVINE_GOLD), GOLD),
        ('bharata.jpg', 'Bharata', 'The Righteous Sovereign of Ayodhya’s Throne', 'Ramayana', 'temple', (MAROON, CHARCOAL), GOLD),
        ('shatrughna.jpg', 'Shatrughna', 'The Silent Guardian and Slayer of Foe', 'Ramayana', 'sword', (CHARCOAL, MAROON), GOLD),
        ('dasharatha.jpg', 'King Dasharatha', 'Monarch of Kosala, Bound by Sacred Vows', 'Ramayana', 'temple', (CRIMSON, CHARCOAL), GOLD),
        ('kaushalya.jpg', 'Queen Kaushalya', 'The Serene Mother of Lord Rama', 'Ramayana', 'lotus', (MAROON, SANDALWOOD), GOLD),
        ('kaikeyi.jpg', 'Queen Kaikeyi', 'The Valiant Charioteer Caught in Destiny’s Net', 'Ramayana', 'chariot', (CRIMSON, MAROON), GOLD),
        ('valmiki.jpg', 'Maharishi Valmiki', 'Adi Kavi — The First Poet of Eternal Shlokas', 'Ramayana', 'temple', (CHARCOAL, FOREST), GOLD),
        ('jatayu.jpg', 'Jatayu', 'The Noble Winged Warrior of Righteous Sacrifice', 'Ramayana', 'mountain', (FOREST, MAROON), GOLD),
        ('sugriva.jpg', 'Sugriva', 'King of Kishkindha and Loyal Ally of Rama', 'Ramayana', 'mountain', (CHARCOAL, FOREST), GOLD),
        ('vibhishana.jpg', 'Vibhishana', 'The Seeker of Dharma in the Court of Lanka', 'Ramayana', 'temple', (MIDNIGHT, FOREST), GOLD),
        ('ravana.jpg', 'King Ravana', 'Ten-Headed Lord of Lanka and Master of Vedas', 'Ramayana', 'sword', (MAROON, (10, 5, 5)), CRIMSON),
        ('indrajit.jpg', 'Indrajit', 'Meghanada — Master of Celestial Illusions', 'Ramayana', 'bow', (MIDNIGHT, MAROON), GOLD),
        ('kumbhakarna.jpg', 'Kumbhakarna', 'The Colossal Titan Loyal Unto Death', 'Ramayana', 'mace', (CHARCOAL, (10, 5, 5)), GOLD),
    ]
    for filename, title, sub, epic, sym, bg, acc in ramayana_characters:
        path = os.path.join('assets/images/characters', filename)
        generate_art_card(path, title, sub, epic, sym, bg, acc)

    print("Generating Mahabharata Character Artwork...")
    mahabharata_characters = [
        ('krishna.jpg', 'Lord Krishna', 'Yogeshwara — Divine Charioteer & Cosmos', 'Mahabharata', 'flute', (MIDNIGHT, (10, 15, 30)), GOLD),
        ('yudhishthira.jpg', 'Yudhishthira', 'Dharmaraja — Sovereign of Truth & Rectitude', 'Mahabharata', 'sword', (MAROON, CHARCOAL), GOLD),
        ('bhima.jpg', 'Bhima', 'Vrikodara — Mountain of Unyielding Might', 'Mahabharata', 'mace', (CRIMSON, CHARCOAL), GOLD),
        ('arjuna.jpg', 'Arjuna', 'Partha — Peerless Wielder of Gandiva', 'Mahabharata', 'bow', (MIDNIGHT, FOREST), GOLD),
        ('nakula.jpg', 'Nakula', 'Fourth Pandava — Master of Equines & Blade', 'Mahabharata', 'sword', (FOREST, CHARCOAL), GOLD),
        ('sahadeva.jpg', 'Sahadeva', 'Youngest Pandava — Seer of Stars & Wisdom', 'Mahabharata', 'temple', (MIDNIGHT, CHARCOAL), GOLD),
        ('draupadi.jpg', 'Draupadi', 'Yagnaseni — Born of Sacred Fire, Empress of Indraprastha', 'Mahabharata', 'lotus', (CRIMSON, (15, 5, 10)), GOLD),
        ('karna.jpg', 'Karna', 'Radheya — Peerless Archer and Supreme Donor', 'Mahabharata', 'bow', ((160, 60, 30), CHARCOAL), GOLD),
        ('bhishma.jpg', 'Bhishma Pitamaha', 'The Grand Patriarch Bound by the Unbreakable Vow', 'Mahabharata', 'sword', (CHARCOAL, MIDNIGHT), GOLD),
        ('dronacharya.jpg', 'Guru Drona', 'Master of Celestial Weapons and Divine Astras', 'Mahabharata', 'bow', (FOREST, MAROON), GOLD),
        ('ashwatthama.jpg', 'Ashwatthama', 'The Immortal Gem-Born Warrior of Rudra', 'Mahabharata', 'sword', (CHARCOAL, CRIMSON), GOLD),
        ('abhimanyu.jpg', 'Abhimanyu', 'The Glorious Youth Who Pierced the Chakra Vyuha', 'Mahabharata', 'chariot', (MIDNIGHT, CRIMSON), GOLD),
        ('kunti.jpg', 'Queen Kunti', 'Pritha — Mother of the Pandavas and Solar Secret', 'Mahabharata', 'lotus', (MAROON, CHARCOAL), GOLD),
        ('gandhari.jpg', 'Queen Gandhari', 'Empress of Sacrifice and Unflinching Devotion', 'Mahabharata', 'temple', (CHARCOAL, (10, 10, 10)), GOLD),
        ('vidura.jpg', 'Mahatma Vidura', 'Voice of Uncorrupted Conscience & Dharma Niti', 'Mahabharata', 'temple', (FOREST, CHARCOAL), GOLD),
        ('duryodhana.jpg', 'Duryodhana', 'Kuru Prince of Boundless Ambition & Hubris', 'Mahabharata', 'mace', (MAROON, (15, 10, 12)), GOLD),
        ('shakuni.jpg', 'Shakuni', 'Prince of Gandhara — The Architect of Vendetta', 'Mahabharata', 'sword', (CHARCOAL, (10, 5, 5)), GOLD),
        ('dhritarashtra.jpg', 'King Dhritarashtra', 'The Blind Emperor Caught Between Love & Justice', 'Mahabharata', 'temple', (MAROON, CHARCOAL), GOLD),
        ('subhadra.jpg', 'Subhadra', 'Sister of Krishna and Mother of Abhimanyu', 'Mahabharata', 'lotus', (MIDNIGHT, SANDALWOOD), GOLD),
    ]
    for filename, title, sub, epic, sym, bg, acc in mahabharata_characters:
        path = os.path.join('assets/images/characters', filename)
        generate_art_card(path, title, sub, epic, sym, bg, acc)

    print("Generating Ramayana Kandas & Events...")
    ramayana_kandas = [
        ('bala-kanda.jpg', 'Bala Kanda', 'The Childhood and Divine Awakening of Rama', 'Ramayana', (MAROON, FOREST), 'forest'),
        ('ayodhya-kanda.jpg', 'Ayodhya Kanda', 'The Royal Expatriation and Departure to the Woods', 'Ramayana', (CRIMSON, CHARCOAL), 'palace'),
        ('aranya-kanda.jpg', 'Aranya Kanda', 'The Hermitage Life in Dandakaranya and Panchavati', 'Ramayana', (FOREST, CHARCOAL), 'forest'),
        ('kishkindha-kanda.jpg', 'Kishkindha Kanda', 'The Sacred Alliance with Hanuman and Sugriva', 'Ramayana', (CHARCOAL, FOREST), 'forest'),
        ('sundara-kanda.jpg', 'Sundara Kanda', 'The Marvelous Leap of Hanuman Across the Ocean', 'Ramayana', (MIDNIGHT, CELESTIAL), 'ocean'),
        ('yuddha-kanda.jpg', 'Yuddha Kanda', 'The Colossal Battle of Lanka and Triumph of Dharma', 'Ramayana', (MAROON, CRIMSON), 'battle'),
        ('uttara-kanda.jpg', 'Uttara Kanda', 'The Epilogue, Valmiki Ashrama, and Sacred Legacies', 'Ramayana', (CHARCOAL, FOREST), 'dawn'),
    ]
    for filename, title, sub, epic, bg, theme in ramayana_kandas:
        path = os.path.join('assets/images/ramayana', filename)
        generate_landscape_banner(path, title, sub, epic, bg, theme=theme)

    ramayana_events = [
        ('rama-exile.jpg', "Rama's Exile", 'Renouncing the Golden Throne of Ayodhya for Dharma', 'Ramayana', (CRIMSON, CHARCOAL), 'palace'),
        ('golden-deer.jpg', 'The Golden Deer', 'Maricha’s Illusion in the Deep Forests of Panchavati', 'Ramayana', (FOREST, CHARCOAL), 'forest'),
        ('sita-abduction.jpg', "Sita's Abduction", 'The Shadow Falls Across the Sacred Hermitage', 'Ramayana', (MAROON, (10, 5, 5)), 'battle'),
        ('hanuman-ashoka-vatika.jpg', 'Hanuman in Ashoka Vatika', 'Delivering the Mudrika and Rekindling Hope', 'Ramayana', (FOREST, MIDNIGHT), 'forest'),
        ('hanuman-sanjeevani.jpg', 'Lifting of Sanjeevani', 'Hanuman Flies with Mount Dronagiri at Night', 'Ramayana', (MIDNIGHT, (10, 15, 25)), 'night'),
        ('rama-setu.jpg', 'Construction of Rama Setu', 'Floating Stones Inscribed with Rama-Nama Across Ocean', 'Ramayana', (MIDNIGHT, CELESTIAL), 'ocean'),
        ('rama-ravana-battle.jpg', 'The Battle of Lanka', 'The Final Clash Between Divine Dharma and Hubris', 'Ramayana', (MAROON, CRIMSON), 'battle'),
        ('return-ayodhya.jpg', 'Return to Ayodhya', 'The Deepotsava of Joy and the Golden Coronation', 'Ramayana', (CRIMSON, DIVINE_GOLD), 'palace'),
    ]
    for filename, title, sub, epic, bg, theme in ramayana_events:
        path = os.path.join('assets/images/ramayana', filename)
        generate_landscape_banner(path, title, sub, epic, bg, theme=theme)

    print("Generating Mahabharata Chapters & War Turning Points...")
    mahabharata_chapters = [
        ('kuru-dynasty.jpg', 'The Kuru Dynasty', 'Origins of the Lunar Dynasty and King Shantanu', 'Mahabharata', (CHARCOAL, MIDNIGHT), 'palace'),
        ('pandavas-birth.jpg', 'Birth of the Pandavas', 'The Five Sons Born of Celestial Devas in the Forests', 'Mahabharata', (FOREST, CHARCOAL), 'forest'),
        ('drona-education.jpg', 'Education under Drona', 'Martial Mastery of Astras and the Eye of the Bird', 'Mahabharata', (CHARCOAL, MAROON), 'palace'),
        ('draupadi-swayamvara.jpg', "Draupadi's Swayamvara", 'Arjuna Pierces the Matsya Yantra in Panchala', 'Mahabharata', (CRIMSON, GOLD), 'palace'),
        ('indraprastha-palace.jpg', 'The Maya Sabha of Indraprastha', 'The Architectural Wonder Built by Mayasura', 'Mahabharata', (MIDNIGHT, GOLD), 'palace'),
        ('game-of-dice.jpg', 'The Fateful Game of Dice', 'The Subversion of Dharma in the Kuru Assembly', 'Mahabharata', (MAROON, (15, 10, 12)), 'palace'),
        ('pandavas-exile.jpg', 'Exile in Kamyaka Forest', 'Twelve Years of Penance and Agyatavasa in Matsya', 'Mahabharata', (FOREST, CHARCOAL), 'forest'),
        ('krishna-peace-mission.jpg', "Krishna's Peace Mission", 'The Divine Shanti Duta in the Court of Hastinapura', 'Mahabharata', (MIDNIGHT, CRIMSON), 'palace'),
        ('bhagavad-gita.jpg', 'The Song Celestial', 'Krishna Bestows Supreme Wisdom Upon Arjuna at Kurukshetra', 'Mahabharata', (MIDNIGHT, GOLD), 'dawn'),
        ('kurukshetra-war.jpg', 'The Eighteen-Day War', 'The Cataclysmic Conflagration of Dharma and Destiny', 'Mahabharata', (MAROON, CRIMSON), 'battle'),
        ('war-aftermath.jpg', 'The Aftermath & Ashwamedha', 'Yudhishthira’s Grief, Wisdom of Bhishma, and Final Journey', 'Mahabharata', (CHARCOAL, MIDNIGHT), 'dawn'),
    ]
    for filename, title, sub, epic, bg, theme in mahabharata_chapters:
        path = os.path.join('assets/images/mahabharata', filename)
        generate_landscape_banner(path, title, sub, epic, bg, theme=theme)

    mahabharata_events = [
        ('bhishma-fall.jpg', 'The Fall of Bhishma', 'Pitamaha Rests Upon the Shara-Shayya Bed of Arrows', 'Mahabharata', (CHARCOAL, MIDNIGHT), 'battle'),
        ('abhimanyu-chakra-vyuha.jpg', 'Abhimanyu in Chakra Vyuha', 'Sixteen-Year-Old Hero Defies Seven Maharathis', 'Mahabharata', (MAROON, CRIMSON), 'battle'),
        ('karna-arjuna-duel.jpg', 'The Clashing of Titans', 'Karna and Arjuna’s Final Fateful Encounter on Day 17', 'Mahabharata', (CRIMSON, MIDNIGHT), 'battle'),
        ('bhima-duryodhana-mace.jpg', 'The Final Mace Duel', 'Bhima and Duryodhana Meet on the Banks of Dvaipayana', 'Mahabharata', (CHARCOAL, MAROON), 'battle'),
    ]
    for filename, title, sub, epic, bg, theme in mahabharata_events:
        path = os.path.join('assets/images/mahabharata', filename)
        generate_landscape_banner(path, title, sub, epic, bg, theme=theme)

    print("Generating Sacred Places Artwork...")
    locations = [
        ('ayodhya.jpg', 'Ayodhya', 'City of the Sun Dynasty & Capital of Kosala', 'Ramayana', (CRIMSON, DIVINE_GOLD), 'palace'),
        ('mithila.jpg', 'Mithila', 'Sacred Kingdom of Videha and Realm of King Janaka', 'Ramayana', (MAROON, FOREST), 'palace'),
        ('chitrakoot.jpg', 'Chitrakoot', 'The Serene Hills and Forest Hermitage of Exile', 'Ramayana', (FOREST, CHARCOAL), 'forest'),
        ('dandakaranya.jpg', 'Dandakaranya', 'Ancient Primeval Forest and Realm of Sages', 'Ramayana', (FOREST, MIDNIGHT), 'forest'),
        ('kishkindha.jpg', 'Kishkindha', 'Kingdom of the Vanaras Along the Tungabhadra River', 'Ramayana', (CHARCOAL, FOREST), 'forest'),
        ('rameswaram.jpg', 'Rameswaram', 'The Consecration of the Shiva Linga Before the Setu', 'Ramayana', (MIDNIGHT, CELESTIAL), 'ocean'),
        ('lanka.jpg', 'Lanka', 'The Golden Citadel Engineered by Vishvakarma', 'Ramayana', (CRIMSON, DIVINE_GOLD), 'palace'),
        ('hastinapura.jpg', 'Hastinapura', 'Ancient City of the Elephants and Throne of Kurus', 'Mahabharata', (CHARCOAL, MAROON), 'palace'),
        ('indraprastha.jpg', 'Indraprastha', 'The Grand Capital Conquered from the Khandava Forest', 'Mahabharata', (MIDNIGHT, GOLD), 'palace'),
        ('kurukshetra.jpg', 'Kurukshetra', 'Dharmakshetra — The Sacred Field of Righteous Duty', 'Mahabharata', (MAROON, CRIMSON), 'battle'),
        ('dwarka.jpg', 'Dwarka', 'The Golden Island Citadel of Lord Krishna by the Western Sea', 'Mahabharata', (MIDNIGHT, CELESTIAL), 'ocean'),
        ('mathura.jpg', 'Mathura', 'Ancient Seat on the Yamuna and Birthplace of Krishna', 'Mahabharata', (FOREST, MIDNIGHT), 'palace'),
        ('panchala.jpg', 'Panchala', 'Kingdom of King Drupada and Birthplace of Draupadi', 'Mahabharata', (MAROON, CHARCOAL), 'palace'),
    ]
    for filename, title, sub, epic, bg, theme in locations:
        path = os.path.join('assets/images/locations', filename)
        generate_landscape_banner(path, title, sub, epic, bg, theme=theme)

    print("ALL EPIC ARTWORK GENERATED SUCCESSFULLY!")

if __name__ == '__main__':
    generate_all()
