import React from 'react';
import styles from './Grid.module.css';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice/cartSlice';

const GridLayout = ({ children, minWidth = '200px', gap = '1rem' ,products}) => {
  const dispatch = useDispatch();
const isMobile = window.innerWidth < 500;
const finalMinWidth = isMobile ? '100%' : minWidth;

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${finalMinWidth}, 1fr))`,
  gap,
  justifyContent: 'center',
};


  // 🔥 Event Delegation Handler
  const handleClick = (e) => {
    const action = e.target.getAttribute('data-action');
   
    
    if (!action) return; // skip non-button clicks

    const productDiv = e.target.closest('[data-product-id]');
    const productId = productDiv?.getAttribute('data-product-id');
    const product = products.find((p) => p.id.toString() === productId);

    if (product) {
      console.log(`Clicked:${action}`, product);
      if (action === 'add') {
        dispatch(addToCart(product));
      } else if (action === 'remove') {
        dispatch(removeFromCart(product.id));
      }
    }
  };

  return (
    <div className={styles.grid} style={gridStyle} onClick={handleClick
    }>
      {children}
    </div>
  );
};

export default GridLayout;
