import axios from "axios";
import { ADMIN_USERS_FAIL, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, NEW_USER_FAIL, NEW_USER_REQUEST, NEW_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../Constants/adminConstant";

const host = process.env.REACT_APP_BACKEND_HOST;
export const createUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };
        const { data } = await axios.post(`${host}/api/v1/create/user`, userData, config);
        dispatch({
            type: NEW_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };
        const { data } = await axios.put(`${host}/api/v1/user/${id}`, userData, config);
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await axios.delete(`${host}/api/v1/user/${id}`, {
            withCredentials: true
        });
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`${host}/api/v1/user/${id}`, { withCredentials: true });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
}

export const getAllAdminUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USERS_REQUEST });
        const { data } = await axios.get(`${host}/api/v1/all/users`, { withCredentials: true });

        dispatch({ type: ADMIN_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ADMIN_USERS_FAIL, payload: error.response.data.message });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}