import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';

function Header() {
  const location = useLocation().pathname; // location.pathname is the current path
  console.log(location);

  const cartProducts = useSelector((state)=>state.cart.products);

  

  return (
    <header>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={styles.link}>
            <Link
              to="/"
              className={location === '/' ? styles.active : styles.active}
            >
              Home
            </Link>
          </li>
          <li className={styles.link}>
            <Link
              to="/cart"
              className={location === '/cart' ? styles.active : styles.active}
            >
              Cart ({cartProducts.length})
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
