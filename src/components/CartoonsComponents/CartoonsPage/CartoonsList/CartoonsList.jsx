import React, { useEffect, useState } from 'react';
import styles from './CartoonsListStyles.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleCartoonInfoPositioning } from './CartoonsListScripts';
import Pagination from './Pagination/Pagination';
import axios from 'axios';

const CartoonList = ({ cartoons, setCurrentPage, currentPage, pageSize }) => {

    const { category, animation, studio, date, popular} = useParams();

    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const [dateFilter, setDateFilter] = useState('');
    const [popularFilter, setPopularFilter] = useState('');

    const categoryFilter = [];
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
        if (category !== 'category=u') {
            categoryFilter.push(category.replace(/_/g, ' '));
        }

        if (studio !== 'studio=u') {
            studioFilter.push(studio.replace(/_/g, ' '));
        }

        async function fetchTotalPages() {
            try {
                const response = await axios.post("https://localhost:7095/api/Films/countpagesbyfiltersandsorting", {
                    Genres: categoryFilter,
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
    }, [category, animation, studio, date, popular]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        const categoryUrl = typeof category === 'undefined' ? `category=u` : category;
        const animationUrl = typeof animation === 'undefined' ? 'animation=u' : animation;
        const studioUrl = typeof studio === 'undefined' ? 'studio=u' : studio;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;

        const newPath = `/cartoons/${categoryUrl}/${animationUrl}/${studioUrl}/${dateUrl}/${popularUrl}/${pageNumber}`;
        navigate(newPath);
    };

    useEffect(() => {
        const handleMouseEnter = (event) => {
            handleCartoonInfoPositioning(event, styles);
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
    }, [cartoons]);

    return (
        <>
            <div className={styles["cartoons-list"]}>
            
                {cartoons.map((cartoon, index) => (
                    
                    <NavLink to={`/cartoon-view/${cartoon.genres[0].name.toLowerCase()}/${cartoon.id}`} className={styles["cartoon-card"]} key={index}>
                        <div className={styles["cartoon-poster"]}>
                            <img src={cartoon.poster ? `data:image/jpeg;base64,${cartoon.poster}` : ''} alt="Poster" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["cartoon-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{cartoon.title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {cartoon.rating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {new Date(cartoon.dateOfPublish).getFullYear()}</p>
                                        <p>Country: {cartoon.country}</p>
                                        <p>Genre: {cartoon.genres.map(genre => genre.name).join(', ')}</p>
                                        <p>Actors: {cartoon.actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {cartoon.description}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>1080p</div>
                        </div>
                        <div className={styles["cartoon-title"]}>{cartoon.title}</div>
                    </NavLink>

                ))}

            </div>
            
            <Pagination totalPages={totalPages} setCurrentPage={handlePageChange} currentPage={currentPage} />
        </>
    );
}

export default CartoonList;