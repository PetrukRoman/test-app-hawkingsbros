import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeQuantityProduct } from "../../types/CartProducts";
import { RootState } from "../store";

export const updateSummaryCartData = createAsyncThunk("cart/updateSummaryCartData", async (_, thunkAPI) => {
  try {
    const responce = await fetch("http://localhost:8080/api/ShoppingCart/baskedsummary");
    return await responce.json();
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const getCartProductsData = createAsyncThunk("cart/getCartProductsData", async (_, thunkAPI) => {
  try {
    const responce = await fetch("http://localhost:8080/api/ShoppingCart/products");

    if (!responce.ok) {
      throw new Error("Something went wrong");
    }

    return await responce.json();
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const changeQuantity = createAsyncThunk("cart/changeQuantityGood", async (productData: changeQuantityProduct, thunkAPI) => {
  if (productData.newValue <= 0 && productData.newValue > 10) {
    return thunkAPI.rejectWithValue("incorrect value");
  }

  try {
    const responce = await fetch("http://localhost:8080/api/ShoppingCart/changequantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductId: productData.productId,
        Value: productData.newValue,
        UserGuid: productData.userGuid,
      }),
    });
    if (!responce.ok) {
      throw new Error("Something went wrong while change quantity");
    }
    return productData;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const changeQuantityInc = createAsyncThunk<
  Omit<changeQuantityProduct, "newValue">,
  Omit<changeQuantityProduct, "newValue">,
  { state: RootState }
>("cart/changeQuantityIncGood", async (productData, thunkAPI) => {
  const state = thunkAPI.getState();
  const currentProductIndex = state.cart.items.findIndex((item) => item.Id === productData.productId);

  if (state.cart.items[currentProductIndex].Quantity === 10) {
    return thunkAPI.rejectWithValue("incorrect value");
  }
  try {
    const response = await fetch("http://localhost:8080/api/ShoppingCart/quantityinc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductId: productData.productId,
        UserGuid: productData.userGuid,
      }),
      signal: thunkAPI.signal,
    });

    if (!response.ok) {
      throw new Error("Error");
    }

    return productData;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const changeQuantityDec = createAsyncThunk<
  Omit<changeQuantityProduct, "newValue">,
  Omit<changeQuantityProduct, "newValue">,
  { state: RootState }
>("cart/changeQuantityDecGood", async (productData: Omit<changeQuantityProduct, "newValue">, thunkAPI) => {
  const state = thunkAPI.getState();
  const currentProductIndex = state.cart.items.findIndex((item) => item.Id === productData.productId);

  if (state.cart.items[currentProductIndex].Quantity === 1) {
    return thunkAPI.rejectWithValue("incorrect value");
  }
  try {
    const response = await fetch("http://localhost:8080/api/ShoppingCart/quantitydec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductId: productData.productId,
        UserGuid: productData.userGuid,
      }),
    });
    if (!response.ok) {
      throw new Error("Error");
    }
    return productData;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});
export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (productData: Omit<changeQuantityProduct, "newValue">, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8080/api/ShoppingCart/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductId: productData.productId,
          UserGuid: productData.userGuid,
        }),
        signal: thunkAPI.signal,
      });

      if (!response.ok) {
        throw new Error("Error");
      }
      return productData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:8080/api/ShoppingCart/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error");
    }
    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});
