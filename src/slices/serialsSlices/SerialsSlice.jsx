import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERIAL_ENDPOINTS } from '../../constants/serialEndpoints';

const initialState = {
    serials: [],
    isLoading: false,
    error: null
}

export const fetchSerials = createAsyncThunk(
    'fetchSerials',
    async (payload) => {
        const { pageNumber, pageSize, sortByDate, sortByPopularity, genres, studios, selections } = payload;
    
        const response = await axios.post(SERIAL_ENDPOINTS.serials, {
            Genres: genres,
            Studios: studios,
            Selections: selections,
        },  {
            params: {    
                pageNumber: pageNumber,
                pageSize: pageSize,
                sortByDate: sortByDate,
                sortByPopularity: sortByPopularity
            },
        });
        return response.data;
    }
);

// export const fetchSerials = createAsyncThunk(
//     'fetchSerials',
//     async (pageCount) => {
//         const countOfPage = pageCount; 
//         let fetchedSeries = [];

//         for (let page = 1; page <= countOfPage; page++) {
//             const response = await axios.get('http://www.omdbapi.com/', {
//                 params: {
//                     apikey: 'bfec6a42',
//                     s: 'series',
//                     type: 'series',
//                     r: 'json',
//                     page: page,
//                     pageSize: 10
//                 }
//             });

//             if (response.data.Search) {
//                 fetchedSeries = fetchedSeries.concat(response.data.Search);
//             }
//         }

//         const seriesWithDetails = await Promise.all(
//             fetchedSeries.map(async movie => {
//                 const detailsResponse = await axios.get('http://www.omdbapi.com/', {
//                 params: {
//                     apikey: 'bfec6a42',
//                     i: movie.imdbID,
//                     r: 'json'
//                 }
//                 });
//                 return detailsResponse.data;
//             })
//         );

//         return seriesWithDetails;
//     }
// );

export const serialsSlice = createSlice({
    name: 'serials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSerials.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSerials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serials = action.payload;
        });
        builder.addCase(fetchSerials.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default serialsSlice.reducer;