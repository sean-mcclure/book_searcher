export default function define(runtime, observer) {
	const main = runtime.module();
	main.variable(observer("chart")).define("chart", ["d3", "width", "height", "data", "x", "y", "xAxis", "yAxis"], function(d3, width, height, data, x, y, xAxis, yAxis) {
		const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
		svg.append("g").attr("fill", "rgb(147, 197, 204)").selectAll("rect").data(data).join("rect").attr("x", d => x(d.name)).attr("y", d => y(d.value)).attr("height", d => y(0) - y(d.value)).attr("width", x.bandwidth());
		svg.append("g").attr("stroke", "white").style("font-size", "14px").style("font-family", "arial").call(xAxis);
		svg.append("g").attr("stroke", "white").style("font-size", "14px").style("font-family", "arial").call(yAxis);
		return svg.node();
	});
	main.variable(observer("data")).define("data", ["d3"], async function(d3) {
		return (
			(await d3.csv("https://gist.githubusercontent.com/mbostock/81aa27912ad9b1ed577016797a780b2c/raw/3a807eb0cbb0f5904053ac2f9edf765e2f87a2f5/alphabet.csv", ({
				letter,
				frequency
			}) => ({
				name: letter,
				value: +frequency
			}))).sort((a, b) => b.value - a.value))
	});
	main.variable(observer("x")).define("x", ["d3", "data", "margin", "width"], function(d3, data, margin, width) {
		return (d3.scaleBand().domain(data.map(d => d.name)).range([margin.left, width - margin.right]).padding(0.1))
	});
	main.variable(observer("y")).define("y", ["d3", "data", "height", "margin"], function(d3, data, height, margin) {
		return (d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).nice().range([height - margin.bottom, margin.top]))
	});
	main.variable(observer("xAxis")).define("xAxis", ["height", "margin", "d3", "x"], function(height, margin, d3, x) {
		return (g => g.attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickSizeOuter(0)))
	});
	main.variable(observer("yAxis")).define("yAxis", ["margin", "d3", "y"], function(margin, d3, y) {
		return (g => g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y)).call(g => g.select(".domain").remove()))
	});
	main.variable(observer("height")).define("height", function() {
		return (500)
	});
	main.variable(observer("margin")).define("margin", function() {
		return ({
			top: 20,
			right: 0,
			bottom: 30,
			left: 60
		})
	});
	main.variable(observer("d3")).define("d3", ["require"], function(require) {
		return (require("d3@5"))
	});
	return main;
}