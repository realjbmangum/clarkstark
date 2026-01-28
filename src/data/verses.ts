// Curated fitness-themed scriptures organized by category
// Used as fallback when Bible API is unavailable

export interface Verse {
  reference: string;
  text: string;
  theme: string;
}

export interface VerseCategory {
  name: string;
  workoutTypes: string[]; // maps to workout type IDs
  verses: Verse[];
}

export const VERSE_CATEGORIES: VerseCategory[] = [
  {
    name: 'strength',
    workoutTypes: ['upper_strength', 'lower_power'],
    verses: [
      {
        reference: 'Isaiah 40:31',
        text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
        theme: 'renewed strength'
      },
      {
        reference: 'Philippians 4:13',
        text: 'I can do all things through Christ who strengthens me.',
        theme: 'strength through Christ'
      },
      {
        reference: 'Psalm 18:32-34',
        text: 'It is God who arms me with strength and keeps my way secure. He makes my feet like the feet of a deer; he causes me to stand on the heights.',
        theme: 'God gives strength'
      },
      {
        reference: 'Deuteronomy 31:6',
        text: 'Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.',
        theme: 'courage and strength'
      },
      {
        reference: 'Psalm 28:7',
        text: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.',
        theme: 'strength and trust'
      },
      {
        reference: 'Nehemiah 8:10',
        text: 'Do not grieve, for the joy of the Lord is your strength.',
        theme: 'joy as strength'
      }
    ]
  },
  {
    name: 'discipline',
    workoutTypes: ['upper_hypertrophy', 'lower_hypertrophy'],
    verses: [
      {
        reference: 'Hebrews 12:11',
        text: 'No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it.',
        theme: 'discipline yields fruit'
      },
      {
        reference: '1 Corinthians 9:27',
        text: 'I discipline my body like an athlete, training it to do what it should. Otherwise, I fear that after preaching to others I myself might be disqualified.',
        theme: 'discipline your body'
      },
      {
        reference: 'Proverbs 12:1',
        text: 'Whoever loves discipline loves knowledge, but whoever hates correction is stupid.',
        theme: 'love discipline'
      },
      {
        reference: 'Proverbs 25:28',
        text: 'A person without self-control is like a city with broken-down walls.',
        theme: 'self-control'
      },
      {
        reference: '2 Timothy 1:7',
        text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.',
        theme: 'power and sound mind'
      },
      {
        reference: 'Titus 2:11-12',
        text: 'For the grace of God has appeared that offers salvation to all people. It teaches us to say "No" to ungodliness and worldly passions, and to live self-controlled, upright and godly lives.',
        theme: 'self-controlled living'
      }
    ]
  },
  {
    name: 'endurance',
    workoutTypes: ['speed_arms'],
    verses: [
      {
        reference: 'Hebrews 12:1',
        text: 'Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us.',
        theme: 'run with endurance'
      },
      {
        reference: '1 Corinthians 9:24-25',
        text: 'Do you not know that in a race all the runners run, but only one gets the prize? Run in such a way as to get the prize. Everyone who competes in the games goes into strict training.',
        theme: 'run to win'
      },
      {
        reference: '2 Timothy 4:7',
        text: 'I have fought the good fight, I have finished the race, I have kept the faith.',
        theme: 'finished the race'
      },
      {
        reference: 'Galatians 6:9',
        text: 'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.',
        theme: 'do not grow weary'
      },
      {
        reference: 'James 1:12',
        text: 'Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life that the Lord has promised to those who love him.',
        theme: 'blessed who perseveres'
      },
      {
        reference: 'Romans 5:3-4',
        text: 'Not only so, but we also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope.',
        theme: 'suffering produces perseverance'
      }
    ]
  },
  {
    name: 'rest',
    workoutTypes: ['active_recovery', 'rest_day'],
    verses: [
      {
        reference: 'Matthew 11:28',
        text: 'Come to me, all you who are weary and burdened, and I will give you rest.',
        theme: 'rest for the weary'
      },
      {
        reference: 'Psalm 23:2-3',
        text: 'He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
        theme: 'restores my soul'
      },
      {
        reference: 'Exodus 20:8-10',
        text: 'Remember the Sabbath day by keeping it holy. Six days you shall labor and do all your work, but the seventh day is a sabbath to the Lord your God.',
        theme: 'sabbath rest'
      },
      {
        reference: 'Psalm 127:2',
        text: 'In vain you rise early and stay up late, toiling for food to eat— for he grants sleep to those he loves.',
        theme: 'rest as gift'
      },
      {
        reference: 'Mark 6:31',
        text: 'Then, because so many people were coming and going that they did not even have a chance to eat, he said to them, "Come with me by yourselves to a quiet place and get some rest."',
        theme: 'Jesus invites rest'
      },
      {
        reference: 'Isaiah 30:15',
        text: 'In repentance and rest is your salvation, in quietness and trust is your strength.',
        theme: 'rest and trust'
      }
    ]
  },
  {
    name: 'perseverance',
    workoutTypes: [], // general fallback
    verses: [
      {
        reference: 'Romans 8:28',
        text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
        theme: 'God works for good'
      },
      {
        reference: 'Joshua 1:9',
        text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
        theme: 'be courageous'
      },
      {
        reference: 'Proverbs 3:5-6',
        text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
        theme: 'trust in the Lord'
      },
      {
        reference: 'Jeremiah 29:11',
        text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
        theme: 'hope and future'
      },
      {
        reference: 'Psalm 37:5',
        text: 'Commit your way to the Lord; trust in him and he will do this.',
        theme: 'commit your way'
      },
      {
        reference: 'Colossians 3:23',
        text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
        theme: 'work for the Lord'
      }
    ]
  }
];

// Get verse for a specific workout type
export function getVerseForWorkoutType(workoutType: string): Verse {
  // Find matching category
  let category = VERSE_CATEGORIES.find(c => c.workoutTypes.includes(workoutType));

  // Fallback to perseverance if no match
  if (!category) {
    category = VERSE_CATEGORIES.find(c => c.name === 'perseverance')!;
  }

  // Pick a verse based on day of year for consistency
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const verseIndex = dayOfYear % category.verses.length;

  return category.verses[verseIndex];
}

// Get category name for a workout type
export function getCategoryForWorkoutType(workoutType: string): string {
  const category = VERSE_CATEGORIES.find(c => c.workoutTypes.includes(workoutType));
  return category?.name || 'perseverance';
}
