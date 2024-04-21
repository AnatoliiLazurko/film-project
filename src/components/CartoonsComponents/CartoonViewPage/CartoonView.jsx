import React from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import Player from './Player/Player';
import OtherCartoons from './OtherCartoons/OtherCartoons';
import Comments from './Comments/Comments';

const CartoonView = () => {
    return (
        <>
            
            <ViewInfo />

            <Player />

            <OtherCartoons />

            <Comments />

        </>
    );
}

export default CartoonView;
