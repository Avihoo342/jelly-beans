import { useState } from 'react';
import { JellyBean } from '../../types/jellyBean';
import './BarChart.css'; // optional if you want to style the inputs

export default function BarChart({ beans }: { beans: JellyBean[] }) {
  const attributes = ['GlutenFree', 'SugarFree', 'Seasonal', 'Kosher'] as const;

  const counts = attributes.map((attr) => beans.filter((b) => b[attr]).length);

  const max = Math.max(...counts);
  const step = 10;
  const roundedMax = Math.ceil(max / step) * step;

  const [barWidth, setBarWidth] = useState(100);
  const [chartHeight, setChartHeight] = useState(200);

  const chartWidth = barWidth * attributes.length;
  const labelWidth = 40;

  return (
    <div>
      <div className="chart-controls" style={{ marginBottom: '1rem' }}>
        <label>
          Bar Width: &nbsp;
          <input
            type="range"
            min={40}
            max={150}
            value={barWidth}
            onChange={(e) => setBarWidth(Number(e.target.value))}
          />
          &nbsp;{barWidth}px
        </label>
        &nbsp;&nbsp;&nbsp;
        <label>
          Chart Height: &nbsp;
          <input
            type="range"
            min={100}
            max={400}
            value={chartHeight}
            onChange={(e) => setChartHeight(Number(e.target.value))}
          />
          &nbsp;{chartHeight}px
        </label>
      </div>

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
    </div>
  );
}