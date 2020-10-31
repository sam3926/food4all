import { ACTION } from './constants';

const initialState = {
    threads: [],
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_THREADS: {
            state = { ...state, threads: [...action.payload] }
            break;
        }
        case ACTION.UPDATE_THREAD: {
            const updatedThreads = state.threads.filter(x => x._id != action.payload._id)
            state = { ...state, threads: [action.payload, ...updatedThreads] }
            break;
        }
        case 'LOGOUT': {
            state = { ...initialState }
            break;
        }
    }
    return state
}


export default messageReducer;