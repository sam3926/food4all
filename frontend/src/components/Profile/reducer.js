import { ACTION } from "./constants";

const initialState = {
    suggestedPages: [
        {
            title: 'User 1',
        },
        {
            title: 'User 2',
        },
        {
            title: 'User 3',
        },
        {
            title: 'User 4',
        }
    ],
    profileDetails: {
        profilePic: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=400",
        avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=50",
        name: "",
        description: "",
        contact: "",
        address: "",
        followers: [],
        following: [],
        donations: [],
        history: [],
        posts: [],
        noFed: 0,
        noDonations: 0
    },

    Pending: [
        { donorname: 'Arpit1', posttime: '000', Description: 'Brief description' }
    ],

    currentTab: "timelinePost",
    followers: [],
    following: []

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload }
            break;

        }
        case ACTION.GET_SUGGESTED_PAGES: {
            state = { ...state, suggestedPages: action.payload }
            break;
        }
        case ACTION.CHANGE_TAB: {
            state = { ...state, currentTab: action.payload }
            break;
        }

        case ACTION.GET_PROFILE: {
            state = { ...state, profileDetails: { ...action.payload, followers: [...action.payload.followers], following: [...action.payload.following] } }
            break;
        }

        case ACTION.UPDATE_PROFILE_PIC: {
            state = { ...state, profileDetails: { ...state.profileDetails, ...action.payload } }
            break;
        }
        case ACTION.GET_FOLLOWERS: {
            state = { ...state, followers: [...action.payload] }
            break;
        }
        case ACTION.GET_FOLLOWING: {
            state = { ...state, following: [...action.payload] }
            break;
        }
        case 'PENDING_DONATION': {
            const { donorName, postTime, description } = action.payload
            const PendingDonation = {
                donorname: donorName,
                Description: description,
                posttime: postTime
            }
            return { ...state, Pending: [...state.Pending, PendingDonation] }
        }
        case 'LOGOUT': {
            state = { ...initialState }
            break;
        }
        case 'GET_PENDING_DONATION': {
            console.log(action.payload)
            return { ...state, Pending: action.payload }

        }
        case 'REJECT_DONATION': {
            return { ...state, Pending: state.Pending.filter(pending => pending._id !== action.id) }
        }
        case 'ACCEPT_DONATION':{
            return {...state,Pending: state.Pending.filter(pending => pending._id !==action.payload._id)}
        }
        case 'ADD_HISTORY':{
            console.log('reciveved from the donate')
            console.log(action.payload)
            return {...state,profileDetails:action.payload}
        }
    }
    return state;
}

export default profileReducer;