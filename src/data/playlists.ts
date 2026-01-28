// Spotify playlist configuration per workout type
// These are popular public workout playlists - can be customized in settings

export interface PlaylistConfig {
  workoutType: string;
  name: string;
  spotifyUrl: string;
  spotifyUri: string; // Opens in Spotify app
  description: string;
}

export const PLAYLISTS: Record<string, PlaylistConfig> = {
  // Strength days - heavy, intense
  upper_strength: {
    workoutType: 'upper_strength',
    name: 'Beast Mode',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP',
    spotifyUri: 'spotify:playlist:37i9dQZF1DX76Wlfdnj7AP',
    description: 'Heavy lifting energy'
  },

  // Power days - explosive, hype
  lower_power: {
    workoutType: 'lower_power',
    name: 'Power Workout',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh',
    spotifyUri: 'spotify:playlist:37i9dQZF1DX70RN3TfWWJh',
    description: 'Explosive power tracks'
  },

  // Hypertrophy - pump, volume
  upper_hypertrophy: {
    workoutType: 'upper_hypertrophy',
    name: 'Workout Twerkout',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0HRj9P7NxeE',
    spotifyUri: 'spotify:playlist:37i9dQZF1DX0HRj9P7NxeE',
    description: 'High energy pump'
  },

  lower_hypertrophy: {
    workoutType: 'lower_hypertrophy',
    name: 'Hype',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4eRPd9frC1m',
    spotifyUri: 'spotify:playlist:37i9dQZF1DX4eRPd9frC1m',
    description: 'Volume day energy'
  },

  // Speed & Arms - high energy, fast
  speed_arms: {
    workoutType: 'speed_arms',
    name: 'Motivation Mix',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy',
    spotifyUri: 'spotify:playlist:37i9dQZF1DXdxcBWuJkbcy',
    description: 'Fast-paced motivation'
  },

  // Active Recovery - chill, low-key
  active_recovery: {
    workoutType: 'active_recovery',
    name: 'Chill Hits',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
    spotifyUri: 'spotify:playlist:37i9dQZF1DX4WYpdgoIcn6',
    description: 'Easy movement vibes'
  },

  // Rest day - peaceful
  rest_day: {
    workoutType: 'rest_day',
    name: 'Peaceful Piano',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
    spotifyUri: 'spotify:playlist:37i9dQZF1DX4sWSpwq3LiO',
    description: 'Rest and recover'
  }
};

// Get playlist for a workout type
export function getPlaylistForWorkoutType(workoutType: string): PlaylistConfig | null {
  return PLAYLISTS[workoutType] || null;
}

// Get all playlists
export function getAllPlaylists(): PlaylistConfig[] {
  return Object.values(PLAYLISTS);
}
