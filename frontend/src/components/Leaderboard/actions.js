import { ACTION } from './constants';
import axios from "axios"
export const changeFilters = (data) => async (dispatch) => {
    dispatch({
        type: ACTION.CHANGE_FILTERS,
        selectedfilters: data,
    });
};
export const getList = () => async (dispatch) => {
    const  res = await axios.get('/api/users/leaderboard');
    console.log(res.data);
    dispatch({
        type:'GET_LIST',
        payload: res.data.list
    })
}