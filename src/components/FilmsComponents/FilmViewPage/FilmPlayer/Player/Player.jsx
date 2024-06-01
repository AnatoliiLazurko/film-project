import React, { useEffect, useState } from 'react';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import axios from 'axios';
import { FILM_ENDPOINTS } from '../../../../../constants/filmEndpoints'

const Player = ({ switchPlayer, filmDetails }) => {

    const [sasToken, setSasToken] = useState();

    useEffect(() => {
        
        const fetchSasToken = async () => {
            try {
                const response = await axios.get(`${FILM_ENDPOINTS.getSasToken}?blobName=${filmDetails.fileName}`)

                setSasToken(response.data);
            } catch (error) {
                //console.log('Getting sas token error: ' + error);
            }
        }

        fetchSasToken();
    }, []);

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
            sources: `${filmDetails.fileUri}?${sasToken}`,
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
