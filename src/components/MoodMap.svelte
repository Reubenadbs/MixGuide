<script>
    import * as d3 from "d3";
    export let loadedTracks;
    
    let svgEl;
    let tooltipEl;
    
    const width = 600;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const size = 40;

    function draw() {

        const svg = d3.select(svgEl);

        d3.select(svgEl).selectAll("*").remove();

        const popularityScale = d3.scaleLinear()
            .domain([0, 100])     // input popularity range
            .range([20, 60]);     // output image size

        const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])

        // Kwarten text geven
        svg.append("text")
            .attr("x", xScale(75))
            .attr("y", yScale(75))
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#999")
            .text("Happy / Energetic");
        
        svg.append("text")
            .attr("x", xScale(25))
            .attr("y", yScale(75))
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#999")
            .text("Dark / Intense");
        
        svg.append("text")
            .attr("x", xScale(75))
            .attr("y", yScale(25))
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#999")
            .text("Bright / Chill");
        
        svg.append("text")
            .attr("x", xScale(25))
            .attr("y", yScale(25))
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#999")
            .text("Sad / Calm");
        
        // Elk kwart een kleur geven
        svg.append("rect")
            .attr("x", xScale(0))
            .attr("y", yScale(100))
            .attr("width", xScale(50) - xScale(0))
            .attr("height", yScale(50) - yScale(100))
            .attr("fill", "#e0e7ff")
            .attr("opacity", 0.2);

        svg.append("rect")
            .attr("x", xScale(50))
            .attr("y", yScale(100))
            .attr("width", xScale(100) - xScale(50))
            .attr("height", yScale(50) - yScale(100))
            .attr("fill", "#d1fae5")
            .attr("opacity", 0.2);

        svg.append("rect")
            .attr("x", xScale(0))
            .attr("y", yScale(50))
            .attr("width", xScale(50) - xScale(0))
            .attr("height", yScale(0) - yScale(50))
            .attr("fill", "#fee2e2")
            .attr("opacity", 0.2);

        svg.append("rect")
            .attr("x", xScale(50))
            .attr("y", yScale(50))
            .attr("width", xScale(100) - xScale(50))
            .attr("height", yScale(0) - yScale(50))
            .attr("fill", "#fef3c7")
            .attr("opacity", 0.2);

        // Axis maken
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale)); 

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        // Labels
        svg.append("text")
            .attr("x", width / 2 + 10)
            .attr("y", height - 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#555")
            .text("Happiness");
        
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2 + 5)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#555")
            .text("Energy");

        // Opdelen in kwarten
        svg.append("line")
            .attr("x1", xScale(50))
            .attr("x2", xScale(50))
            .attr("y1", margin.top)
            .attr("y2", height - margin.bottom)
            .attr("stroke", "#444")
            .attr("stroke-dasharray", "4 4")
            .attr("stroke-width", 1.2);

        svg.append("line")
            .attr("y1", yScale(50))
            .attr("y2", yScale(50))
            .attr("x1", margin.left)
            .attr("x2", width - margin.right)
            .attr("stroke", "#444")
            .attr("stroke-dasharray", "4 4")
            .attr("stroke-width", 1.2);

        svg.selectAll("image")
            .data(loadedTracks) 
            .enter()
            .append("image")
            .attr("href", d => d.cover)
            .attr("x", d => xScale(d.happiness) - popularityScale(d.popularity)/2)
            .attr("y", d => yScale(d.energy) - popularityScale(d.popularity)/2)
            .attr("width", d => popularityScale(d.popularity))
            .attr("height", d => popularityScale(d.popularity))
            .on("mouseover", function (event, d) {
                tooltipEl.innerHTML = `
                <strong>${d.name}</strong><br/>
                ${d.artist}<br/>
                Energy: ${d.energy}<br/>
                Danceability: ${d.danceability}<br/>
                Popularity: ${d.popularity}<br/>
                Happiness: ${d.happiness}`;
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
    <h2>MoodMap</h2>
    <svg bind:this={svgEl} width="600" height="400"></svg>
    <div bind:this={tooltipEl} class="tooltip"></div>
