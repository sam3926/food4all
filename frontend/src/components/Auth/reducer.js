import { ACTION } from "./constants";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    errors: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case ACTION.USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case ACTION.GET_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case ACTION.CLEAR_ERRORS:
            return {
                ...state,
                errors: {}
            }
        case 'LOGOUT':
            return {
                ...initialState
            }
        default:
            return state;
    }
}

export default authReducer;