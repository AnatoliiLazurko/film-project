import React, { useEffect, useRef, useState } from 'react';
import jar from '../../../images/header/logo.png';
import styles from './JarDonateStyles.module.css';
import { NavLink } from 'react-router-dom';

const JarDonate = () => {

    const [isSticky, setIsSticky] = useState(false);
    const stickyRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (stickyRef.current) {
                setIsSticky(window.scrollY + 130 > stickyRef.current.offsetTop);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${styles["jar-donate"]} ${isSticky ? styles["sticky"] : ''}`} ref={stickyRef}>
            <NavLink to={`/donates`}>
                <img src={jar} alt="" />
            </NavLink>
        </div>
    );
}

export default JarDonate;
