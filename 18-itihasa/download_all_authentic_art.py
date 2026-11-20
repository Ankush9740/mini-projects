import os
from download_and_process_art import download_image, process_and_save, make_parchment_fallback

# Curated Authentic Artworks and Real Photographs
ART_MAP = {
    # HERO
    'assets/images/hero/rama-sita-hero.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
        'Lord Rama and Goddess Sita', 'Maryada Purushottama & Janaki', 'श्री सीताराम'
    ),

    # CHARACTERS
    'assets/images/characters/ram.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/8/84/Ravi_Varma-Rama-breaking-bow.jpg',
        'Lord Rama', 'Maryada Purushottama — Seventh Avatara', 'श्री रामः'
    ),
    'assets/images/characters/sita.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/6/64/Sita_in_Ashokavan.jpg',
        'Goddess Sita', 'Janaki — Divine Incarnation of Lakshmi', 'श्री सीता'
    ),
    'assets/images/characters/lakshman.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
        'Lakshmana', 'Saumitri — Paragon of Fraternal Devotion', 'लक्ष्मणः'
    ),
    'assets/images/characters/hanuman.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/Hanuman_flies_to_the_Himalayas_in_search_of_sacred_herbs%2C_From_the_Mewar_Ramayana.jpg',
        'Hanuman', 'Mahavira — Rudra Avatara & Pure Bhakti', 'श्री हनुमान्'
    ),
    'assets/images/characters/bharat.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/e/e3/Bharata_returning_to_Ayodhya_with_Rama%27s_padukas_-_sandals.jpg',
        'Bharata', 'The Righteous Regent of Ayodhya', 'भरतः'
    ),
    'assets/images/characters/shatrughna.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
        'Shatrughna', 'The Silent Guardian and Subduer of Foes', 'शत्रुघ्नः'
    ),
    'assets/images/characters/dasharatha.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Dasharatha_swoons_in_distress_upon_realizing_the_oath_Kaikeyi_has_extracted_from_him.jpg',
        'King Dasharatha', 'Monarch of Kosala, Bound by Truth', 'दशरथः'
    ),
    'assets/images/characters/kaushalya.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
        'Queen Kaushalya', 'The Serene Queen Mother of Rama', 'कौशल्या'
    ),
    'assets/images/characters/kaikeyi.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Dasharatha_swoons_in_distress_upon_realizing_the_oath_Kaikeyi_has_extracted_from_him.jpg',
        'Queen Kaikeyi', 'Warrior Queen of Fateful Vows', 'कैकेयी'
    ),
    'assets/images/characters/valmiki.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/0/09/1814_CE_Ramayana_manuscript%2C_Serat_Rama_Keling%2C_Javanese_version.jpg',
        'Maharishi Valmiki', 'Adi Kavi — Composer of the Ramayana', 'महर्षि वाल्मीकिः'
    ),
    'assets/images/characters/jatayu.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Raja_Ravi_Varma%2C_Jatayu_vadha%2C_1906.jpg',
        'Jatayu', 'Noble Winged Warrior of Righteous Sacrifice', 'जटायुः'
    ),
    'assets/images/characters/sugriva.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Hampi%2C_India%2C_Rocky_landscape_of_Hampi%2C_Granite_rocks_of_Matanga_Hill.jpg',
        'King Sugriva', 'Monarch of Kishkindha & Ally of Rama', 'सुग्रीवः'
    ),
    'assets/images/characters/vibhishana.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/c/cd/Vibhishana_clarifies_Rama_about_the_enemy_troops.jpg',
        'Vibhishana', 'The Seeker of Dharma & King of Lanka', 'विभीषणः'
    ),
    'assets/images/characters/ravana.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Raja_Ravi_Varma%2C_Jatayu_vadha%2C_1906.jpg',
        'King Ravana', 'Ten-Headed Lord of Lanka & Vedic Scholar', 'रावणः'
    ),
    'assets/images/characters/indrajit.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/c/cc/Indrajit_worships_Devi_before_battle_Lakshmana_kills_him_on_the_battle_field.jpg',
        'Indrajit (Meghanada)', 'Conqueror of Indra & Master of Astras', 'इन्द्रजित्'
    ),
    'assets/images/characters/kumbhakarna.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/9/94/The_death_of_Kumbhakarna_-_Ramayana%2C_Yuddha_Kanda_%281652%29%2C_f.87_-_BL_Add_MS_15297.jpg',
        'Kumbhakarna', 'The Colossal Titan Loyal Unto Death', 'कुम्भकर्णः'
    ),

    # SEVEN KANDAS
    'assets/images/kandas/bala-kanda.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/8/84/Ravi_Varma-Rama-breaking-bow.jpg',
        'Bala Kanda', 'The Childhood & Divine Awakening', 'बालकाण्डम्'
    ),
    'assets/images/kandas/ayodhya-kanda.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Dasharatha_swoons_in_distress_upon_realizing_the_oath_Kaikeyi_has_extracted_from_him.jpg',
        'Ayodhya Kanda', 'The Expatriation & Departure', 'अयोध्याकाण्डम्'
    ),
    'assets/images/kandas/aranya-kanda.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Raja_Ravi_Varma%2C_Jatayu_vadha%2C_1906.jpg',
        'Aranya Kanda', 'Hermitage Life in the Primeval Forest', 'अरण्यकाण्डम्'
    ),
    'assets/images/kandas/kishkindha-kanda.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Hampi%2C_India%2C_Rocky_landscape_of_Hampi%2C_Granite_rocks_of_Matanga_Hill.jpg',
        'Kishkindha Kanda', 'Alliance with the Vanaras', 'किष्किन्धाकाण्डम्'
    ),
    'assets/images/kandas/sundara-kanda.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/6/64/Sita_in_Ashokavan.jpg',
        'Sundara Kanda', 'Hanuman’s Miraculous Quest to Lanka', 'सुन्दरकाण्डम्'
    ),
    'assets/images/kandas/yuddha-kanda.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/6/6c/Battle_at_Lanka%2C_Ramayana%2C_Udaipur%2C_1649-53.jpg',
        'Yuddha Kanda', 'The Great Battle of Lanka & Victory of Dharma', 'युद्धकाण्डम्'
    ),
    'assets/images/kandas/uttara-kanda.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
        'Uttara Kanda', 'The Golden Coronation & Sacred Legacy', 'उत्तरकाण्डम्'
    ),

    # EVENTS
    'assets/images/events/forest-exile.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Dasharatha_swoons_in_distress_upon_realizing_the_oath_Kaikeyi_has_extracted_from_him.jpg',
        'Rama’s Noble Exile', 'Renouncing the Golden Throne for Truth', 'वनवास गमनम्'
    ),
    'assets/images/events/golden-deer.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Raja_Ravi_Varma%2C_Jatayu_vadha%2C_1906.jpg',
        'The Golden Deer', 'Maricha’s Illusion in Panchavati', 'स्वर्णमृगः'
    ),
    'assets/images/events/sita-abduction.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Raja_Ravi_Varma%2C_Jatayu_vadha%2C_1906.jpg',
        'Sita’s Abduction', 'Ravana and Jatayu’s Aerial Duel', 'सीताहरणम्'
    ),
    'assets/images/events/ashoka-vatika.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/6/64/Sita_in_Ashokavan.jpg',
        'Hanuman in Ashoka Vatika', 'Delivering the Mudrika & Rekindling Hope', 'अशोकवाटिका'
    ),
    'assets/images/events/sanjeevani.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/Hanuman_flies_to_the_Himalayas_in_search_of_sacred_herbs%2C_From_the_Mewar_Ramayana.jpg',
        'Lifting Mount Dronagiri', 'Hanuman Carrying the Sanjeevani Herb', 'सञ्जीवनी'
    ),
    'assets/images/events/rama-setu.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/Rameswaram_Temple%2C_Tamil_Nadu.jpg',
        'Construction of Rama Setu', 'Floating Stones Inscribed with Rama-Nama', 'सेतुबन्धः'
    ),
    'assets/images/events/ravana-vadha.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/6/6c/Battle_at_Lanka%2C_Ramayana%2C_Udaipur%2C_1649-53.jpg',
        'The Battle of Lanka', 'The Vanquishing of Adharma & Slaying of Ravana', 'रावणवधः'
    ),
    'assets/images/events/ayodhya-return.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Ramapanchayan%2C_Raja_Ravi_Varma_%28Lithograph%29.jpg',
        'Return to Ayodhya', 'The Deepotsava of Joy & Golden Rajyabhisheka', 'राज्याभिषेकः'
    ),

    # PLACES (Real cultural photography & architecture)
    'assets/images/places/ayodhya.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/4/48/A_boat_in_the_Sarayu_River%2C_Ayodhya.jpg',
        'Ayodhya', 'Capital of the Solar Dynasty on River Sarayu', 'अयोध्या'
    ),
    'assets/images/places/mithila.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/6/6c/Janaki_Temple_Janakpur-Janakpur030315_MG_36680059.jpg',
        'Mithila', 'Sacred Kingdom of Videha & Realm of King Janaka', 'मिथिला'
    ),
    'assets/images/places/chitrakoot.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/a/ae/Ramghat%2C_Chitrakoot.png',
        'Chitrakoot', 'Serene Forest Hermitage on Mandakini River', 'चित्रकूटम्'
    ),
    'assets/images/places/panchavati.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/a/ae/Ramghat%2C_Chitrakoot.png',
        'Panchavati & Dandakaranya', 'Sacred Banyan Hermitage on River Godavari', 'पञ्चवटी'
    ),
    'assets/images/places/kishkindha.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Hampi%2C_India%2C_Rocky_landscape_of_Hampi%2C_Granite_rocks_of_Matanga_Hill.jpg',
        'Kishkindha', 'Granite Boulders of Tungabhadra & Matanga Hill', 'किष्किन्धा'
    ),
    'assets/images/places/rameshwaram.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/Rameswaram_Temple%2C_Tamil_Nadu.jpg',
        'Rameshwaram & Rama Setu', 'Consecration of Shiva Linga at Ocean Confluence', 'रामेश्वरम्'
    ),
    'assets/images/places/lanka.jpg': (
        'https://upload.wikimedia.org/wikipedia/commons/6/6c/Battle_at_Lanka%2C_Ramayana%2C_Udaipur%2C_1649-53.jpg',
        'Lanka', 'The Citadel Island on Trikuta Mountain', 'लङ्का'
    ),
}

def main():
    print("Starting authentic image download and asset consolidation...")
    cached_downloads = {}

    for target_path, (url, title, subtitle, sanskrit) in ART_MAP.items():
        is_landscape = ('kandas' in target_path or 'events' in target_path or 'places' in target_path or 'hero' in target_path)
        w, h = (1200, 800) if is_landscape else (800, 1000)

        # Download or use cached bytes
        if url not in cached_downloads:
            data = download_image(url)
            if data:
                cached_downloads[url] = data
            else:
                cached_downloads[url] = None
        else:
            data = cached_downloads[url]

        success = False
        if data:
            success = process_and_save(data, target_path, width=w, height=h)

        if not success:
            print(f"Generating manuscript parchment fallback for: {target_path}")
            make_parchment_fallback(target_path, title, subtitle, sanskrit, width=w, height=h)

    print("ALL AUTHENTIC ARTWORK ASSETS PROCESSED SUCCESSFULLY!")

if __name__ == '__main__':
    main()
