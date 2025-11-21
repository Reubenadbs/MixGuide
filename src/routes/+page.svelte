<script>
  import '../style.css'
  import PlaylistControls from '../components/PlaylistControls.svelte'
  import TrackList from '../components/TrackList.svelte'
  import PlaylistTracks from '../components/PlaylistTracks.svelte'

  let playlistId = ''
  let tracks = []
  let loadedTracks = []

  // Reactive lijst met alleen de IDs van set
  $: loadedIds = loadedTracks.map((t) => t.id)

  // Haalt een Spotify playlist op op basis van het ingevoerde playlist-id
  async function getPlaylist(id) {

    // API-call naar eigen endpoint dat Spotify-data ophaalt
    const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`)
    const data = await res.json()

    // Iedere keer dat je een nieuwe playlist laadt → begin met lege set
    loadedTracks = []

    console.log('Playlist data:', data)

    // Check of data.tracks bestaat en een array is, anders lege lijst
    tracks = Array.isArray(data.tracks) ? data.tracks : []
  }

  // Haalt audio-features op van één track en combineert die met Spotify metadata
  async function loadTrack(trackId) {
    console.log('clicked load for', trackId)

    try {
      // API-call naar RapidAPI om audio-features voor deze track op te halen
      const res = await fetch(`/api/features?id=${encodeURIComponent(trackId)}`)
      const data = await res.json()

      console.log('response status:', res.status)
      console.log('data status', data.status)

      // Metadata van deze track opzoeken in de Spotify-lijst
      const meta = tracks.find((t) => t.id === trackId)

      // Alleen doorgaan als RapidAPI niet een 429 status teruggeeft
      if (data.status !== 429 && 504) {

        // Combineert Spotify-informatie met de feature-data van RapidAPI
        const combinedData = {
          ...data,
          id: trackId,
          name: meta?.name,
          artist: meta?.artist,
          popularity: meta?.popularity,
          cover: meta?.cover
        }

        // Nieuw array maken zodat Svelte reactiviteit triggert
        loadedTracks = [...loadedTracks, combinedData]

        console.log('RapidAPI data for track', trackId, combinedData)
        console.log('Loaded tracks:', loadedTracks)
      }
    } catch (err) {

      // Error bij API-call of netwerk
      console.error('Error in loadTrack', err)
    }
  }
</script>

<div class="page">
  <h2>Spotify DJ set builder</h2>

  <PlaylistControls
    {playlistId}
    onPlaylistIdChange={(value) => (playlistId = value)}
    onLoad={getPlaylist}
  />

  <div class="columns">
    <TrackList
      {tracks}
      {loadedIds}
      onLoadTrack={loadTrack}
    />
    <PlaylistTracks {loadedTracks} />
  </div>
</div>
