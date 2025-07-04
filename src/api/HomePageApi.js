export const fetchProducts=async()=>{
    const res = await fetch('https://dummyjson.com/products?limit=400');
    const data =await res.json();
    return data;
}

export const searchProducts=async(input)=>{
    const res = await fetch(`https://dummyjson.com/products/search?q=${input}`);
    const data =await res.json();
    return data;
}

