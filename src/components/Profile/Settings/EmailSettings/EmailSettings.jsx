import React, { useState } from 'react';
import styles from './EmailStyles.module.css';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
    email: '',
    password: '',
};

const EDIT_EMAIL_SCHEMA = Yup.object().shape({
    email: Yup.string().email("Email must be valid").required("The new e-mail is required"),
    passowrd: Yup.string().required("The password is required"),
});

const EmailSettings = () => {

    const [showPassword, setPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setPassword(!showPassword);
    };

    const clearFormFields = (formik) => {
        formik.resetForm();
    };

    const submitHadler = (values, formikBag) => {
        formikBag.resetForm();
    }

    return (
        <div>
            
            <h1 className={styles["edit-title"]}>Edit E-mail</h1>
            <p className={styles["current-email"]}>Your current e-mail: filmlover@gmail.com</p>
            <p className={styles["edit-rules"]}>
                To change your e-mail, you must enter your password. <br/>
                Then we will send you a verification letter on your <span>new e-mail.</span>
            </p>

            <Formik
                initialValues={initialValues}
                onSubmit={submitHadler}
                validationSchema={EDIT_EMAIL_SCHEMA}
            >   
                {(formik) => (
                    <Form>
                        <div>
                            <p className={styles["label"]}>Enter new e-mail:</p>
                            <Field name="email" className={styles["input"]} placeholder="newemail@gmail.com" />
                        </div>
                        <div>
                            <p className={styles["label"]}>Enter your password:</p>
                            <div className={styles["password-field"]}>
                                <Field name="password" className={styles["input-password"]} type={showPassword ? "text" : "password"} placeholder="Password" />
                                <div className={styles["show-password"]}>
                                    {!showPassword && <FontAwesomeIcon icon={faEye} onClick={togglePasswordVisibility} />}
                                    {showPassword && <FontAwesomeIcon icon={faEyeSlash} onClick={togglePasswordVisibility} />}
                                </div>
                            </div>
                        </div>
                        <ErrorMessage name='email' component="div" className={styles["error-container"]} />
                        <div className={styles["btn-section"]}>
                            <div className={styles["cancel-btn"]} onClick={() => clearFormFields(formik)}>Cancel</div>
                            <Field className={styles["confirm-btn"]} type="submit" value="Confirm changes" />
                        </div>
                    </Form>
                )}
            </Formik>
            
        </div>
    );
}

export default EmailSettings;
