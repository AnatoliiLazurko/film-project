import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from '../slices/filmsSlices/FilmsSlice';
import filmDetailsReducer from '../slices/filmsSlices/FilmDetailsSlice';
import filmsSelectionsReducer from '../slices/filmsSlices/FilmsSelectionsSlice';
import cartoonsReducer from '../slices/cartoonsSlices/CartoonsSlice';
import cartoonDetailsReducer from '../slices/cartoonsSlices/CartoonDetailsSlice';
import cartoonsSelectionsReducer from '../slices/cartoonsSlices/CartoonsSelectionsSlice';
import serialsReducer from '../slices/serialsSlices/SerialsSlice';
import serialDetailsReducer from '../slices/serialsSlices/SerialDetailsSlice';
import serialsSelectionsReducer from '../slices/serialsSlices/SerialsSelectionsSlice';
import animeReducer from '../slices/animeSlices/AnimeSlice';
import animeDetailsReducer from '../slices/animeSlices/AnimeDetailsSlice';
import animeSelectionsReducer from '../slices/animeSlices/AnimeSelectionsSlice';

export const store = configureStore({
    reducer: {
        // FILMS REDUCERS
        films: filmsReducer,
        filmDetails: filmDetailsReducer,
        filmsSelections: filmsSelectionsReducer,

        // CARTOONS REDUCERS
        cartoons: cartoonsReducer,
        cartoonDetails: cartoonDetailsReducer,
        cartoonsSelections: cartoonsSelectionsReducer, 

        // SERIALS REDUCERS
        serials: serialsReducer,
        serialDetails: serialDetailsReducer,
        serialsSelections: serialsSelectionsReducer,

        // ANIME REDUCERS
        anime: animeReducer,
        animeDetails: animeDetailsReducer,
        animeSelections: animeSelectionsReducer,
    }
});