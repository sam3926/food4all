import { ACTION } from "./constants";
import axios from 'axios';

const initialstate = () => {
    const initialState = {
        profileDetails: {
            profilePic: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            name: "Krishnendu Sudheesh",
            description: "Developer, nofoodwasted | IIT Tirupati | wants to live in a world where no food is wasted",
            contact: "9373321987",
            address: "777 Brockton Avenue, Abington MA 2351",
            followers: [],
            following: [],
            noFed: 0,
            noDonations: 0
        },
        name: 'Arpit Bandejiya',
        profilePic: '',
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
    
    
    return initialState;
}

const LeftSidePanelReducer = (state = initialstate(), action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTERS: {
            //console.log('hahaha')
            return { ...state, currentfilter: action.selectedfilters }
        }
        case 'INITIAL_STATE': {
            state = { ...state, profileDetails:action.payload};
            break;
        }
    }
    return state;
}

export default LeftSidePanelReducer;