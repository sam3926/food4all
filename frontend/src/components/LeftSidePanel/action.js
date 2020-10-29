import { ACTION } from './constants';
import axios from "axios";

export const initialiseState = () => async (dispatch) => {
    const userId = '5f9943f917f00933e4b3ec88';
    const res = await axios.get(`/api/users/profile/${userId}`)
    console.log(res.data)
    dispatch({
        type: 'INITIAL_STATE',
        payload : res.data
    })
}
export const changeFilters = (data) => async (dispatch) => {
    dispatch({
        type: ACTION.CHANGE_FILTERS,
        selectedfilters: data,
    });
};
