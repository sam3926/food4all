import { ACTION } from "./constants";

const initialState = {
    currentfilter:[]
}

const DiscoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTERS: {
            //console.log('hahaha')
            return { ...state, currentfilter: action.selectedfilters }
        }
    }
    return state;
}

export default DiscoverReducer;