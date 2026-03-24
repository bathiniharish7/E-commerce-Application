import React, { useState } from 'react';
import styles from "./ProductCard.module.css";
import { Button, Rating, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart, decreaseQuantity, increaseQuantity } from '../../redux/cartSlice/cartSlice';
import CircularProgress from '@mui/material/CircularProgress';
function ProductCard({ product }) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //Read cart items from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);

  //Calculate quantity from cart
  const quantity = cartItems[product.id]?.quantity || 0;

  const presentInCart = quantity > 0;

  // loading time api simulation
  const loadingTime = 1000;

  // Simulating real API call delay
  const handleAddToCart = (productId) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(addToCart(productId));
      setLoading(false);
    }, loadingTime);

  }

   // Simulating real API call delay
  const handleIncrement = (productId) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(increaseQuantity(productId))
      setLoading(false);
    }, loadingTime);
  }

   // Simulating real API call delay
  const handleDecrement = (productId) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(decreaseQuantity(productId));
      setLoading(false);
    }, loadingTime);
  }
  return (
    <div className={styles.productCard} data-product-id={product.id}>
      <div className={styles.imageWrapper}>
        <img src={product.thumbnail} loading='lazy' alt={product.title} className={styles.image} />
      </div>
      <div className={styles.contentWrapper}>
        <div>
          <h4 className={styles.title}>{product.title}</h4>
          <span className={styles.category}>{product.category}</span>
          <div className={styles.ratingContainer}>
            <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
            <span className={styles.rating}>{product.rating}</span>
          </div>
          <h3>Price: ₹{product.price}/-</h3>
        </div>

        {presentInCart === false && (<Button variant="contained" data-action="add" style={{ color: 'white', width: "140px", borderRadius: '25px', textTransform: 'none' }} onClick={() => handleAddToCart(product.id)}>{loading ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Add to Cart"}</Button>
        )}

        {presentInCart && <ButtonGroup
          size="small"
          variant="outlined"
          sx={{
            '& .MuiButton-root': {
              borderWidth: '2.2px',
              // borderColor: '#3f92e5',
              borderColor: '#e5633f',
              color: 'black',
              fontWeight: '600'
            },
            '& .MuiButton-root:hover': {
              borderWidth: '2px',

            },
          }}
        >
          <Button onClick={() => handleDecrement(product.id)} disabled={loading === true}><RemoveIcon /> </Button>
          <Button disabled={loading === true} >{loading ? <CircularProgress size={22} /> : quantity}</Button>
          <Button onClick={() => handleIncrement(product.id)} disabled={loading === true}><AddIcon /></Button>
        </ButtonGroup>}


      </div>
    </div>
  );
}

export default React.memo(ProductCard);
