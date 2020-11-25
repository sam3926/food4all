import { latLng } from "leaflet";
import { ACTION } from "./constants";

const initialState = {
    Donations:[],
    Organisations:[],
    currentfilter:[]
}

const DiscoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DONATION':{
            return {...state,Donations: action.donations}
        }
        case 'GET_ORGANISATION':{
            return {...state,Organisations:action.organisations}
        }
        case ACTION.CHANGE_FILTERS: {
            return { ...state, currentfilter: action.selectedfilters }
        }
        case 'ADD_DONATION': {
            const donation = action.payload
            return { ...state,Donations: [...state.Donations,donation]}
        }
        case 'PENDING_DONATION': {
            const donation = action.payload;
            donation.status = "pending"
            donation.pickupDate = action.date.format("HH:mm ll");
            donation.receiverId = action.userId
            return { ...state,Donations:state.Donations.map( d => d._id == donation._id? {...donation}:{...d})}
        }
        case 'REJECT_DONATION':{
            return { ...state,Donations:state.Donations.map( d => d._id == action.id? {...d,status:'NotAccepted',receiverId:null}:{...d})}
        }
        case 'ACCEPT_DONATION':{
            return { ...state,Donations:state.Donations.map( d => d._id == action.payload._id? {...d,status:'Accepted'}:{...d})}
        }
    }
    return state;
}

export default DiscoverReducer;