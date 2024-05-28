import React, { useState } from 'react';
import styles from './ResetPasswordStyles.module.css';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import RequestError from '../Error/RequestError';
import EmailVerification from '../Email/EmailVerification';

const initialValues = {
    email: '',
};

const RESET_SCHEMA = Yup.object().shape({
    email: Yup.string().email("Email must be valid").required("The field is required"),
});

const ResetPassword = () => {

    const [isEmailSent, setEmailSent] = useState(false);
    const [error, setError] = useState();

    const submitHadler = async (values, formikBag) => {
        try {
            await axios.post('https://localhost:7176/api/Users/sendemailchangepassword', { email: values.email }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            setEmailSent(true);
        } catch (error) {
            setError(error.response.data);
            setTimeout(() => {
                setError(null);
            }, 6000);
        }
        formikBag.resetForm();
    }

    return (
        <>
            <div className={styles["alert"]}>
                <h1>Reset your password</h1>
                <p className={styles["text"]}>Please provide the e-mail adress that you used when you signed up for your account.</p>

                <Formik
                    initialValues={initialValues}
                    onSubmit={submitHadler}
                    validationSchema={RESET_SCHEMA}
                >
                    <Form className={styles["reset-form"]}>
                        <div>
                            <p className={styles["label"]}>Enter e-mail*</p>
                            <ErrorMessage name='email' component="p" className={styles["error"]}/>
                            <Field name="email" className={styles["input"]} placeholder="E-mail" />
                        </div>

                        <p className={styles["text"]}>We will send you an e-mail that will allow you to reset your password.</p>

                        <Field className={styles["btn-reset"]} type="submit" value="Reset password" />
                    </Form>
                </Formik>
            </div>

            {error && <RequestError errorMessage={error} />}
            {isEmailSent && <EmailVerification closeModal={setEmailSent} />}
        </>
    );
}

export default ResetPassword;
