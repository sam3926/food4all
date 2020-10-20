import { ACTION } from "../Home/constants";

const initialState = {
    posts: [
        {user_name:'Arpit', description:'Card Content',id:1,likes:20,shares:30},
        {user_name:'Dinkar', description:'Card Content',id:2,likes:30,shares:17},
        {user_name:'Sudheesh', description:'Card Content',id:3,likes:34,shares:16},
        {user_name:'Shreyansh', description:'Card Content',id:4,likes:31,shares:14}
    ],
    currentfilter:['Donations','Events','Posts']
}

const HomeCenterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            return { ...state, someData: action.payload }
        }
        case 'ADD_POST': {
            console.log('inside the ADD post')
            console.log(action.post)
            let posts = [...state.posts,action.post]
            console.log(posts)
            return {
                 ...state,
                 posts:posts
                }
        }
        case 'CHANGE_LIKE': {
            console.log(action.id)
            let posts = [...state.posts];
            let Post = posts.find((post) => { return post.id == action.id})
            Post.likes = Post.likes + 1
            return {...state,posts}
        }
    }
    return state;
}

export default HomeCenterReducer;