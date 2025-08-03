import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/amazon-logo.svg'
import Badge from '@mui/material/Badge';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
function Header() {
  const cartProducts = useSelector((state) => state.cart.products);
  const totalProducts = cartProducts.length? cartProducts.length :0;
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
             <div className={styles.logoContainer}>
              <ShoppingBagOutlinedIcon sx={{
                fontSize:'30px',
                color:'black'
              }}/>
              <h3 className={styles.logoTitle}>Shop</h3>
             </div>
            </NavLink>
          </li>
          {/* <li >
            <NavLink
              to="/"
              className={ styles.logoContainer
              }
            >
              <img src={logo} alt=""  className={styles.logo}/>
            </NavLink>
          </li> */}
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

               <Badge badgeContent={totalProducts} color="primary">
                  <ShoppingCartRoundedIcon sx={{ color: 'white',fontSize:'1.6rem' }}/>
               </Badge>
              
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
