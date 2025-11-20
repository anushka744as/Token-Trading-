"use client";

import { useEffect, useRef } from "react";

export default function LiveSparkline({
  width = 120,
  height = 40,
  points = 50,
  color = "green",
}: {
  width?: number;
  height?: number;
  points?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // initialize random points
    dataRef.current = Array.from({ length: points }, () => 20 + Math.random() * 20);

    const draw = () => {
      // add new point
      const last = dataRef.current[dataRef.current.length - 1];
      const next = last + (Math.random() - 0.5) * 4;
      dataRef.current.push(Math.max(5, Math.min(35, next)));

      // keep points inside limit
      if (dataRef.current.length > points) dataRef.current.shift();

      // clear
      ctx.clearRect(0, 0, width, height);

      // path stroke
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.beginPath();

      dataRef.current.forEach((val, i) => {
        const x = (i / (points - 1)) * width;
        const y = height - val;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.stroke();
    };

    const interval = setInterval(draw, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="block"
    />
  );
}