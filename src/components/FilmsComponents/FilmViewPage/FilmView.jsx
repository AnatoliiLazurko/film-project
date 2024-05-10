import React from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherMovies from './OtherMovies/OtherMovies';
import Comments from './Comments/Comments';
import FilmPlayer from './FilmPlayer/FilmPlayer';

const FilmView = () => {
    
    return (
        <>
            
            <ViewInfo />

            <FilmPlayer />

            <OtherMovies />

            <Comments />

        </>
    );
}

export default FilmView;
