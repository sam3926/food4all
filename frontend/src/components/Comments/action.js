import axios from 'axios';
export const addComment = (id,comment) => async (dispatch) => {
    const postId = id;
    await axios.post(`/api/comment/add/${id}`,{content:comment.content});

     dispatch({
         type: 'ADD_COMMENT',
         id:id,
         comment:comment
     });
 };
 