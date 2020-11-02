import { ACTION } from "../ListModal/constants";

const initialState = {
    users: [],
}

const ListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload }
        }
    }
    return state;
}

export default ListReducer; 