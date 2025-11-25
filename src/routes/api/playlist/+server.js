import { json } from '@sveltejs/kit';
import { getAppToken, shapeTracks } from '$lib/server/spotify.js';

export async function GET({ url, fetch }) {
  const id = url.searchParams.get('id');
  if (!id) return json({ ok: false, message: 'Missing playlist id' });

  let allItems = [];
  let offset = 0;

  const token = await getAppToken(fetch);
  if (!token) return json({ ok: false, message: 'Token error' });

  while (true) {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${id}/tracks?limit=100&offset=${offset}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

  if (!res.ok) {
    const text = await res.text();
    return json({ ok: false, message: `Playlist error ${res.status}`, details: text });
  }
  const data = await res.json();

  allItems.push(...data.items);

  // Checken voor volgende pagina
  if (!data.next) break;
  // Beginnen vanaf eerstvolgende track na de eerste 99
    offset += 100;
  };

  const fullPlaylist = {
    tracks: { items: allItems }
  };

  const tracks = shapeTracks(fullPlaylist);


  console.log(tracks)

  return json({ ok: true, count: tracks.length, tracks });
}
