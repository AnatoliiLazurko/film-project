import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import styles from '../CartoonsPageStyles.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CARTOON_ENDPOINTS } from '../../../../constants/cartoonEndpoints';

const CategoryFilter = ({ isClean, setIsClean, setCurrentPage }) => {

    const [selectedFilter, setSelectedFilter] = useState('By Categories');
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [urlCategory, setUrlCategory] = useState('');
    const { category, animation, studio, date, popular } = useParams();
    const selectRef = useRef(null);
    const navigate = useNavigate();
    
    // CATEGORIES

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(CARTOON_ENDPOINTS.getCategories);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleFilter = (selectedOption) => {
        setSelectedFilter(selectedOption);
        setFilterOpen(false);
        setUrlCategory('');

        const categoryUrl = selectedOption.toLowerCase().replace(/ /g, '_');
        const animationUrl = typeof date === 'undefined' ? `animation=u` : animation;
        const studioUrl = typeof date === 'undefined' ? `studio=u` : studio;
        const dateUrl = typeof date === 'undefined' ? `date=u` : date;
        const popularUrl = typeof popular === 'undefined' ? 'popular=u' : popular;
        const pageUrl = 1;

        const newPath = `/cartoons/${categoryUrl}/${animationUrl}/${studioUrl}/${dateUrl}/${popularUrl}/${pageUrl}`;
        setCurrentPage(1);
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
                    {categories.map((option, index) => (
                        <span key={index}>
                            {!urlCategory && 
                                <p
                                    key={index}
                                    className={`${option.name === selectedFilter ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
                                    onClick={() => handleFilter(option.name)}
                                >
                                    {option.name}
                                </p>
                            }
                            {urlCategory && 
                                <p
                                    key={index}
                                    className={`${option.name.toLowerCase() === urlCategory.replace(/_/g, ' ') ? `${styles["selected-option"]}` : `${styles["select-option"]}`}`}
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

export default CategoryFilter;
