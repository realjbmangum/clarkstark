// ClarkStark - Workout Templates
// Based on Combat Strength Training (CST) principles by Pat McNamara

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  tempo?: string;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  type: string;
  focus: string;
  duration: string;
  warmup: {
    cardio: string;
    mobility: string[];
  };
  exercises: Exercise[];
  core: Exercise[];
  finisher?: {
    name: string;
    description: string;
  };
  circuitInstructions?: string;
}

export const WORKOUTS: Record<string, Workout> = {
  upper_strength: {
    id: 'upper_strength',
    name: 'Upper Strength - Push',
    type: 'strength',
    focus: 'Heavy Pressing - Tricep Power - Build Foundation',
    duration: '45-50 min',
    warmup: {
      cardio: 'Rowing machine: 500m easy pace (2:00-2:30 pace)',
      mobility: ['Arm circles (20 each)', 'Band pull-aparts (15)', 'Band dislocates (10)', 'Push-up to downward dog (5)']
    },
    exercises: [
      { id: 'bench_press', name: 'Barbell Bench Press', sets: 5, reps: '5', tempo: '3-1-1', notes: 'Heavy. Control eccentric, drive up.' },
      { id: 'ohp', name: 'Barbell Overhead Press', sets: 4, reps: '5-6', tempo: '3-1-1', notes: 'Strict form. Squeeze glutes, brace core.' },
      { id: 'incline_press', name: 'Incline Barbell Press', sets: 3, reps: '6-8', tempo: '3-1-2', notes: '30-45 deg angle.' },
      { id: 'dips', name: 'Dips (Weighted if possible)', sets: 4, reps: '8-10', tempo: '2-1-1', notes: 'Lean forward for chest.' },
      { id: 'close_grip_bench', name: 'Close-Grip Bench Press', sets: 3, reps: '8-10', tempo: '3-1-2', notes: 'TRICEP DESTROYER.' },
      { id: 'band_pushdown', name: 'Band Tricep Pushdown', sets: 3, reps: '15-20', tempo: '2-1-2', notes: 'Lock out hard.' },
      { id: 'band_overhead_ext', name: 'Band Overhead Extension', sets: 3, reps: '12-15', tempo: '2-1-2', notes: 'Full stretch.' }
    ],
    core: [
      { id: 'hanging_leg_raise', name: 'Hanging Leg Raises', sets: 3, reps: '10-12', tempo: 'controlled', notes: 'No swinging.' },
      { id: 'ab_wheel', name: 'Ab Wheel Rollouts', sets: 3, reps: '8-10', tempo: '2-1-2', notes: 'Keep core tight.' }
    ],
    finisher: { name: 'Row Intervals', description: '5 x 200m sprints @ max effort, 45s rest between' }
  },

  lower_power: {
    id: 'lower_power',
    name: 'Lower Power - Explosive',
    type: 'power',
    focus: 'Hip Hinge - Explosive Force - Rate of Force Production',
    duration: '40-45 min',
    warmup: {
      cardio: 'Exercise bike: 3 min moderate, then 30s sprint / 30s easy x 3',
      mobility: ['Leg swings (15 each)', 'Hip circles (10 each)', 'Bodyweight squats (15)', 'Glute bridges (15)']
    },
    exercises: [
      { id: 'deadlift', name: 'Barbell Deadlift', sets: 5, reps: '3-5', tempo: '2-0-X', notes: 'EXPLOSIVE off floor. Reset each rep.' },
      { id: 'jump_squat', name: 'Jump Squats', sets: 4, reps: '8', tempo: 'explosive', notes: 'Land soft, explode up.' },
      { id: 'rdl', name: 'Romanian Deadlift', sets: 4, reps: '8-10', tempo: '3-1-1', notes: 'Feel hamstring stretch.' },
      { id: 'barbell_hip_thrust', name: 'Barbell Hip Thrust', sets: 4, reps: '8-10', tempo: '2-2-1', notes: 'Explosive up, squeeze.' },
      { id: 'split_squat_jump', name: 'Split Squat Jumps', sets: 3, reps: '6 each', tempo: 'explosive', notes: 'Switch legs mid-air.' },
      { id: 'band_good_morning', name: 'Band Good Mornings', sets: 3, reps: '15', tempo: '2-1-1', notes: 'Posterior chain.' }
    ],
    core: [
      { id: 'hollow_body', name: 'Hollow Body Hold', sets: 3, reps: '30s', tempo: 'hold', notes: 'Lower back pressed.' },
      { id: 'dead_bug', name: 'Dead Bug', sets: 3, reps: '10 each', tempo: '2-2-2', notes: 'Opposite arm/leg.' }
    ],
    finisher: { name: 'Bike Tabata', description: '8 rounds: 20s ALL OUT sprint, 10s rest' }
  },

  upper_hypertrophy: {
    id: 'upper_hypertrophy',
    name: 'Upper Hypertrophy - Pull',
    type: 'hypertrophy',
    focus: 'Back Thickness - Bicep Pump - Time Under Tension',
    duration: '45-50 min',
    circuitInstructions: 'Supersets: A1/A2, then B1/B2. 45-60s rest.',
    warmup: {
      cardio: 'Rowing machine: 3 min moderate, focus on lat engagement',
      mobility: ['Band pull-aparts (20)', 'Band face pulls (15)', 'Cat-cow (10)', 'Arm circles']
    },
    exercises: [
      { id: 'pullups', name: 'A1: Pull-ups', sets: 4, reps: 'Max (aim 8-12)', tempo: '3-1-2', notes: 'KING of back exercises.' },
      { id: 'barbell_row', name: 'A2: Barbell Row', sets: 4, reps: '8-10', tempo: '2-1-2', notes: 'Pull to lower chest.' },
      { id: 'chinups', name: 'B1: Chin-ups', sets: 3, reps: 'Max (aim 6-10)', tempo: '3-1-2', notes: 'Bicep emphasis.' },
      { id: 'band_row', name: 'B2: Band Seated Row', sets: 3, reps: '15-20', tempo: '2-2-2', notes: 'Pull to belly button.' },
      { id: 'barbell_curl', name: 'Barbell Curl', sets: 4, reps: '10-12', tempo: '2-1-3', notes: '3s negative!' },
      { id: 'hammer_curl', name: 'Band Hammer Curl', sets: 3, reps: '12-15', tempo: '2-1-2', notes: 'Brachialis and forearms.' },
      { id: 'incline_curl', name: 'Incline Curl', sets: 3, reps: '10-12', tempo: '3-1-2', notes: 'Stretch at bottom.' },
      { id: 'band_face_pull', name: 'Band Face Pulls', sets: 3, reps: '15-20', tempo: '2-2-2', notes: 'External rotate at top.' }
    ],
    core: [
      { id: 'hanging_knee_raise', name: 'Hanging Knee Raises', sets: 3, reps: '12-15', tempo: 'controlled' },
      { id: 'side_plank', name: 'Side Plank', sets: 3, reps: '30s each', tempo: 'hold', notes: 'Squeeze obliques.' }
    ],
    finisher: { name: 'Bicep Burnout', description: '21s method - 7 bottom, 7 top, 7 full. 2 rounds.' }
  },

  lower_hypertrophy: {
    id: 'lower_hypertrophy',
    name: 'Lower Hypertrophy - Volume',
    type: 'hypertrophy',
    focus: 'Quad Development - Glute Pump - Slow Eccentrics',
    duration: '45-50 min',
    circuitInstructions: 'Keep rest under 60s. Focus on squeeze and stretch.',
    warmup: {
      cardio: 'Exercise bike: 5 min easy, increase resistance each minute',
      mobility: ['Leg swings (15 each)', 'Deep squat hold (30s)', 'Walking lunges (10 each)', 'Hip flexor stretch']
    },
    exercises: [
      { id: 'back_squat', name: 'Barbell Back Squat', sets: 4, reps: '8-10', tempo: '3-2-2', notes: '2s pause at bottom!' },
      { id: 'front_squat', name: 'Barbell Front Squat', sets: 3, reps: '8-10', tempo: '3-1-2', notes: 'Upright torso. Quad killer.' },
      { id: 'walking_lunge', name: 'Walking Lunges', sets: 3, reps: '12 each', tempo: '2-0-1', notes: 'Long stride for glutes.' },
      { id: 'bulgarian_split', name: 'Bulgarian Split Squat', sets: 3, reps: '10 each', tempo: '3-1-2', notes: 'Brutal and effective.' },
      { id: 'band_leg_curl', name: 'Band Leg Curl', sets: 3, reps: '15-20', tempo: '2-2-3', notes: 'Lying or standing.' },
      { id: 'calf_raise', name: 'Standing Calf Raises', sets: 4, reps: '15-20', tempo: '2-2-4', notes: '4s negative!' }
    ],
    core: [
      { id: 'weighted_situp', name: 'Weighted Sit-ups', sets: 3, reps: '15', tempo: '2-1-2', notes: 'Hold plate on chest.' },
      { id: 'pallof_press', name: 'Band Pallof Press', sets: 3, reps: '10 each', tempo: '2-3-2', notes: 'Anti-rotation.' }
    ],
    finisher: { name: 'Row Power', description: '1000m row for time. Record it. Beat it next week.' }
  },

  speed_arms: {
    id: 'speed_arms',
    name: 'Speed & Arms Friday',
    type: 'speed',
    focus: 'Multi-Directional Speed - Arm Pump - Conditioning',
    duration: '40-45 min',
    circuitInstructions: 'Speed circuit first (3 rounds), then arm superset blast.',
    warmup: {
      cardio: 'Rowing: 2 min easy, then 10x 10s sprint / 20s easy',
      mobility: ['High knees (30s)', 'Butt kicks (30s)', 'Lateral shuffles (30s)', 'Jumping jacks (30s)']
    },
    exercises: [
      { id: 'lateral_bounds', name: 'Lateral Bounds', sets: 3, reps: '8 each', tempo: 'explosive', notes: 'Stick landing.' },
      { id: 'burpees', name: 'Burpees', sets: 3, reps: '10', tempo: 'fast', notes: 'Full extension jump.' },
      { id: 'broad_jump', name: 'Broad Jumps', sets: 3, reps: '6', tempo: 'explosive', notes: 'Max distance.' },
      { id: 'mountain_climbers', name: 'Mountain Climbers', sets: 3, reps: '20 each', tempo: 'fast', notes: 'Keep hips low.' },
      { id: 'box_step_up', name: 'Explosive Step-ups', sets: 3, reps: '8 each', tempo: 'explosive', notes: 'Drive knee up.' },
      { id: 'barbell_curl_heavy', name: 'SS1: Heavy Barbell Curl', sets: 4, reps: '6-8', tempo: '2-1-2', notes: 'Strength focus.' },
      { id: 'skull_crusher', name: 'SS1: Skull Crushers', sets: 4, reps: '8-10', tempo: '3-1-1', notes: 'Tricep mass.' },
      { id: 'band_curl_21s', name: 'SS2: Band Curl 21s', sets: 2, reps: '21', tempo: 'varied', notes: '7/7/7.' },
      { id: 'diamond_pushup', name: 'SS2: Diamond Push-ups', sets: 2, reps: 'Max', tempo: '2-1-1', notes: 'Tricep finisher.' }
    ],
    core: [
      { id: 'ab_wheel', name: 'Ab Wheel Rollouts', sets: 3, reps: '10', tempo: '2-1-2' },
      { id: 'hollow_body', name: 'Hollow Body Hold', sets: 3, reps: '30s', tempo: 'hold' }
    ],
    finisher: { name: 'Arm Pump Finisher', description: '50 band curls + 50 band pushdowns. Chase the pump.' }
  },

  active_recovery: {
    id: 'active_recovery',
    name: 'Active Recovery',
    type: 'conditioning',
    focus: 'Low Intensity - Movement - Fat Burn',
    duration: '30-45 min',
    warmup: {
      cardio: 'None needed',
      mobility: ['5 min foam rolling or stretching']
    },
    exercises: [
      { id: 'row_steady', name: 'Rowing - Steady State', sets: 1, reps: '20-30 min', tempo: '2:10-2:20 pace', notes: 'Zone 2 cardio. Fat burning.' },
      { id: 'mobility_flow', name: 'Mobility Flow', sets: 1, reps: '10 min', tempo: 'slow', notes: "World's Greatest Stretch, hip openers." }
    ],
    core: [
      { id: 'bird_dog', name: 'Bird Dog', sets: 3, reps: '8 each', tempo: 'hold 5s', notes: 'Slow and controlled.' },
      { id: 'mcgill_curlup', name: 'McGill Curl-Up', sets: 3, reps: '10', tempo: 'hold 8s', notes: 'Spine neutral.' }
    ],
    finisher: { name: 'Optional Bike', description: '15-20 min easy bike while watching TV or podcast.' }
  },

  rest_day: {
    id: 'rest_day',
    name: 'Rest Day',
    type: 'rest',
    focus: 'Recovery - Sleep - Nutrition',
    duration: '0 min',
    warmup: { cardio: 'None', mobility: ['Optional light stretching'] },
    exercises: [],
    core: []
  },

  // Custom 3-Day Plan
  bench_curls: {
    id: 'bench_curls',
    name: 'Bench & Curls',
    type: 'strength',
    focus: 'Chest Press - Bicep Work - Band Finishers',
    duration: '20 min',
    warmup: {
      cardio: 'Light rowing or arm circles (2 min)',
      mobility: ['Arm circles (10 each)', 'Band pull-aparts (10)', 'Push-up stretch (5)']
    },
    exercises: [
      { id: 'bench_press', name: 'Bench Press', sets: 4, reps: '8', tempo: '3-1-1', notes: 'Control the weight. Solid foundation.' },
      { id: 'barbell_curl', name: 'Barbell Curls', sets: 4, reps: '10', tempo: '2-1-2', notes: 'Full range of motion. Squeeze at top.' },
      { id: 'band_face_pull', name: 'Band Face Pulls', sets: 3, reps: '15', tempo: '2-1-2', notes: 'External rotate at top. Rear delt health.' },
      { id: 'band_pushdown', name: 'Band Pushdowns', sets: 3, reps: '15', tempo: '2-1-2', notes: 'Lock out hard. Tricep finisher.' }
    ],
    core: []
  },

  gun_show: {
    id: 'gun_show',
    name: 'Gun Show',
    type: 'hypertrophy',
    focus: 'Arms Only - Biceps & Triceps - Pump Day',
    duration: '20 min',
    warmup: {
      cardio: 'Light band curls and pushdowns (1 min each)',
      mobility: ['Wrist circles (10 each)', 'Arm swings (10 each)']
    },
    exercises: [
      { id: 'barbell_curl', name: 'Barbell Curls', sets: 4, reps: '10', tempo: '2-1-2', notes: 'Strict form. No swinging.' },
      { id: 'close_grip_bench', name: 'Close-Grip Bench', sets: 4, reps: '10', tempo: '3-1-2', notes: 'Tricep mass builder.' },
      { id: 'hammer_curl', name: 'Hammer Curls', sets: 3, reps: '12', tempo: '2-1-2', notes: 'Brachialis and forearms.' },
      { id: 'band_pushdown', name: 'Band Pushdowns', sets: 3, reps: '20', tempo: '2-1-1', notes: 'High reps for the pump.' },
      { id: 'band_curl_burnout', name: 'Band Curls Burnout', sets: 1, reps: '50', tempo: 'fast', notes: 'Non-stop. Chase the pump.' }
    ],
    core: []
  },

  cold_plunge_day: {
    id: 'cold_plunge_day',
    name: 'Cold Plunge Day',
    type: 'conditioning',
    focus: 'Recovery - Cold Exposure - Mental Toughness',
    duration: '20 min',
    warmup: {
      cardio: 'None - start light',
      mobility: ['Deep breathing (1 min)']
    },
    exercises: [
      { id: 'light_row', name: 'Light Row', sets: 1, reps: '5 min', tempo: 'easy', notes: 'Zone 1 effort. Just moving.' },
      { id: 'full_stretch', name: 'Full Body Stretch', sets: 1, reps: '5 min', tempo: 'hold', notes: 'Focus on tight areas.' },
      { id: 'cold_plunge', name: 'Cold Plunge', sets: 1, reps: '3-5 min', tempo: 'hold', notes: 'Breathe slow. Control the mind.' },
      { id: 'deep_breathing', name: 'Deep Breathing', sets: 1, reps: '5 min', tempo: 'slow', notes: 'Box breathing. 4-4-4-4.' }
    ],
    core: []
  }
};

export const SCHEDULE: Record<string, string> = {
  monday: 'bench_curls',
  tuesday: 'rest_day',
  wednesday: 'gun_show',
  thursday: 'rest_day',
  friday: 'cold_plunge_day',
  saturday: 'rest_day',
  sunday: 'rest_day'  // Meal Prep Day - handled separately
};

export function getWorkout(id: string): Workout | undefined {
  return WORKOUTS[id];
}

export function getTodaysWorkout(): Workout {
  // Use Eastern timezone for proper day calculation
  const easternDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const nowEastern = new Date(easternDate);
  const day = nowEastern.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const workoutId = SCHEDULE[day] || 'rest_day';
  return WORKOUTS[workoutId];
}
