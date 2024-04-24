import React from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import Player from './Player/Player';
import OtherAnime from './OtherAnime/OtherAnime';
import Comments from './Comments/Comments';

const AnimeView = () => {
    return (
        <>

            <ViewInfo />

            <Player />

            <OtherAnime />

            <Comments />

        </>
    );
}

export default AnimeView;
