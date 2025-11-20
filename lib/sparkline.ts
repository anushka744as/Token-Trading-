"use client";
// lib/sparkline.ts
export function generateSparkline(points = 20): string {
    const values = Array.from({ length: points }, () =>
      Math.random() * 30 + 10 // random y between 10–40
    );
  
    const step = 120 / (points - 1); // width 120
  
    let path = `M 0 ${values[0].toFixed(2)} `;
  
    values.forEach((v, i) => {
      path += `L ${(i * step).toFixed(2)} ${v.toFixed(2)} `;
    });
  
    return path;
  }