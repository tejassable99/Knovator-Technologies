import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
  carts: [],
  userDetails: {
    firstName: '',
    lastName: '',
    address: ''
  }
};

const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    // Add to cart
    addToCart: (state, action) => {
      const IteamIndex = state.carts.findIndex((item) => item.id === action.payload.id);

      if (IteamIndex >= 0) {
        toast.error("Item already present in Cart!!!");
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, temp];
        toast.success("Item added In Your Cart");
      }
    },
    // Increment quantity
    addIncreToCart: (state, action) => {
      const IteamIndex = state.carts.findIndex((item) => item.id === action.payload.id);

      if (IteamIndex >= 0) {
        state.carts[IteamIndex].qnty += 1;
      }
    },
    // Remove specific items
    removeToCart: (state, action) => {
      const data = state.carts.filter((ele) => ele.id !== action.payload);
      state.carts = data;
    },
    // Remove single item
    removeSingleIteams: (state, action) => {
      const IteamIndex_dec = state.carts.findIndex((item) => item.id === action.payload.id);

      if (state.carts[IteamIndex_dec].qnty >= 1) {
        state.carts[IteamIndex_dec].qnty -= 1;
      }
    },
    // Clear cart
    emptycartIteam: (state, action) => {
      state.carts = [];
    },
    // Update user details
    updateUserDetails: (state, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
    }
  }
});

export const {
  addToCart,
  removeToCart,
  removeSingleIteams,
  emptycartIteam,
  addIncreToCart,
  updateUserDetails
} = cartSlice.actions;

export default cartSlice.reducer;
