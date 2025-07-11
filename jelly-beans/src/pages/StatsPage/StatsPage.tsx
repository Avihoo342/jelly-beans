import { useEffect, useState } from 'react';
import { JellyBean } from '../../types/jellyBean';
import { fetchJellyBeans } from '../../api/jellyBeans';
import BarChart from '../../components/BarChart/BarChart';
import './StatsPage.css';

export default function StatsPage() {
  const [beans, setBeans] = useState<JellyBean[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJellyBeans(1000, 0).then((response) => {
      setBeans(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="stats-page">
      <h1 className="stats-title">🍬 Jelly Bean Attributes</h1>
      <p className="stats-subtitle">How healthy or seasonal are our jelly beans?</p>

      {loading ? (
        <div className="loader-container">
          <div className="loader" />
        </div>
      ) : (
        <BarChart beans={beans} />
      )}
    </div>
  );
}