
export const FILM_URL = 'https://localhost:7095';
//export const FILM_URL = 'https://blahofilm.northeurope.cloudapp.azure.com:444';

export const FILM_ENDPOINTS = {
    films: `${FILM_URL}/api/Films/byfiltersandsorting`,
    filmById: `${FILM_URL}/api/Films/byid`,
    filmSelections: `${FILM_URL}/api/films/selections`,

    getSasToken: `${FILM_URL}/api/Films/getsas`,

    getComments: `${FILM_URL}/api/Comments`,
    createComment: `${FILM_URL}/api/Comments`,
    commentLike: `${FILM_URL}/api/Comments/like`,
    commentDislike: `${FILM_URL}/api/Comments/dislike`,
    rateFilm: `${FILM_URL}/api/Rating`,

    getFilmsByIds: `${FILM_URL}/api/Films/byids`,
    countPages: `${FILM_URL}/api/Films/countpagesbyfiltersandsorting`,
    filmsByTitle: `${FILM_URL}/api/Films/bytitle`,

    getGenres: `${FILM_URL}/api/Films/genres`,
    getStudios: `${FILM_URL}/api/Films/studios`,
};