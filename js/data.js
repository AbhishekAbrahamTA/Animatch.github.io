/* ============================================
   Animatch - Anime Database & Data Layer
   All descriptions are original and paraphrased.
   ============================================ */

const ANIME_DATABASE = [
  // === ACTION ===
  { id: 1, title: "Thunderblade Chronicles", genres: ["Action", "Fantasy"], description: "A young warrior inherits a legendary sword and must master its elemental powers to protect a crumbling kingdom from an ancient threat.", rating: 4.7, episodes: 24 },
  { id: 2, title: "Iron Vanguard", genres: ["Action", "Sci-Fi"], description: "In a world where mech pilots defend the last human cities, a rookie discovers their machine harbors a secret that could turn the tide of war.", rating: 4.5, episodes: 26 },
  { id: 3, title: "Crimson Pursuit", genres: ["Action", "Mystery"], description: "A bounty hunter tracks the most dangerous criminals across a neon-lit metropolis, uncovering conspiracies that go deeper than anyone imagined.", rating: 4.6, episodes: 12 },
  { id: 4, title: "Shattered Resolve", genres: ["Action", "Drama"], description: "After losing everything in a sudden conflict, a former soldier rebuilds their strength and fights to reclaim what was taken from their homeland.", rating: 4.4, episodes: 25 },
  { id: 5, title: "Stormbreaker Academy", genres: ["Action", "Comedy"], description: "Students at an elite combat academy compete in wild tournaments while forging unlikely friendships and uncovering hidden powers.", rating: 4.3, episodes: 24 },
  { id: 6, title: "Blazing Frontier", genres: ["Action", "Adventure"], description: "A group of explorers ventures beyond the known world into uncharted lands filled with mythical creatures and ancient civilizations.", rating: 4.5, episodes: 50 },
  { id: 7, title: "Shadow Fist Rising", genres: ["Action", "Martial Arts"], description: "A street fighter enters an underground tournament to find the martial artist who defeated their master, discovering inner strength along the way.", rating: 4.2, episodes: 13 },
  { id: 8, title: "Apex Hunters", genres: ["Action", "Sci-Fi"], description: "Elite operatives equipped with advanced technology track rogue AI across a fractured solar system in high-stakes chase missions.", rating: 4.6, episodes: 24 },

  // === ROMANCE ===
  { id: 9, title: "Petals in the Wind", genres: ["Romance", "Drama"], description: "Two artists from different worlds meet at a countryside retreat and slowly discover that their creative passions mirror the feelings growing between them.", rating: 4.8, episodes: 12 },
  { id: 10, title: "Letters from Tomorrow", genres: ["Romance", "Fantasy"], description: "A mysterious mailbox delivers letters from the future, connecting two strangers across time who must decide if love can transcend temporal boundaries.", rating: 4.7, episodes: 13 },
  { id: 11, title: "Café Starlight", genres: ["Romance", "Slice of Life"], description: "A small-town barista and a traveling musician bond over late-night conversations, learning that sometimes the best connections happen unexpectedly.", rating: 4.5, episodes: 12 },
  { id: 12, title: "Moonlit Serenade", genres: ["Romance", "Music"], description: "A pianist and a vocalist are paired for a national competition, clashing at first but gradually harmonizing both their music and their hearts.", rating: 4.6, episodes: 24 },
  { id: 13, title: "Seasons of You", genres: ["Romance", "Drama"], description: "Following a couple through four seasons of their relationship, each chapter reveals how they grow together and apart before finding their way back.", rating: 4.4, episodes: 12 },
  { id: 14, title: "Starbound Hearts", genres: ["Romance", "Sci-Fi"], description: "An astronaut and a ground control operator develop a deep connection during a years-long space mission, communicating only through delayed transmissions.", rating: 4.3, episodes: 10 },

  // === FANTASY ===
  { id: 15, title: "Realm of Echoes", genres: ["Fantasy", "Adventure"], description: "A mapmaker discovers their drawings can open portals to the worlds they depict, leading to an epic journey across interconnected realms.", rating: 4.8, episodes: 25 },
  { id: 16, title: "The Celestial Forge", genres: ["Fantasy", "Action"], description: "An apprentice blacksmith learns to craft weapons from starlight, becoming the key to defending the floating cities from shadow invaders.", rating: 4.6, episodes: 24 },
  { id: 17, title: "Whisper of the Ancients", genres: ["Fantasy", "Mystery"], description: "A scholar deciphers a forbidden language that awakens ancient spirits, each holding a piece of a puzzle that could reshape reality itself.", rating: 4.7, episodes: 13 },
  { id: 18, title: "Dragon's Covenant", genres: ["Fantasy", "Drama"], description: "The last dragon keeper must forge an alliance between humans and dragons before an eternal winter consumes the world.", rating: 4.5, episodes: 26 },
  { id: 19, title: "Crystal Nomads", genres: ["Fantasy", "Sci-Fi"], description: "Wanderers travel between crystal-powered cities in a desert world, searching for the mythical source of all magical energy.", rating: 4.4, episodes: 24 },
  { id: 20, title: "Verdant Kingdom", genres: ["Fantasy", "Slice of Life"], description: "In a world where plants are sentient, a young herbalist builds bridges between human settlements and the great forest kingdoms.", rating: 4.3, episodes: 12 },

  // === SLICE OF LIFE ===
  { id: 21, title: "Golden Hour Diaries", genres: ["Slice of Life", "Drama"], description: "A photography student captures everyday moments in their small coastal town, discovering that ordinary life holds extraordinary beauty.", rating: 4.6, episodes: 12 },
  { id: 22, title: "The Ramen Chronicles", genres: ["Slice of Life", "Comedy"], description: "A family-run ramen shop faces the challenge of modernizing while preserving traditions, told through the eyes of the youngest member.", rating: 4.5, episodes: 13 },
  { id: 23, title: "Bicycle Sundays", genres: ["Slice of Life", "Romance"], description: "A group of friends explores their city every Sunday by bicycle, each ride bringing new discoveries about the places and people they encounter.", rating: 4.4, episodes: 12 },
  { id: 24, title: "Ink and Paper", genres: ["Slice of Life", "Drama"], description: "An aspiring manga artist juggles part-time jobs and creative ambitions, finding inspiration in the colorful characters of their daily life.", rating: 4.7, episodes: 24 },
  { id: 25, title: "Rooftop Garden Club", genres: ["Slice of Life", "Comedy"], description: "High school students transform an abandoned rooftop into a thriving garden, growing plants and friendships in equal measure.", rating: 4.3, episodes: 12 },

  // === COMEDY ===
  { id: 26, title: "Misadventures of Team Zero", genres: ["Comedy", "Action"], description: "The lowest-ranked hero team somehow keeps saving the world through sheer luck, misunderstandings, and accidental brilliance.", rating: 4.5, episodes: 24 },
  { id: 27, title: "My Neighbor is a Ghost", genres: ["Comedy", "Supernatural"], description: "A college student discovers their apartment neighbor is a friendly ghost who gives terrible life advice but means well.", rating: 4.6, episodes: 12 },
  { id: 28, title: "Office Quest", genres: ["Comedy", "Slice of Life"], description: "Employees at a quirky game development studio navigate absurd deadlines, office politics, and the chaos of creative collaboration.", rating: 4.4, episodes: 13 },
  { id: 29, title: "Cooking Catastrophe", genres: ["Comedy", "Food"], description: "A culinary school dropout accidentally becomes a viral cooking sensation by creating hilariously terrible dishes that somehow taste amazing.", rating: 4.3, episodes: 12 },
  { id: 30, title: "Super Side Characters", genres: ["Comedy", "Fantasy"], description: "The overlooked background characters of a fantasy world team up to prove they deserve their own story arc.", rating: 4.7, episodes: 12 },

  // === MYSTERY ===
  { id: 31, title: "The Seventh Station", genres: ["Mystery", "Thriller"], description: "A detective investigates disappearances at a remote train station where passengers vanish between stops, each case revealing a deeper pattern.", rating: 4.8, episodes: 12 },
  { id: 32, title: "Midnight Library", genres: ["Mystery", "Fantasy"], description: "A librarian discovers that certain books in the archive rewrite themselves at midnight, each new version containing clues to unsolved cases.", rating: 4.7, episodes: 13 },
  { id: 33, title: "Phantom Frequencies", genres: ["Mystery", "Sci-Fi"], description: "A radio engineer intercepts transmissions from parallel dimensions, each broadcast hinting at events that haven't happened yet.", rating: 4.5, episodes: 12 },
  { id: 34, title: "Glass City Files", genres: ["Mystery", "Drama"], description: "A journalist in a seemingly perfect metropolis uncovers hidden truths behind the city's flawless facade, risking everything for the story.", rating: 4.6, episodes: 24 },
  { id: 35, title: "Puzzle Masters", genres: ["Mystery", "Comedy"], description: "An eccentric detective duo solves elaborate puzzles left by a playful criminal mastermind who treats crime as an intellectual game.", rating: 4.4, episodes: 12 },

  // === SCI-FI ===
  { id: 36, title: "Nova Drift", genres: ["Sci-Fi", "Action"], description: "Space salvagers discover an ancient vessel that holds the key to faster-than-light travel, attracting the attention of every faction in the galaxy.", rating: 4.6, episodes: 25 },
  { id: 37, title: "Digital Bloom", genres: ["Sci-Fi", "Romance"], description: "In a world where memories can be digitized, two people discover that their most precious shared memory has been altered, and must find the truth.", rating: 4.5, episodes: 12 },
  { id: 38, title: "The Last Algorithm", genres: ["Sci-Fi", "Thriller"], description: "A programmer creates an AI that predicts human behavior with frightening accuracy, raising questions about free will in a data-driven world.", rating: 4.7, episodes: 13 },
  { id: 39, title: "Colony Seven", genres: ["Sci-Fi", "Drama"], description: "The seventh Mars colony struggles with isolation, resource scarcity, and the dream of creating a new society far from Earth's problems.", rating: 4.4, episodes: 24 },

  // === SPORTS ===
  { id: 40, title: "Rising Serve", genres: ["Sports", "Drama"], description: "A volleyball prodigy with stage fright joins a struggling team and must overcome personal fears to lead them to nationals.", rating: 4.6, episodes: 25 },
  { id: 41, title: "Track of Stars", genres: ["Sports", "Slice of Life"], description: "Runners from different backgrounds train together for the relay championships, learning that teamwork matters more than individual speed.", rating: 4.4, episodes: 24 },
  { id: 42, title: "Ice Breakers", genres: ["Sports", "Romance"], description: "A figure skating pair with contrasting personalities must learn to trust each other on and off the ice to qualify for the world stage.", rating: 4.5, episodes: 12 },

  // === HORROR/SUPERNATURAL ===
  { id: 43, title: "Hollow Corridors", genres: ["Horror", "Mystery"], description: "Students at a boarding school investigate strange occurrences in the oldest wing, where rooms rearrange themselves after dark.", rating: 4.3, episodes: 12 },
  { id: 44, title: "Spirit Lantern", genres: ["Supernatural", "Drama"], description: "A shrine keeper who can see spirits helps lost souls find peace while confronting their own unresolved grief.", rating: 4.7, episodes: 13 },
  { id: 45, title: "Twilight Wanderers", genres: ["Supernatural", "Adventure"], description: "A group of travelers moves between the human world and the spirit realm, collecting forgotten stories before they fade forever.", rating: 4.5, episodes: 24 },

  // === ADDITIONAL VARIETY ===
  { id: 46, title: "Pixel Legends", genres: ["Action", "Comedy"], description: "Gamers are pulled into their favorite video game world and must use their knowledge of game mechanics to survive increasingly difficult levels.", rating: 4.4, episodes: 24 },
  { id: 47, title: "Canvas of Dreams", genres: ["Fantasy", "Romance"], description: "A painter discovers their artwork comes to life at night, including a mysterious figure who claims to be from a world inside the canvas.", rating: 4.6, episodes: 12 },
  { id: 48, title: "Clockwork Rebellion", genres: ["Sci-Fi", "Action"], description: "In a steampunk society, a clockmaker builds a mechanical army to overthrow a tyrannical regime, questioning the cost of revolution.", rating: 4.5, episodes: 26 },
  { id: 49, title: "Melody of the Deep", genres: ["Fantasy", "Music"], description: "An underwater civilization communicates through music, and a surface dweller learns their songs hold the power to heal or destroy.", rating: 4.7, episodes: 13 },
  { id: 50, title: "Wandering Chef", genres: ["Slice of Life", "Food"], description: "A traveling cook visits different regions, learning local recipes and the stories behind each dish while searching for the perfect meal.", rating: 4.5, episodes: 24 },
];

