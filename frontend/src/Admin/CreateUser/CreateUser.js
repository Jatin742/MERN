import React, { Fragment, useEffect, useState } from 'react';
import "./CreateUser.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useAlert } from 'react-alert';
import { NEW_USER_RESET } from '../../Constants/adminConstant';
import { clearErrors, createUser } from '../../Actions/adminAction';

const CreateUser = () => {
    const dispatch = useDispatch();
    
    const { loading, error, success } = useSelector((state) => state.newUser);

    const navigate = useNavigate();
    const alert = useAlert();

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        designation: "HR",
        gender: "Male",
        course: "",
    });
    const { name, email, mobileNumber, designation, gender, course } = user;
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("User Created");
            navigate("/");
            dispatch({ type: NEW_USER_RESET });
        }
    }, [dispatch, error, success, navigate, alert])
    const createUserSubmitHandler = (e) => {
        e.preventDefault();

        const fileName = new Date().getTime() + "-" + image.name;

        const storage = getStorage(app);
        const storageRef = ref(storage, `users/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("Image upload failed: ", error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                const myForm = new FormData();

                myForm.set("name", name);
                myForm.set("email", email);
                myForm.set("mobileNo", String(mobileNumber));
                myForm.set("designation", designation);
                myForm.set("gender", gender);
                myForm.set("course", course);
                myForm.set('image', downloadURL);
                
                dispatch(createUser(myForm));
            }
        );
    };


    const createUserImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const createDataChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    return (
        <Fragment>
            <div className='dashboard'>
                <div className="newUserContainer">
                    <form
                        className='createUserForm'
                        encType='multipart/form-data'
                        onSubmit={createUserSubmitHandler}
                    >
                        <h1>Create User</h1>
                        <div>
                            <input
                                type="text"
                                placeholder='Name'
                                required
                                value={name}
                                name="name"
                                onChange={createDataChange} />
                        </div>

                        <div>
                            <input
                                placeholder='Email'
                                value={email}
                                onChange={createDataChange}
                                cols="30"
                                type='email'
                                name="email"
                                rows="1"></input>
                        </div>
                        <div id="createUserFormFile">
                            <input
                                type="file"
                                name='avatar'
                                accept='image/*'
                                onChange={createUserImageChange}
                            />
                        </div>
                        {imagePreview && <div id="createUserFormImage">
                            <img src={imagePreview} alt="Avatar Preview" />
                        </div>}
                        <div className="signUpMobileNumber">
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                required
                                name="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 10),
                                    })
                                }
                            />
                        </div>
                        <div className="signUpDesignation">
                            <select
                                name="designation"
                                value={designation}
                                onChange={createDataChange}
                            >
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div className="signUpGender">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={createDataChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={createDataChange}
                                />
                                Female
                            </label>
                        </div>
                        <div className="signUpCourses">
                            <label>
                                <input
                                    type="checkbox"
                                    value="MCA"
                                    name="course"
                                    checked={course === "MCA"}
                                    onChange={createDataChange}
                                />
                                MCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="BCA"
                                    name="course"
                                    checked={course === "BCA"}
                                    onChange={createDataChange}
                                />
                                BCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="BSC"
                                    name="course"
                                    checked={course === "BSC"}
                                    onChange={createDataChange}
                                />
                                BSC
                            </label>
                        </div>
                        <input
                            id="createUserBtn"
                            type='submit'
                            value="Create"
                            onClick={createUserSubmitHandler}
                            disabled={loading ? true : false}
                        />

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default CreateUser