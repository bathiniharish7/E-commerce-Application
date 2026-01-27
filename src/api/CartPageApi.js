import axios from "axios";

export const fetchProductDetails = (id) =>
  axios.get(`https://dummyjson.com/products/${id}`)
       .then(res => res.data);