import { ACTION } from "./constants";
import axios from "axios";
export const setCurrentRoute = (route) => async (dispatch) => {
    if (route == "messages") {
        dispatch(readMessages())
        await axios.get('/api/users/read-messages')
    }

    if (route == "notifications") {
        dispatch(readNotifications())
        await axios.get('/api/users/read-notifications')
    }
    else
        dispatch({
            type: ACTION.SET_CURRENT_ROUTE,
            payload: route,
        });
};

export const getSingleNotification = (notification) => async (dispatch) => {
    dispatch({
        type: ACTION.GET_SINGLE_NOTIFICATION,
        payload: notification,
    })
}

export const getNotifications = () => async (dispatch) => {

    const res = await axios.get('/api/users/notifications');
    dispatch({
        type: ACTION.GET_NOTIFICATIONS,
        payload: res.data,
    })
}

export const getUnreadMessage = () => dispatch => {
    dispatch({
        type: ACTION.GET_UNREAD_MESSAGE
    })
}

export const readNotifications = () => dispatch => {
    dispatch({
        type: ACTION.READ_NOTIFICATIONS
    })
}

export const readMessages = () => dispatch => {
    dispatch({
        type: ACTION.READ_MESSAGES,
    })
}