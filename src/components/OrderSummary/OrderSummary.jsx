import React from 'react';
import styles from './OrderSummary.module.css';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

function OrderSummary() {
  const cartProducts = useSelector((state) => state.cart.products);
  const totalAmount = cartProducts.reduce((acc, current) => acc + current.price, 0).toFixed(2);

  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.title}>Cart Summary</h3>

<div>
          <table className={styles.table}>
        <thead>
          <tr className={styles.heading}>
            <td>Sl.No</td>
            <td>Product Name</td>
            <td>Price</td>
          </tr>
        </thead>
      </table>

      <div className={styles.scrollWrapper}>
        <table className={styles.table}>
          <tbody>
            {cartProducts.map((product, index) => (
              <tr className={styles.tableRow} key={index}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>₹{product.price}/-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
</div>

      <Button
        variant="contained"
        onClick={() => alert('This feature is under development')}
        className={styles.payButton}
      >
        Pay Total Amount : ₹{totalAmount}/-
      </Button>
    </div>
  );
}

export default OrderSummary;
