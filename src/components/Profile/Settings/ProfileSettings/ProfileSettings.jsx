import React, { useRef, useState } from 'react';
import styles from './ProfileStyles.module.css';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import userAvatar from '../../../../images/profile/user_avatar.jpg'

const initialValues = {
    name: '',
};

const EDIT_NAME_SCHEMA = Yup.object().shape({
    name: Yup.string().required("The field is required")
        .min(3, 'The name must contain at least 3 characters')
        .max(20, 'The name must not be longer than 20 characters'),
});

const ProfileSettings = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [fileEror, setFileEror] = useState('');
    const fileInputRef = useRef(null);

    const submitHadler = (values, formikBag) => {
        formikBag.resetForm();
    }

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        const validExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            setFileEror('Only jpg, jpeg and png files are allowed');
            return;
        }

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                if (img.width > 1000 || img.height > 1000) {
                    setFileEror('The size of the image should not exceed 1000x1000px');
                } else {
                    setSelectedImage(reader.result);
                    setFileEror('');
                }
            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>

            <Formik
                initialValues={initialValues}
                onSubmit={submitHadler}
                validationSchema={EDIT_NAME_SCHEMA}
            >
                <Form>
                    <p className={styles["label"]}>Edit name</p>
                    <div className={styles["name-container"]}>
                        <Field name="name" className={styles["input"]} placeholder="Enter name" />
                        <Field className={styles["edit-name-btn"]} type="submit" value="Change" />
                    </div>
                    <ErrorMessage name='name' component="div" className={styles["error-container"]} />
                </Form>
            </Formik>

            <div className={styles["edit-avatar"]}>
                <p className={styles["edit-title"]}>Edit profile picture</p>
                <div className={styles["edit-avatar-block"]}>
                    <div className={styles["curent-avatar"]}>
                        {selectedImage && <img src={selectedImage} alt="Avatar" />}
                        {!selectedImage && <img src={userAvatar} alt="Avatar" />}
                        <p>Max size 1000x1000px</p>
                    </div>
                    
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            multiple
                        />
                        <div className={styles["select-btn"]} onClick={handleFileButtonClick}>Select</div>
                    </div>
                </div>
            </div>

            {fileEror && <div className={styles["error-container"]}>{fileEror}</div> }

            <div className={styles["delete-btn"]}>Delete account</div>
        </div>
    );
}

export default ProfileSettings;