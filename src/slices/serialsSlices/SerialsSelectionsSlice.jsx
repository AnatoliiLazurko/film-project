import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    serialsSelections: [],
    isLoading: false,
    error: null
}

export const fetchSerialsSelections = createAsyncThunk(
    'fetchSerialsSelections',
    async () => {  
        const res = await axios.get("https://localhost:7095/api/films/selections");
        return res.data;
    }
);

export const serialsSelectionsSlice = createSlice({
    name: 'serialsSelections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSerialsSelections.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSerialsSelections.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serialsSelections = action.payload;
        });
        builder.addCase(fetchSerialsSelections.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default serialsSelectionsSlice.reducer;