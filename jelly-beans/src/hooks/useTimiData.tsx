import { useState, useEffect } from 'react';
import { JellyBean, Color, CombinationItem } from '../types/jellyBean';
import { fetchJellyBeans, fetchColors, fetchCombinations } from '../api/jellyBeans';

export function useTimiData() {
  const [beans, setBeans] = useState<JellyBean[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [combinations, setCombinations] = useState<CombinationItem[]>([]);
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

  return { beans, colors, combinations, loading, error };
}