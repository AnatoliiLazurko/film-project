import React from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherSeries from './OtherSerials/OtherSerials';
import Comments from './Comments/Comments';
import SerialPlayer from './SerialPlayer/SerialPlayer';

const SerialView = () => {
    return (
        <>
            
            <ViewInfo />

            <SerialPlayer />

            <OtherSeries />

            <Comments />

        </>
    );
}

export default SerialView;
