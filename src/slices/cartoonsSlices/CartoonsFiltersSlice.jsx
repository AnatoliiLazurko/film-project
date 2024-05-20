import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    filteredCartoons: [],
    isLoading: false,
    error: null
}

// export const fetchFilteredCartoons = createAsyncThunk(
//     'fetchFilteredCartoons',
//     async (payload) => {
//         const { category, animation, studio, pageNumber, pageSize } = payload;
        
//         const res = await axios.get("http://localhost:4000/api/Cartoons/byfilter", {
//             params: {
//                 category,
//                 animation,
//                 studio,
//                 pageNumber,
//                 pageSize
//             }
//         });
//         return res.data.items;
//     }
// );

export const fetchFilteredCartoons = createAsyncThunk(
    'fetchFilteredCartoons',
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

export const filteredCartoonsSlice = createSlice({
    name: 'filteredCartoons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredCartoons.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFilteredCartoons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.filteredCartoons = action.payload;
        });
        builder.addCase(fetchFilteredCartoons.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filteredCartoonsSlice.reducer;