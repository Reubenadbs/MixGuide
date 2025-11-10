import { getToken } from '$lib/server/token.js';
import { getPlaylistTracks, getAudioFeatures } from '$lib/server/api.js';

export async function GET({ url }) {
  const id = url.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });

  const token = await getToken();
  const tracks = await getPlaylistTracks(id, token);
  const features = await getAudioFeatures(tracks.map(t => t.id), token);

  return new Response(JSON.stringify({ tracks, features }), {
    headers: { 'Content-Type': 'application/json' }
  });
}