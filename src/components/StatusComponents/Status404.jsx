import React from 'react';
import status404 from '../../images/status/404.png'

const Status404 = () => {
    return (
        <>
            <img src={status404} alt=""
                style={{
                    height: '800px',
                    width: '100%',
                    marginTop: '70px',
                    marginBottom: '-70px',
                    objectFit: 'center'
                }}
            />
        </>
    );
}

export default Status404;
