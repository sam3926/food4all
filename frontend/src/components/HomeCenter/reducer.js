import { ACTION } from "../Home/constants";

const initialState = {
    posts: [
        {user_name:'Arpit', description:'Card Content',id:1},
        {user_name:'Dinkar', description:'Card Content',id:2},
        {user_name:'Sudheesh', description:'Card Content',id:3},
        {user_name:'Shreyansh', description:'Card Content',id:4}
    ],
    currentfilter:['Donations','Events','Posts']
}

const HomeCenterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload }
        }
    }
    return state;
}

export default HomeCenterReducer;