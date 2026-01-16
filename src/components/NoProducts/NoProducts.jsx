import React from 'react'
import NoProductsImage from '../../assets/images/no_products.png'
import styles from './NoProducts.module.css'
function NoProducts() {
  return (
    <div className={styles.cartEmptyContainer}>
        <img src={NoProductsImage} alt="Cart Empty Image"  className={styles.cartEmptyImage}/>
        <p className={styles.cartEmptyTitle}>No products found</p>
    </div>
  )
}

export default NoProducts
