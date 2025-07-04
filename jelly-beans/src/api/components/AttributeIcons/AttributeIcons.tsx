import './AttributeIcons.css';

interface Props {
    attributes: {
      glutenFree: boolean;
      sugarFree: boolean;
      seasonal: boolean;
      kosher: boolean;
    };
  }
  
  const Icon = ({ label, active }: { label: string; active: boolean }) => (
    <span className={`attr-icon ${active ? 'active' : 'inactive'}`}>{label}</span>
  );
  
  export default function AttributeIcons({ attributes }: Props) {
    return (
      <div className="attr-icons">
        <Icon label="GF" active={attributes.glutenFree} />
        <Icon label="SF" active={attributes.sugarFree} />
        <Icon label="SE" active={attributes.seasonal} />
        <Icon label="K" active={attributes.kosher} />
      </div>
    );
  }