import React from "react";
import { Button, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import styles from "./OrderSummary.module.css";

function OrderSummary({ cartProducts, cartProductsList }) {

  const totalAmount = cartProductsList.reduce((total, product) => {
    const quantity = cartProducts[product.id]?.quantity || 0;
    return total + product.price * quantity;
  }, 0);

  return (
    <div className={styles.orderSummary}>
      {/* <h3 className={styles.title}>CART SUMMARY</h3> */}

      <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
        <Table stickyHeader size="small">
          <caption
            style={{
              captionSide: "top",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "10px",
              textAlign: "center",

              backgroundColor: "#5f94ea",
              borderBottom: "2px solid #2d72d9",
              color: "#fff",
              letterSpacing: "0.5px"
            }}
          >
            Cart Summary
          </caption>

          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "#2d72d9",
                  color: "#fff",
                  fontWeight: 600
                }
              }}
            >
              <TableCell>Sl.No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartProductsList.map((product, index) => {
              const quantity = cartProducts[product.id]?.quantity || 0;

              return (
                <TableRow key={product.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell align="center">{quantity}</TableCell>
                  <TableCell align="right">
                    ₹{product.price}
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
        Pay Total Amount : ₹{totalAmount.toFixed(2)}/-
      </Button>
    </div>
  );
}

export default OrderSummary;
