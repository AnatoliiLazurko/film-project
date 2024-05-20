import React from 'react';
import styles from '../RoolsStyles.module.css';

const PrivacyPolicy = () => {
    return (
        <div>
            <h1 className={styles["title"]}>Privacy Policy</h1>

            <p className={styles["date-start"]}>Effective date May 09, 2024</p>

            <div className={styles["block-info"]}>
                <p>1. Information Collection:</p>
                <ul>
                    <li>
                        We collect personal information such as name, email address, and any other information provided
                        voluntarily by visitors when they subscribe to our newsletter or submit feedback.
                    </li>
                    <li>
                        We may also collect non-personal information such as browser type, device type,
                        and IP address for analytical purposes.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>2. Use of Information:</p>
                <ul>
                    <li>
                        Personal information collected is used to personalize user experience, improve
                        our services, and send periodic emails related to our film website.
                    </li>
                    <li>    
                        Non-personal information may be used for analytical purposes to enhance user
                        experience and optimize our website's performance.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>3. Data Security:</p>
                <ul>
                    <li>
                        We implement appropriate security measures to protect personal information from
                        unauthorized access, disclosure, alteration, or destruction.
                    </li>
                </ul>
            </div>
                
            <div className={styles["block-info"]}>
                <p>4. Cookies:</p>
                <ul>
                    <li>
                        Our website may use cookies to enhance user experience and collect non-personal information. 
                        Users can choose to disable cookies through their browser settings.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>5. Third-Party Links:</p>
                <ul>
                    <li>
                        Our website may contain links to third-party websites. We are not responsible
                        for the privacy practices or content of these websites. Users are encouraged
                        to review the privacy policies of third-party sites before providing any personal information.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>6. Consent:</p>
                <ul>
                    <li>
                        By using our website, you consent to our privacy policy and agree to the
                        collection and use of your information as outlined in this policy.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>7. Changes to Privacy Policy:</p>
                <ul>
                    <li>
                        We reserve the right to update or change our privacy policy at any time.
                        Any changes will be communicated on this page.
                    </li>
                </ul>
            </div>

            <p className={styles["conclusion"]}>
                This privacy policy is effective as of [insert date] and governs the use of
                our film website. Users are encouraged to review this policy periodically
                for any updates or changes. If you have any questions or concerns about
                our privacy policy, please contact us at <span>blahofilm@gmail.com</span>.
            </p>

            <p className={styles["conclusion"]}>
                Please remember to consult with legal experts or professionals
                to ensure compliance with applicable laws and regulations.
            </p>

        </div>
    );
}

export default PrivacyPolicy;
