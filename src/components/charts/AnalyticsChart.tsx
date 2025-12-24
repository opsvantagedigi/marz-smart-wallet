import React from "react";

export type AnalyticsChartType = "line" | "bar";

interface AnalyticsChartProps {
  data: { label: string; value: number }[];
  type: AnalyticsChartType;
  title?: string;
  className?: string;
}

export default function AnalyticsChart({ data, type, title, className = "" }: AnalyticsChartProps) {
  // Chart dimensions
  const width = 420;
  const height = 180;
  const padding = 32;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  // Data scaling
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const minValue = Math.min(...data.map(d => d.value), 0);
  const yRange = maxValue - minValue || 1;
  const points = data.map((d, i) => {
    const x = padding + (i * chartW) / (data.length - 1 || 1);
    const y = padding + chartH - ((d.value - minValue) * chartH) / yRange;
    return { x, y };
  });

  return (
    <div className={`glassmorphic-card rounded-2xl p-6 border border-white/10 bg-white/10 backdrop-blur-lg shadow-lg w-full ${className}`}>
      {title && (
        <div className="font-orbitron text-lg font-bold mb-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          {title}
        </div>
      )}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height="180"
          className="block"
        >
          <defs>
            <linearGradient id="marz-chart-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#27ffbf" />
              <stop offset="100%" stopColor="#ffe600" />
            </linearGradient>
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Y axis grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={padding}
              x2={width - padding}
              y1={padding + chartH - t * chartH}
              y2={padding + chartH - t * chartH}
              stroke="#27ffbf44"
              strokeDasharray="4 4"
            />
          ))}
          {/* X axis labels */}
          {data.map((d, i) => (
            <text
              key={d.label}
              x={points[i].x}
              y={height - 8}
              textAnchor="middle"
              fontSize="12"
              fill="#fff9"
              className="font-inter"
            >
              {d.label}
            </text>
          ))}
          {/* Y axis labels */}
          {[0, 0.5, 1].map((t) => (
            <text
              key={t}
              x={8}
              y={padding + chartH - t * chartH + 4}
              fontSize="12"
              fill="#fff9"
              className="font-inter"
            >
              {Math.round(minValue + t * yRange)}
            </text>
          ))}
          {/* Chart */}
          {type === "bar" && (
            <g filter="url(#neon-glow)">
              {points.map((pt, i) => (
                <rect
                  key={i}
                  x={pt.x - chartW / data.length / 3}
                  y={pt.y}
                  width={chartW / data.length / 1.5}
                  height={padding + chartH - pt.y}
                  fill="url(#marz-chart-gradient)"
                  rx={chartW / data.length / 4}
                />
              ))}
            </g>
          )}
          {type === "line" && (
            <g filter="url(#neon-glow)">
              <polyline
                fill="none"
                stroke="url(#marz-chart-gradient)"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={points.map(pt => `${pt.x},${pt.y}`).join(" ")}
              />
              {points.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r={6}
                  fill="#27ffbf"
                  stroke="#ffe600"
                  strokeWidth="2"
                />
              ))}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
