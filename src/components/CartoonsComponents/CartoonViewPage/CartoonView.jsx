import React from 'react';
import ViewInfo from './ViewInfo/ViewInfo';
import OtherCartoons from './OtherCartoons/OtherCartoons';
import Comments from './Comments/Comments';
import CartoonPlayer from './CartoonPlayer/CartoonPlayer';

const CartoonView = () => {
    return (
        <>
            
            <ViewInfo />

            <CartoonPlayer />

            <OtherCartoons />

            <Comments />

        </>
    );
}

export default CartoonView;
