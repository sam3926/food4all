import { ACTION } from "./constants";
import axios from "axios";

export const getSomeData = (data) => async (dispatch) => {
    const res = await axios.get("/some-api-route");
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: data,
    });
};

export const getProfile = () => async (dispatch, getState) => {
    const userId = getState().authReducer.user.userId
    const res = await axios.get(`/api/users/profile/${userId}`)
    // const res = await axios.get('/api/test')
    console.log(res.data)
    dispatch({
        type: ACTION.GET_PROFILE,
        payload: res.data
    })
}

export const getSuggestedPages = () => async (dispatch) => {
    const res = await axios.get("/api/path/to/sugPage");
    dispatch({
        type: ACTION.GET_SUGGESTED_PAGES,
        payload: res.data
    })
}

export const changeTab = tab => (dispatch) => {

    // const res = await axios.get(`/api/route/${tab}`)
    //MAKE ANOTHER DISPATCH TO UPDATE STATE

    dispatch({
        type: ACTION.CHANGE_TAB,
        payload: tab
    })
}

export const uploadProfilePic = profilePic => (dispatch) => {
    dispatch({
        type: ACTION.UPDATE_PROFILE_PIC,
        payload: profilePic
    })
}