
export const addPost = (post) => async (dispatch) => {
    //const res = await axios.get("/some-api-route");
    dispatch({
        type: 'ADD_POST',
        post: post,
    });
};
