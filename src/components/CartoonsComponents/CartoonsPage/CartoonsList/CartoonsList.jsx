import React, { useEffect, useState } from 'react';
import styles from './CartoonsListStyles.module.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleCartoonInfoPositioning } from './CartoonsListScripts';
import Pagination from './Pagination/Pagination';

const CartoonList = ({ cartoons, setCurrentPage, currentPage }) => {

    const [totalPages, setTotalPages] = useState(9);
    const { category, date, popular } = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     async function fetchTotalPages() {
    //         try {
    //             const response = await axios.get('/movies/pages');
    //             setTotalPages(response.data.totalPages);
    //         } catch (error) {
    //             console.error('Error fetching total pages:', error);
    //         }
    //     }

    //     fetchTotalPages();
    // }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        const categoryUrl = typeof category === 'undefined' ? `category=u` : category;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;

        const newPath = `/cartoons/${categoryUrl}/${dateUrl}/${popularUrl}/${pageNumber}`;
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
            
                {cartoons.map((movie, index) => (
                    
                    <NavLink to={`/cartoon-view/${movie.Genre.split(',')[0].toLowerCase()}/${movie.imdbID}`} className={styles["cartoon-card"]} key={index}>
                        <div className={styles["cartoon-poster"]}>
                            <img src={movie.Poster} alt="" />
                            <div className={styles["question-mark"]}>?</div>
                                <div className={styles["cartoon-info"]}>
                                    <div className={styles["name-rate"]}>
                                        <h1 className={styles["info-title"]}>{movie.Title}</h1>
                                        <div className={styles["info-rate"]}>
                                            <span><FontAwesomeIcon icon={faStar} /> {movie.imdbRating}/10</span>
                                        </div>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p>Release year: {movie.Year}</p>
                                        <p>Country: {movie.Country}</p>
                                        <p>Genre: {movie.Genre}</p>
                                        <p>Actors: {movie.Actors}</p>
                                    </div>
                                    <div className={styles["info-line"]}></div>
                                    <div className={styles["info-description"]}>
                                    <h1>Description</h1>
                                    <p>
                                        {movie.Plot}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["quality"]}>1080p</div>
                        </div>
                        <div className={styles["cartoon-title"]}>{movie.Title}</div>
                    </NavLink>

                ))}

            </div>
            
            <Pagination totalPages={totalPages} setCurrentPage={handlePageChange} currentPage={currentPage} />
        </>
    );
}

export default CartoonList;