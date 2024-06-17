
//export const ANIME_URL = 'https://localhost:7275';
export const ANIME_URL = 'https://blahofilm.northeurope.cloudapp.azure.com:447';

export const ANIME_ENDPOINTS = {
    anime: `${ANIME_URL}/api/Anime/byfiltersandsorting`,
    animeById: `${ANIME_URL}/api/Anime/byid`,
    animeSelections: `${ANIME_URL}/api/Anime/selections`,

    getSasToken: `${ANIME_URL}/api/Anime/getsas`,

    getComments: `${ANIME_URL}/api/Comments`,
    createComment: `${ANIME_URL}/api/Comments`,
    commentLike: `${ANIME_URL}/api/Comments/like`,
    commentDislike: `${ANIME_URL}/api/Comments/dislike`,
    rateAnime: `${ANIME_URL}/api/Rating`,
    getAnimeParts: `${ANIME_URL}/api/AnimePart/getbyanimeid`,
    getPartById: `${ANIME_URL}/api/AnimePart/getbyid`,

    getAnimeByIds: `${ANIME_URL}/api/Anime/byids`,
    countPages: `${ANIME_URL}/api/Anime/countpagesbyfiltersandsorting`,
    animeByTitle: `${ANIME_URL}/api/Anime/bytitle`,

    getGenres: `${ANIME_URL}/api/Anime/genres`,
};