import React, { useEffect, useState } from 'react';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import axios from 'axios';
import { ANIME_ENDPOINTS } from '../../../../../constants/animeEndpoints';

const Player = ({ switchPlayer, voiceActing, episodeId, animeDetails, partExists }) => {

    const [partData, setPartData] = useState([]);
    const [sasToken, setSasToken] = useState();
    
    useEffect(() => {      
        const fetchEpisod = async () => {
            try {
                const response = await axios.get(ANIME_ENDPOINTS.getPartById, {
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
        const fileName = partExists ? partData.fileName : animeDetails.fileName;

        const fetchSasToken = async () => {
            try {
                const response = await axios.get(`${ANIME_ENDPOINTS.getSasToken}?blobName=${fileName}`);

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
            sources: `${partExists ? partData.fileUri : animeDetails.fileUri}?${sasToken}`,
            poster: `${animeDetails.poster ? `data:image/jpeg;base64,${animeDetails.poster}` : ''}`,
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
                    src: animeDetails.trailerUri,
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
