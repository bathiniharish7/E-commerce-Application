import React from 'react'
import styles from './OrderSummary.module.css'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material';
function OrderSummary() {

    const cartProducts = useSelector((state)=>state.cart.products);
    const totalAmount=cartProducts.reduce((acc,current)=>{
        return acc = acc + current.price;
    },0).toFixed(2)

  return (
    <div className={styles.orderSummary}>
        <h3 className={styles.title}>Order Summary</h3>
        <table className={styles.table}>
            <thead>
                <tr className={styles.heading}>
                    <td>Sl.No</td>
                    <td>Product Name</td>
                    <td>Price</td>
                </tr>
            </thead>
            <tbody>
                {
                    cartProducts.map((product,index)=><tr className={styles.tableRow}>
                        <td>{index+1}</td>
                        <td>{product.title}</td>
                        <td>₹{product.price}/-</td>

                    </tr>)
                }
            </tbody>
        </table>

        <Button variant='contained' onClick={()=>alert("this feature is under development")}  className={styles.payButton}>Pay Total Amount : ₹{totalAmount}/-</Button>
      
    </div>
  )
}

export default OrderSummary
