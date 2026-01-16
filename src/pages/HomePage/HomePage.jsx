import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, searchProducts } from '../../api/HomePageApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './HomePage.module.css';
import { TextField } from '@mui/material';
import GridLayout from '../../components/Grid/Grid';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import Loader from '../../components/Loader/Loader';
import FilterComponent from '../../components/Filter/FilterComponent';
import NoProducts from '../../components/NoProducts/NoProducts';

function HomePage() {
  const [input, setInput] = useState('');

  // 🔹 Redux state
  const cartProducts = useSelector((state) => state.cart.products);
  const { category, priceRange, rating } = useSelector(
    (state) => state.filters
  );

  // 🔹 React Query
  const queryKey = input.trim() ? ['products', input] : ['products'];

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: () =>
      input.trim()
        ? searchProducts(input.trim())
        : fetchProducts(),
    select: (data) => data.products,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  console.log(data);
  

  // 🔹 Debounced search
  const debouncedSetInput = useMemo(
    () => debounce(setInput, 500),
    []
  );

  const handleChange = (e) => {
    debouncedSetInput(e.target.value);
  };

  const products = data || [];

  //Check if any filter is Applied
    const isAnyFilterApplied =
    category !== 'all' ||
    priceRange !== 'all' ||
    rating !== 'all';
  // 🔹 Apply filters (derived state)
  const filteredProducts = useMemo(() => {

    if(isAnyFilterApplied === false)
    {
      return products;
    }
    return products.filter((product) => {
      // Category
      if (category !== 'all' && product.category !== category) {
        return false;
      }

      // Price
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      // Rating
      if (rating !== 'all' && product.rating < Number(rating)) {
        return false;
      }

      return true;
    });
  }, [products, category, priceRange, rating]);

  return (
    <div className={styles.homePage}>

      {/* 🔍 Search */}
      <TextField
        size="small"
        label="Search 194 products"
        variant="outlined"
        onChange={handleChange}
      />

      {/* 🎛 Filters */}
      {!isLoading && <FilterComponent />}
      {isLoading === false && filteredProducts.length === 0 && <NoProducts/>}

      {/* 🧾 Content */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error fetching products.</p>
      ) : (
        <GridLayout minWidth="200px" products={filteredProducts}>
          {filteredProducts.map((product) => {
            const presentInCart = cartProducts.some(
              (p) => p.id === product.id
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
      )}
    </div>
  );
}

export default HomePage;
