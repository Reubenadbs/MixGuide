<script>
    export let loadedTracks = [];
</script>

<section class="card loaded-card">
{#if loadedTracks.length === 0}
    <p class="hint">Load tracks to see your loaded tracks</p>
{:else}
    <h3>Loaded tracks ({loadedTracks.length})</h3>
    <ul class="track-list">
    {#each loadedTracks as t}
        <li class="track-item">    
        <img src={t.cover} alt={t.name} class="track-cover" />
        <div class="track-info">
            <div class="track-title">{t.name}</div>
            <div class="track-artist">{t.artist}</div>
            <div class="track-meta">Danceability: {t.danceability}</div>
            <div class="track-meta">Duration: {t.duration}</div>
            <div class="track-meta">Key: {t.key}</div>
            <div class="track-meta">BPM: {t.tempo}</div> 
        </div>
        </li>
    {/each}
    </ul>
{/if}
</section>
  