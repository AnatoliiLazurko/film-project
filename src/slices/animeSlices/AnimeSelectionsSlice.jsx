import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    animeSelections: [],
    isLoading: false,
    error: null
}

export const fetchAnimeSelections = createAsyncThunk(
    'fetchAnimeSelections',
    async () => {  
        const res = await axios.get("https://blahofilm.northeurope.cloudapp.azure.com:445/api/anime/selections");
        return res.data;
    }
);

export const animeSelectionsSlice = createSlice({
    name: 'animeSelections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAnimeSelections.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAnimeSelections.fulfilled, (state, action) => {
            state.isLoading = false;
            state.animeSelections = action.payload;
        });
        builder.addCase(fetchAnimeSelections.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default animeSelectionsSlice.reducer;