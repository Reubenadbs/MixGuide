import fetch from "node-fetch";
import { getToken } from "/gettoken.js";

// Haal tracks uit een playlist (1 pagina van 100)
async function getPlaylistTracks(playlistId, token) {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=NLlimit=100`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // Versimpel tot de essentie
  const tracks = (data.items || []).map(item => ({
    id: item.track.id,
    name: item.track.name,
    artist: item.track.artists.map(a => a.name).join(", "),
    popularity: item.track.popularity
  }));

  return tracks;
}

// Haal audio-features op in batches van 100 ids
async function getAudioFeatures(ids, token) {
  const features = [];

  for (let i = 0; i < ids.length; i += 100) {
    const slice = ids.slice(i, i + 100);

    const res = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${slice.join(",")}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    console.log(data)
    features.push(...data.audio_features.filter(Boolean));
  }

  return features; 
}

async function main() {
  try {
    const token = await getToken();

    const playlistId = "4avHYVbSXRijq0dfhEX5zk";
    const tracks = await getPlaylistTracks(playlistId, token);

    const trackIds = tracks
      .map(track => track.id)
      .filter(Boolean);

    const audioFeatures = await getAudioFeatures(trackIds, token);

    console.log("Tracks:", tracks.length);
    console.log("Features:", audioFeatures.length);
  } catch (e) {
    console.error("Fout:", e.message);
  }
}

main();
