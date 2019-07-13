// https://observablehq.com/@pstuffa/helpers@67
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# helpers`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`A collection of helper functions for making D3 visualizations`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Custom Functions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### createSVG(width, height)

Ceates an svg element with specified width and height`
)});
  main.variable(observer("createSVG")).define("createSVG", ["d3","DOM"], function(d3,DOM){return(
(width, height) => {
  
  const svg = d3.select(DOM.svg(width, height))
      .style("width", width)
      .style("height", height);
  
  return svg.node();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### jitter(value)

Returns a random between positive and negative value provided. Uses Math.random() for random number generation.`
)});
  main.variable(observer("jitter")).define("jitter", function()
{
 return function jitter(value) {
   return Math.random()*value * (Math.random() > .5 ? -1 : 1);
 }
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### legend(colorScale)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Create a color scale legend, given a color scale. You can also add an optional width, height and prefixed text.`
)});
  main.variable(observer("legend")).define("legend", ["html","d3"], function(html,d3){return(
(colorScale, width = window.innerWidth, height = 20, text = null) => {
  
  const div = html`<div id="target" style="max-width: 800px">${text == null ? '' : text}</div>`
 
  d3.select(div).selectAll("div")
    .data(colorScale.domain())
    .enter().append("div")
      .style("display", "inline-block")
      .style("background-color", colorScale)
      .style("color", "#fff")
      .style("font", "12px sans-serif")
      .style("width", width/colorScale.domain().length + "px")
      .style("height", `${height}px`)
      .style("text-align", "center")
      .style("border", "1px solid #fff")
      .style("line-height", "30px")
      .style("vertical-align", "middle")
      .text(d => d)      
      
  return div;
  
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Modules`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  main.variable(observer("JSZip")).define("JSZip", ["require"], function(require){return(
require('https://unpkg.com/jszip@3.1.5/dist/jszip.min.js')
)});
  main.variable(observer("JSZipUtils")).define("JSZipUtils", ["require"], function(require){return(
require('https://bundle.run/jszip-utils@0.0.2')
)});
  return main;
}
