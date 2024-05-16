import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    error: null
}

export const fetchSerials = createAsyncThunk(
    'fetchSerials',
    async () => {
        const res = await axios.get("http://localhost:4000/api/Serials");
        return res.data;
    }
);

export const serialsSlice = createSlice({
    name: 'serials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSerials.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSerials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchSerials.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default serialsSlice.reducer;