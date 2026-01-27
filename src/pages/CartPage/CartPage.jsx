import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridLayout from "../../components/Grid/Grid";
import ProductCard from "../../components/ProductCard/ProductCard";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import Loader from "../../components/Loader/Loader";
import styles from "./CartPage.module.css";

import { fetchProductDetails } from "../../api/CartPageApi";
import { updateCartProductDetails } from "../../redux/cartSlice/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const cartProducts = useSelector((state) => state.cart.cartItems);

  // stable ids
  const productIds = useMemo(() => {
    return Object.keys(cartProducts);
  }, [cartProducts]);

  useEffect(() => {
    if (productIds.length === 0) return;

    const fetchLatestCart = async () => {
      setLoading(true);

      try {
        const results = await Promise.allSettled(
          productIds.map((id) => fetchProductDetails(id))
        );

        const successProducts = results
          .filter((res) => res.status === "fulfilled")
          .map((res) => res.value);

        dispatch(updateCartProductDetails(successProducts));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCart();
  }, []);

  if (loading) return <Loader />;

  if (productIds.length === 0) return <CartEmpty />;

  return (
    <div className={styles.cartPage}>
      <OrderSummary />

      <GridLayout minWidth="200px" products={cartProducts}>
        {productIds.map((id) => {
          const product = cartProducts[id].productDetails;

          return (
            <ProductCard
              key={product.id}
              product={product}
              presentInCart={true}
            />
          );
        })}
      </GridLayout>
    </div>
  );
}

export default CartPage;
