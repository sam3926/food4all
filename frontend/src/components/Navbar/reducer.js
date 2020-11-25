import { ACTION } from "./constants";

const initialState = {
    currentRoute: "home",
    unreadNotifications: false,
    unreadMessages: false,
    notifications: [],
}

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.SET_CURRENT_ROUTE: {
            state = { ...state, currentRoute: action.payload }
            break;
        }

        case ACTION.GET_NOTIFICATIONS: {
            state = { ...state, notifications: action.payload.notifications.reverse(), unreadNotifications: action.payload.unreadNotifications, unreadMessage: action.payload.unreadMessage }
            break;
        }

        case ACTION.GET_SINGLE_NOTIFICATION: {
            state = { ...state, notifications: [action.payload, ...state.notifications], unreadNotifications: true }
            break;
        }

        case ACTION.READ_NOTIFICATIONS: {
            state = { ...state, unreadNotifications: false }
            break;
        }
        case ACTION.READ_MESSAGES: {
            state = { ...state, unreadMessages: false }
            break;
        }
        case ACTION.GET_UNREAD_MESSAGE: {
            state = { ...state, unreadMessages: true }
            break;
        }

        case 'LOGOUT': {
            state = { ...initialState }
            break;
        }
    }
    return state;
}

export default navReducer;