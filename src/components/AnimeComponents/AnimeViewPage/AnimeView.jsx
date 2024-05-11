import React from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherAnime from './OtherAnime/OtherAnime';
import Comments from './Comments/Comments';
import AnimePlayer from './AnimePlayer/AnimePlayer';

const AnimeView = () => {
    return (
        <>

            <ViewInfo />

            <AnimePlayer />

            <OtherAnime />

            <Comments />

        </>
    );
}

export default AnimeView;
