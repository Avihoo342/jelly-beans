import { JellyBean } from '../../../api/types/jellyBean';
import AttributeIcons from '../AttributeIcons/AttributeIcons';
import './JellyBeanTable.css';

interface Props {
  beans: JellyBean[];
}

export default function JellyBeanTable({ beans }: Props) {
  const renderBeanRow = (bean: JellyBean) => {
    const { BeanId, ImageUrl, FlavorName, Description, GlutenFree, SugarFree, Seasonal, Kosher } = bean;

    return (
      <tr key={BeanId}>
        <td>
          <img src={ImageUrl} alt={FlavorName} className="table-image" />
        </td>
        <td>{FlavorName}</td>
        <td title={Description}>
          <div className="description-ellipsis">{Description}</div>
        </td>
        <td>
          <AttributeIcons
            attributes={{
              glutenFree: GlutenFree,
              sugarFree: SugarFree,
              seasonal: Seasonal,
              kosher: Kosher,
            }}
          />
        </td>
      </tr>
    );
  };

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
      <tbody>{beans.map(renderBeanRow)}</tbody>
    </table>
  );
}