const initialState = {
   
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