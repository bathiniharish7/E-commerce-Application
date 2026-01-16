import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategory,
  setPriceRange,
  setRating,
  resetFilters
} from '../../redux/filterSlice/filterSlice';

function FilterComponent() {
  const dispatch = useDispatch();

  const { category, priceRange, rating } = useSelector(
    (state) => state.filters
  );


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

    // ✅ check if any filter is selected
  const isAnyFilterApplied =
    category !== 'all' ||
    priceRange !== 'all' ||
    rating !== 'all';

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        paddingTop: '10px',
        alignItems: 'center'
      }}
    >

      {/* Category */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Price</InputLabel>
        <Select
          label="Price"
          value={priceRange}
          onChange={(e) => dispatch(setPriceRange(e.target.value))}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="100-3000">₹100 – ₹3,000</MenuItem>
          <MenuItem value="3000-6000">₹3,000 – ₹6,000</MenuItem>
          <MenuItem value="6000-9000">₹6,000 – ₹9,000</MenuItem>
          <MenuItem value="9000-12000">₹9,000 – ₹12,000</MenuItem>
        </Select>
      </FormControl>

      {/* Rating */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Rating</InputLabel>
        <Select
          label="Rating"
          value={rating}
          onChange={(e) => dispatch(setRating(e.target.value))}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="4">⭐ 4 & above</MenuItem>
          <MenuItem value="3">⭐ 3 & above</MenuItem>
          <MenuItem value="2">⭐ 2 & above</MenuItem>
          <MenuItem value="1">⭐ 1 & above</MenuItem>
        </Select>
      </FormControl>

     {/* ✅ Reset Button (conditional) */}
      {isAnyFilterApplied && (
        <Button
          variant="outlined"
          onClick={() => dispatch(resetFilters())}
          sx={{ color: '#3d4042' }}
        >
          Reset
        </Button>
      )}

    </div>
  );
}

export default FilterComponent;
