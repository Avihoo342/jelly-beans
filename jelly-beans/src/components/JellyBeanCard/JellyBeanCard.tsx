import { memo } from 'react';
import { JellyBean } from '../../types/jellyBean';
import AttributeIcons from '../AttributeIcons/AttributeIcons';
import './JellyBeanCard.css';

function JellyBeanCard({ bean }: { bean: JellyBean }) {
    return (
      <div className="jellybean-card">
        <img src={bean.ImageUrl} alt={bean.FlavorName}/>
        <h3>{bean.FlavorName}</h3>
        <p data-full={bean.Description} title={bean.Description}>{bean.Description.slice(0, 80)}...</p>
        <AttributeIcons
          attributes={{
            glutenFree: bean.GlutenFree,
            sugarFree: bean.SugarFree,
            seasonal: bean.Seasonal,
            kosher: bean.Kosher,
          }}
        />
      </div>
    );
  }

const JellyBeanCardComponent = memo(JellyBeanCard);
export default JellyBeanCardComponent;