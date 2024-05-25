import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartoonsSelections: [],
    isLoading: false,
    error: null
}

export const fetchCartoonsSelections = createAsyncThunk(
    'fetchCartoonsSelections',
    async () => {  
        const res = await axios.get("https://localhost:7095/api/films/selections");
        return res.data;
    }
);

export const cartoonsSelectionsSlice = createSlice({
    name: 'cartoonsSelections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartoonsSelections.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchCartoonsSelections.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartoonsSelections = action.payload;
        });
        builder.addCase(fetchCartoonsSelections.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default cartoonsSelectionsSlice.reducer;