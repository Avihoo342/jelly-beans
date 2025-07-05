import { useEffect, useMemo, useState } from 'react';
import JellyBeanCard from '../../components/JellyBeanCard/JellyBeanCard';
import { fetchJellyBeans, fetchColors, fetchCombinations } from '../../../api/jellyBeans';
import { Color, CombinationItem, JellyBean } from '../../types/jellyBean';
import './TimiPage.css';

export default function TimiPage() {
  const [beans, setBeans] = useState<JellyBean[]>([]);
  const [combinations, setCombinations] = useState<CombinationItem[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [beansRes, colorsRes, combosRes] = await Promise.all([
          fetchJellyBeans(50, 0),
          fetchColors(),
          fetchCombinations(),
        ]);

        setBeans(beansRes.data);
        setColors(colorsRes.data);
        setCombinations(combosRes.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  const orangeColorIds = useMemo(() => {
    return colors
      .filter((color) =>
        color.colorDescription.toLowerCase().includes('orange')
      )
      .map((color) => color.colorId.toLowerCase());
  }, [colors]);


  const orangeBeans = useMemo(() => {
    return beans.filter(
      (bean) =>
        bean.ColorGroup &&
        orangeColorIds.includes(bean.ColorGroup.toLowerCase())
    );
  }, [beans, orangeColorIds]);

  const orangeBeanNames = useMemo(
    () => orangeBeans.map((bean) => bean.FlavorName.toLowerCase()),
    [orangeBeans]
  );

  const timiCombinations = useMemo(() => {
    return combinations.filter((combo) => {
      const tagString = combo.TagSerialized?.toLowerCase() || '';
      return orangeBeanNames.some((name) => tagString.includes(name));
    });
  }, [combinations, orangeBeanNames]);

  if (loading) return <p className="loading">Loading Timi's jelly beans...</p>;
  if (error) return <p className="error">Error: {error}</p>;

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
      {timiCombinations.length === 0 ? (
        <p>No combinations found that include Timi's beans.</p>
      ) : (
        <div className="combo-grid">
          {timiCombinations.map((combo) => (
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