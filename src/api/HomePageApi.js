import api from "./api-configuartion";

// Fetch all products
export const fetchProducts = async () => {
  const res = await api.get("/products?limit=400");
  return res.data;
};

// Search products
export const searchProducts = async (input) => {
  const res = await api.get(`/products/search?q=${input}`);
  return res.data;
};

// Fetch categories list
export const fetchCategories = async () => {
  const res = await api.get("/products/category-list");
  return res.data;
};


