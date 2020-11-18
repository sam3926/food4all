import { ACTION } from './constants';
import axios from "axios"
export const changeFilters = (data) => async (dispatch) => {
    dispatch({
        type: ACTION.CHANGE_FILTERS,
        selectedfilters: data,
    });
};

export const getEvent = (data) => async (dispatch) => {
    const res = await axios.get('/api/event/');
    console.log(res.data);
    dispatch({
        type: 'GET_EVENT',
        payload:res.data.events
    })
}
