import React from 'react'
import cartEmpty from '../../assets/images/cart-empty.png'
import styles from './CartEmpty.module.css'
function CartEmpty() {
  return (
    <div className={styles.cartEmptyContainer}>
        <img src={cartEmpty} alt="Cart Empty Image"  className={styles.cartEmptyImage}/>
        <p className={styles.cartEmptyTitle}>Your cart is Empty</p>
    </div>
  )
}

export default CartEmpty
