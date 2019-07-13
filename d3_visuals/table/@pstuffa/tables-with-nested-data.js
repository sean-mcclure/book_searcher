import define1 from "../@pstuffa/helpers.js";
export default function define(runtime, observer) {
	const main = runtime.module();
	main.variable(observer("myTable")).define("myTable", ["d3", "html", "fakeData"], function(d3, html, fakeData) {
		const div = d3.select(html `<div style='color:white; font-size:17px; font-family:arial'></div<`);
		const table = div.append("table");
		const header = table.append("tr").style("background", "rgb(147, 197, 204)").style("color", "black").style("text-transform", "uppercase").style("font-weight", "bold").style("font-size", "14px");
		header.selectAll(".headerCell").data(Object.keys(fakeData[0])).enter().append("td").attr("class", "headerCell").text(d => d);
		const rows = table.selectAll(".row").data(fakeData).enter().append("tr").attr("class", "row").style("background", function(d, i) {if(i%2){return('lightgrey')}else{return('rgb(51, 72, 92)')}}).style("color", function(d, i) {if(i%2){return('black')}})
		const cells = rows.selectAll(".cell").data(d => Object.values(d)).enter().append("td").attr("class", "cell").text(d => d);
		return div.node()
	});
	const child1 = runtime.module(define1);
	main.import("d3", child1);
	return main;
}