const GENRE_CATEGORIES = [
  { name: "Action", color: "#ef4444", icon: "bolt", description: "High-energy battles, intense showdowns, and adrenaline-pumping adventures" },
  { name: "Romance", color: "#ec4899", icon: "heart", description: "Love stories that warm the heart and explore deep emotional connections" },
  { name: "Fantasy", color: "#8b5cf6", icon: "sparkles", description: "Magical worlds, mythical creatures, and extraordinary powers" },
  { name: "Slice of Life", color: "#10b981", icon: "sun", description: "Everyday moments that capture the beauty of ordinary life" },
  { name: "Comedy", color: "#f59e0b", icon: "smile", description: "Laugh-out-loud humor and lighthearted fun for every mood" },
  { name: "Mystery", color: "#6366f1", icon: "search", description: "Puzzling cases, dark secrets, and thrilling investigations" },
  { name: "Sci-Fi", color: "#06b6d4", icon: "cpu", description: "Futuristic worlds, advanced technology, and mind-bending concepts" },
  { name: "Sports", color: "#22c55e", icon: "trophy", description: "Competitive spirit, teamwork, and the drive to be the best" },
  { name: "Supernatural", color: "#a855f7", icon: "ghost", description: "Spirits, otherworldly beings, and phenomena beyond explanation" },
  { name: "Horror", color: "#dc2626", icon: "skull", description: "Spine-chilling tales that explore fear and the unknown" },
];

