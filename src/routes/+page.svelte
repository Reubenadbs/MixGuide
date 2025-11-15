<script>
	import { timeMinute } from "d3";

  let playlistId = "";

  // Lege array's maken voor de tracks
  let tracks = [];
  let selected = [];

  // Uitkomst uit de input box sturen naar /api/playlist/+server.js
  async function getPlaylist(id) {
    const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`);
    const data = await res.json();
    console.log('Playlist data:', data);
    tracks = Array.isArray(data.tracks) ? data.tracks : [];  // De geladen tracks in de array zetten
    selected = []; // Selectie resetten bij het herladen
  }

  function addSelectedToSet() {
    const chosen = tracks.filter(t => selected.includes(t.id));
    console.log('Selected tracks:', chosen);
    // later: add to your set/store here
  }

  function shapeSelection(){
    return selected
      .map((item) => item.track)
  }
</script>

<h2>Test Spotify API</h2>

<!-- Playlist test -->
<form on:submit|preventDefault={() => getPlaylist(playlistId)}>
  <input
    placeholder="playlist id"
    bind:value={playlistId}
  />
  <button type="submit">Load</button>
</form>

  {#if tracks.length === 0}
    <p>→ Load a playlist to see tracks</p>
  {:else}
  <h3>Tracks ({tracks.length})</h3>
  
  <ul style="list-style:none; padding:0; margin:0;">
    {#each tracks as t}
    <li style="display:flex; align-items:center; gap:.5rem; padding:.4rem 0; border-bottom:1px solid #eee;">
      <input type="checkbox" bind:group={selected} value={t.id} />
      <button
        type="button"
        on:click={() => {
          if (selected.includes(t.id)) {
            selected = selected.filter(id => id !== t.id);
          } else {
            selected = [...selected, t.id];
          }
        }}
        style="all:unset; flex:1; cursor:pointer;"
      >
        <div style="font-weight:600;">{t.name}</div>
        <div style="font-size:.9rem; opacity:.8;">{t.artist}</div>
        <div style="font-size:.85rem; opacity:.7;">Popularity: {t.popularity}</div>
      </button>
    </li>
    {/each}
  </ul>

  <div style="margin-top:.75rem; display:flex; gap:.5rem; align-items:center;">
    <button on:click={addSelectedToSet} disabled={selected.length === 0}>
      Add {selected.length || ''} to set
    </button>
    <span style="opacity:.7;">Selected: {selected.length}</span>
  </div>

  {/if}