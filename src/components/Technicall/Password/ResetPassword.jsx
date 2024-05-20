import React from 'react';
import styles from './ResetPasswordStyles.module.css';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';

const initialValues = {
    email: '',
};

const RESET_SCHEMA = Yup.object().shape({
    email: Yup.string().email("Email must be valid").required("The field is required"),
});

const ResetPassword = () => {

    const submitHadler = (values, formikBag) => {
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
            <div className={styles["screen-dimming"]}></div>
        </>
    );
}

export default ResetPassword;
