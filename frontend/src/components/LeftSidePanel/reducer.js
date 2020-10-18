import { ACTION } from "./constants";

const initialState = {
    userDetails: {
        name: 'Arpit Bandejiya',
        profilePic: ''
    },
    following: [
        {name:'arpit',id:1},
        {name:'Krishnendu',id:2},
        {name: 'Dinkar'}
    ],
    donations:[
        {name:'xyz12',id:1},
        {name:'xyz',id:2}
    ],
    achievements:[
        {title:'in top 3!',id:1},
        {title: 'Top Donor',id:2}
    ],
    currentfilter:[]
}

const LeftSidePanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTERS: {
            //console.log('hahaha')
            return { ...state, currentfilter: action.selectedfilters }
        }
    }
    return state;
}

export default LeftSidePanelReducer;