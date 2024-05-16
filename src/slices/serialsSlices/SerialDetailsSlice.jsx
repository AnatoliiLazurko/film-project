import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    error: null
}

export const fetchSerialDetails = createAsyncThunk(
    'fetchSerialDetails',
    async () => {
        const res = await axios.get("http://localhost:4000/api/Serials/byid");
        return res.data;
    }
);

export const serialDetailsSlice = createSlice({
    name: 'serialDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSerialDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSerialDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchSerialDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default serialDetailsSlice.reducer;