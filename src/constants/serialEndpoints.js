
export const SERIAL_URL = 'https://localhost:7095';
// export const SERIAL_URL = 'https://blahofilm.northeurope.cloudapp.azure.com:444';

export const SERIAL_ENDPOINTS = {
    serials: `${SERIAL_URL}/api/Serials/byfiltersandsorting`,
    serialById: `${SERIAL_URL}/api/Serials/byid`,
    serialSelections: `${SERIAL_URL}/api/Serials/selections`,

    getSasToken: `${SERIAL_URL}/api/Serials/getsas`,

    getComments: `${SERIAL_URL}/api/Comments`,
    createComment: `${SERIAL_URL}/api/Comments`,
    commentLike: `${SERIAL_URL}/api/Comments/like`,
    commentDislike: `${SERIAL_URL}/api/Comments/dislike`,
    rateSerial: `${SERIAL_URL}/api/Rating`,

    getSerialsByIds: `${SERIAL_URL}/api/Serials/byids`,
    countPages: `${SERIAL_URL}/api/Serials/countpagesbyfiltersandsorting`,
    serialsByTitle: `${SERIAL_URL}/api/Serials/bytitle`,
};