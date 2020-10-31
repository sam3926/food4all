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
        console.log("error in getLeftDetails")
    }

}
export const changeFilters = (data) => async (dispatch) => {
    dispatch({
        type: ACTION.CHANGE_FILTERS,
        selectedfilters: data,
    });
};
