import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from '../slices/filmsSlices/FilmsSlice';
import filmDetailsReducer from '../slices/filmsSlices/FilmDetailsSlice';
import filteredFilmsReducer from '../slices/filmsSlices/FilmsFiltersSlice';
import cartoonsReducer from '../slices/cartoonsSlices/CartoonsSlice';
import cartoonDetailsReducer from '../slices/cartoonsSlices/CartoonDetailsSlice';
import filteredCartoonsReducer from '../slices/cartoonsSlices/CartoonsFiltersSlice';
import serialsReducer from '../slices/serialsSlices/SerialsSlice';
import serialDetailsReducer from '../slices/serialsSlices/SerialDetailsSlice';
import filteredSerialsReducer from '../slices/serialsSlices/SerialsFiltersSlice';
import animeReducer from '../slices/animeSlices/AnimeSlice';
import animeDetailsReducer from '../slices/animeSlices/AnimeDetailsSlice';
import filteredAnimeReducer from '../slices/animeSlices/AnimeFiltersSlice';

export const store = configureStore({
    reducer: {
        // FILMS REDUCERS
        films: filmsReducer,
        filmDetails: filmDetailsReducer,
        filteredFilms: filteredFilmsReducer,

        // CARTOONS REDUCERS
        cartoons: cartoonsReducer,
        cartoonDetails: cartoonDetailsReducer,
        filteredCartoons: filteredCartoonsReducer, 

        // SERIALS REDUCERS
        serials: serialsReducer,
        serialDetails: serialDetailsReducer,
        filteredSerials: filteredSerialsReducer,

        // ANIME REDUCERS
        anime: animeReducer,
        animeDetails: animeDetailsReducer,
        filteredAnime: filteredAnimeReducer,
    }
});