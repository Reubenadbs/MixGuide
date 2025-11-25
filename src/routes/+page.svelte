<script>
  import '../style.css'
  import PlaylistControls from '../components/PlaylistControls.svelte'
  import TrackList from '../components/TrackList.svelte'
  import PlaylistTracks from '../components/PlaylistTracks.svelte'
  import KeyBpmPlot from '../components/KeyBpmPlot.svelte'
  import MoodMap from '../components/MoodMap.svelte'

  let playlistId = ''
  let tracks = []
  let loadedTracks = []

  // Lijst van ID's maken en geupdate houden
  $: loadedIds = loadedTracks.map((t) => t.id)

  // Functie voor het ophalen van playlist van spotify api
  async function getPlaylist(id) {

    // Api call naar spotify
    const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`)
    const data = await res.json()

    loadedTracks = []

    console.log('Playlist data:', data)

    // Alles in array zetten (als het geen array is dan lege array)
    tracks = Array.isArray(data.tracks) ? data.tracks : []
  }

  // Functie voor het laden van een track
  async function loadTrack(trackId) {
    console.log('clicked load for', trackId)

    try {
      // Api call naar rapidapi
      const res = await fetch(`/api/features?id=${encodeURIComponent(trackId)}`)
      const data = await res.json()

      console.log('response status:', res.status)
      console.log('data status', data.status)

      // Metadata van track uit spotify lijst halen
      const meta = tracks.find((t) => t.id === trackId)

      // Als het geen error geeft (te kleine interval tussen requests) doorgaan
      if (data.status !== 429 && 504) {

        // Combineert beide api's hun data in 1 lijst
        const combinedData = {
          ...data,
          id: trackId,
          name: meta?.name,
          artist: meta?.artist,
          popularity: meta?.popularity,
          cover: meta?.cover
        }

        // Nieuw array maken om een refresh te triggeren bij loadedId's
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
      onLoadTrack={loadTrack}/>

    <PlaylistTracks {loadedTracks} />

    <section class="card">
      <KeyBpmPlot {loadedTracks} />
      <MoodMap {loadedTracks}/> 
    </section>
    
  </div>
</div>