const GENRE_ICONS = {
  bolt: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  heart: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  sparkles: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>',
  sun: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  smile: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  search: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  cpu: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
  trophy: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  ghost: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>',
  skull: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="M12.5 17-.5-1h-1l-.5 1"/><path d="M20 10c0 4.993-3.036 8-8 8s-8-3.007-8-8a8 8 0 0 1 16 0"/></svg>',
};

const TRENDING_ANIME = [
  { id: 1, title: "Thunderblade Chronicles", genres: ["Action", "Fantasy"], description: "The most talked about action fantasy this season, featuring breathtaking sword fights and elemental magic systems.", trend: "Hot", trendScore: 98 },
  { id: 15, title: "Realm of Echoes", genres: ["Fantasy", "Adventure"], description: "An imaginative portal-hopping adventure that has captured viewers with its stunning world-building and heartfelt story.", trend: "Rising", trendScore: 95 },
  { id: 31, title: "The Seventh Station", genres: ["Mystery", "Thriller"], description: "The mystery that everyone is trying to solve, with each episode delivering jaw-dropping twists and reveals.", trend: "Hot", trendScore: 97 },
  { id: 9, title: "Petals in the Wind", genres: ["Romance", "Drama"], description: "A beautifully crafted romance that has viewers reaching for tissues, praised for its authentic emotional storytelling.", trend: "Rising", trendScore: 92 },
  { id: 30, title: "Super Side Characters", genres: ["Comedy", "Fantasy"], description: "The surprise comedy hit that flips fantasy tropes on their head with clever writing and lovable underdogs.", trend: "New", trendScore: 89 },
  { id: 38, title: "The Last Algorithm", genres: ["Sci-Fi", "Thriller"], description: "A thought-provoking sci-fi thriller exploring AI ethics that has sparked conversations across the anime community.", trend: "Hot", trendScore: 94 },
];

