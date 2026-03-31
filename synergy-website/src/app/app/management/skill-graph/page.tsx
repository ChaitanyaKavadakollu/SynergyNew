"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { nodes as rawNodes, edges as rawEdges } from "@/mock/skillGraph";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function SkillGraphPage() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Deep copy to prevent d3 from mutating the original mock directly over re-renders
    const nodes = rawNodes.map(d => Object.assign({}, d));
    const links = rawEdges.map(d => Object.assign({}, d));

    const width = 800;
    const height = 600;

    // Clear previous renders (Strict Mode fix)
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Graph setup
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 10));

    // Edges
    const link = svg.append("g")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    // Nodes container
    const node = svg.append("g")
      .attr("stroke", "#1E293B")
      .attr("stroke-width", 2)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => d.group === "skill" ? "#D4A373" : "#00B4D8")
      .call(drag(simulation) as any);

    // Labels
    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("font-size", "12px")
      .attr("fill", "#E2E8F0")
      .attr("font-family", "Inter")
      .text((d: any) => d.id);

    // Simulation tick updates
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      label
        .attr("x", (d: any) => d.x + (d.radius / 2))
        .attr("y", (d: any) => d.y);
    });

    // Drag behavior definition
    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="space-y-6">
       <div>
         <h1 className="text-3xl font-bold text-white mb-2">University Skill Graph</h1>
         <p className="text-slate-400">Interactive node-edge mapping of skills verified vs. students learning them.</p>
       </div>

       <Card className="p-6 relative bg-obsidian-900 border-obsidian-700 min-h-[600px] flex flex-col">
          <div className="absolute top-6 right-6 flex gap-3 z-10 bg-obsidian-800/80 p-3 rounded-xl backdrop-blur">
             <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="w-3 h-3 rounded-full bg-gold inline-block"></span> Skills
             </div>
             <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="w-3 h-3 rounded-full bg-teal-gold inline-block"></span> Students
             </div>
          </div>
          
          <div className="flex-1 w-full flex items-center justify-center cursor-move overflow-hidden rounded-xl border border-obsidian-800 bg-[#121212]/50">
            <svg ref={svgRef} className="w-full h-full" style={{ minHeight: '500px' }}></svg>
          </div>
       </Card>
    </div>
  );
}
