import { useEffect, useMemo, useState } from 'react';
import JellyBeanCard from '../../components/JellyBeanCard/JellyBeanCard';
import { fetchJellyBeans, fetchColors, fetchCombinations } from '../../../api/jellyBeans';
import { Color, CombinationItem, JellyBean } from '../../types/jellyBean';
import './TimiPage.css';

export default function TimiPage() {
  const [beans, setBeans] = useState<JellyBean[]>([]);
  const [combinations, setCombinations] = useState<CombinationItem[]>([]);
  const [orangeColorId, setOrangeColorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [beansRes, colorsRes, combosRes] = await Promise.all([
          fetchJellyBeans(1000, 0),
          fetchColors(),
          fetchCombinations(),
        ]);

        const orangeColor = colorsRes.data.find(
          (c: Color) =>
            c.colorId.toLowerCase() === 'orange' ||
            c.colorDescription.toLowerCase().includes('orange')
        );

        if (!orangeColor) throw new Error('Orange color not found.');

        setBeans(beansRes.data);
        setCombinations(combosRes.data);
        setOrangeColorId(orangeColor.colorId.toLowerCase());
      } catch (err: any) {
        setError(err.message || 'Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const orangeBeans = useMemo(
    () =>
      beans.filter(
        (bean) =>
          orangeColorId && bean.ColorGroup?.toLowerCase() === orangeColorId
      ),
    [beans, orangeColorId]
  );

  if (loading) return <p>Loading Timi's jelly beans...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="timi-page">
      <h2>🍊 Timi's Jelly Beans</h2>

      <h3>Orange Jelly Beans</h3>
      {orangeBeans.length === 0 ? (
        <p>No orange jelly beans found.</p>
      ) : (
        <div className="bean-grid">
          {orangeBeans.map((bean) => (
            <JellyBeanCard key={bean.BeanId} bean={bean} />
          ))}
        </div>
      )}

      <h3>Recommended Combinations 🍬</h3>
      {combinations.length === 0 ? (
        <p>No combinations found.</p>
      ) : (
        <div className="combo-grid">
          {combinations.map((combo) => (
            <div className="combo-card" key={combo.CombinationId}>
              <h4>{combo.Name}</h4>
              <p>{combo.TagSerialized}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}