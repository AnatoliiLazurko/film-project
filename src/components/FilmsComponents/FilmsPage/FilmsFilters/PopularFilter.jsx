import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import styles from '../FilmsPageStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const PopularFilter = ({ isClean, setIsClean }) => {

    const optionsPopular = ['By views', 'By rating', 'By discussion'];
    const [selectedFilter, setSelectedFilter] = useState('By popularity');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const selectRef = useRef(null);
    const [urlPopular, setUrlPopular] = useState('');
    const { genre, date, popular } = useParams();
    const navigate = useNavigate();
    
    const handleFilter = (selectedOption) => {
        setSelectedFilter(selectedOption);
        setFilterOpen(false);
        setUrlPopular('');

        const popularUrl = selectedOption.toLowerCase().replace(/ /g, '_');
        const genreUrl = typeof genre === 'undefined' ? `genre=u` : genre;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;

        const newPath = `/films/${genreUrl}/${dateUrl}/${popularUrl}`;
        navigate(newPath);
    }

    useEffect(() => {
        setUrlPopular(popular);
    }, [popular]);

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
            setSelectedFilter('By popularity');
            setUrlPopular('');
            setIsClean(false);
        }
    }, [isClean, setIsClean]);

    return (

        <div className={styles["select-container"]} onClick={() => setFilterOpen(!isFilterOpen)} ref={selectRef}>
            <div className={styles["custom-select"]}>
                <span>
                    {urlPopular && urlPopular !== 'popular=u' && urlPopular.charAt(0).toUpperCase() + urlPopular.slice(1).replace(/_/g, ' ')}
                    {urlPopular === 'popular=u' && selectedFilter}
                    {!urlPopular && selectedFilter}
                </span>
                {!isFilterOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                {isFilterOpen && <FontAwesomeIcon icon={faCaretDown}/>}
            </div>
            {isFilterOpen && 
                <div className={styles["list-options"]}>
                    {optionsPopular.map((option, index) => (
                        <span key={index}>
                            {!urlPopular &&
                                <p
                                    key={index}
                                    className={`${option === selectedFilter ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    onClick={() => handleFilter(option)}
                                >
                                    {option}
                                </p>
                            }
                            {urlPopular && 
                                <p
                                    key={index}
                                    className={`${option.toLowerCase() === urlPopular.replace(/_/g, ' ') ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
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

export default PopularFilter;
