import React, { useState } from 'react';
import styles from './SigninStyles.module.css';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import google_logo from "../../../images/forms/google.png";
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const initialValues = {
    email: '',
    password: '',
};

const SIGNIN_SCHEMA = Yup.object().shape({
    email: Yup.string().email("Email must be valid").required("Required"),
    password: Yup.string().required("Required"),
});

const Signin = ({ closeModal, openSignUp }) => {

    const [showPassword, setPassword] = useState(false);

    const handleCloseModal = () => {
        closeModal();
    };

    const handleOpenSignUp = () => {
        openSignUp();
    }

    const togglePasswordVisibility = () => {
        setPassword(!showPassword);
    };

    const submitHadler = (values, formikBag) => {
        formikBag.resetForm();
    }

    const signinWithGoogle = useGoogleLogin({
        onSuccess: codeResponse => {
            axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                headers: {
                    'Authorization': `Bearer ${codeResponse.access_token}`
                }
            })
            .then(response => {
                //console.log(response.data);
            })
            .catch(error => console.error('Error fetching user info:', error));
            }
    });


    return (
        <div className={styles["signin"]}>

            <FontAwesomeIcon icon={faXmark} className={styles["close-mark"]} onClick={handleCloseModal}/>

            <p className={styles["title"]}>Sign in</p>

            <Formik
                initialValues={initialValues}
                onSubmit={submitHadler}
                validationSchema={SIGNIN_SCHEMA}
            >
                <Form className={styles["form"]}>
                    <div>
                        <p className={styles["label"]}>Enter e-mail*</p>
                        <Field name="email" className={styles["input"]} placeholder="E-mail" />
                        <ErrorMessage name='email' component="p" className={styles["error"]}/>
                    </div>
                    <div className={styles["password-section"]}>
                        <p className={styles["label"]}>Enter password*</p>
                        <div className={styles["password-field"]}>
                            <Field name="password" className={styles["input-password"]} type={showPassword ? "text" : "password"} placeholder="Password" />
                            <div className={styles["show-password"]}>
                                {!showPassword && <FontAwesomeIcon icon={faEye} onClick={togglePasswordVisibility} />}
                                {showPassword && <FontAwesomeIcon icon={faEyeSlash} onClick={togglePasswordVisibility} />}
                            </div>
                        </div>
                    
                        <ErrorMessage name='password' component="p" className={styles["error"]} />
                    </div>

                    <div className={styles["forgot-password"]}>
                        <Link>Forgot password?</Link>
                    </div>

                    <div className={styles["btn-section"]}>
                        <Field className={styles["btn-confirm"]} type="submit" value="Sign in" id="signin" />
                    </div>
                </Form> 
            </Formik>

            <div className={styles["signin-with"]}>
                <p>Or</p>
                <p>Login with...</p>
                <div className={styles["social-media"]}>
                    <img src={google_logo} alt="" onClick={() => signinWithGoogle()}/>
                </div>
            </div>
            <div className={styles["have-account"]}>
                <p>Don`t have an account yet?</p>
                <Link onClick={handleOpenSignUp}>Create an account</Link>
            </div>
        </div>
    );
}

export default Signin;
