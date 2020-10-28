import { ACTION } from "../ListModal/constants";

const initialState = {
    users: [
        {user_name:'Arpit', description:'Brief Description',id:1},
        {user_name:'Dinkar', description:'Brief Description',id:2},
        {user_name:'Sudheesh', description:'Brief Description',id:3},
        {user_name:'Shreyansh', description:'Brief Description',id:4}
    ],
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