import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import GridLayout from "../../components/Grid/Grid";
import ProductCard from "../../components/ProductCard/ProductCard";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import Loader from "../../components/Loader/Loader";
import styles from "./CartPage.module.css";

import { fetchProductDetails } from "../../api/CartPageApi";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // get product ids
  const productIds = useMemo(
    () => Object.keys(cartItems),
    []
  );

  // call API only once when cart is opened
  useEffect(() => {
    if (productIds.length === 0) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const results = await Promise.allSettled(
          productIds.map((id) => fetchProductDetails(id))
        );

        const successProducts = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value);

        setProducts(successProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ FILTER UI BASED ON REDUX
  const visibleProducts = useMemo(() => {
    return products.filter(
      (product) => cartItems[product.id]?.quantity > 0
    );
  }, [products, cartItems]);

  if (loading) return <Loader />;
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
