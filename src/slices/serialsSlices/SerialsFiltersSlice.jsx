import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    error: null
}

export const fetchFilteredSerials = createAsyncThunk(
    'fetchFilteredSerials',
    async (payload) => {
        const { genre, studio, pageNumber, pageSize } = payload;
        
        const res = await axios.get("http://localhost:4000/api/Serials/byfilter", {
            params: {
                genre,
                studio,
                pageNumber,
                pageSize
            }
        });
        return res.data.items;
    }
);

export const filteredSerialsSlice = createSlice({
    name: 'filteredSerials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredSerials.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFilteredSerials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchFilteredSerials.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filteredSerialsSlice.reducer;