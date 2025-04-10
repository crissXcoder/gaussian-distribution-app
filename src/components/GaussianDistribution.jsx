import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GaussianDistribution = ({ distributionData, width = 800, height = 400 }) => {
  const svgRef = useRef(null);
  const { data, statistics } = distributionData;
  
  // Colores para cada medida estadística
  const colors = {
    mode: '#03045E',    // Azul oscuro para la moda
    median: '#0077B6',  // Azul medio para la mediana
    mean: '#00B4D8'     // Azul turquesa para la media
  };

  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Limpiar SVG anterior
    
    // Configurar márgenes
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Grupo principal con margen
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Escalas X e Y
    const xMax = d3.max(data, d => d.x);
    const xMin = d3.min(data, d => d.x);
    const padding = (xMax - xMin) * 0.1;
    
    const xScale = d3.scaleLinear()
      .domain([xMin - padding, xMax + padding])
      .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) * 1.1])
      .range([innerHeight, 0]);
    
    // Ejes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 35)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .text("X");
    
    g.append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .text("Frecuencia");
    
    // Línea de la distribución
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);
    
      g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0077B6") // Color primario
      .attr("stroke-width", 2)
      .attr("d", line);
    
    // Área bajo la curva
    const area = d3.area()
      .x(d => xScale(d.x))
      .y0(innerHeight)
      .y1(d => yScale(d.y))
      .curve(d3.curveBasis);
    
      g.append("path")
      .datum(data)
      .attr("fill", "#90E0EF") // Color ligero
      .attr("fill-opacity", 0.3)
      .attr("d", area);
    
    // Dibujar líneas para las medidas estadísticas
    if (statistics.mode !== undefined) {
      drawStatisticLine(g, xScale, yScale, statistics.mode, innerHeight, colors.mode, "Moda");
    }
    
    if (statistics.median !== undefined) {
      drawStatisticLine(g, xScale, yScale, statistics.median, innerHeight, colors.median, "Mediana");
    }
    
    if (statistics.mean !== undefined) {
      drawStatisticLine(g, xScale, yScale, statistics.mean, innerHeight, colors.mean, "Media");
    }
    
  }, [data, statistics, width, height]);

  // Función auxiliar para dibujar una línea vertical con etiqueta
  const drawStatisticLine = (g, xScale, yScale, value, height, color, label) => {
    const x = xScale(value);
    
    // Encontrar la altura de la curva en este punto
    const pointY = data.find(d => Math.abs(d.x - value) < 0.05)?.y || 0;
    
    // Línea vertical
    g.append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", height)
      .attr("y2", yScale(pointY))
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");
      
    // Punto en la curva
    g.append("circle")
      .attr("cx", x)
      .attr("cy", yScale(pointY))
      .attr("r", 4)
      .attr("fill", color);
  };

  return (
    <div className="graph-container">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default GaussianDistribution;