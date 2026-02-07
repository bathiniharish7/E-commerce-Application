import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useQueries } from "@tanstack/react-query";

import GridLayout from "../../components/Grid/Grid";
import ProductCard from "../../components/ProductCard/ProductCard";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import Loader from "../../components/Loader/Loader";
import styles from "./CartPage.module.css";

import { fetchProductDetails } from "../../api/CartPageApi";
import { STALE_TIME } from "../../api/api-configuartion";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  // get product ids
  const productIds = useMemo(() => Object.keys(cartItems), [cartItems]);

  // one query per product (best practice)
  const productQueries = useQueries({
    queries: productIds.map((id) => ({
      queryKey: ["product", id],
      queryFn: () => fetchProductDetails(id),
      staleTime: STALE_TIME.SHORT,
      // enabled: !!id,
    })),
  });

  // loading state
  const isLoading = productQueries.some((q) => q.isLoading);

  // collect products
  const products = productQueries
    .filter((q) => q.data)
    .map((q) => q.data);

  // filter based on redux quantity
  const visibleProducts = useMemo(() => {
    return products.filter(
      (product) => cartItems[product.id]?.quantity > 0
    );
  }, [products, cartItems]);

  if (isLoading) return <Loader />;
  if (visibleProducts.length === 0) return <CartEmpty />;

  return (
    <div className={styles.cartPage}>
      <OrderSummary
        cartProductsList={visibleProducts}
        cartProducts={cartItems}
      />

      <GridLayout minWidth="200px">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cartItems[product.id]?.quantity}
            presentInCart
          />
        ))}
      </GridLayout>
    </div>
  );
}

export default CartPage;
