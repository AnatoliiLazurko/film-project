import React from 'react';
import Player from './Player/Player';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherMovies from './OtherMovies/OtherMovies';
import Comments from './Comments/Comments';

const ViewPage = () => {

    return (
        <>
            
            <ViewInfo />

            <Player />

            <OtherMovies />

            <Comments />

        </>
    );
}

export default ViewPage;