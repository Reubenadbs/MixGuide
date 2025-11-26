<script>
    export let playlistId = ''
    export let onLoad = () => {}

    // Formulier submit handler
    function handleSubmit() {
      onLoad(playlistId)
    }
</script>
  
<form class="controls" on:submit|preventDefault={handleSubmit}>
  <input
    class="playlist-input"
    placeholder="Insert playlist id"
    bind:value={playlistId}
  />

  <button class="primary-btn" type="submit">Load playlist</button>
</form>
  