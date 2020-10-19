import { ACTION } from "../Home/constants";

const initialState = {
    posts: [
        {user_name:'Arpit', description:'Card Content',id:1, likes:20,shares:30},
        {user_name:'Dinkar', description:'Card Content',id:2,likes:30,shares:17},
        {user_name:'Sudheesh', description:'Card Content',id:3,likes:34,shares:16},
        {user_name:'Shreyansh', description:'Card Content',id:4,likes:31,shares:14}
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