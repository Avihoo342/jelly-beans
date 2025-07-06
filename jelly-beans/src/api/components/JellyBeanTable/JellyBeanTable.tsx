import { memo, useCallback } from 'react';
import { JellyBean } from '../../../api/types/jellyBean';
import AttributeIcons from '../AttributeIcons/AttributeIcons';
import './JellyBeanTable.css';

interface Props {
  beans: JellyBean[];
}

const HEADERS = ['Image', 'Name', 'Description', 'Attributes'] as const;

function JellyBeanTableComponent({ beans }: Props) {
  const renderBeanRow = useCallback((bean: JellyBean) => {
    const {
      BeanId,
      ImageUrl,
      FlavorName,
      Description,
      GlutenFree,
      SugarFree,
      Seasonal,
      Kosher,
    } = bean;

    return (
      <tr key={BeanId}>
        <td>
          <img
            src={ImageUrl}
            alt={FlavorName}
            className="table-image"
          />
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
  }, []);

  return (
    <table className="jellybean-table">
      <thead>
        <tr>
          {HEADERS.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{beans.map(renderBeanRow)}</tbody>
    </table>
  );
}

export default memo(JellyBeanTableComponent);