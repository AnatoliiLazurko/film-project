import React, { useEffect, useState } from 'react';
import styles from './ProfileStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear} from '@fortawesome/free-solid-svg-icons';
import BrowsingHistory from './BrowsingHistory/BrowsingHistory';
import Bookmarks from './Bookmarks/Bookmarks';
import { NavLink } from 'react-router-dom';
import noneUserAvatar from '../../images/profile/user_avatar.jpg'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Profile = () => {

    const { isAuth, user } = useAuth();

    const [historyNumber, setHistoryNumber] = useState(0);
    const [bookedNumber, setBookedNumber] = useState(0);
    const [profileContent, setProfileContent] = useState('history');

    const handleBrowsingHistory = () => {
        setProfileContent('history');
    }
    const handleBookmarks = () => {
        setProfileContent('bookmarks');
    }

    const [sortHistory, setSortHistory] = useState('recent');
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [historyList, setHistoryList] = useState([]);
    const [historyFilms, setHistoryFilms] = useState([]);
    const [historySerials, setHistorySerials] = useState([]);
    const [historyCartoons, setHistoryCartoons] = useState([]);
    const [historyAnime, setHistoryAnime] = useState([]);

    const fetchHistory = async () => {
        try {
            const response = await axios.get(`https://localhost:7176/api/History`, { withCredentials: true });
            const historyArray = response.data;
            setHistoryNumber(historyArray.length);

            const filteredArray = filterHistory(historyArray);

            const filmsIds = filteredArray
                .filter(item => item.mediaTypeId === 1)
                .map(item => item.mediaId);

            const filmsResponse = await axios.post('https://localhost:7095/api/Films/byids', filmsIds, { withCredentials: true });

            if (filmsResponse.data) {
                filmsResponse.data.forEach(film => {
                    film.mediaType = "film";
                });
            }

            setHistoryFilms(filmsResponse.data);

            // const serialsIds = filteredArray
            //     .filter(item => item.mediaTypeId === 2)
            //     .map(item => item.mediaId);

            // const serialsResponse = await axios.post('https://localhost:7095/api/Serials/byids', serialsIds, { withCredentials: true });

            // if (serialsResponse.data) {
            //     serialsResponse.data.forEach(film => {
            //         film.mediaType = "serial";
            //     });
            // }

            //setHistorySerials(serialsResponse.data);

            // const cartoonsIds = filteredArray
            //     .filter(item => item.mediaTypeId === 3)
            //     .map(item => item.mediaId);

            // const cartoonsResponse = await axios.post('https://localhost:7095/api/Cartoons/byids', cartoonsIds, { withCredentials: true });

            // if (cartoonsResponse.data) {
            //     cartoonsResponse.data.forEach(film => {
            //         film.mediaType = "cartoon";
            //     });
            // }

            //setHistoryCartoons(cartoonsResponse.data);

            // const animeIds = filteredArray
            //     .filter(item => item.mediaTypeId === 4)
            //     .map(item => item.mediaId);

            // const animeResponse = await axios.post('https://localhost:7095/api/Anime/byids', animeIds, { withCredentials: true });

            // if (animeResponse.data) {
            //     animeResponse.data.forEach(film => {
            //         film.mediaType = "anime";
            //     });
            // }

            //setHistoryAnime(animeResponse.data);
        } catch (error) {
            console.error('Getting history list arror: ' + error);
        } finally {
            setLoadingHistory(false);
        }
    };

    const filterHistory = (data) => {
        if (sortHistory === 'recent') {
            const currentDate = new Date();
            return data.filter(item => {
                const addedDate = new Date(item.date);
                const diffTime = Math.abs(currentDate - addedDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
            });
        }
        if (sortHistory === 'week') {
            const currentDate = new Date();
            return data.filter(item => {
                const addedDate = new Date(item.date);
                const diffTime = Math.abs(currentDate - addedDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 7 && diffDays <= 30;
            });
        }
        if (sortHistory === 'month') {
            const currentDate = new Date();
            return data.filter(item => {
                const addedDate = new Date(item.date);
                const diffTime = Math.abs(currentDate - addedDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 30;
            });
        }
    }

    useEffect(() => {
        const newHistoryList = [...historyFilms, ...historySerials, ...historyCartoons, ...historyAnime];
        setHistoryList(newHistoryList);         
    }, [historyFilms, historySerials, historyCartoons, historyAnime]);

    const [bookedList, setBookedList] = useState([]);
    const [bookedFilms, setBookedFilms] = useState([]);
    const [bookedSerials, setBookedSerials] = useState([]);
    const [bookedCartoons, setBookedCartoons] = useState([]);
    const [bookedAnime, setBookedAnime] = useState([]);
    const [loadingBooked, setLoadingBooked] = useState(true);

    const fetchBooked = async () => {
        try {
            const response = await axios.get(`https://localhost:7176/api/BookMarks`, { withCredentials: true });
            const bookedArray = response.data;
            setBookedNumber(bookedArray.length);

            const filmsIds = bookedArray
                .filter(item => item.mediaTypeId === 1)
                .map(item => item.mediaId);

            const filmsResponse = await axios.post('https://localhost:7095/api/Films/byids', filmsIds, { withCredentials: true });

            if (filmsResponse.data) {
                filmsResponse.data.forEach(film => {
                    film.mediaType = "film";
                });
            }

            setBookedFilms(filmsResponse.data);

            // const serialsIds = bookedArray
            //     .filter(item => item.mediaTypeId === 2)
            //     .map(item => item.mediaId);

            // const serialsResponse = await axios.post('https://localhost:7095/api/Serials/byids', serialsIds, { withCredentials: true });

            // if (serialsResponse.data) {
            //     serialsResponse.data.forEach(film => {
            //         film.mediaType = "serial";
            //     });
            // }

            // setBookedSerials(serialsResponse.data);

            // const cartoonsIds = bookedArray
            //     .filter(item => item.mediaTypeId === 3)
            //     .map(item => item.mediaId);

            // const cartoonsResponse = await axios.post('https://localhost:7095/api/Cartoons/byids', cartoonsIds, { withCredentials: true });

            // if (cartoonsResponse.data) {
            //     cartoonsResponse.data.forEach(film => {
            //         film.mediaType = "cartoon";
            //     });
            // }

            // setBookedCartoons(cartoonsResponse.data);

            // const animeIds = bookedArray
            //     .filter(item => item.mediaTypeId === 4)
            //     .map(item => item.mediaId);

            // const animeResponse = await axios.post('https://localhost:7095/api/Anime/byids', animeIds, { withCredentials: true });

            // if (animeResponse.data) {
            //     animeResponse.data.forEach(film => {
            //         film.mediaType = "anime";
            //     });
            // }

            // setBookedAnime(animeResponse.data);
        } catch (error) {
            //console.error('Getting booked list arrero: ' + error);
        } finally {
            setLoadingBooked(false);
        }
    };

    useEffect(() => {
        const newBookedList = [...bookedFilms, ...bookedSerials, ...bookedCartoons, ...bookedAnime];
        setBookedList(newBookedList);         
    }, [bookedFilms, bookedSerials, bookedCartoons, bookedAnime]);

    useEffect(() => {
        fetchHistory();
    }, [sortHistory]);

    useEffect(() => {
        fetchBooked();
    }, []);

    return (
        <div className={styles["profile-page"]}>
            
            <div className={styles["user-container"]}>
                {isAuth &&
                    <>
                        {user.avatar && <img src={`data:image/jpeg;base64,${user.avatar}`} alt="User Avatar" />}
                        {!user.avatar && <img src={noneUserAvatar} alt="User Avatar" />}
                    </>
                }
                {!isAuth && <img src={noneUserAvatar} alt="User Avatar" />}
                <div className={styles["profile-info"]}>
                    <div className={styles["top-content"]}>
                        <p>{user.userName}</p>
                        <NavLink to={'/settings/profile'}><FontAwesomeIcon icon={faGear} /></NavLink>
                    </div>
                    <div className={styles["bottom-content"]}>
                        <p>Viewed: {historyNumber}</p>
                        <p>Bookmarked: {bookedNumber}</p>
                        {/* <p>Comments left: 146</p> */}
                    </div>
                </div>
            </div>
            
            <div className={styles["btns-conatiner"]}>
                <div className={`${profileContent === 'history' ? styles["active"] : ''}`} onClick={handleBrowsingHistory}>Browsing history</div>
                <div className={`${profileContent === 'bookmarks' ? styles["active"] : ''}`} onClick={handleBookmarks}>Bookmarks</div>
            </div>

            {profileContent === 'history' &&
                <BrowsingHistory
                    historyList={historyList}
                    loading={loadingHistory}
                    sortHistory={sortHistory}
                    setSortHistory={setSortHistory}
                />
            
            }
            {profileContent === 'bookmarks' && <Bookmarks bookedList={bookedList} loading={loadingBooked} />}

        </div>
    );
}

export default Profile;