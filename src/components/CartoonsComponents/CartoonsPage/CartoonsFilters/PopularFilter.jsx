import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import styles from '../CartoonsPageStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const PopularFilter = ({ isClean, setIsClean, setCurrentPage }) => {

    const optionsPopular = ['By rating', 'By discussion'];
    const [selectedFilter, setSelectedFilter] = useState('By popularity');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const selectRef = useRef(null);
    const [urlPopular, setUrlPopular] = useState('');
    const { category, animation, studio, date, popular } = useParams();
    const navigate = useNavigate();
    
    const handleFilter = (selectedOption) => {
        setSelectedFilter(selectedOption);
        setFilterOpen(false);
        setUrlPopular('');

        const popularUrl = selectedOption.toLowerCase().replace(/ /g, '_');
        const categoryUrl = typeof category === 'undefined' ? `category=u` : category;
        const animationUrl = typeof date === 'undefined' ? `animation=u` : animation;
        const studioUrl = typeof studio === 'undefined' ? `studio=u` : studio;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const pageUrl = 1;

        const newPath = `/cartoons/${categoryUrl}/${animationUrl}/${studioUrl}/${dateUrl}/${popularUrl}/${pageUrl}`;
        setCurrentPage(1);
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
