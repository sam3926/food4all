import { ACTION } from "./constants";

const initialState = {
    Events:[
        {title:'Arpit', description:'Card Content'},
    ],
    currentfilter:[]
}

const CommunityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTERS: {
            return { ...state, currentfilter: action.selectedfilters }
        }
    }
    return state;
}

export default CommunityReducer;