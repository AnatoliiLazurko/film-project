import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    films: [],
    isLoading: false,
    error: null
}

export const fetchFilms = createAsyncThunk(
    'fetchFilms',
    async (payload) => {
        const { pageNumber, pageSize, sortByDate, sortByPopularity, genres, studios, selections } = payload;
    
        const response = await axios.post('http://13.79.114.101:80/api/Films/byfiltersandsorting', {
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

// export const fetchFilms = createAsyncThunk(
//     'fetchFilms',
//     async (pageCount) => {
//         const countOfPage = pageCount; 
//         let fetchedMovies = [];

//         for (let page = 1; page <= countOfPage; page++) {
//             const response = await axios.get('http://www.omdbapi.com/', {
//                 params: {
//                     apikey: 'bfec6a42',
//                     s: 'movie',
//                     type: 'movie',
//                     r: 'json',
//                     page: page,
//                     pageSize: 10
//                 }
//             });

//             if (response.data.Search) {
//                 fetchedMovies = fetchedMovies.concat(response.data.Search);
//             }
//         }

//         const moviesWithDetails = await Promise.all(
//             fetchedMovies.map(async movie => {
//                 const detailsResponse = await axios.get('http://www.omdbapi.com/', {
//                     params: {
//                         apikey: 'bfec6a42',
//                         i: movie.imdbID,
//                         r: 'json'
//                     }
//                 });
//                 return detailsResponse.data;
//             })
//         );

//         return moviesWithDetails;
//     }
// );

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilms.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFilms.fulfilled, (state, action) => {
            state.isLoading = false;
            state.films = action.payload;
        });
        builder.addCase(fetchFilms.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default filmsSlice.reducer;