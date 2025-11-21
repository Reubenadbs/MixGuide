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
  
    const text = await res.text();
    console.log('Spotify token response:', text); 
  
    if (!res.ok) return null;
  
    const { access_token } = JSON.parse(text);
    return access_token;
    console.log('Access token:', access_token);
  }
  

export function shapeTracks(playlistJson) {
  // ? Om ervoor te zorgen dat de functie niet opgeeft bij een undefined
  const items = (playlistJson?.tracks?.items) || [];
  return items
  //  De resopnse json in het juiste formaat brengen en undefined voorkomen
    .map((item) => item?.track)
    .filter((t) => t && t.id && t.type === 'track' && !t.is_local)
    .map((t) => ({
      id: t.id,
      name: t.name,
      artist: (t.artists || []).map((a) => a.name).join(', '),
      popularity: t.popularity,
      cover: t.album.images[0].url,
    }));
}
