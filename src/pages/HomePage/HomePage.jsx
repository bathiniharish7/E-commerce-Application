import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, searchProducts } from "../../api/HomePageApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./HomePage.module.css";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import Loader from "../../components/Loader/Loader";
import FilterComponent from "../../components/Filter/FilterComponent";
import NoProducts from "../../components/NoProducts/NoProducts";
import { useSearchParams } from "react-router-dom";
import VirtualizedGrid from "../../components/VirtualizedGrid/VirtualizedGrid";

function HomePage() {
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);

  const workerRef = useRef(null);
  const [searchParams] = useSearchParams();


  // 🔎 URL filters
  const category = searchParams.get("category") || "all";
  const priceRange = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";

  const isAnyFilterApplied = useMemo(() => {
    return (
      category !== "all" ||
      priceRange !== "all" ||
      rating !== "all"
    );
  }, [category, priceRange, rating]);

  // 🔥 React Query
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

  const products = data || [];

  // ⏳ Debounced search
  const debouncedSetInput = useMemo(
    () => debounce(setInput, 500),
    []
  );

  const handleChange = (e) => {
    debouncedSetInput(e.target.value);
  };

  // 🧵 Initialize Web Worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL(
        "../../web-workers/filterWorker.js",
        import.meta.url
      )
    );

    workerRef.current.onmessage = (e) => {
      setFilteredProducts(e.data);
      setFilterLoading(false);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  // ✅ Set initial products
  useEffect(() => {
    if (products.length) {
      setFilteredProducts(products);
    }
  }, [products]);

  // 🔥 FILTER LOGIC (FIXED)
  useEffect(() => {
    if (!workerRef.current) return;

    if (!isAnyFilterApplied) {
      setFilteredProducts(products);
      return;
    }

    setFilterLoading(true);

    workerRef.current.postMessage({
      products,
      category,
      priceRange,
      rating,
    });
  }, [products, category, priceRange, rating, isAnyFilterApplied]);

  return (
    <div className={styles.homePage}>
      {/* 🔍 Search */}
      <TextField
        sx={{ padding: "0 0.5rem" }}
        size="small"
        label={`Search products`}
        variant="outlined"
        onChange={handleChange}
      />

      {/* 🎯 Filters */}
      {!isLoading && <FilterComponent />}

      {/* 🚫 No Products */}
      {!isLoading &&
        filteredProducts.length === 0 &&
        !filterLoading && <NoProducts />}

      {/* 🔄 Loader */}
      {isLoading || filterLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error fetching products.</p>
      ) : (
        <VirtualizedGrid
          data={filteredProducts}
          renderItem={(product) => {

            return (
              <ProductCard
                key={product.id}
                product={product}
              />
            );
          }}
        />
      )}
    </div>
  );
}

export default HomePage;
