import React, { useEffect, useState } from 'react';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import video from "../../../../../video/Avatar2.mp4";
import video2 from "../../../../../video/video.mp4";
import img from "../../../../../video/avatar-poster.jpg";
import Subscription from '../../../../Subscription/Subscription';
import PayPalWindow from '../../../../Subscription/PayPalWindow/PayPalWindow';

const FilmPlayer = () => {

    const [isSubcribe, setSubcribe] = useState(false);

    const [quality, setQuality] = useState(720);
    const [checkQuality, setCheckQuality] = useState();

    const [showSub, setShowSub] = useState(false);
    const [closeSub, setCloseSub] = useState(false);

    const [showPayWindow, setPayWindow] = useState(false);

    const openPayWindow = () => {
        setCloseSub(true);
        setShowSub(false);
        setPayWindow(true);
    }


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

    const videoSources = [
        {
            src: video2,
            type: 'video/mp4',
            size: 2160,
        },
        {
            src: video,
            type: 'video/mp4',
            size: 1080,
        },
        {
            src: video2,
            type: 'video/mp4',
            size: 720,
        },
        {
            src: video2, 
            type: 'video/mp4',
            size: 480,
        },
    ];
    
    const handleChangeQuality = (newQuality) => {
        setCheckQuality(newQuality);
        if (isSubcribe) {
            setQuality(newQuality);
        }

        if (!isSubcribe) {
            if (checkQuality === 2160) {
                setShowSub(true);
            } else {
                setShowSub(false);
                setQuality(newQuality);
            }
        }
    };

    useEffect(() => {
        
        setCheckQuality(720);
        setShowSub(false);
        setCloseSub(false);
        
    }, [closeSub]);

    const plyrProps = {
        
        source: {
            type: 'video',
            sources: videoSources.filter(source => source.size === quality),
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
                options: [2160, 1080, 720, 480],
                forced: true,
                onChange: handleChangeQuality,
            },
        },
        
    }

    return (
        <>
            <Plyr {...plyrProps} />
            {showSub &&    
                <Subscription close={setCloseSub} payWindow={openPayWindow} />         
            }
            {showPayWindow && <PayPalWindow closeWindow={setPayWindow} />}
        </>
    );
}

export default FilmPlayer;