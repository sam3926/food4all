import { ACTION } from "./constants";

const initialState = {
    userDetails: {
        name: 'Arpit Bandejiya',
        profilePic: ''
    },
    following: [
        {name:'arpit',id:'f1'},
        {name:'Krishnendu',id:'f2'},
        {name: 'Dinkar'}
    ],
    donations:[
        {name:'xyz12',id:'d1'},
        {name:'xyz',id:'d2'}
    ],
    achievements:[
        {title:'in top 3!',id:'a1'},
        {title: 'Top Donor',id:'a2'}
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