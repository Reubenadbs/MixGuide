import { json } from '@sveltejs/kit';

const RAPID_API_KEY = process.env.RAPID_API_KEY; // or hardcoded while testing

export async function GET({ url }) {
  const id = url.searchParams.get('id');

  if (!id) {
    return json({ error: 'Missing id parameter' }, { status: 400 });
  }

  const res = await fetch(`https://track-analysis.p.rapidapi.com/pktx/spotify/id=${encodeURIComponent(id)}`, {
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'track-analysis.p.rapidapi.com'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    return json(
      { error: 'RapidAPI request failed', status: res.status, body: text },
      { status: 500 }
    );
  }

  const rapidData = await res.json();

  return json({
    id,
    features: rapidData
  });
}
