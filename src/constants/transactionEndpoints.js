
export const TRANSACTION_URL = 'https://localhost:7288';
// export const TRANSACTION_URL = 'https://blahofilm.northeurope.cloudapp.azure.com:444';

export const TRANSACTION_ENDPOINTS = {
    getFundraising: `${TRANSACTION_URL}/api/Fundraising`,
    countPages: `${TRANSACTION_URL}/api/Fundraising/countpages`,

    isSubscribe: `${TRANSACTION_URL}/api/Subscription/subscriptions`,
    subscribe: `${TRANSACTION_URL}/api/Subscription/subscribe`,
};