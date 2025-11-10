<script>
  import * as d3 from "d3";

  // ✅ Safe default so SSR never sees "undefined"
  export let data = [];

  export let width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 40;

  // ✅ Only compute scales/line when data is available
  $: hasData = Array.isArray(data) && data.length > 0;

  $: x = hasData
    ? d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight])
    : null;

  $: y = hasData
    ? d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop])
    : null;

  $: line = hasData ? d3.line((d, i) => x(i), (d) => y(d)) : null;
</script>

{#if hasData}
  <svg width={width} height={height} style="background:#f9f9f9;border-radius:8px">
    <path fill="none" stroke="#0070f3" stroke-width="2" d={line(data)} />
    <g fill="white" stroke="#0070f3" stroke-width="1.5">
      {#each data as d, i}
        <circle cx={x(i)} cy={y(d)} r="3" />
      {/each}
    </g>
  </svg>
{:else}
  <!-- Optional: placeholder so nothing crashes during SSR -->
  <svg width={width} height={height}>
    <text x="12" y="20" font-size="12" fill="#666">No data</text>
  </svg>
{/if}
