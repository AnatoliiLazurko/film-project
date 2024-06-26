import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERIAL_ENDPOINTS } from '../../constants/serialEndpoints';

const initialState = {
    serialDetails: [],
    isLoading: false,
    error: null
}

export const fetchSerialDetails = createAsyncThunk(
    'fetchSerialDetails',
    async (id) => {
        const response = await axios.get(SERIAL_ENDPOINTS.serialById, {
            params: {    
                id: id,
            }
        });
        return response.data;
    }
);

// export const fetchSerialDetails = createAsyncThunk(
//     'fetchSerialDetails',
//     async (id) => {
//         const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=bfec6a42&plot=full`);
//         return response.data;
//     }
// );

export const serialDetailsSlice = createSlice({
    name: 'serialDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSerialDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSerialDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serialDetails = action.payload;
        });
        builder.addCase(fetchSerialDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default serialDetailsSlice.reducer;