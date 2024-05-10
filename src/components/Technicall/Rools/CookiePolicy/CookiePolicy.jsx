import React from 'react';
import styles from '../RoolsStyles.module.css';

const CookiePolicy = () => {
    return (
        <div>
            <h1 className={styles["title"]}>Cookie Policy</h1>

            <p className={styles["date-start"]}>Effective date May 09, 2024</p>

            <div className={styles["block-info"]}>
                <p>1. What are Cookies and Other Tracking Technologies?</p>
                <ul>
                    <li>
                        A cookie is a small text file that can be stored on and accessed from
                        your device when you visit one of our Sites, to the extent you agree.
                        The other tracking technologies work similarly to cookies and place
                        small data files on your devices or monitor your website activity to
                        enable us to collect information about how you use our Sites. This allows
                        our Sites to recognize your device from those of other users of the Sites.
                        The information provided below about cookies also applies to these other tracking technologies.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>2. How do our sites and applications use cookies and other tracking technologies?</p>
                <ul>
                    <li>
                        BlahoFilm uses cookies and other tracking technologies to identify you
                        and your interests, to remember your preferences, and to track your
                        use of our sites. We also use cookies and other tracking technologies
                        to control access to certain content on our sites, protect the sites,
                        and to process any requests that you make to us.
                    </li>
                    <li>
                        To administer our sites and for research purposes, BlahoFilm also has
                        contracted with third-party service providers to track and analyze statistical
                        usage and volume information from our site users. These third-party service
                        providers use persistent cookies to help us to improve the user experience,
                        manage our site content, and analyze how users navigate and utilize the sites.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>3. First and Third-party Cookies</p>
                <ul>
                    <li>
                        "First party Cookies" are cookies that belong to us and which we place on
                        your device. "Third-party cookies" are cookies that another party places
                        on your device through our site. BlahoFilm may contract with third-party
                        service providers to send e-mails to users who have provided us with their
                        contact information. To help measure and improve the effectiveness of our
                        e-mail communications, and/or to determine whether messages have been opened
                        and links clicked on, the third-party service providers may place cookies
                        on the devices of these users.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>4. How do I refuse or withdraw my consent to the use of Cookies?</p>
                <ul>
                    <li>
                        If you do not want Cookies to be dropped on your device, you can adjust
                        the setting of your Internet browser to reject the setting of all or
                        some Cookies and to alert you when a Cookie is placed on your device.
                        For further information about how to do so, please refer to your browser
                        'help' / 'tool' or 'edit' section; Please note that if your browser setting
                        is already setup to block all Cookies (including strictly necessary Cookies)
                        you may not be able to access or use all or parts or functionalities of our Sites.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>5. Contact us</p>
                <ul>
                    <li>
                        BlahoFilm shall timely address and attempt to rectify any discrepancies and
                        grievances of our users pertaining to the personal information furnished by them.
                    </li>
                    <li>
                        BlahoFilm shall timely address and attempt to rectify any discrepancies and
                        grievances of our users pertaining to the personal information furnished by them.
                        Subscriber may contact BlahoFilm with any questions or comments about this
                        Privacy Policy and may address such queries and / or comments to <span>blahofilm@gmail.com</span>.
                    </li>
                    <li>
                        If you have any queries or complaints regarding the collecting, processing,
                        transfer of personal data/information please do contact us online through <span>blahofilm@gmail.com</span>.
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default CookiePolicy;
