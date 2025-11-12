import { json } from '@sveltejs/kit';
import { getAppToken, shapeTracks } from '$lib/server/spotify.js';

export async function GET({ url, fetch }) {
  const id = url.searchParams.get('id');
  if (!id) return json({ ok: false, message: 'Missing playlist id' });

  const token = await getAppToken(fetch);
  if (!token) return json({ ok: false, message: 'Token error' });

  const r = await fetch(`https://api.spotify.com/v1/playlists/${id}?market=NL`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!r.ok) {
    const text = await r.text();
    return json({ ok: false, message: `Playlist error ${r.status}`, details: text });
  }

  const playlist = await r.json();
  const tracks = shapeTracks(playlist);

  return json({ ok: true, count: tracks.length, tracks });
}
