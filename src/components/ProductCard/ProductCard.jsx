import React from 'react';
import styles from "./ProductCard.module.css";
import { Button, Rating } from '@mui/material';
import { useSelector } from 'react-redux';

function ProductCard({ product, presentInCart }) {
  return (
    <div className={styles.productCard} data-product-id={product.id}>
      <div className={styles.imageWrapper}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.contentWrapper}>
        <div>
          <h4 className={styles.title}>{product.title}</h4>
          <div className={styles.ratingContainer}>
            <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
            <span className={styles.rating}>{product.rating}</span>
          </div>
          <h3>Price: ₹{product.price}/-</h3>
        </div>
        {presentInCart ? (
          <Button variant="contained" data-action="remove" style={{ backgroundColor: '#e04d28', color: 'white' }}>Remove from Cart</Button>
        ) : (
          <Button variant="contained" data-action="add">Add to Cart</Button>
        )}
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
