import React from "react";
import { useSelector } from "react-redux";
import { Button, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import styles from "./OrderSummary.module.css";

function OrderSummary() {
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const totalAmount = Object.keys(cartProducts)
    .reduce((acc, productId) => {
      const item = cartProducts[productId];
      return acc + item.productDetails.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.title}>CART SUMMARY</h3>

      {/* ✅ Scrollable + Sticky Header */}
      <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
        <Table stickyHeader size="small" sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "#2d72d9",
                  color: "#fff",
                  fontWeight: 600,
                },
              }}
            >
              <TableCell>Sl.No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(cartProducts).map((productId, index) => {
              const product = cartProducts[productId].productDetails;
              const quantity = cartProducts[productId].quantity;

              return (
                <TableRow key={productId} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell align="center">{quantity}</TableCell>
                  <TableCell align="right">
                    ₹{product.price}/-
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        className={styles.payButton}
        onClick={() => alert("This feature is under development")}
      >
        Pay Total Amount : ₹{totalAmount}/-
      </Button>
    </div>
  );
}

export default OrderSummary;
