"use client";
import { useAppData } from "@/Providers/AppProvider";
import { useEffect, useRef } from "react";

// Note: This is a mockup component for the network visualization
// In a real implementation, you would use a library like vis-network, react-force-graph, or D3.js
interface NetworkGraphProps {
  onNodeClick: (nodeId: string) => void;
}

const NetworkGraph = ({ onNodeClick }: NetworkGraphProps) => {
  const { networkData } = useAppData();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !networkData) return;

    // For demo purposes, let's create a simple SVG-based visualization
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Clear previous content
    containerRef.current.innerHTML = "";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());

    // Add some basic styling
    svg.style.background = "rgb(241, 245, 249)";

    // Create lines for edges first (so they're below nodes)
    networkData.edges.forEach((edge) => {
      // Find source and target nodes
      const sourceNode = networkData.nodes.find((n) => n.id === edge.from);
      const targetNode = networkData.nodes.find((n) => n.id === edge.to);

      if (!sourceNode || !targetNode) return;

      // Get positions (same calculation as for nodes below)
      const sourceIndex = networkData.nodes.indexOf(sourceNode);
      const targetIndex = networkData.nodes.indexOf(targetNode);

      const radius = Math.min(width, height) * 0.35;

      const sourceAngle =
        (sourceIndex / networkData.nodes.length) * 2 * Math.PI;
      const sourceX = width / 2 + radius * Math.cos(sourceAngle);
      const sourceY = height / 2 + radius * Math.sin(sourceAngle);

      const targetAngle =
        (targetIndex / networkData.nodes.length) * 2 * Math.PI;
      const targetX = width / 2 + radius * Math.cos(targetAngle);
      const targetY = height / 2 + radius * Math.sin(targetAngle);

      // Create line
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", sourceX.toString());
      line.setAttribute("y1", sourceY.toString());
      line.setAttribute("x2", targetX.toString());
      line.setAttribute("y2", targetY.toString());
      line.setAttribute("stroke", `rgba(0, 0, 0, ${0.1 + edge.value * 0.05})`);
      line.setAttribute("stroke-width", edge.value.toString());

      svg.appendChild(line);
    });

    // Create circles for nodes
    networkData.nodes.forEach((node, index) => {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );

      // Position nodes in a circle layout
      const angle = (index / networkData.nodes.length) * 2 * Math.PI;
      const radius = Math.min(width, height) * 0.35;
      const x = width / 2 + radius * Math.cos(angle);
      const y = height / 2 + radius * Math.sin(angle);

      circle.setAttribute("cx", x.toString());
      circle.setAttribute("cy", y.toString());
      circle.setAttribute("r", (10 + node.value).toString());
      circle.setAttribute("fill", `hsl(${(index * 40) % 360}, 70%, 60%)`);
      circle.setAttribute("data-id", node.id);
      circle.style.cursor = "pointer";

      // Add event listener
      circle.addEventListener("click", () => {
        onNodeClick(node.id);
      });

      svg.appendChild(circle);

      // Add label
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", x.toString());
      text.setAttribute("y", (y + 30).toString());
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "12");
      text.setAttribute("fill", "#333");
      text.textContent = node.label.split(" ")[0]; // Just show first name to keep it clean

      svg.appendChild(text);
    });

    containerRef.current.appendChild(svg);

    const current = containerRef.current;
    // Cleanup function
    return () => {
      if (current) {
        current.innerHTML = "";
      }
    };
  }, [networkData, onNodeClick]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full border border-gray-200 rounded-lg"
      aria-label="Network visualization of posts"
    />
  );
};

export default NetworkGraph;
