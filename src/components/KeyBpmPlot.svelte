<script>
    import * as d3 from "d3";
    import {onMount} from "svelte";
    export let loadedTracks;

    let svgEl;
    let tooltipEl;
    
    const width = 600;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const size = 40;
    
    // Schaal maken
    const sortedCamelot = [
    "1A","2A","3A","4A","5A","6A","7A","8A","9A","10A","11A","12A",
    "1B","2B","3B","4B","5B","6B","7B","8B","9B","10B","11B","12B"
    ];

    function draw() {

        const svg = d3.select(svgEl);

        d3.select(svgEl).selectAll("*").remove();

        const popularityScale = d3.scaleLinear()
            .domain([0, 100])
            .range([20, 60]);

        const xScale = d3.scaleLinear()
            .domain([60, 200])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scalePoint()
            .domain(sortedCamelot)
            .range([height - margin.bottom, margin.top])

        // Axis maken
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        // Labels
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#555")
            .text("BPM");
        
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2) 
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#555")
            .text("Camelot");

        svg.selectAll("image")
            .data(loadedTracks) 
            .enter()
            .append("image")
            .attr("href", d => d.cover)
            .attr("x", d => xScale(d.tempo) - popularityScale(d.popularity)/2)
            .attr("y", d => yScale(d.camelot) - popularityScale(d.popularity)/2)
            .attr("width", d => popularityScale(d.popularity))
            .attr("height", d => popularityScale(d.popularity))
            .on("mouseover", function (event, d) {
                tooltipEl.innerHTML = `
                <strong>${d.name}</strong><br/>
                ${d.artist}<br/>
                Popularity: ${d.popularity}<br/>
                BPM: ${d.tempo}<br/>
                Key: ${d.camelot}`;
                tooltipEl.style.opacity = 1;
            })
            .on("mousemove", function (event) {
                tooltipEl.style.left = event.pageX + 15 + "px";
                tooltipEl.style.top = event.pageY + 15 + "px";
            })
            .on("mouseout", function () {
                tooltipEl.style.opacity = 0;
            });
    }

    $: if (loadedTracks.length > 0) { draw() };

</script>

    <svg bind:this={svgEl} width="600" height="400"></svg>
    <div bind:this={tooltipEl} class="tooltip"></div>
