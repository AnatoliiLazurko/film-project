import React, { useEffect, useState } from 'react';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { SERIAL_ENDPOINTS } from '../../../../../constants/serialEndpoints';
import axios from 'axios';

const Player = ({ switchPlayer, voiceActing, episodeId, serialDetails, partExists }) => {

    const [partData, setPartData] = useState([]);
    const [sasToken, setSasToken] = useState();
    
    useEffect(() => {      
        const fetchEpisod = async () => {
            try {
                const response = await axios.get(SERIAL_ENDPOINTS.getPartById, {
                    params: {
                        Id: episodeId,
                    }
                });

                setPartData(response.data);
            } catch (error) {
                console.log("Fetch episod error: " + error);
            }
        }
        
        if (partExists) {
            fetchEpisod();
        }
    }, [episodeId]);

    useEffect(() => {    
        const fileName = partExists ? partData.fileName : serialDetails.fileName;

        const fetchSasToken = async () => {
            try {
                const response = await axios.get(`${SERIAL_ENDPOINTS.getSasToken}?blobName=${fileName}`);

                setSasToken(response.data);
            } catch (error) {
                console.log("Fetch sastoken error: " + error);
            }
        }
        
        fetchSasToken();
    }, [partData]);

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
            sources: `${partExists ? partData.fileUri : serialDetails.fileUri}?${sasToken}`,
            poster: `${serialDetails.poster ? `data:image/jpeg;base64,${serialDetails.poster}` : ''}`,
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
                    src: serialDetails.trailerUri,
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
