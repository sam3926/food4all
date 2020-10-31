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
export const getPendingDonations = () => async (dispatch,getState) =>{
    const userId = getState().authReducer.user.userId
    const checkvisibilty =(donation) => {
        return (donation.status.localeCompare("pending") == 0 && donation.donorId == userId)
      }
    const donations = getState().DiscoverReducer.Donations.filter(checkvisibilty);
    //console.log(donations);
    dispatch({
        type: 'GET_PENDING_DONATION',
        payload: donations
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
export const rejectDonation = (id) => async(dispatch) =>{
    const res = await axios.post('api/donation/reject',{_id:id})
    console.log(res.data);
    dispatch({
        type:'REJECT_DONATION',
        id:id
    })
}