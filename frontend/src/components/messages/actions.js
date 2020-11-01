import axios from 'axios';
import { ACTION } from './constants';

export const getThreads = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/message/getThreads')
        dispatch({
            type: ACTION.GET_THREADS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: 'GET_ERRORS',
            payload: err.response.data
        })
    }
}

export const updateThread = (thread) => dispatch => {
    dispatch({
        type: ACTION.UPDATE_THREAD,
        payload: thread
    })
}


export const sendMessage = (threadId, body, type) => async dispatch => {
    try {
        const res = await axios.post('/api/message/send', {
            threadId,
            body,
            type
        })
        dispatch({
            type: ACTION.UPDATE_THREAD,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: 'GET_ERRORS',
            payload: err.response.data
        })
    }
}

export const startThread = (receiver) => async dispatch => {
    try {
        const res = await axios.post('/api/message/new-thread', {
            receiver
        })
        dispatch({
            type: ACTION.UPDATE_THREAD,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: 'GET_ERRORS',
            payload: err.response.data
        })
    }
}