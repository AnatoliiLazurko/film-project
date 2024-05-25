import React, { useEffect, useState } from 'react';
import styles from './SerialsListStyles.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleSerialInfoPositioning } from './SerialsListScripts';
import Pagination from './Pagination/Pagination';
import axios from 'axios';

const SerialsList = ({ serials, setCurrentPage, currentPage, pageSize }) => {

    const { genre, studio, date, popular} = useParams();

    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const [dateFilter, setDateFilter] = useState('');
    const [popularFilter, setPopularFilter] = useState('');

    const genreFilter = [];
    const studioFilter = [];

    useEffect(() => {
        if (date === 'from_old_to_new') {
            setDateFilter('asc');
        } else if (date === 'from_new_to_old') {
            setDateFilter('desc');
        } else {
            setDateFilter('');
        }
    }, [date]);

    useEffect(() => {   
        if (popular === 'by_rating') {
            setPopularFilter('rating');
        } else if (popular === 'by_discussion') {
            setPopularFilter('discussing');
        } else {
            setPopularFilter('');
        }
    }, [popular]);

    useEffect(() => {
        if (genre !== 'genre=u') {
            genreFilter.push(genre.replace(/_/g, ' '));
        }

        if (studio !== 'studio=u') {
            studioFilter.push(studio.replace(/_/g, ' '));
        }

        async function fetchTotalPages() {
            try {
                const response = await axios.post("https://localhost:7095/api/Films/countpagesbyfiltersandsorting", {
                    Genres: genreFilter,
                    Studios: studioFilter
                }, {
                    params: {    
                        pageSize: pageSize,
                        sortByDate: dateFilter,
                        sortByPopularity: popularFilter,
                    }
                });
                setTotalPages(response.data);
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        }

        fetchTotalPages();
    }, [genre, studio, date, popular]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        const genreUrl = typeof genre === 'undefined' ? `genre=u` : genre;
        const studioUrl = typeof studio === 'undefined' ? 'studio=u' : studio;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;
        const newPath = `/serials/${genreUrl}/${studioUrl}/${dateUrl}/${popularUrl}/${pageNumber}`;
        navigate(newPath);
    };

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleSerialInfoPositioning(event, styles);
        };

        const questionMarks = document.querySelectorAll(`.${styles['question-mark']}`);
        questionMarks.forEach((questionMark) => {
            questionMark.addEventListener('mouseenter', handleMouseEnter);
        });

        return () => {
            questionMarks.forEach((questionMark) => {
                questionMark.removeEventListener('mouseenter', handleMouseEnter);
            });
        };
    }, [serials]);

    return (
        <>
            <div className={styles["serials-list"]}>
            
                {serials.map((serial, index) => (
                    
                    <NavLink to={`/serial-view/${serial.genres[0].name.toLowerCase()}/${serial.id}`} className={styles["serial-card"]} key={index}>
                        <div className={styles["serial-poster"]}>
                            <img src={serial.poster ? `data:image/jpeg;base64,${serial.poster}` : ''} alt="Poster" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["serial-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{serial.title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {serial.rating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {new Date(serial.dateOfPublish).getFullYear()}</p>
                                        <p>Country: {serial.country}</p>
                                        <p>Genre: {serial.genres.map(genre => genre.name).join(', ')}</p>
                                        <p>Actors: {serial.actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {serial.description}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>{serial.quality}p</div>
                        </div>
                        <div className={styles["serial-title"]}>{serial.title}</div>
                    </NavLink>

                ))}

            </div>
            
            <Pagination totalPages={totalPages} setCurrentPage={handlePageChange} currentPage={currentPage} />
        </>
    );
}

export default SerialsList;