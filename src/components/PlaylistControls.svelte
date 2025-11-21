<script>
    // Props van de parent
    export let playlistId = ''
    export let onPlaylistIdChange = () => {}
    export let onLoad = () => {}
  
    // Handler voor submit
    function handleSubmit() {
      // Parent-functie aanroepen met huidige playlistId
      onLoad(playlistId)
    }
</script>
  
<form class="controls" on:submit|preventDefault={handleSubmit}>
  <input
    class="playlist-input"
    placeholder="playlist id"
    value={playlistId}
    on:input={(e) => onPlaylistIdChange(e.target.value)}
  />
  <button class="primary-btn" type="submit">Load playlist</button>
</form>
  