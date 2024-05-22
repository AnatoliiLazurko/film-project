import React, { useState } from 'react';
import styles from '../HeaderStyles.module.css';
import UnderDevelopment from '../../Technicall/Alert/UnderDevelopment';

const Language = () => {

    const [language, setLanguage] = useState('English');
    const [isUnderDev, setIsUnderDev] = useState(false);

    const toggleAlert = () => {
        setIsUnderDev(true);
    }

    return (
        <>
            <div className={styles["dropdown-lenguage"]}>
                {language === 'English' && <span>Eng</span>}
                {language === 'Ukrainian' && <span>Ukr</span>}
                <div className={styles["dropdown-lenguage-content"]}>
                    <span onClick={() => {setLanguage('English')}}>English</span>
                    <span onClick={() => {toggleAlert()}}>Ukrainian</span>
                </div>
            </div>
            
            {isUnderDev && <UnderDevelopment closeAlert={setIsUnderDev} />}
        </>   
    );
}

export default Language;
