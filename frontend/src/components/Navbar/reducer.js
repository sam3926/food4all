import { ACTION } from "./constants";

const initialState = {
    currentRoute: "home"
}

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.SET_CURRENT_ROUTE: {
            state = { ...state, currentRoute: action.payload }
            break;
        }
        case 'LOGOUT': {
            state = { ...initialState }
            break;
        }
    }
    return state;
}

export default navReducer;