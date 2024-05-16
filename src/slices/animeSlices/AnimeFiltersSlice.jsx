import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: false,
    error: null
}

export const fetchFilteredAnime = createAsyncThunk(
    'fetchFilteredAnime',
    async (payload) => {
        const { genre, pageNumber, pageSize } = payload;
        
        const res = await axios.get("http://localhost:4000/api/Anime/byfilter", {
            params: {
                genre,
                pageNumber,
                pageSize
            }
        });
        return res.data.items;
    }
);

export const filteredAnimeSlice = createSlice({
    name: 'filteredAnime',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredAnime.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFilteredAnime.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchFilteredAnime.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filteredAnimeSlice.reducer;