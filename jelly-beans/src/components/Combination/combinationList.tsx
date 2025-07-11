import { CombinationItem } from '../../types/jellyBean';

export function ComboList({ combos }: { combos: CombinationItem[] }) {
  if (combos.length === 0)
    return <p>No combinations found that include Timi's beans.</p>;

  return (
    <div className="combo-grid">
      {combos.map((combo) => (
        <div className="combo-card" key={combo.CombinationId}>
          <h4>{combo.Name}</h4>
          <p>{combo.TagSerialized}</p>
        </div>
      ))}
    </div>
  );
}