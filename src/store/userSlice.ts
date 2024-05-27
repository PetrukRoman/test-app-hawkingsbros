import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface userState {
  userGuid: string;
  LogoImg: string;
  userName: string;
}

const initialState: userState = {
  userGuid: "",
  LogoImg: "",
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userGuid = action.payload.UsedGuid;
    });
  },
});

export const fetchUserData = createAsyncThunk("users/fetchUserData", async (_, thunkAPI) => {
  const response = await fetch("http://localhost:8080/api/ShoppingCart/header", {
    signal: thunkAPI.signal,
  });

  return await response.json();
});

export default userSlice.reducer;
