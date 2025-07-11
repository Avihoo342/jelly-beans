import { useTimiData } from '../../hooks/useTimiData';
import { useTimiFilters } from '../../hooks/useTimiFilters';
import { JellyBeanList } from '../../components/JellyBeanList/JellyBeanList';
import { ComboList } from '../../components/Combination/combinationList';
import './TimiPage.css';

export default function TimiPage() {
  const { beans, colors, combinations, loading, error } = useTimiData();

  const { orangeBeans, timiCombinations } = useTimiFilters(
    beans,
    colors,
    combinations
  );

  if (loading) return <p className="loading">Loading Timi's jelly beans...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="timi-page">
      <h2>🍊 Timi's Jelly Beans</h2>

      <h3>Orange Jelly Beans</h3>
      <JellyBeanList beans={orangeBeans} />

      <h3>Recommended Combinations 🍬</h3>
      <ComboList combos={timiCombinations} />
    </div>
  );
}