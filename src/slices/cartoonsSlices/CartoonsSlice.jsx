import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    error: null
}

export const fetchCartoons = createAsyncThunk(
    'fetchCartoons',
    async () => {
        const res = await axios.get("http://localhost:4000/api/Cartoons");
        return res.data;
    }
);

export const cartoonsSlice = createSlice({
    name: 'cartoons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartoons.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchCartoons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchCartoons.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default cartoonsSlice.reducer;