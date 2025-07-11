import React, { useMemo } from 'react';

interface Props {
  counts: number[];
  attributes: readonly string[];
  barWidth: number;
  chartHeight: number;
  roundedMax: number;
  labelWidth: number;
}

export default function BarChartSvg({
  counts,
  attributes,
  barWidth,
  chartHeight,
  roundedMax,
  labelWidth
}: Props) {
  const step = 10;
  const chartWidth = barWidth * attributes.length;

  return useMemo(() => (
    <svg width={chartWidth + labelWidth} height={chartHeight + 50}>
      {Array.from({ length: roundedMax / step + 1 }, (_, i) => {
        const value = i * step;
        const y = chartHeight - (value / roundedMax) * chartHeight;
        return (
          <g key={value}>
            <line
              x1={labelWidth}
              y1={y}
              x2={labelWidth + chartWidth}
              y2={y}
              stroke="#ccc"
              strokeDasharray="2,2"
            />
            <text
              x={labelWidth - 5}
              y={y + 4}
              fontSize="10"
              textAnchor="end"
              fill="#555"
            >
              {value}
            </text>
          </g>
        );
      })}
      {counts.map((count, idx) => {
        const height = (count / roundedMax) * chartHeight;
        return (
          <g key={idx} transform={`translate(${labelWidth + idx * barWidth}, 0)`}>
            <rect
              y={chartHeight - height}
              width={barWidth - 20}
              height={height}
              fill="#4caf50"
            />
            <text
              x={(barWidth - 20) / 2}
              y={chartHeight + 20}
              textAnchor="middle"
              fontSize="12"
            >
              {attributes[idx]}
            </text>
            <text
              x={(barWidth - 20) / 2}
              y={chartHeight - height - 6}
              textAnchor="middle"
              fontSize="12"
            >
              {count}
            </text>
          </g>
        );
      })}
      <line
        x1={labelWidth}
        y1={chartHeight}
        x2={labelWidth + chartWidth}
        y2={chartHeight}
        stroke="#000"
      />
    </svg>
  ), [counts, attributes, barWidth, chartHeight, roundedMax, labelWidth, chartWidth]);
}