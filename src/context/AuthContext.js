import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import RequestError from '../components/Technicall/Error/RequestError';
import EmailVerification from "../components/Technicall/Email/EmailVerification";
import Spinner from "../components/Technicall/Spinner/Spinner";

const initialState = {
    isAuth: false,
    user: null,
};

const initiaLoading = {
    status: null
};

const loadingReducer = (state, { type, payload }) => {
    switch (type) {
        case 'LOADING':
            return {
                ...state,
                status: 'loading'
            }
        case 'LOADED':
            return {
                ...state,
                status: 'loaded'
            }
    
        default:
            return state
    }
}

const authReducer = (state, {type, payload}) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth: true,
                user: payload.user,
                status: true
            }
        
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                user: null,
                status: null
            }
    
        default:
            return state;
    }
}

const AuthContext = createContext();
export const LoadingContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [stateLoading, dispatchLoading] = useReducer(loadingReducer, initiaLoading);

    const [cookies, setCookie, removeCookie] = useCookies(['authenticated']);
    const [cookiesInfo] = useCookies(['authenticated']);

    const [error, setError] = useState(null);
    const [isEmailVerifi, setEmailVerifi] = useState(false);

    const login = async ({ email, password }) => {
        dispatchLoading({ type: 'LOADING' })
        try {
            await axios.post('https://localhost:7176/api/Auth/authenticate', { email, password }, {
                    withCredentials: true
                }
            );

            removeCookie('authenticated');
            setCookie('authenticated', true, { path: '/', expires: new Date(Date.now() + 15 * 60 * 1000) });

            await getUser();
        }
        catch (error) { 
            //console.log('Login error:' + error);
            setError(error.response.data);
            setTimeout(() => {
                setError(null);
            }, 6000);
        }
        dispatchLoading({ type: 'LOADED' })
    }

    const register = async ({ email, password }) => {
        dispatchLoading({ type: 'LOADING' })
        try {
            await axios.post('https://localhost:7176/api/Auth/register', { email, password });

            setEmailVerifi(true);
        }   
        catch (error) {
            //console.log('Register error:' + error.response.data);
            setError(error.response.data);
            setTimeout(() => {
                setError(null);
            }, 6000);
        }
        dispatchLoading({ type: 'LOADED' })
    }

    const authWithGoogle = async (googleToken) => {
        dispatchLoading({ type: 'LOADING' })
        try {
            await axios.post('https://localhost:7176/api/Auth/google', { token: googleToken }, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );
            
            removeCookie('authenticated');
            setCookie('authenticated', true, { path: '/', expires: new Date(Date.now() + 15 * 60 * 1000) });

            await getUser();
        }
        catch (error) { 
            //console.log('Login with Google error:' + error);
            setError(error.response.data);
            setTimeout(() => {
                setError(null);
            }, 6000);
        }
        dispatchLoading({ type: 'LOADED' })
    }

    const logout = async () => {
        dispatchLoading({ type: 'LOADING' })
        try {
            await axios.delete('https://localhost:7176/api/Auth/logout', { withCredentials: true });

            removeCookie('authenticated');

            dispatch({
                type: 'LOGOUT'
            });
        }
        catch (error) {
            console.log('Logout error: ' + error);
        }
        dispatchLoading({ type: 'LOADED' })
    }

    const getUser = async () => {
        dispatchLoading({ type: 'LOADING' })

        //console.log(cookiesInfo.authenticated);

        if (cookiesInfo.authenticated) {
            try {
                const res = await axios.get('https://localhost:7176/api/Users/byid', { withCredentials: true });

                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user: res.data
                    }
                });
            }
            catch (error) {
                console.log('Get user error: ' + error);
                setError(error.response.data);
                setTimeout(() => {
                    setError(null);
                }, 6000);
            }
        }
        else {
            //console.log('Not authenticated!');
        }
        dispatchLoading({ type: 'LOADED' })
    }

    const getUserInfo = async () => {
        if (!state.user) {
            await getUser();
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [state, cookiesInfo.authenticated]);

    useEffect(() => {
        const tokenRefreshInterval = setInterval(() => {
            refreshJwtToken();
        }, 14 * 60 * 1000);

        return () => clearInterval(tokenRefreshInterval);
    }, [state.user]);

    const refreshJwtToken = async () => {
        try {
            await axios.put('https://localhost:7176/api/Auth/refreshjwt', null, { withCredentials: true });

            removeCookie('authenticated');
            setCookie('authenticated', true, { path: '/', expires: new Date(Date.now() + 15 * 60 * 1000) });

        } catch (error) {
            console.error('JWT токен не оновлено:', error);
        }
    };

    return <AuthContext.Provider value={{...state, login, register, authWithGoogle, logout}}>
        <LoadingContext.Provider value={{ ...stateLoading }}>
            {stateLoading.status === 'loading' && <Spinner />}
            {isEmailVerifi && <EmailVerification closeModal={setEmailVerifi} />}
            {error && <RequestError errorMessage={error} />}
            {children}
        </LoadingContext.Provider>
    </AuthContext.Provider>;
}

export default AuthContext;