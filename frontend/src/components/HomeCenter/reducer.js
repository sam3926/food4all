import { ACTION } from "../Home/constants";

const initialState = {
    postComments:[
        {
            id:1,    
            comments: [
                {
                    author: 'Arpit Bandejiya',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: 'hello there',
                    datetime: "2000-12-11",
                }
            ]
        },
        {
            id:2,    
            comments: [
                {
                    author: 'Krishnendu',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: 'hello there',
                    datetime: "2000-12-11",
                }
            ]
        },
        {
            id:3,    
            comments: [
                {
                    author: 'Shreyansh',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: 'hello there',
                    datetime: "2000-12-11",
                }
            ]
        },
        {
            id:4,    
            comments: [
                {
                    author: 'Dinkar',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: 'hello there',
                    datetime: "2000-12-11",
                }
            ]
        },
        
    ],
    posts: [
        {user_name:'Arpit', description:'Card Content',id:1,likes:20,liked:false,shares:30},
        {user_name:'Dinkar', description:'Card Content',id:2,likes:30,liked:false,shares:17},
        {user_name:'Sudheesh', description:'Card Content',id:3,likes:34,liked:false,shares:16},
        {user_name:'Shreyansh', description:'Card Content',id:4,likes:31,liked:false,shares:14}
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
            const comment = {
                id:action.post.id,
                comments:[]
            }
            let postComments = [...state.postComments,comment]
            console.log(posts)
            return {
                 ...state,
                 posts:posts,
                 postComments:postComments
                }
        }
        case 'CHANGE_LIKE': {
            console.log(action.id)
            let posts = [...state.posts];
            let Post = posts.find((post) => { return post.id == action.id})
            if(Post.liked){
                Post.likes = Post.likes - 1
                Post.liked = false;
            }
            else{
                Post.likes = Post.likes + 1
                Post.liked = true;
            }
            console.log(posts)    
            return {...state,posts}
        }
        case 'ADD_COMMENT':{
            
            var postComments = [...state.postComments]
            var allcomments = postComments.find( (comment) => comment.id == action.id )
            allcomments.comments = [...allcomments.comments, action.comment]

            console.log(postComments)
            return {...state}
        }
    }
    return state;
}

export default HomeCenterReducer;