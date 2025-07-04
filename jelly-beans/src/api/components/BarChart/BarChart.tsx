import { JellyBean } from '../../types/jellyBean';

export default function BarChart({ beans }: { beans: JellyBean[] }) {
  const attributes = ['GlutenFree', 'SugarFree', 'Seasonal', 'Kosher'] as const;

  const counts = attributes.map((attr) =>
    beans.filter((b) => b[attr]).length
  );

  const max = Math.max(...counts);
  const step = 10;
  const roundedMax = Math.ceil(max / step) * step;

  const barWidth = 100;
  const chartHeight = 200;
  const chartWidth = barWidth * attributes.length;
  const labelWidth = 40;

  return (
    <svg width={chartWidth + labelWidth} height={chartHeight + 50}>
      {/* Y-axis grid lines and labels */}
      {Array.from({ length: roundedMax / step + 1 }, (_, i) => {
        const value = i * step;
        const y = chartHeight - (value / roundedMax) * chartHeight;

        return (
          <g key={value}>
            {/* Line */}
            <line
              x1={labelWidth}
              y1={y}
              x2={labelWidth + chartWidth}
              y2={y}
              stroke="#ccc"
              strokeDasharray="2,2"
            />
            {/* Label */}
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

      {/* Bars */}
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
            {/* Attribute label */}
            <text
              x={(barWidth - 20) / 2}
              y={chartHeight + 20}
              textAnchor="middle"
              fontSize="12"
            >
              {attributes[idx]}
            </text>
            {/* Count label above bar */}
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

      {/* X-axis line */}
      <line
        x1={labelWidth}
        y1={chartHeight}
        x2={labelWidth + chartWidth}
        y2={chartHeight}
        stroke="#000"
      />
    </svg>
  );
}