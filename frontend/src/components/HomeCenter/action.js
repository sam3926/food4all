import axios from "axios"

export const getPost = () => async (dispatch) => {
    const res = await axios.get('/api/posts/');
    dispatch({
        type:'GET_POST',
        payload: res.data.posts,
        allcomments: res.data.allcomments,
        avatars: res.data.avatars
    })
}
export const changelike = (id,value) => async (dispatch) => {
    value? (await axios.post('/api/posts/like', {id:id,value:-1})):(await axios.post('/api/posts/like', {id:id,value:1}));
    dispatch({
        type: 'CHANGE_LIKE',
        id:id,
        value:value
    });
};
