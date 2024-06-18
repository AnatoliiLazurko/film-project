import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FILM_ENDPOINTS } from '../../constants/filmEndpoints';

const initialState = {
    filmDetails: [],
    isLoading: false,
    error: null
}

export const fetchFilmDetails = createAsyncThunk(
    'fetchFilmDetails',
    async (id) => {
        const response = await axios.get(FILM_ENDPOINTS.filmById, {
            params: {    
                id: id,
            }
        });
        return response.data;
    }
);

// export const fetchFilmDetails = createAsyncThunk(
//     'fetchFilmDetails',
//     async (id) => {
//         const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=bfec6a42&plot=full`);
//         return response.data;
//     }
// );

export const filmDetailsSlice = createSlice({
    name: 'filmDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilmDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFilmDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.filmDetails = action.payload;
        });
        builder.addCase(fetchFilmDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filmDetailsSlice.reducer;