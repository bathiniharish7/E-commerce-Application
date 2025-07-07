import React, { useEffect, useState } from 'react';
import { fetchProducts, searchProducts } from '../../api/HomePageApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './HomePage.module.css';
import { TextField } from '@mui/material';
import GridLayout from '../../components/Grid/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice/cartSlice';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  console.log("HIII");
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        searchProductsData();
      } else {
        getProductsData();
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [input]);

  const getProductsData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data.products);
    } catch (e) {
      console.log(e.message);
    }
  };

  const searchProductsData = async () => {
    try {
      const data = await searchProducts(input);
      setProducts(data.products);
    } catch (e) {
      console.log(e.message);
    }
  };

  // 🔥 Event Delegation Handler
  const handleClick = (e) => {
    const action = e.target.getAttribute('data-action');
    if (!action) return; // skip non-button clicks

    const productDiv = e.target.closest('[data-product-id]');
    const productId = productDiv?.getAttribute('data-product-id');
    const product = products.find((p) => p.id.toString() === productId);

    if (product) {
      console.log(`Clicked: ${action}`, product);
     
    }
  };

  return (
    <div className={styles.homePage}>
      <p style={{margin:'0 auto'}}>Total Products: {products.length}</p>
      <TextField
        id="outlined-basic"
        label={`Search Products`}
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <GridLayout minWidth="200px" products={products}>
        {products.map((product) => {
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
  );
}

export default HomePage;
