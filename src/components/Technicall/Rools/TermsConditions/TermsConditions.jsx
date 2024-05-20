import React from 'react';
import styles from '../RoolsStyles.module.css';

const TermsConditions = () => {
    return (
        <div>
            <h1 className={styles["title"]}>Terms&Conditions</h1>

            <p className={styles["date-start"]}>Effective date May 09, 2024</p>

            <div className={styles["block-info"]}>
                <p>1. Acceptance of Terms:</p>
                <p className={styles["txt"]}>In consideration of your use of service of the site, you agree to:</p>
                <ul>
                    <li>
                        Comply with the Agreement.
                    </li>
                    <li>
                        Provide accurate, complete and true information about yourself as may be
                        required on any registration form for the service. In order to create your User Account.
                    </li>
                    <li>
                        Maintain and update, as applicable, your registration information with
                        current and complete information. Users who violate these rules, or provide
                        inaccurate, false or non-current registration information will have their
                        user account suspended or terminated.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>2. Changes to Terms of Use</p>
                <ul>
                    <li>
                        The Terms of Use may from time to time change. You will be notified before such
                        change apply to you or will be posted on <span>https://www.blahofilm.com</span> and it is
                        responsibility of the user to refer to the terms on accessing this service.
                        You agree to review the Terms of Use periodically to be aware of such modifications
                        and your continued access or use of the Website shall be deemed your conclusive
                        acceptance of the modified Terms of Use.
                    </li>
                </ul>
            </div>

            <div className={styles["block-info"]}>
                <p>3. Governing Law & Jurisdiction</p>
                <ul>
                    <li>
                        This User Agreement shall be governed by and construed in accordance with laws of Ukraine
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default TermsConditions;
