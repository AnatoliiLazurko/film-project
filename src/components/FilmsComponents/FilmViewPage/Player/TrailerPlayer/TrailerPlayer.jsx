import React from 'react';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const TrailerPlayer = () => {

    const controls = [
      'play-large',
      'play',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'captions',
      'settings',
      'fullscreen',
    ];

    const plyrProps = {
        source: {
            type: 'video',
            sources: [
                {
                    src: 'https://www.youtube.com/watch?v=E8Qe0vS_I3I',
                    provider: 'youtube',
                },
            ],
        },
        options: {
            controls,
            youtube: { 
                noCookie: true,
                showinfo: false,
                rel: 0,
            },
        },
    }

    return (
        <>
            <Plyr {...plyrProps} />
        </>
    );
}

export default TrailerPlayer;
