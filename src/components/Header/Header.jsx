import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/amazon-logo.svg'
function Header() {
  const cartProducts = useSelector((state) => state.cart.products);

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li >
            <NavLink
              to="/"
              className={ styles.logoContainer
              }
            >
              <img src={logo} alt=""  className={styles.logo}/>
            </NavLink>
          </li>
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
