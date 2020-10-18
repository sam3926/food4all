import { ACTION } from "../Home/constants";

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
    currentfilter:['Donations','Events','Posts']
}

const LeftSidePanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload }
        }
    }
    return state;
}

export default LeftSidePanelReducer;