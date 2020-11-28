import { ACTION } from "../Home/constants";

const initialState = {
    postComments: [],
    posts: [],
    currentfilter: []
}

const HomeCenterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            return { ...state, someData: action.payload }
        }
        case 'GET_POST': {
            state = { ...state, posts: action.payload, postComments: action.allcomments };
            break;
        }
        case 'ADD_POST': {
            let posts = [...state.posts, action.post]
            let postComments = [...state.postComments, action.comment]
            return {
                ...state,
                posts: posts,
                postComments: postComments
            }
        }
        case 'CHANGE_LIKE': {
            
            console.log('Change_like', action.payload);
            return { ...state, posts:state.posts.map(p => p._id ==action.payload._id? {...p,likes:[...action.payload.likes],noOfLikes:action.payload.noOfLikes}:{...p}) }
        }
        case 'ADD_COMMENT': {
            return { ...state, postComments: state.postComments.map(p => p.postId == action.id ? { ...p, comments: [...p.comments, action.comment] } : { ...p }) }
        }
    }
    return state;
}

export default HomeCenterReducer;