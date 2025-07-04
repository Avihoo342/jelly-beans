import { NavLink } from 'react-router-dom';
import './TabsNavigation.css';

export default function TabsNavigation() {
  return (
    <nav className="tabs-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/timi"
        className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
      >
        Timi
      </NavLink>
      <NavLink
        to="/stats"
        className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
      >
        Stats
      </NavLink>
    </nav>
  );
}