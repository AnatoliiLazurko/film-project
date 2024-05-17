import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import styles from '../FilmsPageStyles.module.css';
import { useParams, useNavigate } from 'react-router-dom';

const GenreFilter = ({ isClean, setIsClean }) => {

    const optionsGenre = ['Action', 'Crime', 'Family'];
    const [selectedFilter, setSelectedFilter] = useState('By genres');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [urlGenre, setUrlGenre] = useState('');
    const { genre, date, popular, page } = useParams();
    const selectRef = useRef(null);
    const navigate = useNavigate();
    

    const handleFilter = (selectedOption) => {
        setSelectedFilter(selectedOption);
        setFilterOpen(false);
        setUrlGenre('');

        const genreUrl = selectedOption.toLowerCase().replace(/ /g, '_');
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;
        const pageUrl = typeof page === 'undefined' ? 'page=u' : page;

        const newPath = `/films/${genreUrl}/${dateUrl}/${popularUrl}/${pageUrl}`;
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
                    {urlGenre && urlGenre !== 'genre=u' && urlGenre.charAt(0).toUpperCase() + urlGenre.slice(1).replace(/_/g, ' ')}
                    {urlGenre === 'genre=u' && selectedFilter}
                    {!urlGenre && selectedFilter}
                </span>
                {!isFilterOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                {isFilterOpen && <FontAwesomeIcon icon={faCaretDown}/>}
            </div>
            {isFilterOpen && 
                <div className={styles["list-options"]}>
                    {optionsGenre.map((option, index) => (
                        <span key={index}>
                            {!urlGenre && 
                                <p
                                    key={index}
                                    className={`${option === selectedFilter ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    onClick={() => handleFilter(option)}
                                >
                                    {option}
                                </p>
                            }
                            {urlGenre && 
                                <p
                                    key={index}
                                    className={`${option.toLowerCase() === urlGenre.replace(/_/g, ' ') ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    onClick={() => handleFilter(option)}
                                >
                                    {option}
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
