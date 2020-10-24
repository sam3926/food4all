import { ACTION } from "./constants";

export const setCurrentRoute = (route) => async (dispatch) => {
    dispatch({
        type: ACTION.SET_CURRENT_ROUTE,
        payload: route,
    });
};
