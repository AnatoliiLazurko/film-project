import React, { useState } from 'react';
import styles from './PasswordStyles.module.css';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
    password: '',
    confirmPassword: ''
};

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/;

const EDIT_PASSWORD_SCHEMA = Yup.object().shape({
    password: Yup
        .string()
        .matches(passwordRules, { message: "Follow the new password rules above" })
        .required("The field is required"),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
});

const PasswordSettings = () => {

    const [showPassword, setPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPassword(!showConfirmPassword);
    };

    const clearFormFields = (formik) => {
        formik.resetForm();
    };

    const submitHadler = (values, formikBag) => {
        formikBag.resetForm();
    }

    return (
        <div>
            
            <h1 className={styles["edit-title"]}>Edit password</h1>

            <div className={styles["validation-rules"]}>
                <p>Your password must:</p>
                <ul>
                    <li>Have 8+ characters, but less than 100 and no spaces</li>
                    <li>Use a mix of numbers, uppercase, and lowercase letters</li>
                </ul>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={submitHadler}
                validationSchema={EDIT_PASSWORD_SCHEMA}
            >
                {(formik) => (
                    <Form className={styles["form"]}>
                        <div className={styles["password-section"]}>

                            <div className={styles["password-field"]}>   
                                <Field name="password" className={styles["input-password"]} type={showPassword ? "text" : "password"} placeholder="Enter new password..." />
                                <div className={styles["show-password"]}>
                                    {!showPassword && <FontAwesomeIcon icon={faEye} onClick={togglePasswordVisibility} />}
                                    {showPassword && <FontAwesomeIcon icon={faEyeSlash} onClick={togglePasswordVisibility} />}
                                </div>
                            </div>

                            <div className={styles["password-field"]}>
                                <Field name="confirmPassword" className={styles["input-password"]} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm new password..." />
                                <div className={styles["show-password"]}>
                                    {!showConfirmPassword && <FontAwesomeIcon icon={faEye} onClick={toggleConfirmPasswordVisibility} />}
                                    {showConfirmPassword && <FontAwesomeIcon icon={faEyeSlash} onClick={toggleConfirmPasswordVisibility} />}
                                </div>
                            </div>

                            <ErrorMessage name='password' component="div" className={styles["error-container"]} />
                            <ErrorMessage name='confirmPassword' component="div" className={styles["error-container"]} />                   
                        </div>

                        <div className={styles["btn-section"]}>
                            <div className={styles["cancel-btn"]} onClick={() => clearFormFields(formik)}>Cancel</div>
                            <Field className={styles["confirm-btn"]} type="submit" value="Confirm changes"/>
                        </div>
                    </Form> 
                )}
            </Formik>

        </div>
    );
}

export default PasswordSettings;
