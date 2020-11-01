import { ACTION } from "./constants";

const initialState = {
    profileDetails: {
        name: "Krishnendu Sudheesh",
        avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=50",
        followers: [],
        following: [],
        donations: [],
        achievements: []
    },
    currentfilter: []
}



const LeftSidePanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTERS: {
            //console.log('hahaha')
            state = { ...state, currentfilter: action.selectedfilters }
            break;
        }
        case ACTION.GET_LEFT_DETAILS: {
            state = { ...state, profileDetails: action.payload }
            break;
        }
        case 'LOGOUT': {
            state = { ...initialState }
          break;
        }
        // case 'ADD_POST':{
        //     state = {...state,profileDetails:{...state.profileDetails,posts:[...state.profileDetails.posts,action.post._id]}}
        //     break;
        // }
        case 'ADD_DONATION':{
            state = {...state,profileDetails:{...state.profileDetails,donations:[...state.profileDetails.donations,{_id: action.payload._id,title:action.payload.title}]}}
            console.log('inside the left side reducer',state.profileDetails.donations)
            break;
        }
    }
    return state;
}

export default LeftSidePanelReducer;