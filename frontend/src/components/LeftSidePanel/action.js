import { ACTION } from './constants';
import axios from "axios";

export const getLeftDetails = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/users/left-details')
        dispatch({
            type: ACTION.GET_LEFT_DETAILS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: 'GET_ERRORS',
            payload: err.response.data
        })
    }

}
export const changeFilters = (data) => async (dispatch) => {
    dispatch({
        type: ACTION.CHANGE_FILTERS,
        selectedfilters: data,
    });
};
