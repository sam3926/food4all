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
            let posts = [...state.posts];
            let Post = posts.find((post) => { return post._id == action.id })
            if (Post.liked) {
                Post.noOfLikes = Post.noOfLikes - 1
                Post.liked = false;
            }
            else {
                Post.noOfLikes = Post.noOfLikes + 1
                Post.liked = true;
            }
            return { ...state, posts }
        }
        case 'ADD_COMMENT': {
            return { ...state, postComments: state.postComments.map(p => p.postId == action.id ? { ...p, comments: [...p.comments, action.comment] } : { ...p }) }
        }
    }
    return state;
}

export default HomeCenterReducer;