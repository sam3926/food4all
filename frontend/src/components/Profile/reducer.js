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

    // donations: [

    //     {
    //         title: "34 kg food",
    //         description: "Create a services site 2015-09-01",
    //         status: "active, posted on 29-10-2020",
    //         imageurl: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"]
    //     },
    //     {
    //         title: "food",
    //         description: "Create a services site 2015-09-01",
    //         status: "accepted by XXX on 28-10-20",
    //         imageurl: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"]
    //     },
    //     {
    //         title: "food",
    //         description: "food doof food",
    //         status: "accepted by XYXY on 26-10-20",
    //         imageurl: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"]
    //     },
    // ],

    // timelinePost: [
    //     {
    //         color: "green",
    //         text: "Create a services site 2015-09-01",
    //         dot: "clock"
    //     },
    //     {
    //         text: "Solve initial network problems 2015-09-01",
    //         dot: "clock"
    //     },
    //     {
    //         color: "green",
    //         text: "Developer, nofoodwasted | IIT Tirupati | wants to live in a world where no food is wasted",
    //         dor: "clock"
    //     },
    //     {
    //         color: "red",
    //         text: "Network problems being solved 2015-09-01",
    //         dot: "clock"
    //     },
    //     {
    //         text: "Create a services site 2015-09-01",
    //     },
    //     {
    //         color: "green",
    //         text: "Technical testing 2015-09-01",
    //         dot: "clock"
    //     },

    // ],

    // posts: [
    //     { user_name: 'Arpit', title: 'Felt so good to finally do something good in my life', date: '28-10-20', description: 'Card Content', id: 1, likes: 20, liked: false, shares: 30 },
    //     { user_name: 'Dinkar', title: 'Vote for me in coming election', date: '28-10-20', description: 'Card Content', id: 2, likes: 30, liked: false, shares: 17 },
    //     { user_name: 'Sudheesh', title: 'Feeding someone is so fulfilling!', date: '28-10-20', description: 'Card Content', id: 3, likes: 34, liked: false, shares: 16 },
    //     { user_name: 'Shreyansh', title: 'What am i doing here?', date: '28-10-20', description: 'Card Content', id: 4, likes: 31, liked: false, shares: 14 }
    // ],

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
    }
    return state;
}

export default profileReducer;