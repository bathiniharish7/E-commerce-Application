import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';

function Header() {
  const cartProducts = useSelector((state) => state.cart.products);

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={styles.link}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.linkItem} ${isActive ? styles.active : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.linkItem} ${isActive ? styles.active : ''}`
              }
            >
              Cart ({cartProducts.length})
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
