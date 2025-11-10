<script>
  async function getPlaylist(id) {
    const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`);
    const data = await res.json();
    console.log('Playlist data:', data);
  }

  async function checkTrack(id) {
    const res = await fetch(`/api/track?id=${encodeURIComponent(id)}`);
    const data = await res.json();
    console.log('Track features:', data);
  }
</script>

<h2>Test Spotify API</h2>

<!-- Playlist test -->
<div>
  <input placeholder="playlist id" on:change={(e) => getPlaylist(e.target.value)} />
  <p>→ open console for playlist output</p>
</div>

<!-- Track test -->
<div style="margin-top:1rem">
  <input placeholder="track id" on:change={(e) => checkTrack(e.target.value)} />
  <p>→ open console for track output</p>
</div>
