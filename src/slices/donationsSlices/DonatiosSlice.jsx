import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TRANSACTION_ENDPOINTS } from '../../constants/transactionEndpoints';

const initialState = {
    donations: [],
    isLoading: false,
    error: null
}

export const fetchDonations = createAsyncThunk(
    'fetchDonations',
    async (payload) => {
        const { pageNumber, pageSize } = payload;
    
        const response = await axios.get(TRANSACTION_ENDPOINTS.getFundraising, {
            params: {    
                pageNumber: pageNumber, 
                pageSize: pageSize,
            }
        });
        return response.data;
    }
);

export const donationsSlice = createSlice({
    name: 'donations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDonations.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchDonations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.donations = action.payload;
        });
        builder.addCase(fetchDonations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default donationsSlice.reducer;