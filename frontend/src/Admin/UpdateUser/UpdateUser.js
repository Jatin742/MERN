import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import "../../Admin/CreateUser/CreateUser.css";
import { app } from '../../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { UPDATE_USER_RESET } from '../../Constants/adminConstant';
import { getUserDetails, updateUser } from '../../Actions/adminAction';
import { clearErrors } from '../../Actions/userAction';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.adminUser);
    const { error, user } = useSelector((state) => state.userDetails);

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState();
    const [designation, setDesignation] = useState("");
    const [course, setCourse] = useState("course");
    const [gender, setGender] = useState("");

    const [oldImage, setOldImage] = useState();

    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();

    const { id } = useParams();

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setMobileNo(user.mobileNo);
            setCourse(user.course);
            setDesignation(user.designation);
            setGender(user.gender);
            setOldImage(user.image);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User Updated Successfully")
            navigate("/")
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, isUpdated, navigate, user, id, updateError])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const storage = getStorage(app);
        if (image && image !== "gs://next-app-f9dba.appspot.com/users/Profile-Avatar-PNG.png") {

            const oldImagePath = oldImage.split('/o/')[1].split('?')[0];
            const decodedPath = decodeURIComponent(oldImagePath);
            const oldImageRef = ref(storage, decodedPath);

            deleteObject(oldImageRef)
                .then(() => {
                    console.log("Old image deleted successfully");
                })
                .catch((error) => {
                    alert.error("Failed to delete old image");
                });
        }

        if (image) {
            const fileName = new Date().getTime() + "-" + image.name;
            const storageRef = ref(storage, `Users/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                },
                (error) => {
                    alert.error("Image upload failed");
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    const myForm = new FormData();
                    myForm.set("name", name);
                    myForm.set("email", email);
                    myForm.set("mobileNo", String(mobileNo));
                    myForm.set("designation", designation);
                    myForm.set("gender", gender);
                    myForm.set("course", course);
                    myForm.set('image', downloadURL);
                    
                    dispatch(updateUser(id, myForm));
                }
            );
        } else {
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("mobileNo", String(mobileNo));
            myForm.set("designation", designation);
            myForm.set("gender", gender);
            myForm.set("course", course);

            dispatch(updateUser(id,myForm));
        }
    };

    const updateUserImagesChange = (e) => {
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
    }
    const handleCourseChange = (selectedCourse) => {
        setCourse(selectedCourse);
    };
    return (
        <Fragment>{loading ? <Loader /> :
            <Fragment>
                <div className='dashboard'>
                    <div className="newUserContainer">
                        <form
                            className='createUserForm'
                            encType='multipart/form-data'
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>
                            <div>
                                <input
                                    type="text"
                                    placeholder='Name'
                                    required
                                    value={name}
                                    onChange={() => setName(name)} />
                            </div>
                            <div>
                                <input
                                    placeholder='Email'
                                    value={email}
                                    onChange={() => setEmail(email)}
                                    cols="30"
                                    rows="1"></input>
                            </div>
                            <div id="createUserFormFile">
                                <input
                                    type="file"
                                    name='avatar'
                                    accept='image/*'
                                    onChange={updateUserImagesChange}
                                />
                            </div>
                            <div id="createUserFormImage">
                                <img src={oldImage} alt="Old User Preview" />
                            </div>
                            <div id="createUserFormImage">
                                {imagePreview && <div id="createUserFormImage">
                                    <img src={imagePreview} alt="Avatar Preview" />
                                </div>}
                            </div>
                            <div className="signUpMobileNumber">
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                required
                                value={mobileNo}
                                onChange={(e) =>
                                    setMobileNo(e.target.value.replace(/\D/g, "").slice(0, 10))
                                }
                            />
                        </div>
                        <div className="signUpDesignation">
                            <select
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
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
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                Female
                            </label>
                        </div>
                        <div className="signUpCourses">
                            <label>
                                <input
                                    type="checkbox"
                                    value="MCA"
                                    checked={course==="MCA"}
                                    onChange={() => handleCourseChange("MCA")}
                                />
                                MCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="BCA"
                                    checked={course==="BCA"}
                                    onChange={() => handleCourseChange("BCA")}
                                />
                                BCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="BSC"
                                    checked={course==="BSC"}
                                    onChange={() => handleCourseChange("BSC")}
                                />
                                BSC
                            </label>
                        </div>
                            <button
                                id="createUserBtn"
                                type='submit'
                                disabled={loading ? true : false}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>

            </Fragment>
        }
        </Fragment>
    )
}

export default UpdateUser