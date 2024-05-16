import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    error: null
}

export const fetchAnimeDetails = createAsyncThunk(
    'fetchAnimeDetails',
    async () => {
        const res = await axios.get("http://localhost:4000/api/Anime/byid");
        return res.data;
    }
);

export const animeDetailsSlice = createSlice({
    name: 'animeDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAnimeDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAnimeDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchAnimeDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default animeDetailsSlice.reducer;