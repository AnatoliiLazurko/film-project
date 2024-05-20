import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    filteredFilms: [],
    isLoading: false,
    error: null
}

// export const fetchFilteredFilms = createAsyncThunk(
//     'fetchFilteredFilms',
//     async (payload) => {
//         const { genre, studio, pageNumber, pageSize } = payload;
        
//         const res = await axios.get("http://localhost:4000/api/Films/byfilter", {
//             params: {
//                 genre,
//                 studio,
//                 pageNumber,
//                 pageSize
//             }
//         });
//         return res.data.items;
//     }
// );

export const fetchFilteredFilms = createAsyncThunk(
    'fetchFilteredFilms',
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

export const filteredFilmsSlice = createSlice({
    name: 'filteredFilms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredFilms.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFilteredFilms.fulfilled, (state, action) => {
            state.isLoading = false;
            state.filteredFilms = action.payload;
        });
        builder.addCase(fetchFilteredFilms.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filteredFilmsSlice.reducer;