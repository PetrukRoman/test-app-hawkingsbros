import { createSlice } from "@reduxjs/toolkit";
import { cartProduct } from "../../types/CartProducts";
import {
  updateSummaryCartData,
  deleteProductFromCart,
  changeQuantityDec,
  getCartProductsData,
  changeQuantity,
  changeQuantityInc,
  clearCart,
} from "./actions";

interface cartState {
  totalProducts: number;
  total: number;
  discount: number;
  items: cartProduct[];
  loading: "idle" | "pending";
}

const initialState: cartState = {
  items: [],
  totalProducts: 0,
  discount: 0,
  total: 0,
  loading: "idle",
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //update summary data in cart
    builder.addCase(updateSummaryCartData.fulfilled, (state, action) => {
      state.totalProducts = action.payload.TotalProducts;
      state.discount = action.payload.Discount;
      state.total = action.payload.Total;
    });
    // fetch products in user cart
    builder.addCase(getCartProductsData.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    // change quantity by user value
    builder.addCase(changeQuantity.fulfilled, (state, action) => {
      const currentProductIndex = state.items.findIndex((item) => item.Id === action.payload.productId);
      state.items[currentProductIndex].Quantity = action.payload.newValue;
      state.totalProducts = state.items.reduce((acc, curr) => (acc += curr.Quantity), 0);
      state.total = state.items.reduce((acc, curr) => (acc += curr.Quantity * curr.Price), 0);
    });
    // increment product quantity
    builder.addCase(changeQuantityInc.pending, (state) => {
      state.loading = "pending";
    }),
      builder.addCase(changeQuantityInc.fulfilled, (state, action) => {
        const currentProductIndex = state.items.findIndex((item) => item.Id === action.payload.productId);

        state.loading = "idle";
        state.items[currentProductIndex].Quantity++;
        state.totalProducts = state.items.reduce((acc, curr) => (acc += curr.Quantity), 0);
        state.total = state.items.reduce((acc, curr) => (acc += curr.Quantity * curr.Price), 0);
      });
    builder.addCase(changeQuantityInc.rejected, (state) => {
      state.loading = "idle";
    }),
      //decrement product quantity
      builder.addCase(changeQuantityDec.pending, (state) => {
        state.loading = "pending";
      }),
      builder.addCase(changeQuantityDec.fulfilled, (state, action) => {
        const currentProductIndex = state.items.findIndex((item) => item.Id === action.payload.productId);

        state.items[currentProductIndex].Quantity--;

        state.totalProducts = state.items.reduce((acc, curr) => (acc += curr.Quantity), 0);
        state.total = state.items.reduce((acc, curr) => (acc += curr.Quantity * curr.Price), 0);
        state.loading = "idle";
      });
    builder.addCase(changeQuantityDec.rejected, (state) => {
      state.loading = "idle";
    }),
      //delete product from cart
      builder.addCase(deleteProductFromCart.pending, (state) => {
        state.loading = "pending";
      }),
      builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
        const currentProductIndex = state.items.findIndex((item) => item.Id === action.payload.productId);

        state.items.splice(currentProductIndex, 1);
        state.loading = "idle";
        state.totalProducts = state.items.reduce((acc, curr) => (acc += curr.Quantity), 0);
        state.total = state.items.reduce((acc, curr) => (acc += curr.Quantity * curr.Price), 0);
      });
    builder.addCase(deleteProductFromCart.rejected, (state) => {
      state.loading = "idle";
    }),
      //clear cart
      builder.addCase(clearCart.pending, (state) => {
        state.loading = "pending";
      });
    builder.addCase(clearCart.fulfilled, () => initialState);
  },
});

export default cartSlice.reducer;
