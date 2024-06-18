import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ANIME_ENDPOINTS } from '../../constants/animeEndpoints';

const initialState = {
    animeSelections: [],
    isLoading: false,
    error: null
}

export const fetchAnimeSelections = createAsyncThunk(
    'fetchAnimeSelections',
    async () => {  
        const res = await axios.get(ANIME_ENDPOINTS.animeSelections);
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