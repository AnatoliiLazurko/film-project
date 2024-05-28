import React from 'react';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const Player = ({ switchPlayer, filmDetails }) => {

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
            sources: 'https://blahofilmstorage.blob.core.windows.net/films/A Haunting in Venice (2023) [Ukr,Eng] BDRip-AVC [Hurtom].mkv?sv=2023-11-03&st=2024-05-19T12%3A36%3A49Z&se=2024-05-19T22%3A36%3A49Z&sr=b&sp=r&sig=GT1fRZGv%2BqCCqZIIx4H3FIHbgnOCrH79Le4VdfcJx%2Fw%3D',
            poster: `${filmDetails.poster ? `data:image/jpeg;base64,${filmDetails.poster}` : ''}`,
        },
        options: {
            controls,
            settings: ['captions', 'quality', 'speed'],
            captions: {
                active: true,
                update: true,
                language: 'auto',
            },
            quality: {
                default: 720,
                options: [720],
                forced: true,
            },
        },
        
    }

    // TRAILER

    const plyrPropsTrailer = {
        source: {
            type: 'video',
            sources: [
                {
                    src: filmDetails.trailerUri,
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

    const switchProps = switchPlayer === true ? plyrProps : plyrPropsTrailer;

    return (
        <>
            <Plyr {...switchProps} />
        </>
    );
}

export default Player;
