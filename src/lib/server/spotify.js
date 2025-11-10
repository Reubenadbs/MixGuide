import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export async function getAppToken(fetch) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' })
  });

  if (!res.ok) {
    console.error('Token error:', res.status, await res.text());
    return null;
  }

  const { access_token } = await res.json();
  return access_token;
}

export function shapeTracks(playlistJson) {
  const items = (playlistJson?.tracks?.items) || [];
  return items
    .map((it) => it?.track)
    .filter((t) => t && t.id && t.type === 'track' && !t.is_local)
    .map((t) => ({
      id: t.id,
      name: t.name,
      artist: (t.artists || []).map((a) => a.name).join(', ')
    }));
}
