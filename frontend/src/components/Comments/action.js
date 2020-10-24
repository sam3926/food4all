export const addComment = (id,comment) => async (dispatch) => {
    // const res = await axios.get("/some-api-route");
     dispatch({
         type: 'ADD_COMMENT',
         id:id,
         comment:comment
     });
 };
 