import { ACTION } from "./constants";

const initialState = {
    currentRoute: "home"
}

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.SET_CURRENT_ROUTE: {
            state = { ...state, currentRoute: action.payload }
        }
    }
    return state;
}

export default navReducer;