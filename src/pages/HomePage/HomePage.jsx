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
import GridLayout from "../../components/Grid/Grid";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import Loader from "../../components/Loader/Loader";
import FilterComponent from "../../components/Filter/FilterComponent";
import NoProducts from "../../components/NoProducts/NoProducts";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [input, setInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterLoading,setFilterLoading] = useState(false);

  const workerRef = useRef(null);
  const [searchParams] = useSearchParams();

  // Read cart items from redux
  const cartProducts = useSelector(
    (state) => state.cart.cartItems
  );

  // get filters from URL
  const category = searchParams.get("category") || "all";
  const priceRange = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";

  const isAnyFilterApplied =
    category !== "all" ||
    priceRange !== "all" ||
    rating !== "all";

  // React Query
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

  // Debounce search
  const debouncedSetInput = useMemo(
    () => debounce(setInput, 500),
    []
  );

  const handleChange = (e) => {
    debouncedSetInput(e.target.value);
  };

  // Initialize the  web worker in the useEffect
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../web-workers/filterWorker.js", import.meta.url)
    );

    workerRef.current.onmessage = (e) => {
      // console.log("web workers filtered data",e.data);
      
      setFilteredProducts(e.data);
      setFilterLoading(false);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  // when filters applied Send data to web worker for filtering the products
  useEffect(() => {
    if (!products.length) return;

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
      {/* Search Component*/}
      <TextField
        size="small"
        label={`Search ${products.length>0?products.length:''} products`}
        variant="outlined"
        onChange={handleChange}
      />

      {/* Filters Component */}
      {!isLoading && <FilterComponent />}

       {/* show no products when there are no products */}
      {!isLoading && filteredProducts.length === 0 && filterLoading === false && (
        <NoProducts />
      )}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error fetching products.</p>
      ) : (
        <GridLayout minWidth="200px" products={filteredProducts}>
          {filteredProducts.map((product) => {
            const presentInCart = Object.keys(
              cartProducts
            ).some(
              (id) => Number(id) === product.id
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
