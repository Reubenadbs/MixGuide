<script>
    // Props van de parent
    export let tracks = []
    export let loadedIds = []
    export let onLoadTrack = () => {}
</script>

<section class="card">
    {#if tracks.length === 0}
        <p class="hint">Load a playlist to see tracks</p>
    {:else}
        <h3>Tracks ({tracks.length})</h3>

        <ul class="track-list">
        {#each tracks as t}
            <li class="track-item">
            <img src={t.cover} alt={t.name} class="track-cover" />
            <div class="track-info">
                <div class="track-title">{t.name}</div>
                <div class="track-artist">{t.artist}</div>
                <div class="track-meta">Popularity: {t.popularity}</div>
            </div>

            <button
                class="secondary-btn"
                type="button"
                disabled={loadedIds.includes(t.id)}
                on:click={() => onLoadTrack(t.id)}
            >
                {#if loadedIds.includes(t.id)}
                Loaded
                {:else}
                Load
                {/if}
            </button>
            </li>
        {/each}
        </ul>
    {/if}
</section>
  