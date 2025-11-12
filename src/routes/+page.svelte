<script>
  async function getPlaylist(id) {
    const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`);
    const data = await res.json();
    console.log('Playlist data:', data);
  }
</script>

<h2>Test Spotify API</h2>

<!-- Playlist test -->
<div>
  <input placeholder="playlist id" on:change={(e) => getPlaylist(e.target.value)} />
  <p>→ open console for playlist output</p>
</div>

<ul>
  <h2>playlist: </h2>
  <li>
    <h2>track</h2>
    <p>description</p>
  </li>
</ul>