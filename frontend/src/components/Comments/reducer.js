const initialState = {
    postComments:[
        {
            id:1,    
            comments: [
                {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{this.state.value}</p>,
                    datetime: moment().fromNow(),
                }
            ]
        }
    ]
}


const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COMMENTS': {
            state = { ...state, someData: action.payload }
        }
    }
    return state;
}

export default commentReducer;