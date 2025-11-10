<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";

  const KEY_NAMES = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];
  let points = [];

  async function loadPlaylist(id) {
    const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`);
    const { tracks, features } = await res.json();

    const byId = new Map(features.map(f => [f.id, f]));
    const merged = tracks.map(t => ({ t, f: byId.get(t.id) })).filter(x => x.f);

    points = merged.map(({ t, f }) => ({
      x: Math.round(f.tempo),      // BPM
      y: f.key,                    // key 0..11
      r: Math.max(4, t.popularity / 5),
      title: `${t.name} — ${t.artist}`
    }));

    draw();
  }

  function draw() {
    const width = 860, height = 480, margin = 40;
    const svg = d3.select("#chart")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%");
    svg.selectAll("*").remove();

    const x = d3.scaleLinear()
      .domain(d3.extent(points, d => d.x)).nice()
      .range([margin, width - margin]);

    const y = d3.scaleLinear().domain([0, 11]).range([height - margin, margin]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin})`)
      .call(d3.axisBottom(x));
    svg.append("g")
      .attr("transform", `translate(${margin},0)`)
      .call(d3.axisLeft(y).ticks(12).tickFormat(i => KEY_NAMES[i]));

    svg.selectAll("circle")
      .data(points)
      .join("circle")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", d => d.r)
      .append("title")
      .text(d => d.title);
  }

  onMount(() => {
    // start with a known public editorial playlist
    loadPlaylist("37i9dQZF1DXcBWIGoYBM5M");
  });

  let input = "";
  function submit(e) {
    e.preventDefault();
    if (input.trim()) loadPlaylist(input.trim());
  }

  import { onMount } from "svelte";
  onMount(async () => {
    console.log("Page mounted, fetching /api/playlist...");
    const res = await fetch("/api/playlist?id=37i9dQZF1DXcBWIGoYBM5M");
    console.log("Response status:", res.status);
    const json = await res.json();
    console.log("JSON:", json); // you should see { tracks, features }
  });
</script>

<form on:submit|preventDefault={submit} class="controls">
  <input bind:value={input} placeholder="paste Spotify playlist URL or ID" />
  <button>Load</button>
</form>

<svg id="chart"></svg>

<style>
  .controls { display:flex; gap:.5rem; margin-bottom:1rem; }
  input { flex:1; padding:.5rem; }
  button { padding:.5rem .75rem; }
</style>

