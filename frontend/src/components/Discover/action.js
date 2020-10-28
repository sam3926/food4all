import { ACTION } from './constants';
export const changeFilters = (data) => async (dispatch) => {
    dispatch({
        type: ACTION.CHANGE_FILTERS,
        selectedfilters: data,
    });
};

export const pendingDonation = (data) => async (dispatch) => {
    dispatch({
        type: 'PENDING_DONATION',
        ...data
    })
}