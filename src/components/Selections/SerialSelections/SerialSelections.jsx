import React from 'react';
import styles from '../SelectionsStyles.module.css'
import { NavLink } from 'react-router-dom';

const SerialSelections = () => {
    return (
        <>
            <NavLink to={'/selection/top_action_serials'} className={styles["selection-card"]}>
                <img src="https://s3-alpha-sig.figma.com/img/0281/a465/41ac14d23ab781e4f2a1ddf421fe4606?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nv3GzgkPhSoddc5pwclWTKbxLukjXmadNUnwWmh58ZiPEippxARBRwBnGDAChrG45yjGlgj1vy3NNDMxnt--hZXqgq6Dk3lIEsxfTInezvbDspjdOYrGx48DvXh0WoFy9FjMHm476hudld33JS5euLYhkRTZDjaPqSOzISo5V5gIcRwU1k7RJp51O8jqAWlzwT-G55wa4UtjQXX7XGI2J9YSj9yBV5AF2EZhXk~Dwmn8nOgKLz8l6RKbw2U~cAO1jZz4zNd11RYkS8wxlwEftBf7jB32msr8r~artvw4o8XqebrCr5oHLfu2eN7KYxgTmKqPH1SWD8JCF-lSpvO2HA__" alt="Top action movies" />
                <p className={styles["selection-name"]}>Top action serials</p>
            </NavLink>
        </>
    );
}

export default SerialSelections;
