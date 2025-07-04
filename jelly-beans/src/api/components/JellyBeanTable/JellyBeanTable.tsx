import { JellyBean } from '../../../api/types/jellyBean';
import AttributeIcons from '../AttributeIcons/AttributeIcons';
import './JellyBeanTable.css';

interface Props {
  beans: JellyBean[];
}

export default function JellyBeanTable({ beans }: Props) {
  return (
    <table className="jellybean-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Attributes</th>
        </tr>
      </thead>
      <tbody>
        {beans.map((bean) => (
          <tr key={bean.BeanId}>
            <td>
              <img src={bean.ImageUrl} alt={bean.FlavorName} className="table-image" />
            </td>
            <td>{bean.FlavorName}</td>
            <td title={bean.Description}>
              <div className="description-ellipsis">{bean.Description}</div>
            </td>
            <td>
            <AttributeIcons
              attributes={{
                glutenFree: bean.GlutenFree,
                sugarFree: bean.SugarFree,
                seasonal: bean.Seasonal,
                kosher: bean.Kosher,
              }}
            />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}