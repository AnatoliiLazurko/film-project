import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import styles from '../SerialsPageStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const DateFilter = ({ isClean, setIsClean }) => {

    const optionsDate = ['From old to new', 'From new to old'];
    const [selectedFilter, setSelectedFilter] = useState('By date');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [urlDate, setUrlDate] = useState('');
    const selectRef = useRef(null);
    const { genre, date, popular } = useParams();
    const navigate = useNavigate();
    
    const handleFilter = (selectedOption) => {
        setSelectedFilter(selectedOption);
        setFilterOpen(false);
        setUrlDate('');

        const dateUrl = selectedOption.toLowerCase().replace(/ /g, '_');
        const genreUrl = typeof genre === 'undefined' ? `genre=u` : genre;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;

        const newPath = `/serials/${genreUrl}/${dateUrl}/${popularUrl}`;
        navigate(newPath);
    }

    useEffect(() => {
        setUrlDate(date);
    }, [date]);

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
            setSelectedFilter('By date');
            setUrlDate('');
            setIsClean(false);
        }
    }, [isClean, setIsClean]);

    return (

        <div className={styles["select-container"]} onClick={() => setFilterOpen(!isFilterOpen)} ref={selectRef}>
            <div className={styles["custom-select"]}>
                <span>
                    {urlDate && urlDate !== 'date=u' && urlDate.charAt(0).toUpperCase() + urlDate.slice(1).replace(/_/g, ' ')}
                    {urlDate === 'date=u' && selectedFilter}
                    {!urlDate && selectedFilter}
                </span>
                {!isFilterOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                {isFilterOpen && <FontAwesomeIcon icon={faCaretDown}/>}
            </div>
            {isFilterOpen && 
                <div className={styles["list-options"]}>
                    {optionsDate.map((option, index) => (
                        <span key={index}>
                            {!urlDate &&
                                <p
                                    key={index}
                                    className={`${option === selectedFilter ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    onClick={() => handleFilter(option)}
                                >
                                    {option}
                                </p>
                            }
                            {urlDate && 
                                <p
                                    key={index}
                                    className={`${option.toLowerCase() === urlDate.replace(/_/g, ' ') ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
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

export default DateFilter;