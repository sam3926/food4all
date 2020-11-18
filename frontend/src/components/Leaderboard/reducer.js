import { ACTION } from "./constants";

const initialState = {
    list: [],
    currentfilter:[]
}

const LeaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTERS: {
            return { ...state, currentfilter: action.selectedfilters }
        }
    }
    return state;
}

export default LeaderboardReducer;