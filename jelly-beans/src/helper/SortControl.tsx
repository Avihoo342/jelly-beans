import React from 'react';

interface Props {
  sortBy: 'nameAsc' | 'nameDesc' | 'group';
  onChange: (sort: 'nameAsc' | 'nameDesc' | 'group') => void;
}

export default function SortControl({ sortBy, onChange }: Props) {
  return (
    <div className="sort">
      <label>
        Sort by:&nbsp;
        <select value={sortBy} onChange={(e) => onChange(e.target.value as any)}>
          <option value="nameAsc">Name A-Z</option>
          <option value="nameDesc">Name Z-A</option>
          <option value="group">Group</option>
        </select>
      </label>
    </div>
  );
}