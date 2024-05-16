import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    error: null
}

export const fetchFilteredCartoons = createAsyncThunk(
    'fetchFilteredCartoons',
    async (payload) => {
        const { category, animation, studio, pageNumber, pageSize } = payload;
        
        const res = await axios.get("http://localhost:4000/api/Cartoons/byfilter", {
            params: {
                category,
                animation,
                studio,
                pageNumber,
                pageSize
            }
        });
        return res.data.items;
    }
);

export const filteredCartoonsSlice = createSlice({
    name: 'filteredCartoons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredCartoons.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFilteredCartoons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchFilteredCartoons.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filteredCartoonsSlice.reducer;