const COMMUNITY_PICKS = [
  { username: "StarryNight_42", anime: "Realm of Echoes", rating: 5, comment: "Absolutely stunning world-building! Each realm feels alive and unique. The story keeps you guessing at every turn.", avatar: "#a855f7" },
  { username: "MidnightOtaku", anime: "Thunderblade Chronicles", rating: 5, comment: "Loved the story and characters! The battle choreography is next level and the emotional depth surprised me.", avatar: "#ec4899" },
  { username: "CozyAnimeVibes", anime: "Café Starlight", rating: 4, comment: "Perfect comfort anime. The music, the atmosphere, the gentle romance \u2014 it's like a warm cup of tea for the soul.", avatar: "#10b981" },
  { username: "PhantomReader", anime: "The Seventh Station", rating: 5, comment: "I thought I figured it out by episode 3, but the twists kept coming! Best mystery anime in years, hands down.", avatar: "#6366f1" },
  { username: "ActionJunkie99", anime: "Iron Vanguard", rating: 4, comment: "Great mix of action and emotion! The mech designs are creative and the pilot dynamics add real depth to the battles.", avatar: "#ef4444" },
  { username: "DreamCatcher", anime: "Canvas of Dreams", rating: 5, comment: "A love letter to creativity itself. The way art and reality blend together is both magical and deeply moving.", avatar: "#f59e0b" },
  { username: "NeonWanderer", anime: "Crimson Pursuit", rating: 4, comment: "Stylish, fast-paced, and full of surprises. The noir atmosphere combined with anime aesthetics is chef's kiss!", avatar: "#06b6d4" },
  { username: "GardenSoul", anime: "Rooftop Garden Club", rating: 5, comment: "Such a wholesome show! It reminded me why simple moments with good friends are the best part of life.", avatar: "#22c55e" },
];

