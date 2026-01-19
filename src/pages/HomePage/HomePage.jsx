import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, searchProducts } from "../../api/HomePageApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./HomePage.module.css";
import { TextField } from "@mui/material";
import GridLayout from "../../components/Grid/Grid";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import Loader from "../../components/Loader/Loader";
import FilterComponent from "../../components/Filter/FilterComponent";
import NoProducts from "../../components/NoProducts/NoProducts";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [input, setInput] = useState("");
  const [searchParams] = useSearchParams();

  // 🛒 cart only from redux
  const cartProducts = useSelector((state) => state.cart.products);

  // ✅ READ FILTERS FROM URL (single source of truth)
  const category = searchParams.get("category") || "all";
  const priceRange = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";

  // 🔹 React Query
  const queryKey = input.trim()
    ? ["products", input]
    : ["products"];

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

  // 🔹 Debounced search
  const debouncedSetInput = useMemo(
    () => debounce(setInput, 500),
    []
  );

  const handleChange = (e) => {
    debouncedSetInput(e.target.value);
  };

  const products = data || [];

  // ✅ check if any filter applied
  const isAnyFilterApplied =
    category !== "all" ||
    priceRange !== "all" ||
    rating !== "all";

  // ✅ FILTER USING URL VALUES
  const filteredProducts = useMemo(() => {
    if (!isAnyFilterApplied) return products;

    return products.filter((product) => {
      // Category
      if (category !== "all" && product.category !== category) {
        return false;
      }

      // Price
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      // Rating
      if (rating !== "all" && product.rating < Number(rating)) {
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
        label={`Search ${products.length} products`}
        variant="outlined"
        onChange={handleChange}
      />

      {/* 🎛 Filters */}
      {!isLoading && <FilterComponent />}

      {!isLoading && filteredProducts.length === 0 && (
        <NoProducts />
      )}

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
