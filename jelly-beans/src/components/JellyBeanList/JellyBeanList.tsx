import JellyBeanCard from '../JellyBeanCard/JellyBeanCard';
import { JellyBean } from '../../types/jellyBean';

export function JellyBeanList({ beans }: { beans: JellyBean[] }) {
  if (beans.length === 0) return <p>No orange jelly beans found.</p>;

  return (
    <div className="bean-grid">
      {beans.map((bean) => (
        <JellyBeanCard key={bean.BeanId} bean={bean} />
      ))}
    </div>
  );
}