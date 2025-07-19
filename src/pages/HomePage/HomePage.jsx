import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, searchProducts } from '../../api/HomePageApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './HomePage.module.css';
import { TextField } from '@mui/material';
import GridLayout from '../../components/Grid/Grid';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce'; // 👈 Install this if not available
import Loader from '../../components/Loader/Loader';

function HomePage() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);

  const queryKey = input.trim() ? ['products', input] : ['products'];

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => {
      return input
        ? searchProducts(input.trim())
        : fetchProducts();
    },
    select: (data) => data.products,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,

  });


  const debouncedSetInput = debounce(setInput, 500);

  const handleChange = (e) => {
    debouncedSetInput(e.target.value);
  };

  const products = data || [];

  return (
    <div className={styles.homePage}>

      {/* <p style={{ margin: '0 auto' }}>Total Products: {products.length}</p> */}

      <TextField
        id="outlined-basic"
        label="Search from 194 Products"
        variant="outlined"
        onChange={handleChange}
      />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error fetching products.</p>
      ) : (
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
      )}
    </div>
  );
}

export default HomePage;
