import React from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import Player from './Player/Player';
import OtherSeries from './OtherSeries/OtherSeries';
import Comments from './Comments/Comments';

const SerialView = () => {
    return (
        <>
            
            <ViewInfo />

            <Player />

            <OtherSeries />

            <Comments />

        </>
    );
}

export default SerialView;
