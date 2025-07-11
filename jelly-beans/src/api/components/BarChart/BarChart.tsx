import { useState, useMemo } from 'react';
import { JellyBean } from '../../types/jellyBean';
import BarChartSvg from './BarChartSvg';
import './BarChart.css';

export default function BarChart({ beans }: { beans: JellyBean[] }) {
  const attributes = useMemo(() => (
    ['GlutenFree', 'SugarFree', 'Seasonal', 'Kosher'] as const
  ), []);

  const counts = useMemo(() => {
    if (beans.length === 0) return attributes.map(() => 0);
    const init: Record<(typeof attributes)[number], number> = {
      GlutenFree: 0,
      SugarFree: 0,
      Seasonal: 0,
      Kosher: 0,
    };

    for (const bean of beans) {
      attributes.forEach((attr) => {
        if (bean[attr]) init[attr]++;
      });
    }

    return attributes.map((attr) => init[attr]);
  }, [beans, attributes]);

  const step = 10;

  const roundedMax = useMemo(() => {
    return Math.ceil(Math.max(...counts) / step) * step;
  }, [counts]);

  const [barWidth, setBarWidth] = useState(100);
  const [chartHeight, setChartHeight] = useState(200);
  const labelWidth = 40;

  return (
    <div>
      <div className="chart-controls" style={{ marginBottom: '1rem' }}>
        <label>
          Bar Width:&nbsp;
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
          Chart Height:&nbsp;
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

      <BarChartSvg
        counts={counts}
        attributes={attributes}
        barWidth={barWidth}
        chartHeight={chartHeight}
        roundedMax={roundedMax}
        labelWidth={labelWidth}
      />
    </div>
  );
}