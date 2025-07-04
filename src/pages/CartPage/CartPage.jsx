import React from 'react'
import { useSelector } from 'react-redux'
import GridLayout from '../../components/Grid/Grid';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Button } from '@mui/material';
import styles from "./CartPage.module.css"
function CartPage() {

  const cartProducts = useSelector((state)=>state.cart.products);

  const totalAmount = cartProducts.reduce((accumulator,currentProduct)=>{
    return  accumulator = accumulator + currentProduct.price
  },0)

  
  return (
    <div className={styles.cartPage}>
      <Button variant='contained' onClick={()=>alert("this feature is under development")} className={styles.payButton}>Pay Total Amount : ₹{totalAmount}/-</Button>
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
