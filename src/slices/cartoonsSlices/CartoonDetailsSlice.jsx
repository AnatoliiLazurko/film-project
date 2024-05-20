import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartoonDetails: [],
    isLoading: false,
    error: null
}

// export const fetchCartoonDetails = createAsyncThunk(
//     'fetchCartoonDetails',
//     async () => {
//         const res = await axios.get("http://localhost:4000/api/Cartoons/byid");
//         return res.data;
//     }
// );

export const fetchCartoonDetails = createAsyncThunk(
    'fetchCartoonDetails',
    async (id) => {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=bfec6a42&plot=full`);
        return response.data;
    }
);


export const cartoonDetailsSlice = createSlice({
    name: 'cartoonDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartoonDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchCartoonDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartoonDetails = action.payload;
        });
        builder.addCase(fetchCartoonDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default cartoonDetailsSlice.reducer;