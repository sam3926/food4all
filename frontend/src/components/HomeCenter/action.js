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
    console.log('this is the like thing',id,value);
    const val = value? -1:1;
    const res = await axios.post('/api/posts/like', {id:id,value:val});
    console.log('lets see thevalue here',res.data);
    dispatch({
        type: 'CHANGE_LIKE',
        payload: res.data.post
    });
};
