import { ACTION } from "./constants";
import axios from "axios";

export const getSomeData = (data) => async (dispatch) => {
    await axios.get("/some-api-route");
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: data,
    });
};
