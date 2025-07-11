interface Props {
  view: 'grid' | 'table';
  onToggle: () => void;
}

export default function ViewToggle({ view, onToggle }: Props) {
  return (
    <button className="toggle-view-btn" onClick={onToggle}>
      Switch to {view === 'grid' ? 'Table' : 'Grid'} View
    </button>
  );
}