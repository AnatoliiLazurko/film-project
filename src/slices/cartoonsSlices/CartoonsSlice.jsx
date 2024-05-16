import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartoons: [],
    isLoading: false,
    error: null
}

// export const fetchCartoons = createAsyncThunk(
//     'fetchCartoons',
//     async () => {
//         const res = await axios.get("http://localhost:4000/api/Cartoons");
//         return res.data;
//     }
// );

export const fetchCartoons = createAsyncThunk(
    'fetchCartoons',
    async () => {
        const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=movie&apikey=bfec6a42&page=2`);
        const cartoonsData = await Promise.all(
            response.data.Search.map(async cartoon => {
                const detailedResponse = await axios.get(
                `http://www.omdbapi.com/?i=${cartoon.imdbID}&apikey=bfec6a42&plot=full`
                );
                return detailedResponse.data;
            })
        );

        return cartoonsData;
    }
);


export const cartoonsSlice = createSlice({
    name: 'cartoons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartoons.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchCartoons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartoons = action.payload;
        });
        builder.addCase(fetchCartoons.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default cartoonsSlice.reducer;