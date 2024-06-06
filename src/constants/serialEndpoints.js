
export const SERIAL_URL = 'https://localhost:7262';
// export const SERIAL_URL = 'https://blahofilm.northeurope.cloudapp.azure.com:444';

export const SERIAL_ENDPOINTS = {
    serials: `${SERIAL_URL}/api/Series/byfiltersandsorting`,
    serialById: `${SERIAL_URL}/api/Series/byid`,
    serialSelections: `${SERIAL_URL}/api/Series/selections`,

    getSasToken: `${SERIAL_URL}/api/Series/getsas`,

    getComments: `${SERIAL_URL}/api/Comments`,
    createComment: `${SERIAL_URL}/api/Comments`,
    commentLike: `${SERIAL_URL}/api/Comments/like`,
    commentDislike: `${SERIAL_URL}/api/Comments/dislike`,
    rateSerial: `${SERIAL_URL}/api/Rating`,
    getSerialParts: `${SERIAL_URL}/api/SeriesPart/byseriesid`,
    getPartById: `${SERIAL_URL}/api/SeriesPart/byId`,

    getSerialsByIds: `${SERIAL_URL}/api/Series/byids`,
    countPages: `${SERIAL_URL}/api/Series/countpagesbyfiltersandsorting`,
    serialsByTitle: `${SERIAL_URL}/api/Series/bytitle`,

    getGenres: `${SERIAL_URL}/api/Series/genres`,
    getStudios: `${SERIAL_URL}/api/Series/studios`,
};