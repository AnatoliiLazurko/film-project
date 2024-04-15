import React from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import Player from './Player/Player';
import OtherMovies from './OtherMovies/OtherMovies';
import Comments from './Comments/Comments';

const FilmViewPage = () => {
    return (
        <>
            
            <ViewInfo />

            <Player />

            <OtherMovies />

            <Comments />

        </>
    );
}

export default FilmViewPage;
