import { ADMIN_USERS_FAIL, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, NEW_USER_FAIL, NEW_USER_REQUEST, NEW_USER_RESET, NEW_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../Constants/adminConstant";

export const newUserReducer = (state = {user:{} }, action) => {

    switch (action.type) {
        case NEW_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_USER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                event: action.payload.event,
            };
        case NEW_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_USER_RESET:
            return {
                ...state,
                success:false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const allAdminUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case ADMIN_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADMIN_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
      case ADMIN_USERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export const adminUserReducer = (state = { }, action) => {

    switch (action.type) {
        case DELETE_USER_REQUEST:
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload,
            };
        case DELETE_USER_FAIL:
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted:false,
            };
        case UPDATE_USER_RESET:
        return {
            ...state,
            isUpdated:false,
        };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      case USER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };