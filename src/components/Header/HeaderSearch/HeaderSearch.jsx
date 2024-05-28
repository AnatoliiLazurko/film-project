import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import styles from '../HeaderStyles.module.css';
import { useNavigate } from 'react-router-dom';

const HeaderSearch = () => {

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const toggleVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/search/${inputValue}`);
        setIsSearchVisible(false);
        setInputValue('');
    }

    return (
        <div className={styles["search"]}>
            {!isSearchVisible && <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleVisibility} />}
            {isSearchVisible && 
                <div className={styles["search-field"]}>
                    <div className={styles["search-btn"]} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input className={styles["search-input"]} type="text" placeholder='Search' value={inputValue} onChange={handleChange}/>
                </div>
            }
        </div>
    );
}

export default HeaderSearch;
