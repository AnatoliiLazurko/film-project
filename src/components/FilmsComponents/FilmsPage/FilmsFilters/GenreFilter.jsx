import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import styles from '../FilmsPageStyles.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FILM_ENDPOINTS } from '../../../../constants/filmEndpoints';

const GenreFilter = ({ isClean, setIsClean, setCurrentPage }) => {

    const [selectedFilter, setSelectedFilter] = useState('By genres');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [urlGenre, setUrlGenre] = useState('');
    const { genre, studio, date, popular } = useParams();
    const selectRef = useRef(null);
    const navigate = useNavigate();

    // GENRES

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(FILM_ENDPOINTS.getGenres);
                setGenres(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);
    
    const handleFilter = (selectedOption) => {
        setSelectedFilter(selectedOption);
        setFilterOpen(false);
        setUrlGenre('');

        const genreUrl = selectedOption.toLowerCase().replace(/ /g, '_');
        const studioUrl = typeof studio === 'undefined' ? `studio=u` : studio;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;
        const pageUrl = 1;

        const newPath = `/films/${genreUrl}/${studioUrl}/${dateUrl}/${popularUrl}/${pageUrl}`;
        setCurrentPage(1);
        navigate(newPath);
    }

    useEffect(() => {
        setUrlGenre(genre);
    }, [genre]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setFilterOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isClean) {
            setSelectedFilter('By genres');
            setUrlGenre('');
            setIsClean(false);
        }
    }, [isClean, setIsClean]);

    return (

        <div className={styles["select-container"]} onClick={() => setFilterOpen(!isFilterOpen)} ref={selectRef} key={1}>
            <div className={styles["custom-select"]}>
                <span>
                    {urlGenre && urlGenre !== 'genre=u' && urlGenre.charAt(0).toUpperCase().replace(/_/g, ' ') + urlGenre.slice(1).replace(/_/g, ' ')}
                    {urlGenre === 'genre=u' && selectedFilter}
                    {!urlGenre && selectedFilter}
                </span>
                {!isFilterOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                {isFilterOpen && <FontAwesomeIcon icon={faCaretDown}/>}
            </div>
            {isFilterOpen && 
                <div className={styles["list-options"]}>
                    {genres.map((option, index) => (
                        <span key={index}>
                            {!urlGenre && 
                                <p
                                    key={index}
                                    className={`${option.name === selectedFilter ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    onClick={() => handleFilter(option.name)}
                                >
                                    {option.name}
                                </p>
                            }
                            {urlGenre && 
                                <p
                                    key={index}
                                    className={`${option.name.toLowerCase() === urlGenre.replace(/_/g, ' ') ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    onClick={() => handleFilter(option.name)}
                                >
                                    {option.name}
                                </p>
                            }
                        </span>
                        
                    ))}
                </div>
            }
        </div>
    );
}

export default GenreFilter;
