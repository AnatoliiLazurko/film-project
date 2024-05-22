import React from 'react';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import img from "../../../../../video/avatar-poster.jpg";

const Player = ({ switchPlayer, voiceActing, season, episode }) => {

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
            sources: '',
            poster: img,
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

    const switchProps = switchPlayer === true ? plyrProps : plyrPropsTrailer;

    return (
        <>
            <Plyr {...switchProps} />
        </>
    );
}

export default Player;
