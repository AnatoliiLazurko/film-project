
export const CARTOON_URL = 'https://localhost:7095';
// export const CARTOON_URL = 'https://blahofilm.northeurope.cloudapp.azure.com:444';

export const CARTOON_ENDPOINTS = {
    cartoons: `${CARTOON_URL}/api/Cartoons/byfiltersandsorting`,
    cartoonById: `${CARTOON_URL}/api/v/byid`,
    cartoonSelections: `${CARTOON_URL}/api/Cartoons/selections`,

    getSasToken: `${CARTOON_URL}/api/Cartoons/getsas`,

    getComments: `${CARTOON_URL}/api/Comments`,
    createComment: `${CARTOON_URL}/api/Comments`,
    commentLike: `${CARTOON_URL}/api/Comments/like`,
    commentDislike: `${CARTOON_URL}/api/Comments/dislike`,
    rateCartoon: `${CARTOON_URL}/api/Rating`,

    getCartoonsByIds: `${CARTOON_URL}/api/Cartoons/byids`,
    countPages: `${CARTOON_URL}/api/Cartoons/countpagesbyfiltersandsorting`,
    cartoonsByTitle: `${CARTOON_URL}/api/Cartoons/bytitle`,
};