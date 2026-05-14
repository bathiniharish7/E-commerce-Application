import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useSearchParams } from "react-router-dom";

function FilterComponent({ categories = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const priceRange = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";

  // ---------------------------
  // Update URL Params
  // ---------------------------
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  // ---------------------------
  // Reset Filters
  // ---------------------------
  const resetFilters = () => {
    setSearchParams({});
  };

  const isAnyFilterApplied =
    category !== "all" ||
    priceRange !== "all" ||
    rating !== "all";

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: "0.5rem",
        paddingTop: "10px",
        paddingBottom: "0.5rem",
        alignItems: "center",
        borderBottom: "2px solid transparent",
        boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
      }}
    >
      {/* CATEGORY */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          id="category-select"
          labelId="category-select-label"
          aria-label="Category"
          value={category}
          label="Category"
          onChange={(e) => updateParam("category", e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* PRICE */}
      <FormControl size="small" sx={{ minWidth: 170 }}>
        <InputLabel id="price-select-label">Price</InputLabel>
        <Select
          id="price-select"
          labelId="price-select-label"
          aria-label="Price"
          value={priceRange}
          label="Price"
          onChange={(e) => updateParam("price", e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="0-2000">₹0 – ₹2,000</MenuItem>
          <MenuItem value="2000-4000">₹2,000 – ₹4,000</MenuItem>
          <MenuItem value="4000-6000">₹4,000 – ₹6,000</MenuItem>
          <MenuItem value="6000-8000">₹6,000 – ₹8,000</MenuItem>
          <MenuItem value="8000-10000">₹8,000 – ₹10,000</MenuItem>
          <MenuItem value="10000-12000">₹10,000 – ₹12,000</MenuItem>
          <MenuItem value="12000-999999">₹12,000+</MenuItem>
        </Select>
      </FormControl>

      {/* RATING */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="rating-select-label">Rating</InputLabel>
        <Select
          id="rating-select"
          labelId="rating-select-label"
          aria-label="Rating"
          value={rating}
          label="Rating"
          onChange={(e) => updateParam("rating", e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="4">⭐ 4 & above</MenuItem>
          <MenuItem value="3">⭐ 3 & above</MenuItem>
          <MenuItem value="2">⭐ 2 & above</MenuItem>
          <MenuItem value="1">⭐ 1 & above</MenuItem>
        </Select>
      </FormControl>

      {/* RESET BUTTON */}
      {isAnyFilterApplied && (
        <Button
          variant="outlined"
          onClick={resetFilters}
          aria-label="Reset all filters"
          sx={{ color: "#3d4042" }}
        >
          Reset
        </Button>
      )}
    </div>
  );
}

export default React.memo(FilterComponent);