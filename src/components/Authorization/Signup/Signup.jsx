import React, { useState } from 'react';
import styles from './SignupStyles.module.css';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import google_logo from "../../../images/forms/google.png";
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import useAuth from '../../../hooks/useAuth';

const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
};

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const SIGNUP_SCHEMA = Yup.object().shape({
    email: Yup.string().email("Email must be valid").required("Required"),
    password: Yup
    .string()
    .matches(passwordRules, { message: "Minimum 8 characters" })
    .required("Required"),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
});

const Signup = ({ closeModal, openSignIn }) => {

    const { register, authWithGoogle } = useAuth();

    const [showPassword, setPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const handleCloseModal = () => {
        closeModal();
    };

    const handleOpenSignIn = () => {
        openSignIn();
    }

    const togglePasswordVisibility = () => {
        setPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPassword(!showConfirmPassword);
    };

    const submitHadler = async (values, formikBag) => {
        try {
            register({ email: values.email, password: values.password });
            formikBag.resetForm();
            closeModal();
        } catch (error) {
            console.error('There was an error registering the user:', error);
        }
    }

    const signupWithGoogle = useGoogleLogin({
        onSuccess: codeResponse => {
            authWithGoogle(codeResponse.access_token);
            closeModal();
        }
    });

    return (
        <>
            <div className={styles["signup"]}>

                <FontAwesomeIcon icon={faXmark} className={styles["close-mark"]} onClick={handleCloseModal}/>

                <p className={styles["title"]}>New account</p>

                <Formik
                    initialValues={initialValues}
                    onSubmit={submitHadler}
                    validationSchema={SIGNUP_SCHEMA}
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
                            <div className={styles["password-field"]}>
                                <Field name="confirmPassword" className={styles["input-password"]} type={showConfirmPassword ? "text" : "password"} placeholder="Repeat password" />
                                <div className={styles["show-password"]}>
                                    {!showConfirmPassword && <FontAwesomeIcon icon={faEye} onClick={toggleConfirmPasswordVisibility} />}
                                    {showConfirmPassword && <FontAwesomeIcon icon={faEyeSlash} onClick={toggleConfirmPasswordVisibility} />}
                                </div>
                            </div>

                            <ErrorMessage name='password' component="p" className={styles["error"]} />
                            <ErrorMessage name='confirmPassword' component="p" className={styles["error"]} />
                        </div>

                        <div className={styles["btn-section"]}>
                            <Field className={styles["btn-confirm"]} type="submit" value="Create" id="signup" />
                        </div>
                    </Form> 
                </Formik>

                <div className={styles["signup-with"]}>
                    <p>Or</p>
                    <p>Make a new account with...</p>
                    <div className={styles["social-media"]}>
                        <img src={google_logo} alt="" onClick={() => signupWithGoogle()} />
                    </div>
                </div>
                <div className={styles["have-account"]}>
                    <p>Already have an account?</p>
                    <Link onClick={handleOpenSignIn}>Sign in</Link>
                </div>
            </div>
            <div className={styles["screen-dimming"]}></div>
        </>    
    );
}

export default Signup;
