import axios from "axios";
import api from "./api-configuartion";

export const fetchProductDetails = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};