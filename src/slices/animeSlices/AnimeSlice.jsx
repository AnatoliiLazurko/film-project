import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    anime: [],
    isLoading: false,
    error: null
}

export const fetchAnime = createAsyncThunk(
    'fetchAnime',
    async (payload) => {
        const { pageNumber, pageSize, sortByDate, sortByPopularity, genres } = payload;
    
        const response = await axios.post('https://blahofilm.northeurope.cloudapp.azure.com:445/api/Anime/byfiltersandsorting', {
            Genres: genres,
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

// export const fetchAnime = createAsyncThunk(
//     'fetchAnime',
//     async () => {
//         const response = await axios.get(`http://www.omdbapi.com/?s=avengers&type=movie&apikey=bfec6a42&page=3`);
//         const animeData = await Promise.all(
//             response.data.Search.map(async anime => {
//                 const detailedResponse = await axios.get(
//                 `http://www.omdbapi.com/?i=${anime.imdbID}&apikey=bfec6a42&plot=full`
//                 );
//                 return detailedResponse.data;
//             })
//         );
//         return animeData;
//     }
// );


export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAnime.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAnime.fulfilled, (state, action) => {
            state.isLoading = false;
            state.anime = action.payload;
        });
        builder.addCase(fetchAnime.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default animeSlice.reducer;