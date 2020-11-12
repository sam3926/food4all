import { ACTION } from './constants';
import axios from "axios"
export const changeFilters = (data) => async (dispatch) => {
    dispatch({
        type: ACTION.CHANGE_FILTERS,
        selectedfilters: data,
    });
};