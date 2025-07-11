import React from 'react';

interface Props {
  filters: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
}

export default function Filters({ filters, onChange }: Props) {
  return (
    <div className="filters">
      {Object.entries(filters).map(([key, value]) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(key, e.target.checked)}
          />
          {key}
        </label>
      ))}
    </div>
  );
}