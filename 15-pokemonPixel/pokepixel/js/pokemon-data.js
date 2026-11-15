/* POKÉPIXEL Comprehensive Pokémon Database (Gen 1-3 GBA) */
window.POKEMON_DATABASE = [
  {
    "id": 1,
    "name": "Bulbasaur",
    "types": [
      "Grass",
      "Poison"
    ],
    "category": "Seed Pok\u00e9mon",
    "height": "0.7 m",
    "weight": "6.9 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pok\u00e9mon.",
    "stats": {
      "hp": 45,
      "atk": 49,
      "def": 49,
      "spAtk": 65,
      "spDef": 65,
      "spd": 45,
      "total": 318
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 2,
      "name": "Ivysaur",
      "level": "Lv. 16"
    },
    "personality": "Calm, loyal, and steady. Thrives in bright sunshine and bonds deeply with patient trainers.",
    "sprite": "assets/sprites/1.png"
  },
  {
    "id": 2,
    "name": "Ivysaur",
    "types": [
      "Grass",
      "Poison"
    ],
    "category": "Seed Pok\u00e9mon",
    "height": "1.0 m",
    "weight": "13.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "When the bud on its back starts swelling, a sweet aroma wafts to indicate the flower's coming bloom.",
    "stats": {
      "hp": 60,
      "atk": 62,
      "def": 63,
      "spAtk": 80,
      "spDef": 80,
      "spd": 60,
      "total": 405
    },
    "evolvesFrom": {
      "id": 1,
      "name": "Bulbasaur"
    },
    "evolvesTo": {
      "id": 3,
      "name": "Venusaur",
      "level": "Lv. 32"
    },
    "personality": "Determined and proud. Absorbs sunlight to prepare for its dramatic blossoming.",
    "sprite": "assets/sprites/2.png"
  },
  {
    "id": 3,
    "name": "Venusaur",
    "types": [
      "Grass",
      "Poison"
    ],
    "category": "Seed Pok\u00e9mon",
    "height": "2.0 m",
    "weight": "100.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "The flower on its back catches the sun's rays. The sunlight is transformed into energy, filling the air with a soothing scent.",
    "stats": {
      "hp": 80,
      "atk": 82,
      "def": 83,
      "spAtk": 100,
      "spDef": 100,
      "spd": 80,
      "total": 525
    },
    "evolvesFrom": {
      "id": 2,
      "name": "Ivysaur"
    },
    "evolvesTo": null,
    "personality": "A majestic guardian of ancient forests, peaceful yet unstoppable in battle.",
    "sprite": "assets/sprites/3.png"
  },
  {
    "id": 4,
    "name": "Charmander",
    "types": [
      "Fire"
    ],
    "category": "Lizard Pok\u00e9mon",
    "height": "0.6 m",
    "weight": "8.5 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "From the day it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.",
    "stats": {
      "hp": 39,
      "atk": 52,
      "def": 43,
      "spAtk": 60,
      "spDef": 50,
      "spd": 65,
      "total": 309
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 5,
      "name": "Charmeleon",
      "level": "Lv. 16"
    },
    "personality": "Spirited, passionate, and fiercely loyal. Its tail burns hotter when excited.",
    "sprite": "assets/sprites/4.png"
  },
  {
    "id": 5,
    "name": "Charmeleon",
    "types": [
      "Fire"
    ],
    "category": "Flame Pok\u00e9mon",
    "height": "1.1 m",
    "weight": "19.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "It has a barbaric nature. In battle, it whips its fiery tail around and slashes with sharp claws.",
    "stats": {
      "hp": 58,
      "atk": 64,
      "def": 58,
      "spAtk": 80,
      "spDef": 65,
      "spd": 80,
      "total": 405
    },
    "evolvesFrom": {
      "id": 4,
      "name": "Charmander"
    },
    "evolvesTo": {
      "id": 6,
      "name": "Charizard",
      "level": "Lv. 36"
    },
    "personality": "Fiery and rebellious. Craves difficult opponents to test its blistering speed and power.",
    "sprite": "assets/sprites/5.png"
  },
  {
    "id": 6,
    "name": "Charizard",
    "types": [
      "Fire",
      "Flying"
    ],
    "category": "Flame Pok\u00e9mon",
    "height": "1.7 m",
    "weight": "90.5 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Its wings can carry this Pok\u00e9mon close to an altitude of 4,600 feet. It blows out intense fire at high temperatures.",
    "stats": {
      "hp": 78,
      "atk": 84,
      "def": 78,
      "spAtk": 109,
      "spDef": 85,
      "spd": 100,
      "total": 534
    },
    "evolvesFrom": {
      "id": 5,
      "name": "Charmeleon"
    },
    "evolvesTo": null,
    "personality": "The iconic mascot of Pok\u00e9mon FireRed. Noble and prideful, breathes fire capable of melting boulders.",
    "sprite": "assets/sprites/6.png"
  },
  {
    "id": 7,
    "name": "Squirtle",
    "types": [
      "Water"
    ],
    "category": "Tiny Turtle Pok\u00e9mon",
    "height": "0.5 m",
    "weight": "9.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Shoots water at prey while in the water. Withdraws into its shell when in danger.",
    "stats": {
      "hp": 44,
      "atk": 48,
      "def": 65,
      "spAtk": 50,
      "spDef": 64,
      "spd": 43,
      "total": 314
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 8,
      "name": "Wartortle",
      "level": "Lv. 16"
    },
    "personality": "Playful, resilient, and confident. Retreats into its shell to unleash high-pressure torrents.",
    "sprite": "assets/sprites/7.png"
  },
  {
    "id": 8,
    "name": "Wartortle",
    "types": [
      "Water"
    ],
    "category": "Turtle Pok\u00e9mon",
    "height": "1.0 m",
    "weight": "22.5 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "It is recognized by its large, furry ears and tail. Its tail is an ancient symbol of longevity.",
    "stats": {
      "hp": 59,
      "atk": 63,
      "def": 80,
      "spAtk": 65,
      "spDef": 80,
      "spd": 58,
      "total": 405
    },
    "evolvesFrom": {
      "id": 7,
      "name": "Squirtle"
    },
    "evolvesTo": {
      "id": 9,
      "name": "Blastoise",
      "level": "Lv. 36"
    },
    "personality": "Stoic and disciplined. Master of ocean currents with keen aquatic senses.",
    "sprite": "assets/sprites/8.png"
  },
  {
    "id": 9,
    "name": "Blastoise",
    "types": [
      "Water"
    ],
    "category": "Shellfish Pok\u00e9mon",
    "height": "1.6 m",
    "weight": "85.5 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "The rocket cannons on its shell fire jets of water capable of punching holes through thick steel sheets.",
    "stats": {
      "hp": 79,
      "atk": 83,
      "def": 100,
      "spAtk": 85,
      "spDef": 105,
      "spd": 78,
      "total": 530
    },
    "evolvesFrom": {
      "id": 8,
      "name": "Wartortle"
    },
    "evolvesTo": null,
    "personality": "An immovable fortress of water power. Deliberate, reliable, and deeply defensive.",
    "sprite": "assets/sprites/9.png"
  },
  {
    "id": 152,
    "name": "Chikorita",
    "types": [
      "Grass"
    ],
    "category": "Leaf Pok\u00e9mon",
    "height": "0.9 m",
    "weight": "6.4 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "A sweet aroma gently wafts from the leaf on its head. It is docile and loves to soak in sunbeams.",
    "stats": {
      "hp": 45,
      "atk": 49,
      "def": 65,
      "spAtk": 49,
      "spDef": 65,
      "spd": 45,
      "total": 318
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 153,
      "name": "Bayleef",
      "level": "Lv. 16"
    },
    "personality": "Affectionate and cheerful, waves its aromatic leaf to calm tensions.",
    "sprite": "assets/sprites/152.png"
  },
  {
    "id": 153,
    "name": "Bayleef",
    "types": [
      "Grass"
    ],
    "category": "Leaf Pok\u00e9mon",
    "height": "1.2 m",
    "weight": "15.8 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "The scent that wafts from the leaves around its neck makes anyone who smells it become energetic.",
    "stats": {
      "hp": 60,
      "atk": 62,
      "def": 80,
      "spAtk": 63,
      "spDef": 80,
      "spd": 60,
      "total": 405
    },
    "evolvesFrom": {
      "id": 152,
      "name": "Chikorita"
    },
    "evolvesTo": {
      "id": 154,
      "name": "Meganium",
      "level": "Lv. 32"
    },
    "personality": "Spirited and protective, emits a restorative fragrance from neck buds.",
    "sprite": "assets/sprites/153.png"
  },
  {
    "id": 154,
    "name": "Meganium",
    "types": [
      "Grass"
    ],
    "category": "Herb Pok\u00e9mon",
    "height": "1.8 m",
    "weight": "100.5 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "Meganium's breath has the power to revive dead grass and plants. It can make them healthy again.",
    "stats": {
      "hp": 80,
      "atk": 82,
      "def": 100,
      "spAtk": 83,
      "spDef": 100,
      "spd": 80,
      "total": 525
    },
    "evolvesFrom": {
      "id": 153,
      "name": "Bayleef"
    },
    "evolvesTo": null,
    "personality": "Gentle healer whose breath rejuvenates barren wilderness.",
    "sprite": "assets/sprites/154.png"
  },
  {
    "id": 155,
    "name": "Cyndaquil",
    "types": [
      "Fire"
    ],
    "category": "Fire Mouse Pok\u00e9mon",
    "height": "0.5 m",
    "weight": "7.9 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "It is timid, and always curls itself up into a ball. If attacked, it flares up its back for protection.",
    "stats": {
      "hp": 39,
      "atk": 52,
      "def": 43,
      "spAtk": 60,
      "spDef": 50,
      "spd": 65,
      "total": 309
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 156,
      "name": "Quilava",
      "level": "Lv. 14"
    },
    "personality": "Shy and reserved at first, but unleashes explosive flames when startled.",
    "sprite": "assets/sprites/155.png"
  },
  {
    "id": 156,
    "name": "Quilava",
    "types": [
      "Fire"
    ],
    "category": "Volcano Pok\u00e9mon",
    "height": "0.9 m",
    "weight": "19.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "Be careful if it turns its back during battle. It means that it will attack with the fire on its back.",
    "stats": {
      "hp": 58,
      "atk": 64,
      "def": 58,
      "spAtk": 80,
      "spDef": 65,
      "spd": 80,
      "total": 405
    },
    "evolvesFrom": {
      "id": 155,
      "name": "Cyndaquil"
    },
    "evolvesTo": {
      "id": 157,
      "name": "Typhlosion",
      "level": "Lv. 36"
    },
    "personality": "Nimble and quick-witted, dodges attacks with fluid acrobatic flame bursts.",
    "sprite": "assets/sprites/156.png"
  },
  {
    "id": 157,
    "name": "Typhlosion",
    "types": [
      "Fire"
    ],
    "category": "Volcano Pok\u00e9mon",
    "height": "1.7 m",
    "weight": "79.5 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "It can hide behind a shimmering heat haze that it creates using its intense flames. It creates blazing explosions.",
    "stats": {
      "hp": 78,
      "atk": 84,
      "def": 78,
      "spAtk": 109,
      "spDef": 85,
      "spd": 100,
      "total": 534
    },
    "evolvesFrom": {
      "id": 156,
      "name": "Quilava"
    },
    "evolvesTo": null,
    "personality": "Ferocious volcanic master that scorches surroundings when enraged.",
    "sprite": "assets/sprites/157.png"
  },
  {
    "id": 158,
    "name": "Totodile",
    "types": [
      "Water"
    ],
    "category": "Big Jaw Pok\u00e9mon",
    "height": "0.6 m",
    "weight": "9.5 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "Its well-developed jaws are powerful and capable of crushing anything. Even its trainer must be careful.",
    "stats": {
      "hp": 50,
      "atk": 65,
      "def": 64,
      "spAtk": 44,
      "spDef": 48,
      "spd": 43,
      "total": 314
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 159,
      "name": "Croconaw",
      "level": "Lv. 18"
    },
    "personality": "Exuberant, playful, and energetic. Loves to chomp on anything nearby playfully.",
    "sprite": "assets/sprites/158.png"
  },
  {
    "id": 159,
    "name": "Croconaw",
    "types": [
      "Water"
    ],
    "category": "Big Jaw Pok\u00e9mon",
    "height": "1.1 m",
    "weight": "25.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "Once it bites down, it won't let go until it loses its fangs. New fangs quickly grow in their place.",
    "stats": {
      "hp": 65,
      "atk": 80,
      "def": 80,
      "spAtk": 59,
      "spDef": 63,
      "spd": 58,
      "total": 405
    },
    "evolvesFrom": {
      "id": 158,
      "name": "Totodile"
    },
    "evolvesTo": {
      "id": 160,
      "name": "Feraligatr",
      "level": "Lv. 30"
    },
    "personality": "Tenacious hunter that never releases a hold once clamped shut.",
    "sprite": "assets/sprites/159.png"
  },
  {
    "id": 160,
    "name": "Feraligatr",
    "types": [
      "Water"
    ],
    "category": "Big Jaw Pok\u00e9mon",
    "height": "2.3 m",
    "weight": "88.8 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "When it bites with its massive and powerful jaws, it shakes its head and savagely tears up its opponent.",
    "stats": {
      "hp": 85,
      "atk": 105,
      "def": 100,
      "spAtk": 79,
      "spDef": 83,
      "spd": 78,
      "total": 530
    },
    "evolvesFrom": {
      "id": 159,
      "name": "Croconaw"
    },
    "evolvesTo": null,
    "personality": "Dominant aquatic predator with immense crushing strength and primal speed.",
    "sprite": "assets/sprites/160.png"
  },
  {
    "id": 252,
    "name": "Treecko",
    "types": [
      "Grass"
    ],
    "category": "Wood Gecko Pok\u00e9mon",
    "height": "0.5 m",
    "weight": "5.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "It makes its home in giant trees in the forest. It fiercely guards against anyone who approaches its territory.",
    "stats": {
      "hp": 40,
      "atk": 45,
      "def": 35,
      "spAtk": 65,
      "spDef": 55,
      "spd": 70,
      "total": 310
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 253,
      "name": "Grovyle",
      "level": "Lv. 16"
    },
    "personality": "Cool, calm, and collected. Clings vertically to any wall with microscopic foot hooks.",
    "sprite": "assets/sprites/252.png"
  },
  {
    "id": 253,
    "name": "Grovyle",
    "types": [
      "Grass"
    ],
    "category": "Wood Gecko Pok\u00e9mon",
    "height": "0.9 m",
    "weight": "21.6 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Leaves grow out of this Pok\u00e9mon's body. They help it camouflage itself in the trees, leaping swiftly from bough to bough.",
    "stats": {
      "hp": 50,
      "atk": 65,
      "def": 45,
      "spAtk": 85,
      "spDef": 65,
      "spd": 95,
      "total": 405
    },
    "evolvesFrom": {
      "id": 252,
      "name": "Treecko"
    },
    "evolvesTo": {
      "id": 254,
      "name": "Sceptile",
      "level": "Lv. 36"
    },
    "personality": "Agile woodland ninja. Skims across jungle canopies with effortless precision.",
    "sprite": "assets/sprites/253.png"
  },
  {
    "id": 254,
    "name": "Sceptile",
    "types": [
      "Grass"
    ],
    "category": "Forest Pok\u00e9mon",
    "height": "1.7 m",
    "weight": "52.2 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "The leaves growing on its forearms can slice down thick trees. It is without equal in jungle combat.",
    "stats": {
      "hp": 70,
      "atk": 85,
      "def": 65,
      "spAtk": 105,
      "spDef": 85,
      "spd": 120,
      "total": 530
    },
    "evolvesFrom": {
      "id": 253,
      "name": "Grovyle"
    },
    "evolvesTo": null,
    "personality": "Lord of the deep canopy. Slices through foliage with razor sharp Leaf Blades.",
    "sprite": "assets/sprites/254.png"
  },
  {
    "id": 255,
    "name": "Torchic",
    "types": [
      "Fire"
    ],
    "category": "Chick Pok\u00e9mon",
    "height": "0.4 m",
    "weight": "2.5 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "A fire burns inside, so it feels very warm to hug. It launches fireballs of 1,800 degrees Fahrenheit.",
    "stats": {
      "hp": 45,
      "atk": 60,
      "def": 40,
      "spAtk": 70,
      "spDef": 50,
      "spd": 45,
      "total": 310
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 256,
      "name": "Combusken",
      "level": "Lv. 16"
    },
    "personality": "Charming, warm, and curious. Huddles close to trainers to share radiant warmth.",
    "sprite": "assets/sprites/255.png"
  },
  {
    "id": 256,
    "name": "Combusken",
    "types": [
      "Fire",
      "Fighting"
    ],
    "category": "Young Fowl Pok\u00e9mon",
    "height": "0.9 m",
    "weight": "19.5 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "It boosts its concentration by emitting harsh cries. Its kicks have outstanding destructive power.",
    "stats": {
      "hp": 60,
      "atk": 85,
      "def": 60,
      "spAtk": 85,
      "spDef": 60,
      "spd": 55,
      "total": 405
    },
    "evolvesFrom": {
      "id": 255,
      "name": "Torchic"
    },
    "evolvesTo": {
      "id": 257,
      "name": "Blaziken",
      "level": "Lv. 36"
    },
    "personality": "Energetic martial artist in training, dishes out 10 kicks per second.",
    "sprite": "assets/sprites/256.png"
  },
  {
    "id": 257,
    "name": "Blaziken",
    "types": [
      "Fire",
      "Fighting"
    ],
    "category": "Blaze Pok\u00e9mon",
    "height": "1.9 m",
    "weight": "52.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "In battle, Blaziken blows out intense flames from its wrists and attacks foes courageously. It can clear a 30-story building in a leap.",
    "stats": {
      "hp": 80,
      "atk": 120,
      "def": 70,
      "spAtk": 110,
      "spDef": 70,
      "spd": 80,
      "total": 530
    },
    "evolvesFrom": {
      "id": 256,
      "name": "Combusken"
    },
    "evolvesTo": null,
    "personality": "Fearless martial champion. Leaps into the stratosphere and lands with fiery meteor kicks.",
    "sprite": "assets/sprites/257.png"
  },
  {
    "id": 258,
    "name": "Mudkip",
    "types": [
      "Water"
    ],
    "category": "Mud Fish Pok\u00e9mon",
    "height": "0.4 m",
    "weight": "7.6 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "The fin on Mudkip's head acts as highly sensitive radar. Using it, it senses water flow and air movements without seeing.",
    "stats": {
      "hp": 50,
      "atk": 70,
      "def": 50,
      "spAtk": 50,
      "spDef": 50,
      "spd": 40,
      "total": 310
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 259,
      "name": "Marshtomp",
      "level": "Lv. 16"
    },
    "personality": "Endearing, brave, and exceptionally sturdy. Uses its head fin as natural water radar.",
    "sprite": "assets/sprites/258.png"
  },
  {
    "id": 259,
    "name": "Marshtomp",
    "types": [
      "Water",
      "Ground"
    ],
    "category": "Mud Fish Pok\u00e9mon",
    "height": "0.7 m",
    "weight": "28.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Its body is covered with a slimy membrane that lets it live on land. It plays in the mud when the tide goes out.",
    "stats": {
      "hp": 70,
      "atk": 85,
      "def": 70,
      "spAtk": 60,
      "spDef": 70,
      "spd": 50,
      "total": 405
    },
    "evolvesFrom": {
      "id": 258,
      "name": "Mudkip"
    },
    "evolvesTo": {
      "id": 260,
      "name": "Swampert",
      "level": "Lv. 36"
    },
    "personality": "Versatile amphibious brawler, swims effortlessly through thick sludge.",
    "sprite": "assets/sprites/259.png"
  },
  {
    "id": 260,
    "name": "Swampert",
    "types": [
      "Water",
      "Ground"
    ],
    "category": "Mud Fish Pok\u00e9mon",
    "height": "1.5 m",
    "weight": "81.9 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Swampert is strong enough to drag a boulder weighing over a ton with ease. Its vision can see straight through murky water.",
    "stats": {
      "hp": 100,
      "atk": 110,
      "def": 90,
      "spAtk": 85,
      "spDef": 90,
      "spd": 60,
      "total": 535
    },
    "evolvesFrom": {
      "id": 259,
      "name": "Marshtomp"
    },
    "evolvesTo": null,
    "personality": "Titanesque guardian of wetlands with only one elemental weakness. Imbued with colossal raw power.",
    "sprite": "assets/sprites/260.png"
  },
  {
    "id": 144,
    "name": "Articuno",
    "types": [
      "Ice",
      "Flying"
    ],
    "category": "Freeze Pok\u00e9mon",
    "height": "1.7 m",
    "weight": "55.4 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "A legendary bird Pok\u00e9mon that is said to appear to doomed people who are lost in icy mountains.",
    "stats": {
      "hp": 90,
      "atk": 85,
      "def": 100,
      "spAtk": 95,
      "spDef": 125,
      "spd": 85,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Ethereal avian herald of winter blizzards.",
    "sprite": "assets/sprites/144.png"
  },
  {
    "id": 145,
    "name": "Zapdos",
    "types": [
      "Electric",
      "Flying"
    ],
    "category": "Electric Pok\u00e9mon",
    "height": "1.6 m",
    "weight": "52.6 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "A legendary bird Pok\u00e9mon that is said to appear from clouds while dropping enormous lightning bolts.",
    "stats": {
      "hp": 90,
      "atk": 90,
      "def": 85,
      "spAtk": 125,
      "spDef": 90,
      "spd": 100,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Roosting amidst storm clouds, crackling with raw electricity.",
    "sprite": "assets/sprites/145.png"
  },
  {
    "id": 146,
    "name": "Moltres",
    "types": [
      "Fire",
      "Flying"
    ],
    "category": "Flame Pok\u00e9mon",
    "height": "2.0 m",
    "weight": "60.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Known as the legendary bird of fire. Every flap of its wings creates a dazzling flare of red flames.",
    "stats": {
      "hp": 90,
      "atk": 100,
      "def": 90,
      "spAtk": 125,
      "spDef": 85,
      "spd": 90,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Phoenix of Mt. Ember, bathing in magma to heal its plumage.",
    "sprite": "assets/sprites/146.png"
  },
  {
    "id": 150,
    "name": "Mewtwo",
    "types": [
      "Psychic"
    ],
    "category": "Genetic Pok\u00e9mon",
    "height": "2.0 m",
    "weight": "122.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "A Pok\u00e9mon created by recombining Mew's genes. It's said to have the most savage heart among Pok\u00e9mon.",
    "stats": {
      "hp": 106,
      "atk": 110,
      "def": 90,
      "spAtk": 154,
      "spDef": 90,
      "spd": 130,
      "total": 680
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Created in Cerulean Cave laboratories, wielding supreme psychic psystrike.",
    "sprite": "assets/sprites/150.png"
  },
  {
    "id": 151,
    "name": "Mew",
    "types": [
      "Psychic"
    ],
    "category": "New Species Pok\u00e9mon",
    "height": "0.4 m",
    "weight": "4.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide.",
    "stats": {
      "hp": 100,
      "atk": 100,
      "def": 100,
      "spAtk": 100,
      "spDef": 100,
      "spd": 100,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Playful and elusive ancestor holding genetic codes of all Pok\u00e9mon.",
    "sprite": "assets/sprites/151.png"
  },
  {
    "id": 243,
    "name": "Raikou",
    "types": [
      "Electric"
    ],
    "category": "Thunder Pok\u00e9mon",
    "height": "1.9 m",
    "weight": "178.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "The rain clouds it carries allow it to fire thunderbolts at will. They say it descended with lightning.",
    "stats": {
      "hp": 90,
      "atk": 85,
      "def": 75,
      "spAtk": 115,
      "spDef": 100,
      "spd": 115,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Roaming beast embodying the shocking speed of thunder.",
    "sprite": "assets/sprites/243.png"
  },
  {
    "id": 244,
    "name": "Entei",
    "types": [
      "Fire"
    ],
    "category": "Volcano Pok\u00e9mon",
    "height": "2.1 m",
    "weight": "198.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "Volcanoes erupt when it barks. Unable to restrain its extreme power, it races continually across the land.",
    "stats": {
      "hp": 115,
      "atk": 115,
      "def": 85,
      "spAtk": 90,
      "spDef": 75,
      "spd": 100,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Born from volcanic magma, sprinting tirelessly across the world.",
    "sprite": "assets/sprites/244.png"
  },
  {
    "id": 245,
    "name": "Suicune",
    "types": [
      "Water"
    ],
    "category": "Aurora Pok\u00e9mon",
    "height": "2.0 m",
    "weight": "187.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "Said to be the reincarnation of north winds. It can instantly purify filthy, murky water.",
    "stats": {
      "hp": 100,
      "atk": 75,
      "def": 115,
      "spAtk": 90,
      "spDef": 115,
      "spd": 85,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Graceful incarnation of northern winds that purifies every stream.",
    "sprite": "assets/sprites/245.png"
  },
  {
    "id": 249,
    "name": "Lugia",
    "types": [
      "Psychic",
      "Flying"
    ],
    "category": "Diving Pok\u00e9mon",
    "height": "5.2 m",
    "weight": "216.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "It sleeps in deep sea trenches. If it flaps its wings, it is said to cause a 40-day storm.",
    "stats": {
      "hp": 106,
      "atk": 90,
      "def": 130,
      "spAtk": 90,
      "spDef": 154,
      "spd": 110,
      "total": 680
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Guardian of the oceans whose aeroblast parts colossal whirlpools.",
    "sprite": "assets/sprites/249.png"
  },
  {
    "id": 250,
    "name": "Ho-Oh",
    "types": [
      "Fire",
      "Flying"
    ],
    "category": "Rainbow Pok\u00e9mon",
    "height": "3.8 m",
    "weight": "199.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "Its feathers produce a rainbow behind it when it flies. It is said that seeing one grants eternal happiness.",
    "stats": {
      "hp": 106,
      "atk": 130,
      "def": 90,
      "spAtk": 110,
      "spDef": 154,
      "spd": 90,
      "total": 680
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Radiant rainbow bird perched atop Bell Tower.",
    "sprite": "assets/sprites/250.png"
  },
  {
    "id": 377,
    "name": "Regirock",
    "types": [
      "Rock"
    ],
    "category": "Rock Peak Pok\u00e9mon",
    "height": "1.7 m",
    "weight": "230.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Composed entirely of rocks and boulders. If its body is damaged in battle, it digs up new rocks to repair itself.",
    "stats": {
      "hp": 80,
      "atk": 100,
      "def": 200,
      "spAtk": 50,
      "spDef": 100,
      "spd": 50,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Ancient golem sealed inside Desert Ruins.",
    "sprite": "assets/sprites/377.png"
  },
  {
    "id": 378,
    "name": "Regice",
    "types": [
      "Ice"
    ],
    "category": "Iceberg Pok\u00e9mon",
    "height": "1.8 m",
    "weight": "175.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Its body is made of Antarctic ice from the ice age. It controls freezing air of minus 328 degrees F.",
    "stats": {
      "hp": 80,
      "atk": 50,
      "def": 100,
      "spAtk": 100,
      "spDef": 200,
      "spd": 50,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Glacial sentinel sealed within Island Cave.",
    "sprite": "assets/sprites/378.png"
  },
  {
    "id": 379,
    "name": "Registeel",
    "types": [
      "Steel"
    ],
    "category": "Iron Pok\u00e9mon",
    "height": "1.9 m",
    "weight": "205.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Its body is made of an unknown metal that is both harder than diamond and extremely flexible.",
    "stats": {
      "hp": 80,
      "atk": 75,
      "def": 150,
      "spAtk": 75,
      "spDef": 150,
      "spd": 50,
      "total": 580
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Unbreakable metallic entity slumbering in Ancient Tomb.",
    "sprite": "assets/sprites/379.png"
  },
  {
    "id": 380,
    "name": "Latias",
    "types": [
      "Dragon",
      "Psychic"
    ],
    "category": "Eon Pok\u00e9mon",
    "height": "1.4 m",
    "weight": "40.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "It communicates with people using telepathy. It can mentally project visual images to others.",
    "stats": {
      "hp": 80,
      "atk": 80,
      "def": 90,
      "spAtk": 110,
      "spDef": 130,
      "spd": 110,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Gentle eon guardian of the Southern Island.",
    "sprite": "assets/sprites/380.png"
  },
  {
    "id": 381,
    "name": "Latios",
    "types": [
      "Dragon",
      "Psychic"
    ],
    "category": "Eon Pok\u00e9mon",
    "height": "2.0 m",
    "weight": "60.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "A highly intelligent Pok\u00e9mon. By folding back its wings in flight, it can overtake jet planes.",
    "stats": {
      "hp": 80,
      "atk": 90,
      "def": 80,
      "spAtk": 130,
      "spDef": 110,
      "spd": 110,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Supersonic dragon cruising through Hoenn's open skies.",
    "sprite": "assets/sprites/381.png"
  },
  {
    "id": 382,
    "name": "Kyogre",
    "types": [
      "Water"
    ],
    "category": "Sea Basin Pok\u00e9mon",
    "height": "4.5 m",
    "weight": "352.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Kyogre has the power to create massive rain clouds that cover the entire sky and bring down torrential downpours.",
    "stats": {
      "hp": 100,
      "atk": 100,
      "def": 90,
      "spAtk": 150,
      "spDef": 140,
      "spd": 90,
      "total": 670
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "The primordial titan of oceans. Cover mascot of Pok\u00e9mon Sapphire.",
    "sprite": "assets/sprites/382.png"
  },
  {
    "id": 383,
    "name": "Groudon",
    "types": [
      "Ground"
    ],
    "category": "Continent Pok\u00e9mon",
    "height": "3.5 m",
    "weight": "950.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Groudon has long been described in mythology as the Pok\u00e9mon that raised lands and expanded continents.",
    "stats": {
      "hp": 100,
      "atk": 150,
      "def": 140,
      "spAtk": 100,
      "spDef": 90,
      "spd": 90,
      "total": 670
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "The primeval colossus of earth and drought. Cover mascot of Pok\u00e9mon Ruby.",
    "sprite": "assets/sprites/383.png"
  },
  {
    "id": 384,
    "name": "Rayquaza",
    "types": [
      "Dragon",
      "Flying"
    ],
    "category": "Sky High Pok\u00e9mon",
    "height": "7.0 m",
    "weight": "206.5 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "It flies forever through the ozone layer, consuming meteoroids for sustenance. It descends only to end colossal conflicts.",
    "stats": {
      "hp": 105,
      "atk": 150,
      "def": 90,
      "spAtk": 150,
      "spDef": 90,
      "spd": 95,
      "total": 680
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "The supreme dragon master of the skies. Cover star of Pok\u00e9mon Emerald.",
    "sprite": "assets/sprites/384.png"
  },
  {
    "id": 385,
    "name": "Jirachi",
    "types": [
      "Steel",
      "Psychic"
    ],
    "category": "Wish Pok\u00e9mon",
    "height": "0.3 m",
    "weight": "1.1 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "A legend says that Jirachi will make true any wish that is written on notes attached to its head when it awakens.",
    "stats": {
      "hp": 100,
      "atk": 100,
      "def": 100,
      "spAtk": 100,
      "spDef": 100,
      "spd": 100,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Mystical wish granter that awakens for seven days every millennium.",
    "sprite": "assets/sprites/385.png"
  },
  {
    "id": 386,
    "name": "Deoxys",
    "types": [
      "Psychic"
    ],
    "category": "DNA Pok\u00e9mon",
    "height": "1.7 m",
    "weight": "60.8 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "An alien virus that fell to Earth on a meteor underwent a DNA mutation to become this extraordinary Pok\u00e9mon.",
    "stats": {
      "hp": 50,
      "atk": 150,
      "def": 50,
      "spAtk": 150,
      "spDef": 50,
      "spd": 150,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Extraterrestrial being lurking on Birth Island in the Sevii Islands.",
    "sprite": "assets/sprites/386.png"
  },
  {
    "id": 25,
    "name": "Pikachu",
    "types": [
      "Electric"
    ],
    "category": "Mouse Pok\u00e9mon",
    "height": "0.4 m",
    "weight": "6.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. It stores power in its cheeks.",
    "stats": {
      "hp": 35,
      "atk": 55,
      "def": 40,
      "spAtk": 50,
      "spDef": 50,
      "spd": 90,
      "total": 320
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 26,
      "name": "Raichu",
      "level": "Thunder Stone"
    },
    "personality": "Beloved worldwide ambassador of Pok\u00e9mon. Quick-footed spark of pure joy.",
    "sprite": "assets/sprites/25.png"
  },
  {
    "id": 26,
    "name": "Raichu",
    "types": [
      "Electric"
    ],
    "category": "Mouse Pok\u00e9mon",
    "height": "0.8 m",
    "weight": "30.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Its long tail serves as a ground to protect itself from its own high voltage. It can discharge up to 100,000 volts.",
    "stats": {
      "hp": 60,
      "atk": 90,
      "def": 55,
      "spAtk": 90,
      "spDef": 80,
      "spd": 110,
      "total": 485
    },
    "evolvesFrom": {
      "id": 25,
      "name": "Pikachu"
    },
    "evolvesTo": null,
    "personality": "Thunderous powerhouse with a lightning-rod tail.",
    "sprite": "assets/sprites/26.png"
  },
  {
    "id": 59,
    "name": "Arcanine",
    "types": [
      "Fire"
    ],
    "category": "Legendary Pok\u00e9mon",
    "height": "1.9 m",
    "weight": "155.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "A Pok\u00e9mon that has been admired since the past for its beauty. It runs agilely as if on wings.",
    "stats": {
      "hp": 90,
      "atk": 110,
      "def": 80,
      "spAtk": 100,
      "spDef": 80,
      "spd": 95,
      "total": 555
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Noble, loyal canine that dashes across 6,200 miles in a day.",
    "sprite": "assets/sprites/59.png"
  },
  {
    "id": 65,
    "name": "Alakazam",
    "types": [
      "Psychic"
    ],
    "category": "Psi Pok\u00e9mon",
    "height": "1.5 m",
    "weight": "48.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000.",
    "stats": {
      "hp": 55,
      "atk": 50,
      "def": 45,
      "spAtk": 135,
      "spDef": 95,
      "spd": 120,
      "total": 500
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Supreme telekinetic genius wielding spoon-bending psycho cut.",
    "sprite": "assets/sprites/65.png"
  },
  {
    "id": 68,
    "name": "Machamp",
    "types": [
      "Fighting"
    ],
    "category": "Superpower Pok\u00e9mon",
    "height": "1.6 m",
    "weight": "130.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "It punches with blinding speed. It can unleash 1,000 punches in just two seconds with its four arms.",
    "stats": {
      "hp": 90,
      "atk": 130,
      "def": 80,
      "spAtk": 65,
      "spDef": 85,
      "spd": 55,
      "total": 505
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Colossal martial brawler capable of moving mountains.",
    "sprite": "assets/sprites/68.png"
  },
  {
    "id": 94,
    "name": "Gengar",
    "types": [
      "Ghost",
      "Poison"
    ],
    "category": "Shadow Pok\u00e9mon",
    "height": "1.5 m",
    "weight": "40.5 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Under a full moon, this Pok\u00e9mon likes to mimic the shadows of people and laugh at their fright.",
    "stats": {
      "hp": 60,
      "atk": 65,
      "def": 60,
      "spAtk": 130,
      "spDef": 75,
      "spd": 110,
      "total": 500
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Mischievous phantom lurking in dark corners and cooling ambient room temperatures.",
    "sprite": "assets/sprites/94.png"
  },
  {
    "id": 130,
    "name": "Gyarados",
    "types": [
      "Water",
      "Flying"
    ],
    "category": "Atrocious Pok\u00e9mon",
    "height": "6.5 m",
    "weight": "235.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Once it begins to rampage, a Gyarados will not calm down until it has razed every city in its path.",
    "stats": {
      "hp": 95,
      "atk": 125,
      "def": 79,
      "spAtk": 60,
      "spDef": 100,
      "spd": 81,
      "total": 540
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Raging sea serpent capable of destroying entire coastlines.",
    "sprite": "assets/sprites/130.png"
  },
  {
    "id": 131,
    "name": "Lapras",
    "types": [
      "Water",
      "Ice"
    ],
    "category": "Transport Pok\u00e9mon",
    "height": "2.5 m",
    "weight": "220.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "A gentle soul that can understand human speech. It can ferry people across sea waters on its back.",
    "stats": {
      "hp": 130,
      "atk": 85,
      "def": 80,
      "spAtk": 85,
      "spDef": 95,
      "spd": 60,
      "total": 535
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Beloved ocean traveler singing hauntingly beautiful melodies.",
    "sprite": "assets/sprites/131.png"
  },
  {
    "id": 133,
    "name": "Eevee",
    "types": [
      "Normal"
    ],
    "category": "Evolution Pok\u00e9mon",
    "height": "0.3 m",
    "weight": "6.5 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "An extremely rare Pok\u00e9mon that may evolve in a number of different ways depending on stimuli.",
    "stats": {
      "hp": 55,
      "atk": 55,
      "def": 50,
      "spAtk": 45,
      "spDef": 65,
      "spd": 55,
      "total": 325
    },
    "evolvesFrom": null,
    "evolvesTo": {
      "id": 134,
      "name": "Vaporeon / Jolteon / Flareon",
      "level": "Elemental Stone"
    },
    "personality": "Adaptable and full of limitless evolutionary potential.",
    "sprite": "assets/sprites/133.png"
  },
  {
    "id": 134,
    "name": "Vaporeon",
    "types": [
      "Water"
    ],
    "category": "Bubble Jet Pok\u00e9mon",
    "height": "1.0 m",
    "weight": "29.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Its cell structure is similar to water molecules. It will melt away and become invisible in water.",
    "stats": {
      "hp": 130,
      "atk": 65,
      "def": 60,
      "spAtk": 110,
      "spDef": 95,
      "spd": 65,
      "total": 525
    },
    "evolvesFrom": {
      "id": 133,
      "name": "Eevee"
    },
    "evolvesTo": null,
    "personality": "Serene aquatic marvel that vanishes seamlessly into waves.",
    "sprite": "assets/sprites/134.png"
  },
  {
    "id": 135,
    "name": "Jolteon",
    "types": [
      "Electric"
    ],
    "category": "Lightning Pok\u00e9mon",
    "height": "0.8 m",
    "weight": "24.5 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "It accumulates negative ions in the atmosphere to blast out 10,000-volt lightning bolts.",
    "stats": {
      "hp": 65,
      "atk": 65,
      "def": 60,
      "spAtk": 110,
      "spDef": 95,
      "spd": 130,
      "total": 525
    },
    "evolvesFrom": {
      "id": 133,
      "name": "Eevee"
    },
    "evolvesTo": null,
    "personality": "Blisteringly fast spark hound with bristling pin-missile needles.",
    "sprite": "assets/sprites/135.png"
  },
  {
    "id": 136,
    "name": "Flareon",
    "types": [
      "Fire"
    ],
    "category": "Flame Pok\u00e9mon",
    "height": "0.9 m",
    "weight": "25.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Flareon's fluffy fur has a functional purpose\u2014it releases heat into the air so that its body does not get excessively hot.",
    "stats": {
      "hp": 65,
      "atk": 130,
      "def": 60,
      "spAtk": 95,
      "spDef": 110,
      "spd": 65,
      "total": 525
    },
    "evolvesFrom": {
      "id": 133,
      "name": "Eevee"
    },
    "evolvesTo": null,
    "personality": "Warm, spirited flame fox that reaches scorching internal temperatures.",
    "sprite": "assets/sprites/136.png"
  },
  {
    "id": 143,
    "name": "Snorlax",
    "types": [
      "Normal"
    ],
    "category": "Sleeping Pok\u00e9mon",
    "height": "2.1 m",
    "weight": "460.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "Snorlax's day consists entirely of eating and sleeping. It is such a docile Pok\u00e9mon that children use its belly as a playfield.",
    "stats": {
      "hp": 160,
      "atk": 110,
      "def": 65,
      "spAtk": 65,
      "spDef": 110,
      "spd": 30,
      "total": 540
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Famous sleepy road blocker awakened only by the Pok\u00e9 Flute.",
    "sprite": "assets/sprites/143.png"
  },
  {
    "id": 149,
    "name": "Dragonite",
    "types": [
      "Dragon",
      "Flying"
    ],
    "category": "Dragon Pok\u00e9mon",
    "height": "2.2 m",
    "weight": "210.0 kg",
    "gen": 1,
    "region": "Kanto",
    "desc": "It is said to make its home somewhere in the sea. It guides crews of shipwrecks to shore with its kind heart.",
    "stats": {
      "hp": 91,
      "atk": 134,
      "def": 95,
      "spAtk": 100,
      "spDef": 100,
      "spd": 80,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Original pseudo-legendary dragon capable of circling the globe in 16 hours.",
    "sprite": "assets/sprites/149.png"
  },
  {
    "id": 169,
    "name": "Crobat",
    "types": [
      "Poison",
      "Flying"
    ],
    "category": "Bat Pok\u00e9mon",
    "height": "1.8 m",
    "weight": "75.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "The transformation of its legs into wings made it much faster. It flies silently through the pitch dark.",
    "stats": {
      "hp": 85,
      "atk": 90,
      "def": 80,
      "spAtk": 70,
      "spDef": 80,
      "spd": 130,
      "total": 535
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Supersonic nocturnal speedster born from deep friendship.",
    "sprite": "assets/sprites/169.png"
  },
  {
    "id": 196,
    "name": "Espeon",
    "types": [
      "Psychic"
    ],
    "category": "Sun Pok\u00e9mon",
    "height": "0.9 m",
    "weight": "26.5 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "By reading air currents with its fine fur, it can predict things such as the weather and its foe's next move.",
    "stats": {
      "hp": 65,
      "atk": 65,
      "def": 60,
      "spAtk": 130,
      "spDef": 95,
      "spd": 110,
      "total": 525
    },
    "evolvesFrom": {
      "id": 133,
      "name": "Eevee"
    },
    "evolvesTo": null,
    "personality": "Sunlight guardian possessing psychic clairvoyance.",
    "sprite": "assets/sprites/196.png"
  },
  {
    "id": 197,
    "name": "Umbreon",
    "types": [
      "Dark"
    ],
    "category": "Moonlight Pok\u00e9mon",
    "height": "1.0 m",
    "weight": "27.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "When exposed to the moon's aura, the rings on its body glow faintly and it gains a mysterious power.",
    "stats": {
      "hp": 95,
      "atk": 65,
      "def": 110,
      "spAtk": 60,
      "spDef": 130,
      "spd": 65,
      "total": 525
    },
    "evolvesFrom": {
      "id": 133,
      "name": "Eevee"
    },
    "evolvesTo": null,
    "personality": "Unshakable midnight defender that glimmers under starlight.",
    "sprite": "assets/sprites/197.png"
  },
  {
    "id": 212,
    "name": "Scizor",
    "types": [
      "Bug",
      "Steel"
    ],
    "category": "Scissors Pok\u00e9mon",
    "height": "1.8 m",
    "weight": "118.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "It swings its eye-patterned pincers up to intimidate its foe. This makes it look like it has three heads.",
    "stats": {
      "hp": 70,
      "atk": 130,
      "def": 100,
      "spAtk": 55,
      "spDef": 80,
      "spd": 65,
      "total": 500
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Steel-armored predator whose bullet punches crush solid rock.",
    "sprite": "assets/sprites/212.png"
  },
  {
    "id": 214,
    "name": "Heracross",
    "types": [
      "Bug",
      "Fighting"
    ],
    "category": "Single Horn Pok\u00e9mon",
    "height": "1.5 m",
    "weight": "54.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "With its Herculean powers, it can easily throw around an object that is 100 times its own weight.",
    "stats": {
      "hp": 80,
      "atk": 125,
      "def": 75,
      "spAtk": 40,
      "spDef": 95,
      "spd": 85,
      "total": 500
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Cheerful beetle warrior that loves sweet tree sap.",
    "sprite": "assets/sprites/214.png"
  },
  {
    "id": 248,
    "name": "Tyranitar",
    "types": [
      "Rock",
      "Dark"
    ],
    "category": "Armor Pok\u00e9mon",
    "height": "2.0 m",
    "weight": "202.0 kg",
    "gen": 2,
    "region": "Johto",
    "desc": "Its body can't be harmed by any sort of attack, so it is very eager to make challenges against enemies.",
    "stats": {
      "hp": 100,
      "atk": 134,
      "def": 110,
      "spAtk": 95,
      "spDef": 100,
      "spd": 61,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Sandstorm juggernaut that reshapes terrain in battle.",
    "sprite": "assets/sprites/248.png"
  },
  {
    "id": 272,
    "name": "Ludicolo",
    "types": [
      "Water",
      "Grass"
    ],
    "category": "Carefree Pok\u00e9mon",
    "height": "1.5 m",
    "weight": "55.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Upon hearing an upbeat rhythm, the cells in Ludicolo's body activate, filling it with boundless energy.",
    "stats": {
      "hp": 80,
      "atk": 70,
      "def": 70,
      "spAtk": 90,
      "spDef": 100,
      "spd": 70,
      "total": 480
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Dancing spirit of Hoenn rain teams.",
    "sprite": "assets/sprites/272.png"
  },
  {
    "id": 282,
    "name": "Gardevoir",
    "types": [
      "Psychic"
    ],
    "category": "Embrace Pok\u00e9mon",
    "height": "1.6 m",
    "weight": "48.4 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "It has the psychokinetic power to distort the dimensions and create a small black hole to protect its Trainer.",
    "stats": {
      "hp": 68,
      "atk": 65,
      "def": 65,
      "spAtk": 125,
      "spDef": 115,
      "spd": 80,
      "total": 518
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Fiercely devoted psychic guardian that senses the future.",
    "sprite": "assets/sprites/282.png"
  },
  {
    "id": 286,
    "name": "Breloom",
    "types": [
      "Grass",
      "Fighting"
    ],
    "category": "Mushroom Pok\u00e9mon",
    "height": "1.2 m",
    "weight": "39.2 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "The seeds on its tail are made of toxic spores. It knocks out foes with quick, virtually invisible punches.",
    "stats": {
      "hp": 60,
      "atk": 130,
      "def": 80,
      "spAtk": 60,
      "spDef": 60,
      "spd": 70,
      "total": 460
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Spore-packing pugilist with spring-loaded arms.",
    "sprite": "assets/sprites/286.png"
  },
  {
    "id": 289,
    "name": "Slaking",
    "types": [
      "Normal"
    ],
    "category": "Lazy Pok\u00e9mon",
    "height": "2.0 m",
    "weight": "130.5 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "The world's laziest Pok\u00e9mon. When it lounges, it saves energy to strike back with tremendous strength.",
    "stats": {
      "hp": 150,
      "atk": 160,
      "def": 100,
      "spAtk": 95,
      "spDef": 65,
      "spd": 100,
      "total": 670
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Petalburg Gym leader Norman's trumps card, harboring monstrous power.",
    "sprite": "assets/sprites/289.png"
  },
  {
    "id": 306,
    "name": "Aggron",
    "types": [
      "Steel",
      "Rock"
    ],
    "category": "Iron Armor Pok\u00e9mon",
    "height": "2.1 m",
    "weight": "360.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "It claims a whole mountain as its own territory. It fiercely protects its mountain, planting trees after landslides.",
    "stats": {
      "hp": 70,
      "atk": 110,
      "def": 180,
      "spAtk": 60,
      "spDef": 60,
      "spd": 50,
      "total": 530
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Steel-plated mountain protector that crushes iron with horns.",
    "sprite": "assets/sprites/306.png"
  },
  {
    "id": 321,
    "name": "Wailord",
    "types": [
      "Water"
    ],
    "category": "Float Whale Pok\u00e9mon",
    "height": "14.5 m",
    "weight": "398.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "The biggest of all identified Pok\u00e9mon. It can dive to a depth of almost 10,000 feet on only one breath.",
    "stats": {
      "hp": 170,
      "atk": 90,
      "def": 45,
      "spAtk": 90,
      "spDef": 45,
      "spd": 60,
      "total": 500
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Gentle giant of Route 124, key to unlocking sealed chambers.",
    "sprite": "assets/sprites/321.png"
  },
  {
    "id": 330,
    "name": "Flygon",
    "types": [
      "Ground",
      "Dragon"
    ],
    "category": "Mystic Pok\u00e9mon",
    "height": "2.0 m",
    "weight": "82.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Flygon whips up a sandstorm by flapping its wings. The musical flapping sounds like the song of a spirit.",
    "stats": {
      "hp": 80,
      "atk": 100,
      "def": 80,
      "spAtk": 80,
      "spDef": 80,
      "spd": 100,
      "total": 520
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "The Desert Spirit whose wingbeats sound like ethereal melodies.",
    "sprite": "assets/sprites/330.png"
  },
  {
    "id": 334,
    "name": "Altaria",
    "types": [
      "Dragon",
      "Flying"
    ],
    "category": "Humming Pok\u00e9mon",
    "height": "1.1 m",
    "weight": "20.6 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Altaria sings in a gorgeous soprano voice. When it hums, listeners are transported to a dreamlike state.",
    "stats": {
      "hp": 75,
      "atk": 70,
      "def": 90,
      "spAtk": 70,
      "spDef": 105,
      "spd": 80,
      "total": 490
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Cloud-winged songstress soaring through the blue skies of Fortree.",
    "sprite": "assets/sprites/334.png"
  },
  {
    "id": 350,
    "name": "Milotic",
    "types": [
      "Water"
    ],
    "category": "Tender Pok\u00e9mon",
    "height": "6.2 m",
    "weight": "162.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Milotic is said to be the most beautiful of all Pok\u00e9mon. It has the power to soothe angry feelings and calm strife.",
    "stats": {
      "hp": 95,
      "atk": 60,
      "def": 79,
      "spAtk": 100,
      "spDef": 125,
      "spd": 81,
      "total": 540
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Breathtaking rainbow serpent, champion Wallace's signature ace.",
    "sprite": "assets/sprites/350.png"
  },
  {
    "id": 356,
    "name": "Dusclops",
    "types": [
      "Ghost"
    ],
    "category": "Beckon Pok\u00e9mon",
    "height": "1.6 m",
    "weight": "30.6 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Dusclops is completely hollow inside. It absorbs anything into its body as if it were a black hole.",
    "stats": {
      "hp": 40,
      "atk": 70,
      "def": 130,
      "spAtk": 60,
      "spDef": 130,
      "spd": 25,
      "total": 455
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Cyclopean mummy haunting Mt. Pyre summit.",
    "sprite": "assets/sprites/356.png"
  },
  {
    "id": 359,
    "name": "Absol",
    "types": [
      "Dark"
    ],
    "category": "Disaster Pok\u00e9mon",
    "height": "1.2 m",
    "weight": "47.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "It senses coming natural disasters with its horn. It appears before people only to warn them of catastrophe.",
    "stats": {
      "hp": 65,
      "atk": 130,
      "def": 60,
      "spAtk": 75,
      "spDef": 60,
      "spd": 75,
      "total": 465
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Misunderstood harbinger of warnings, roaming jagged mountain crags.",
    "sprite": "assets/sprites/359.png"
  },
  {
    "id": 373,
    "name": "Salamence",
    "types": [
      "Dragon",
      "Flying"
    ],
    "category": "Dragon Pok\u00e9mon",
    "height": "1.5 m",
    "weight": "102.6 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "It had an ardent dream of flying for years. When it finally evolved, its sheer joy triggered dragon wings to sprout.",
    "stats": {
      "hp": 95,
      "atk": 135,
      "def": 80,
      "spAtk": 110,
      "spDef": 80,
      "spd": 100,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "The soaring terror of Meteor Falls, fulfilling its lifelong dream of flight.",
    "sprite": "assets/sprites/373.png"
  },
  {
    "id": 376,
    "name": "Metagross",
    "types": [
      "Steel",
      "Psychic"
    ],
    "category": "Iron Leg Pok\u00e9mon",
    "height": "1.6 m",
    "weight": "550.0 kg",
    "gen": 3,
    "region": "Hoenn",
    "desc": "Metagross is the result of two Metang fusing together. It has four brains that solve complex equations faster than supercomputers.",
    "stats": {
      "hp": 80,
      "atk": 135,
      "def": 130,
      "spAtk": 95,
      "spDef": 90,
      "spd": 70,
      "total": 600
    },
    "evolvesFrom": null,
    "evolvesTo": null,
    "personality": "Champion Steven Stone's ultimate steel behemoth.",
    "sprite": "assets/sprites/376.png"
  }
];
