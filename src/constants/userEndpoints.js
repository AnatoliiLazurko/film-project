
//export const USER_URL = 'https://localhost:7176';
export const USER_URL = 'https://blahofilm.northeurope.cloudapp.azure.com:443';

export const USER_ENDPOINTS = {
    login: `${USER_URL}/api/Auth/authenticate`,
    googleAuth: `${USER_URL}/api/Auth/google`,
    register: `${USER_URL}/api/Auth/register`,
    refreshToken: `${USER_URL}/api/Auth/refreshjwt`,
    logout: `${USER_URL}/api/Auth/logout`,
    getUserById: `${USER_URL}/api/Users/byid`,
    getUsersByIds: `${USER_URL}/api/Users/byids`,

    isBooked: `${USER_URL}/api/BookMarks`,
    makeBook: `${USER_URL}/api/BookMarks`,
    addHistory: `${USER_URL}/api/History`,
    getHistory: `${USER_URL}/api/History`,

    changeUserName: `${USER_URL}/api/Users/changenusername`,
    changeVatar: `${USER_URL}/api/users/avatar`,
    sendEmailChange: `${USER_URL}/api/Users/sendemailchangeemailaddress`,
    sendPasswordChange: `${USER_URL}/api/Users/sendemailchangepassword`,
    changeEmail: `${USER_URL}/api/Users/changeemail`,
    emailConfirm: `${USER_URL}/api/Auth/emailconfirm`,
    migrateUser: `${USER_URL}/api/Auth/migrateuser`,
    changePassword: `${USER_URL}/api/Users/changepassword`,
};