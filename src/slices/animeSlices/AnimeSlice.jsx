import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    error: null
}

export const fetchAnime = createAsyncThunk(
    'fetchAnime',
    async () => {
        const res = await axios.get("http://localhost:4000/api/Anime");
        return res.data;
    }
);

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAnime.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAnime.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchAnime.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default animeSlice.reducer;