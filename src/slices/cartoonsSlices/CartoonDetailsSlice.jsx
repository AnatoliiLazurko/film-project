import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CARTOON_ENDPOINTS } from '../../constants/cartoonEndpoints';

const initialState = {
    cartoonDetails: [],
    isLoading: false,
    error: null
}

export const fetchCartoonDetails = createAsyncThunk(
    'fetchCartoonDetails',
    async (id) => {
        const response = await axios.get(CARTOON_ENDPOINTS.cartoonById, {
            params: {    
                id: id,
            }
        });
        return response.data;
    }
);

// export const fetchCartoonDetails = createAsyncThunk(
//     'fetchCartoonDetails',
//     async (id) => {
//         const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=bfec6a42&plot=full`);
//         return response.data;
//     }
// );


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