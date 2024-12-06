import React, { Fragment, useEffect } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./AllAdminUsers.css";
import { useAlert } from 'react-alert';
import { clearErrors, deleteUser, getAllAdminUsers } from '../Actions/adminAction';
import { DELETE_USER_RESET } from '../Constants/adminConstant';
import { app } from '../firebase';
import { getStorage, ref, deleteObject } from "firebase/storage";

export function formattedDate(date) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

const AllAdminUsers = () => {
    const { users, error } = useSelector(state => state.allAdminUsers);
    const { user, isDeleted } = useSelector(state => state.adminUser);
    const alert = useAlert();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleNavigate = (url) => {
        navigate(url);
    }
    const deleteImage = (image) => {
        const storage = getStorage(app);
        if (image && image !== "gs://next-app-f9dba.appspot.com/users/Profile-Avatar-PNG.png") {

            const oldImagePath = image.split('/o/')[1].split('?')[0];
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
    }
    const deleteEventHandler = async (id, image) => {
        await deleteImage(image)
        dispatch(deleteUser(id));
    }
    useEffect(() => {
        if (isDeleted) {
            alert.success("User Deleted");
            dispatch({ type: DELETE_USER_RESET });
            navigate("/");
        }
        dispatch(getAllAdminUsers());
    }, [dispatch, user, alert, isDeleted, navigate]);

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
    }, [error, dispatch]);
    const columns = [
        { field: "id", headerName: "Unique Id", minWidth: 150, flex: 1 },
        {
            field: "image",
            headerName: "Image",
            minWidth: 80,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <img
                        src={params.row.image}
                        alt={params.row.name}
                        style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                    />
                );
            },
        },
        { field: "name", headerName: "Name", minWidth: 100, flex: 0.7 },
        { field: "email", headerName: "Email", minWidth: 150, flex: 1 },
        { field: "mobileNo", headerName: "Mobile Number", minWidth: 100 },
        { field: "designation", headerName: "Designation", minWidth: 90 },
        { field: "gender", headerName: "Gender", minWidth: 50 },
        { field: "course", headerName: "Course", minWidth: 100 },
        { field: "createdAt", headerName: "Create Date", minWidth: 120, flex: 0.4 },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 100,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <div className="action-icons">
                            <div onClick={() => handleNavigate(`/admin/user/${params.row.id}`)}>
                                <MdEdit />
                            </div>
                            <div onClick={() => deleteEventHandler(params.row.id, params.row.image)}>
                                <MdDelete />
                            </div>
                        </div>
                    </Fragment>
                );
            },
        },];
    const rows = [];
    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            image: item.image,
            name: item.name,
            email: item.email,
            mobileNo: item.mobileNo,
            designation: item.designation,
            gender: item.gender,
            course: item.course,
            createdAt: formattedDate(item.createdAt),
        })
    });
    const handleUserCreation = () => {
        navigate('/admin/create-user');
    };
    return (
        <Fragment>
            <div style={{ overflowX: "auto", }} >
                <div className="headerContainer">
                    <h1>All Users</h1>
                    <button className="navigateButton" onClick={handleUserCreation}>Create User</button>
                </div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                    className='eventListTable'
                />
            </div>
        </Fragment>
    )
}

export default AllAdminUsers