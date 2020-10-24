import { ACTION } from "./constants";

const initialState = {
    someData: "initilProp"
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload }
        }
    }
    return state;
}

export default homeReducer;