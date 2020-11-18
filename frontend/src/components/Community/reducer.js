import { ACTION } from "./constants";

const initialState = {
    Events:[],
    currentfilter:[]
}

const CommunityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTERS: {
            return { ...state, currentfilter: action.selectedfilters }
        }
        case 'ADD_EVENT':{
            return {...state, Events:[...state.Events, action.payload]}
        }
        case 'GET_EVENT':{
            return {...state,Events:action.payload}
        }
    }
    return state;
}

export default CommunityReducer;