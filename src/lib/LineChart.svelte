<script>
  import * as d3 from "d3";
  export let data = [12,14,13,17,19,21,20,18,16,15,17,22,24,23,19];

  export let width = 640, height = 400;
  export let marginTop = 20, marginRight = 20, marginBottom = 20, marginLeft = 40;

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), (d) => y(d));
</script>

<svg width={width} height={height} style="background:#f9f9f9;border-radius:8px">
  <path fill="none" stroke="#0070f3" stroke-width="2" d={line(data)} />
  <g fill="white" stroke="#0070f3" stroke-width="1.5">
    {#each data as d, i}
      <circle cx={x(i)} cy={y(d)} r="3" />
    {/each}
  </g>
</svg>