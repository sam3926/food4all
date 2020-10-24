import { latLng } from "leaflet";
import { ACTION } from "./constants";

const initialState = {
    Donations:[
            {   
                donorName:'Arpit',
                contact:9411890675,
                postTime:'12-10-2020',
                description: 'Card content description',
                imageurl:["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"]
            },
            {   
                donorName:'Arpit',
                contact:9411890675,
                postTime:'12-10-2020',
                description: 'Card content description',
                imageurl:[]
            },
            {   
                donorName:'Arpit',
                contact:9411890675,
                postTime:'12-10-2020',
                description: 'Card content description',
                imageurl:[]
            },
            {   
                donorName:'Arpit',
                contact:9411890675,
                postTime:'12-10-2020',
                description: 'Card content description',
                imageurl:[]
            },
    ],
    Organisations:[
        {   
            organisationName:'Arpit',
            contact:9411890675,
            postTime:'12-10-2020',
            description: 'Card content description',
            imageurl:[]
        },
        {   
            organisationName:'Arpit',
            contact:9411890675,
            postTime:'12-10-2020',
            description: 'Card content description',
            imageurl:[]
        },
        {   
            organisationName:'Arpit',
            contact:9411890675,
            postTime:'12-10-2020',
            description: 'Card content description',
            imageurl:[]
        },
        {   
            organisationName:'Arpit',
            contact:9411890675,
            postTime:'12-10-2020',
            description: 'Card content description',
            imageurl:[]
        },
    ],
    Events:[
        {   
            organiserName:'Arpit',
            contact:9411890675,
            postTime:'12-10-2020',
            description: 'Card content description',
            imageurl:[]
        },
        {   
            organiserName:'Arpit',
            contact:9411890675,
            postTime:'12-10-2020',
            description: 'Card content description',
            imageurl:[]
        },
        {   
            organiserName:'Arpit',
            contact:9411890675,
            postTime:'12-10-2020',
            description: 'Card content description',
            imageurl:[]
        },
        {   
            organiserName:'Arpit',
            contact:9411890675,
            postTime:'12-10-2020',
            description: 'Card content description',
            imageurl:[]
        },
    ],
    currentfilter:[]
}

const DiscoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTERS: {
            //console.log('hahaha')
            return { ...state, currentfilter: action.selectedfilters }
        }
        case 'ADD_DONATION': {
            const {title, description,Date,files,latlng} = action
            const donation = {
                donorName: title,
                description: description,
                contact: '94111890675',
                imageurl: files,
                postTime: Date,
                latLng:latlng
            }
            console.log(donation)
            return { ...state,Donations: [...state.Donations,donation]}
        }
    }
    return state;
}

export default DiscoverReducer;