const RECOMMENDATION_REASONS = {
  "Action": [
    "Because you enjoy adrenaline-pumping battles and intense showdowns",
    "Since you love fast-paced action with powerful characters",
    "Based on your preference for thrilling combat sequences",
    "Because you appreciate stories with high-stakes confrontations"
  ],
  "Romance": [
    "Since you enjoy heartfelt emotional connections",
    "Because you love stories about relationships and personal growth",
    "Based on your appreciation for romantic storytelling",
    "Since you enjoy watching characters discover love in unexpected ways"
  ],
  "Fantasy": [
    "Because you're drawn to magical worlds and extraordinary adventures",
    "Since you love creative world-building and mythical lore",
    "Based on your interest in stories with supernatural elements",
    "Because you enjoy exploring imaginative realms and powers"
  ],
  "Slice of Life": [
    "Since you appreciate stories about everyday beauty",
    "Because you enjoy character-driven narratives with genuine warmth",
    "Based on your love for relatable, grounded storytelling",
    "Since you find joy in the simple, authentic moments of life"
  ],
  "Comedy": [
    "Because you enjoy lighthearted fun and clever humor",
    "Since you love anime that makes you laugh out loud",
    "Based on your preference for witty, entertaining stories",
    "Because you appreciate comedy that's both fun and heartfelt"
  ],
  "Mystery": [
    "Since you love piecing together clues and solving puzzles",
    "Because you enjoy stories with unexpected twists and revelations",
    "Based on your interest in dark, intriguing narratives",
    "Since you appreciate well-crafted suspense and tension"
  ],
  "Sci-Fi": [
    "Because you're fascinated by futuristic concepts and technology",
    "Since you enjoy thought-provoking stories about the future",
    "Based on your interest in exploring what humanity could become",
    "Because you love mind-bending sci-fi premises"
  ],
  "Sports": [
    "Since you enjoy stories about competition and perseverance",
    "Because you love the thrill of athletic achievement",
    "Based on your appreciation for teamwork and determination"
  ],
  "Supernatural": [
    "Because you're drawn to otherworldly mysteries and spirits",
    "Since you enjoy stories that blur the line between worlds",
    "Based on your interest in the unexplained and mystical"
  ],
  "Horror": [
    "Since you enjoy spine-tingling suspense and dark atmosphere",
    "Because you love stories that explore fear and the unknown",
    "Based on your appreciation for eerie, atmospheric tales"
  ]
};

const GAMIFICATION_MESSAGES = [
  { trigger: "first_add", title: "First Step!", message: "You added your first anime! Keep going to unlock recommendations.", icon: "star" },
  { trigger: "three_added", title: "Building Your Library!", message: "3 anime added! Your taste profile is taking shape.", icon: "book" },
  { trigger: "five_added", title: "Anime Enthusiast!", message: "5 anime in your list! Recommendations are getting smarter.", icon: "zap" },
  { trigger: "ten_added", title: "Dedicated Fan!", message: "10 anime! You're officially an anime connoisseur.", icon: "award" },
  { trigger: "first_five_star", title: "Perfect Score!", message: "You gave your first 5-star rating! We love your enthusiasm.", icon: "heart" },
  { trigger: "new_genre", title: "Genre Explorer!", message: "You discovered a new genre! Keep exploring for diverse recommendations.", icon: "compass" },
  { trigger: "recommendations_unlocked", title: "Recommendations Unlocked!", message: "Your personalized recommendations are ready! Check them out.", icon: "unlock" },
];

const ACHIEVEMENT_ICONS = {
  star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  book: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  zap: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  award: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  heart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  compass: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  unlock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',
};
