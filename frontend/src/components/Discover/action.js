import { ACTION } from './constants';
import axios from "axios"
export const changeFilters = (data) => async (dispatch) => {
    dispatch({
        type: ACTION.CHANGE_FILTERS,
        selectedfilters: data,
    });
};
export const getOrganisation = () => async (dispatch) =>{
    const res = await axios.get('api/users/organisations')
    dispatch({
        type:'GET_ORGANISATION',
        organisations: res.data.organisations
    })
}
export const getDonation = () => async (dispatch) =>{
    const res = await axios.get('/api/donation/donations');
    dispatch({
        type:'GET_DONATION',
        donations: res.data.donations
    })
}
export const pendingDonation = (data) => async (dispatch,getState) => {
    const userId = getState().authReducer.user.userId
    await axios.post('/api/donation/changeStatus',{_id:data._id,status:'pending'})
    dispatch({
        type: 'PENDING_DONATION',
        payload:data,
        userId
    })
}