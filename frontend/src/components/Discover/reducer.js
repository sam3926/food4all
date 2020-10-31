import { latLng } from "leaflet";
import { ACTION } from "./constants";

const initialState = {
    Donations:[
            {
                donorId:'',
                receiverId:'',
                title:'Check',
                acceptedTime: '',   
                donorName:'Arpit',
                contact:9411890675,
                postTime:'12-10-2020',
                description: 'Card content description',
                peoplefed: 0,
                status: 'NotAccepted',
                location:{
                    type:'Point',
                    coordinates:[]
                },
                images:["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"]
            },
            {
                donorId:'',
                receiverId:'',
                title:'Check',
                acceptedTime: '',   
                donorName:'Dinkar',
                contact:9411890675,
                postTime:'12-10-2020',
                description: 'Card content description',
                peoplefed: 0,
                status: 'NotAccepted',
                location:{
                    type:'Point',
                    coordinates:[]
                },
                images:["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"]
            },
            {
                donorId:'',
                receiverId:'',
                title:'Check',
                acceptedTime: '',   
                donorName:'Krish',
                contact:9411890675,
                postTime:'12-10-2020',
                description: 'Card content description',
                peoplefed: 0,
                status: 'NotAccepted',
                location:{
                    type:'Point',
                    coordinates:[]
                },
                images:["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"]
            },
            {
                donorId:'',
                receiverId:'',
                title:'Check',
                acceptedTime: '',   
                donorName:'Shreyansh',
                contact:9411890675,
                postTime:'12-10-2020',
                description: 'Card content description',
                peoplefed: 0,
                status: 'NotAccepted',
                location:{
                    type:'Point',
                    coordinates:[]
                },
                images:["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"]
            },
    ],
    Organisations:[
        {   
            organisationName:'Arpit1',
            contact:9411890675,
            address:'Address',
            description:'Brief description',
            peoplefed: '0',
            imageurl:[]
        },
    ],
    Events:[],
    currentfilter:[]
}

const DiscoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DONATION':{
            //console.log('lets check the donations',action.donations)
            return {...state,Donations: action.donations}
        }
        case ACTION.CHANGE_FILTERS: {
            //console.log('hahaha')
            return { ...state, currentfilter: action.selectedfilters }
        }
        case 'ADD_DONATION': {
            
            //console.log(action.payload);
            const donation = action.payload
            return { ...state,Donations: [...state.Donations,donation]}
        }
        case 'PENDING_DONATION': {
            const donation = action.payload;
            donation.status = "pending"
            donation.receiverId = action.userId
            console.log('inside the discover reducer!',donation);
            return { ...state,Donations:state.Donations.map( d => d._id == donation._id? {...donation}:{...d})}
        }
        case 'REJECT_DONATION':{
            console.log('called to reject donations')
            return { ...state,Donations:state.Donations.map( d => d._id == action.id? {...d,status:'NotAccepted',receiverId:null}:{...d})}
        }
    }
    return state;
}

export default DiscoverReducer;