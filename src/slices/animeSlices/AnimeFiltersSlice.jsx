import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    filteredAnime: [],
    isLoading: false,
    error: null
}

// export const fetchFilteredAnime = createAsyncThunk(
//     'fetchFilteredAnime',
//     async (payload) => {
//         const { genre, pageNumber, pageSize } = payload;
        
//         const res = await axios.get("http://localhost:4000/api/Anime/byfilter", {
//             params: {
//                 genre,
//                 pageNumber,
//                 pageSize
//             }
//         });
//         return res.data.items;
//     }
// );

export const fetchFilteredAnime = createAsyncThunk(
    'fetchFilteredAnime',
    async (payload) => {
        const { pageNumber } = payload;
        
        const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=movie&apikey=bfec6a42&page=${pageNumber}`);
        const movieData = await Promise.all(
            response.data.Search.map(async movie => {
                const detailedResponse = await axios.get(
                `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bfec6a42&plot=full`
                );
                return detailedResponse.data;
            })
        );

        return movieData;
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
            state.filteredAnime = action.payload;
        });
        builder.addCase(fetchFilteredAnime.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filteredAnimeSlice.reducer;