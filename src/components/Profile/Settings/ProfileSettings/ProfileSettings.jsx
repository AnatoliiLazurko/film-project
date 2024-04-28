import React from 'react';
import styles from './ProfileStyles.module.css';
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';

const initialValues = {
    name: '',
};

const EDIT_NAME_SCHEMA = Yup.object().shape({
    name: Yup.string().required("Required"),
});

const ProfileSettings = () => {

    const submitHadler = (values, formikBag) => {
        formikBag.resetForm();
    }

    return (
        <div>
            <div className={styles["edit-name"]}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={submitHadler}
                    validationSchema={EDIT_NAME_SCHEMA}
                >
                    <Form>
                        <p className={styles["label"]}>Edit name</p>
                        <Field name="name" className={styles["input"]} placeholder="Enter name" />
                    </Form>
                </Formik>
            </div>
            <div className={styles["edit-avatar"]}>
                <p className={styles["label"]}>Edit profile picture</p>
                <div className={styles[""]}>
                    
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;
