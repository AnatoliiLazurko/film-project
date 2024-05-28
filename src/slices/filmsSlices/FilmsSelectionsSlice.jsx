import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    filmsSelections: [],
    isLoading: false,
    error: null
}

export const fetchFilmsSelections = createAsyncThunk(
    'fetchFilmsSelections',
    async () => {  
        const res = await axios.get("https://localhost:7095/api/films/selections");
        return res.data;
    }
);

export const filmsSelectionsSlice = createSlice({
    name: 'filmsSelections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilmsSelections.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFilmsSelections.fulfilled, (state, action) => {
            state.isLoading = false;
            state.filmsSelections = action.payload;
        });
        builder.addCase(fetchFilmsSelections.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filmsSelectionsSlice.reducer;