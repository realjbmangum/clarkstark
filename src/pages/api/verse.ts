import type { APIRoute } from 'astro';
import { getVerseForWorkoutType, getCategoryForWorkoutType, VERSE_CATEGORIES } from '../../data/verses';

export const prerender = false;

// Bible API configuration
// For NLT, you need an API key from https://scripture.api.bible/
// Store as BIBLE_API_KEY in environment variables
const BIBLE_API_BASE = 'https://api.scripture.api.bible/v1';
const NLT_BIBLE_ID = '65eec8e0b60e656b-01'; // New Living Translation

// Helper to get today's date in Eastern timezone
function getTodayEastern(): string {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return eastern.toISOString().split('T')[0];
}

// Convert reference like "Hebrews 12:11" to API format "HEB.12.11"
function referenceToApiFormat(reference: string): string {
  const bookMap: Record<string, string> = {
    'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM',
    'Deuteronomy': 'DEU', 'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT',
    '1 Samuel': '1SA', '2 Samuel': '2SA', '1 Kings': '1KI', '2 Kings': '2KI',
    '1 Chronicles': '1CH', '2 Chronicles': '2CH', 'Ezra': 'EZR', 'Nehemiah': 'NEH',
    'Esther': 'EST', 'Job': 'JOB', 'Psalm': 'PSA', 'Psalms': 'PSA',
    'Proverbs': 'PRO', 'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG',
    'Isaiah': 'ISA', 'Jeremiah': 'JER', 'Lamentations': 'LAM', 'Ezekiel': 'EZK',
    'Daniel': 'DAN', 'Hosea': 'HOS', 'Joel': 'JOL', 'Amos': 'AMO',
    'Obadiah': 'OBA', 'Jonah': 'JON', 'Micah': 'MIC', 'Nahum': 'NAM',
    'Habakkuk': 'HAB', 'Zephaniah': 'ZEP', 'Haggai': 'HAG', 'Zechariah': 'ZEC',
    'Malachi': 'MAL', 'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK',
    'John': 'JHN', 'Acts': 'ACT', 'Romans': 'ROM', '1 Corinthians': '1CO',
    '2 Corinthians': '2CO', 'Galatians': 'GAL', 'Ephesians': 'EPH',
    'Philippians': 'PHP', 'Colossians': 'COL', '1 Thessalonians': '1TH',
    '2 Thessalonians': '2TH', '1 Timothy': '1TI', '2 Timothy': '2TI',
    'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB', 'James': 'JAS',
    '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN',
    '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV'
  };

  // Parse "Book Chapter:Verse" or "Book Chapter:Verse-Verse"
  const match = reference.match(/^(.+?)\s+(\d+):(.+)$/);
  if (!match) return reference;

  const [, book, chapter, verses] = match;
  const bookCode = bookMap[book] || book.substring(0, 3).toUpperCase();

  // Handle verse ranges like "3-4"
  const verseParts = verses.split('-');
  if (verseParts.length === 2) {
    return `${bookCode}.${chapter}.${verseParts[0]}-${bookCode}.${chapter}.${verseParts[1]}`;
  }

  return `${bookCode}.${chapter}.${verses}`;
}

// Fetch verse from Bible API (NLT)
async function fetchVerseFromApi(reference: string, apiKey: string): Promise<{ text: string; reference: string } | null> {
  try {
    const passageId = referenceToApiFormat(reference);
    const url = `${BIBLE_API_BASE}/bibles/${NLT_BIBLE_ID}/passages/${passageId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`;

    const response = await fetch(url, {
      headers: {
        'api-key': apiKey
      }
    });

    if (!response.ok) {
      console.error('Bible API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    const text = data.data?.content?.trim() || null;

    if (text) {
      return {
        text,
        reference: data.data?.reference || reference
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch from Bible API:', error);
    return null;
  }
}

// GET - get verse for today
export const GET: APIRoute = async ({ url, locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;
  const apiKey = runtime?.env?.BIBLE_API_KEY;

  const workoutType = url.searchParams.get('workout_type') || 'upper_strength';
  const today = getTodayEastern();

  // Try to get cached verse first
  if (db) {
    try {
      const cached = await db.prepare(`
        SELECT reference, text, category FROM verse_cache WHERE date = ?
      `).bind(today).first() as { reference: string; text: string; category: string } | null;

      if (cached) {
        return new Response(JSON.stringify({
          reference: cached.reference,
          text: cached.text,
          category: cached.category,
          source: 'cache'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Cache lookup failed:', error);
    }
  }

  // Get verse from curated list based on workout type
  const curatedVerse = getVerseForWorkoutType(workoutType);
  const category = getCategoryForWorkoutType(workoutType);

  let finalVerse = {
    reference: curatedVerse.reference,
    text: curatedVerse.text,
    category,
    source: 'curated'
  };

  // Try to fetch NLT version from API if key is available
  if (apiKey) {
    const apiVerse = await fetchVerseFromApi(curatedVerse.reference, apiKey);
    if (apiVerse) {
      finalVerse = {
        reference: apiVerse.reference,
        text: apiVerse.text,
        category,
        source: 'api-nlt'
      };
    }
  }

  // Cache the verse for today
  if (db) {
    try {
      await db.prepare(`
        INSERT OR REPLACE INTO verse_cache (date, reference, text, category)
        VALUES (?, ?, ?, ?)
      `).bind(today, finalVerse.reference, finalVerse.text, finalVerse.category).run();
    } catch (error) {
      console.error('Failed to cache verse:', error);
    }
  }

  return new Response(JSON.stringify(finalVerse), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
