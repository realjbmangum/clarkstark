// ClarkStark - Badass Workout Playlists
// 50+ user-created playlists (NOT Spotify official) that rotate randomly
// All genres: metal, rap, EDM, rock, aggressive motivation

export interface Playlist {
  id: string;
  name: string;
  creator: string;
  genre: string;
  spotifyUrl: string;
  vibe: string; // short description
}

// All playlists - curated for maximum motivation
// These are all user/brand created, NOT Spotify editorial (no 37i9dQZF1 IDs)
export const PLAYLISTS: Playlist[] = [
  // === HEAVY METAL & ROCK ===
  {
    id: '7x7eaTvnhauKYQ3TePrEdx',
    name: 'Gym Metal Workout',
    creator: 'illztherocker',
    genre: 'metal',
    spotifyUrl: 'https://open.spotify.com/playlist/7x7eaTvnhauKYQ3TePrEdx',
    vibe: 'Pure metal aggression'
  },
  {
    id: '1oWD4uRPIsVvFFMPYeUDZR',
    name: 'Heavy Metal Workout',
    creator: 'Bodybuilding.com',
    genre: 'metal',
    spotifyUrl: 'https://open.spotify.com/playlist/1oWD4uRPIsVvFFMPYeUDZR',
    vibe: '216 tracks of metal fury'
  },
  {
    id: '4HXMwjpN9Upgv0jOegcmjH',
    name: 'Rock/Metal Workout 2025',
    creator: 'ludocola',
    genre: 'metal',
    spotifyUrl: 'https://open.spotify.com/playlist/4HXMwjpN9Upgv0jOegcmjH',
    vibe: 'Best of rock and metal'
  },
  {
    id: '6f36ma26ZFVQJ5ENPCTmYM',
    name: 'HEAVY METAL WORKOUT',
    creator: 'fitleague',
    genre: 'metal',
    spotifyUrl: 'https://open.spotify.com/playlist/6f36ma26ZFVQJ5ENPCTmYM',
    vibe: '43K saves - certified heavy'
  },
  {
    id: '22BOAu9B27uA23c9IH7byE',
    name: 'Heavy Metal Gym',
    creator: 'THEOCIDE STUDIOS',
    genre: 'metal',
    spotifyUrl: 'https://open.spotify.com/playlist/22BOAu9B27uA23c9IH7byE',
    vibe: '41K saves - brutal'
  },
  {
    id: '5YRBzQ0CRqEwY8AED11sbx',
    name: '100 Best Heavy Metal Workout Songs',
    creator: "Men's Health",
    genre: 'metal',
    spotifyUrl: 'https://open.spotify.com/playlist/5YRBzQ0CRqEwY8AED11sbx',
    vibe: 'Curated by the pros'
  },
  {
    id: '6o8jajDA8Jr12zqrPHnF1G',
    name: 'Heavy Metal Deadlift Squat Bench',
    creator: 'José Leal',
    genre: 'metal',
    spotifyUrl: 'https://open.spotify.com/playlist/6o8jajDA8Jr12zqrPHnF1G',
    vibe: 'Powerlifting metal'
  },
  {
    id: '04EzHFNzLCfdQByQMSkEvX',
    name: 'Hard Rock Workout - Powerlifting',
    creator: 'User',
    genre: 'rock',
    spotifyUrl: 'https://open.spotify.com/playlist/04EzHFNzLCfdQByQMSkEvX',
    vibe: 'Heavy lifting rock'
  },
  {
    id: '4VZBvkGpGez3xf9no7gG7M',
    name: 'Rock Workout Motivation',
    creator: 'LoFiRe',
    genre: 'rock',
    spotifyUrl: 'https://open.spotify.com/playlist/4VZBvkGpGez3xf9no7gG7M',
    vibe: '305K saves - best gym rock'
  },
  {
    id: '0kNWNseIx45XPZo4sKW188',
    name: 'Hard Rock Workout',
    creator: 'Michael Daugherty',
    genre: 'rock',
    spotifyUrl: 'https://open.spotify.com/playlist/0kNWNseIx45XPZo4sKW188',
    vibe: '623 tracks of rock'
  },
  {
    id: '6kXNv8J3HCYztxjOIUzApv',
    name: 'Hard Rock Workout',
    creator: 'Better Noise Music',
    genre: 'rock',
    spotifyUrl: 'https://open.spotify.com/playlist/6kXNv8J3HCYztxjOIUzApv',
    vibe: '61K saves - label curated'
  },
  {
    id: '2lk6445GUpENJLdDyJFMHJ',
    name: '100 Best Rock Workout Songs',
    creator: 'Tabata Songs',
    genre: 'rock',
    spotifyUrl: 'https://open.spotify.com/playlist/2lk6445GUpENJLdDyJFMHJ',
    vibe: 'Rock essentials'
  },
  {
    id: '1CgEAhBqAw9yv1J79s1aTS',
    name: 'Rock Pumping 80s-90s',
    creator: 'Bandrec',
    genre: 'rock',
    spotifyUrl: 'https://open.spotify.com/playlist/1CgEAhBqAw9yv1J79s1aTS',
    vibe: 'Classic rock pump'
  },
  {
    id: '1OfDgVOW6QDIO4xpQ8L8Jw',
    name: 'Rock Workout 2025',
    creator: 'JD Playlists',
    genre: 'rock',
    spotifyUrl: 'https://open.spotify.com/playlist/1OfDgVOW6QDIO4xpQ8L8Jw',
    vibe: 'Fresh rock tracks'
  },

  // === HIP HOP & RAP ===
  {
    id: '2YLYJT19TUBMD4eDQEnivw',
    name: 'Workout Songs 2026',
    creator: 'Hype Songs Club',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/2YLYJT19TUBMD4eDQEnivw',
    vibe: '343K saves - certified bangers'
  },
  {
    id: '009iSBUVKTJv0UFCfQow2t',
    name: 'Rap Workout 2026',
    creator: 'Curatify',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/009iSBUVKTJv0UFCfQow2t',
    vibe: '174K saves - gym rap'
  },
  {
    id: '3Qlo8PGJKE53FgTcIjuIvJ',
    name: 'HIGH ENERGY RAP HYPE',
    creator: '@robi.robillard',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/3Qlo8PGJKE53FgTcIjuIvJ',
    vibe: '101K saves - pump up'
  },
  {
    id: '4mk1o6g93vy9e9DDOaapX3',
    name: 'Workout Rap - Beast Mode',
    creator: 'User',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/4mk1o6g93vy9e9DDOaapX3',
    vibe: '92K saves - hardest rap'
  },
  {
    id: '2kDUOxBgaRcfDfqB3TpfGI',
    name: 'Best Rap Workout 2025',
    creator: 'DistroCat',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/2kDUOxBgaRcfDfqB3TpfGI',
    vibe: 'Daily hip hop gym'
  },
  {
    id: '7gvqC9vz8pPdnn3P3M4AAg',
    name: 'PUMP UP WORKOUT RAP',
    creator: 'ispytunes',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/7gvqC9vz8pPdnn3P3M4AAg',
    vibe: '31K saves - pump rap'
  },
  {
    id: '5VRFmAZxoIPgRykqsC0okY',
    name: 'Rap Workout',
    creator: 'ENFORCE',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/5VRFmAZxoIPgRykqsC0okY',
    vibe: '21K saves'
  },
  {
    id: '3aS8WMIRAct155pR3FgT0B',
    name: 'Aggressive Hip Hop/Rap/Trap/Drill',
    creator: 'Kelvin L',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/3aS8WMIRAct155pR3FgT0B',
    vibe: '379 tracks - aggressive'
  },
  {
    id: '1aHaA2sJVYDCV0UZR8YgVJ',
    name: 'Hardcore Workout Rap',
    creator: 'Tomas Lopez',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/1aHaA2sJVYDCV0UZR8YgVJ',
    vibe: '331 tracks - hardcore'
  },
  {
    id: '39BUFXaMXxQKUgP6LiIhZB',
    name: 'Motivational Hip Hop',
    creator: 'Michael Daugherty',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/39BUFXaMXxQKUgP6LiIhZB',
    vibe: '1361 tracks - massive'
  },
  {
    id: '2gWbflBkAo4AtS36JcqMh6',
    name: 'Heavy Angry Beats - Aggressive Rap',
    creator: 'Monkeywi',
    genre: 'rap',
    spotifyUrl: 'https://open.spotify.com/playlist/2gWbflBkAo4AtS36JcqMh6',
    vibe: 'Trap/hip hop pump'
  },

  // === EDM & ELECTRONIC ===
  {
    id: '71z6BdHlnfNj4DKRhuu1Fk',
    name: 'RAGE - EDM WORKOUT',
    creator: 'Tribal Trap',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/71z6BdHlnfNj4DKRhuu1Fk',
    vibe: '643K saves - RAGE MODE'
  },
  {
    id: '2kInpNnxZcN4e0IrGGlEbK',
    name: 'EDM Workout Bangers',
    creator: 'BLNDR',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/2kInpNnxZcN4e0IrGGlEbK',
    vibe: '324K saves - gym bangers'
  },
  {
    id: '0TsHgCCpifeNJg3d8z3Nfv',
    name: 'EDM Workout 2025 - Training Hits',
    creator: 'Naeleck',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/0TsHgCCpifeNJg3d8z3Nfv',
    vibe: '112K saves'
  },
  {
    id: '5ottDgGT4ns77bKbY46MYX',
    name: 'PEAK ENERGY - EDM Workout',
    creator: 'Dharma Worldwide',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/5ottDgGT4ns77bKbY46MYX',
    vibe: '101K saves - peak energy'
  },
  {
    id: '51XBxxHoPxZ9x1q1JtZYXg',
    name: 'EDM WORKOUT BANGERS 2025',
    creator: 'MusicUp',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/51XBxxHoPxZ9x1q1JtZYXg',
    vibe: '180 working out bangers'
  },
  {
    id: '6hZyEkz8qV0AKBFMZulndX',
    name: 'EDM Workout - Epic Bass Drops',
    creator: 'EDM Sauce',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/6hZyEkz8qV0AKBFMZulndX',
    vibe: 'Bass drop motivation'
  },
  {
    id: '36pf5sXBTmMtA4QlLIbPyJ',
    name: 'EDM Workout Hits 2025',
    creator: 'SuperFitness',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/36pf5sXBTmMtA4QlLIbPyJ',
    vibe: 'EDM hits'
  },
  {
    id: '2FzfSTUBdR0xoyOkEpxd9E',
    name: 'EDM GYM WORKOUT - Pump Up',
    creator: 'User',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/2FzfSTUBdR0xoyOkEpxd9E',
    vibe: 'Soul cycle vibes'
  },
  {
    id: '7v2oA6iCcVf9NC1bsKv1Ck',
    name: 'EDM Workout Songs',
    creator: 'Bodybuilding.com',
    genre: 'edm',
    spotifyUrl: 'https://open.spotify.com/playlist/7v2oA6iCcVf9NC1bsKv1Ck',
    vibe: 'Classic EDM gym'
  },

  // === AGGRESSIVE & MOTIVATION ===
  {
    id: '5cAwvaSXeNSrSbmrOUSBzo',
    name: 'GYM MOTIVATION 2025 - BEASTMODE',
    creator: 'CHAPTER EIGHT',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/5cAwvaSXeNSrSbmrOUSBzo',
    vibe: '507K saves - BEASTMODE'
  },
  {
    id: '6fIvmRkmx5XKh4MeZhTPci',
    name: 'Gym Hits 2025 - Best Fitness Music',
    creator: 'NCS',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/6fIvmRkmx5XKh4MeZhTPci',
    vibe: '74K saves - NCS bangers'
  },
  {
    id: '2gS5zZSD12UdKuavYsmLYu',
    name: 'GYM Motivation 2025',
    creator: 'Addictive',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/2gS5zZSD12UdKuavYsmLYu',
    vibe: '55K saves'
  },
  {
    id: '282qSXRozIyie7XchArY2o',
    name: 'Workout Songs 2026 - Gym Playlist',
    creator: 'redmusiccompany',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/282qSXRozIyie7XchArY2o',
    vibe: '52K saves'
  },
  {
    id: '7zQFgv9Mzq2w39PobODG0v',
    name: 'MOST AGGRESSIVE WORKOUT MUSIC',
    creator: 'alllu93',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/7zQFgv9Mzq2w39PobODG0v',
    vibe: '1059 tracks - AGGRESSIVE'
  },
  {
    id: '62bNQ0l1dCZ9Mx45G08txs',
    name: 'Workout HEAVY - For ANIMALS',
    creator: 'Fearless Motivation',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/62bNQ0l1dCZ9Mx45G08txs',
    vibe: '15K saves - animal mode'
  },
  {
    id: '5qVFQyTp4ScbtGopXKZrLn',
    name: 'Aggressive Workout Music',
    creator: 'Redlist',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/5qVFQyTp4ScbtGopXKZrLn',
    vibe: 'Best aggressive songs'
  },
  {
    id: '75CBmXRRhxKti87x0ge2iH',
    name: 'Sports Pump Up 2026 - Athlete Hype',
    creator: 'Amélie Cochon',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/75CBmXRRhxKti87x0ge2iH',
    vibe: 'Athlete motivation'
  },
  {
    id: '3FH4O5hhWACeBrw9zWBxRO',
    name: 'GYM MUSIC 2026 - Heavy Lifting',
    creator: 'Music-Hits',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/3FH4O5hhWACeBrw9zWBxRO',
    vibe: '759K saves - heavy lifting'
  },
  {
    id: '1EAiP5FoyHBb3rmbhHSHZP',
    name: 'Best Lifting/Workout Playlist',
    creator: 'Ryan Gorenflo',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/1EAiP5FoyHBb3rmbhHSHZP',
    vibe: '601 tracks'
  },

  // === RUNNING & CARDIO ===
  {
    id: '0JTaSx9jkW1saMOc6t0vIk',
    name: 'RUNNING Music Hits 2025',
    creator: 'OneSevenMusic',
    genre: 'cardio',
    spotifyUrl: 'https://open.spotify.com/playlist/0JTaSx9jkW1saMOc6t0vIk',
    vibe: '1.8M saves - running hits'
  },
  {
    id: '4cgeOaRCHDkVDQPaDrRQFR',
    name: 'RUNNING Motivation 2025',
    creator: 'LoudKult',
    genre: 'cardio',
    spotifyUrl: 'https://open.spotify.com/playlist/4cgeOaRCHDkVDQPaDrRQFR',
    vibe: '820K saves'
  },
  {
    id: '6MIOcZ4tBKvEiQHzclhVAQ',
    name: 'RUNNING 2025',
    creator: 'Storm Music Group',
    genre: 'cardio',
    spotifyUrl: 'https://open.spotify.com/playlist/6MIOcZ4tBKvEiQHzclhVAQ',
    vibe: '196K saves - 307 tracks'
  },
  {
    id: '6oakYVnanX2Ao9jktCTtK8',
    name: 'Running Music 2025 - High BPM',
    creator: 'INVICTA',
    genre: 'cardio',
    spotifyUrl: 'https://open.spotify.com/playlist/6oakYVnanX2Ao9jktCTtK8',
    vibe: 'High BPM cardio'
  },
  {
    id: '353J1v6ffUKCFm3YRZMywf',
    name: 'WORKOUT MUSIC 2025 - HIGH ENERGY',
    creator: 'Shine',
    genre: 'cardio',
    spotifyUrl: 'https://open.spotify.com/playlist/353J1v6ffUKCFm3YRZMywf',
    vibe: '277 high energy tracks'
  },
  {
    id: '0Cbn1Pc2HiQmP611NTIJfc',
    name: 'Running 2024 - Cardio Mix',
    creator: 'User',
    genre: 'cardio',
    spotifyUrl: 'https://open.spotify.com/playlist/0Cbn1Pc2HiQmP611NTIJfc',
    vibe: '281 cardio tracks'
  },

  // === BONUS SPECIALTY ===
  {
    id: '6kKFVMhSWcAIGyWG7gwgtR',
    name: 'Classic Rock Workout',
    creator: 'Bodybuilding.com',
    genre: 'rock',
    spotifyUrl: 'https://open.spotify.com/playlist/6kKFVMhSWcAIGyWG7gwgtR',
    vibe: 'Classic rock essentials'
  },
  {
    id: '3CdZIxeMIkbSjZAB0H5AEx',
    name: "The Rock's Workout Playlist",
    creator: 'Dwayne Johnson',
    genre: 'mixed',
    spotifyUrl: 'https://open.spotify.com/playlist/3CdZIxeMIkbSjZAB0H5AEx',
    vibe: 'Iron Paradise vibes'
  },
  {
    id: '3et34ZY26cnHFrVr5N7mjp',
    name: '18 Heavy Metal Workout Songs',
    creator: 'Bodybuilding.com',
    genre: 'metal',
    spotifyUrl: 'https://open.spotify.com/playlist/3et34ZY26cnHFrVr5N7mjp',
    vibe: 'Quick metal pump'
  },
];

// Get a random playlist (different each time)
export function getRandomPlaylist(): Playlist {
  const index = Math.floor(Math.random() * PLAYLISTS.length);
  return PLAYLISTS[index];
}

// Get a random playlist by genre preference
export function getRandomPlaylistByGenre(genre?: string): Playlist {
  if (!genre) {
    return getRandomPlaylist();
  }

  const filtered = PLAYLISTS.filter(p => p.genre === genre);
  if (filtered.length === 0) {
    return getRandomPlaylist();
  }

  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

// Get multiple random playlists (for showing options)
export function getRandomPlaylists(count: number = 3): Playlist[] {
  const shuffled = [...PLAYLISTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get playlist by ID
export function getPlaylistById(id: string): Playlist | undefined {
  return PLAYLISTS.find(p => p.id === id);
}

// Get all playlists by genre
export function getPlaylistsByGenre(genre: string): Playlist[] {
  return PLAYLISTS.filter(p => p.genre === genre);
}

// Genre list for filtering
export const GENRES = ['metal', 'rock', 'rap', 'edm', 'mixed', 'cardio'];

// Total count
export const PLAYLIST_COUNT = PLAYLISTS.length;
