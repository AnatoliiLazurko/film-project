import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import styles from '../CartoonsPageStyles.module.css';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryFilter = ({ isClean, setIsClean }) => {

    const optionsCategory = ['3D', '2D', 'Clay animation', 'Stop-motion animation'];
    const [selectedFilter, setSelectedFilter] = useState('By Categories');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [urlCategory, setUrlCategory] = useState('');
    const { category, date, popular, page } = useParams();
    const selectRef = useRef(null);
    const navigate = useNavigate();
    

    const handleFilter = (selectedOption) => {
        setSelectedFilter(selectedOption);
        setFilterOpen(false);
        setUrlCategory('');

        const categoryUrl = selectedOption.toLowerCase().replace(/ /g, '_');
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;
        const pageUrl = typeof page === 'undefined' ? 'page=u' : page;

        const newPath = `/cartoons/${categoryUrl}/${dateUrl}/${popularUrl}/${pageUrl}`;
        navigate(newPath);
    }

    useEffect(() => {
        setUrlCategory(category);
    }, [category]);

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
            setSelectedFilter('By Categories');
            setUrlCategory('');
            setIsClean(false);
        }
    }, [isClean, setIsClean]);

    return (

        <div className={styles["select-container"]} onClick={() => setFilterOpen(!isFilterOpen)} ref={selectRef} key={1}>
            <div className={styles["custom-select"]}>
                <span>
                    {urlCategory && urlCategory !== 'category=u' && urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1).replace(/_/g, ' ')}
                    {urlCategory === 'category=u' && selectedFilter}
                    {!urlCategory && selectedFilter}
                </span>
                {!isFilterOpen && <FontAwesomeIcon icon={faCaretRight}/>}
                {isFilterOpen && <FontAwesomeIcon icon={faCaretDown}/>}
            </div>
            {isFilterOpen && 
                <div className={styles["list-options"]}>
                    {optionsCategory.map((option, index) => (
                        <span key={index}>
                            {!urlCategory && 
                                <p
                                    key={index}
                                    className={`${option === selectedFilter ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    onClick={() => handleFilter(option)}
                                >
                                    {option}
                                </p>
                            }
                            {urlCategory && 
                                <p
                                    key={index}
                                    className={`${option.toLowerCase() === urlCategory.replace(/_/g, ' ') ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
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

export default CategoryFilter;
