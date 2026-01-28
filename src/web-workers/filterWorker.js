/* eslint-disable no-restricted-globals */

self.onmessage = (event) => {
  const {
    products = [],
    category = "all",
    priceRange = "all",
    rating = "all",
  } = event.data || {};

  let result = products;

//   console.log('category : ',category,' price: ',priceRange,' rating: ',rating);
  

  // filter matching category
  if (category !== "all") {
    result = result.filter(
      (p) => p.category === category
    );
  }

  // filter matching price
  if (priceRange !== "all") {
    const [min, max] = priceRange.split("-").map(Number);

    result = result.filter(
      (p) => p.price >= min && p.price <= max
    );
  }

  //  filter matching rating
  if (rating !== "all") {
    result = result.filter(
      (p) => p.rating >= Number(rating)
    );
  }

  self.postMessage(result);
};
