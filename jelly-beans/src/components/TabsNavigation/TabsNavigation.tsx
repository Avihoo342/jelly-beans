import { NavLink } from 'react-router-dom';
import './TabsNavigation.css';
import { useMemo } from 'react';

export default function TabsNavigation() {
  const tabs = useMemo(() => [
    { path: '/', label: 'Home', end: true },
    { path: '/timi', label: 'Timi' },
    { path: '/stats', label: 'Stats' },
  ], []);
  
  return (
    <nav className="tabs-nav" role="tablist" aria-label="Main tabs">
      {tabs.map(({ path, label, end }) => (
        <NavLink key={path} to={path} end={end}>
        {({ isActive }) => (
          <span
            role="tab"
            className={`tab${isActive ? ' active' : ''}`}
          >
            {label}
          </span>
        )}
      </NavLink>
      ))}
    </nav>
  );
}