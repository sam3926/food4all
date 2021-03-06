import axios from "axios"

export const addPost = (post) => async (dispatch) => {
    const res = await axios.post("/api/posts/create", { post });
    dispatch({
        type: 'ADD_POST',
        post: res.data.post,
        comment:res.data.comment
    });
};
