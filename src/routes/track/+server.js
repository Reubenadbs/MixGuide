import { json } from '@sveltejs/kit';
import { getAppToken } from '$lib/server/spotify.js';

export async function GET({ url, fetch }) {
  const id = url.searchParams.get('id');
  if (!id) return json({ ok: false, message: 'Missing track id' });

  const token = await getAppToken(fetch);
  if (!token) return json({ ok: false, message: 'Token error' });

  const r = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const text = await r.text();
  if (!r.ok)
    return json({ ok: false, message: `Audio features error ${r.status}`, details: text });

  return json({ ok: true, features: JSON.parse(text) });
}
