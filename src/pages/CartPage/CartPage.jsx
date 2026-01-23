import React from 'react';
import { useSelector } from 'react-redux';
import GridLayout from '../../components/Grid/Grid';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './CartPage.module.css';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import CartEmpty from '../../components/CartEmpty/CartEmpty';

function CartPage() {
  const cartProducts = useSelector((state) => state.cart.cartItems);

  return (
    <>
      {Object.keys(cartProducts).length === 0 ? (
        <CartEmpty />
      ) : (
        <div className={styles.cartPage}>
          <OrderSummary />

          <GridLayout minWidth="200px" products={cartProducts}>
            {Object.keys(cartProducts).map((productId) => {
              const product = cartProducts[productId].productDetails;
               const presentInCart = Object.keys(cartProducts).some(
              (productId) =>Number(productId) === product.id
            );
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
      )}
    </>
  );
}

export default CartPage;
