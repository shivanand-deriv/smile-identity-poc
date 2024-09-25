import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/web-integration', label: 'Web Integration' },
    { path: '/javascript-sdk', label: 'JavaScript SDK' },
];

const Navbar: React.FC = () => (
    <nav className="navbar">
        <ul className="nav-list">
            {navItems.map(({ path, label, exact }) => (
                <li key={path} className="nav-item">
                    <NavLink
                        to={path}
                        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                        end={exact}
                    >
                        {label}
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
);

export default Navbar;
