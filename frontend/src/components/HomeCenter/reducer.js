import { ACTION } from "../Home/constants";

const initialState = {
    postComments: [
        {
            postId: 1,
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
            postId: 2,
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
            postId: 3,
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
            postId: 4,
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
        { user_name: 'Arpit', title: 'Felt so good to finally do something good in my life', date: '28-10-20', description: 'Card Content', id: 1, likes: 20, liked: false, shares: 30 },
        { user_name: 'Dinkar', title: 'Vote for me in coming election', date: '28-10-20', description: 'Card Content', id: 2, likes: 30, liked: false, shares: 17 },
        { user_name: 'Sudheesh', title: 'Feeding someone is so fulfilling!', date: '28-10-20', description: 'Card Content', id: 3, likes: 34, liked: false, shares: 16 },
        { user_name: 'Shreyansh', title: 'What am i doing here?', date: '28-10-20', description: 'Card Content', id: 4, likes: 31, liked: false, shares: 14 }
    ],
    currentfilter: ['Donations', 'Events', 'Posts']
}

const HomeCenterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            return { ...state, someData: action.payload }
        }
        case 'GET_POST': {
            console.log('this should work')
            console.log(action.allcomments)
            state = {...state,posts:action.payload,postComments:action.allcomments};
            break;
        }
        case 'ADD_POST': {
            console.log('inside the ADD post')
            console.log(action.post)
            let posts = [...state.posts, action.post]
            let postComments = [...state.postComments,action.comment]
            console.log(posts)
            return {
                ...state,
                posts: posts,
                postComments: postComments
            }
        }
        case 'CHANGE_LIKE': {
            //console.log(action.value)
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
            console.log(posts)
            return { ...state, posts }
        }
        case 'ADD_COMMENT': {
            return { ...state, postComments: state.postComments.map(p => p.postId == action.id ? { ...p, comments: [...p.comments, action.comment] } : { ...p }) }
        }
    }
    return state;
}

export default HomeCenterReducer;