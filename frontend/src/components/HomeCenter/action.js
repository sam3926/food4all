
export const changelike = (id,mode) => async (dispatch) => {
   // const res = await axios.get("/some-api-route");
    dispatch({
        type: 'CHANGE_LIKE',
        id:id,
        mode: mode
    });
};
