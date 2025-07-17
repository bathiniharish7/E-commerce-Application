import React from 'react'
import { useSelector } from 'react-redux'
import GridLayout from '../../components/Grid/Grid';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Button } from '@mui/material';
import styles from "./CartPage.module.css"
import OrderSummary from '../../components/OrderSummary/OrderSummary';
function CartPage() {

  const cartProducts = useSelector((state)=>state.cart.products);
  return (
    <div className={styles.cartPage}>
      <OrderSummary/>
     
     <GridLayout minWidth="200px" products={cartProducts}>
        {cartProducts.map((product) => {
          const presentInCart = cartProducts.some((p) => p.id === product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              presentInCart={presentInCart}
            />
          );
        })}
      </GridLayout>
    </div>
  )
}

export default CartPage
