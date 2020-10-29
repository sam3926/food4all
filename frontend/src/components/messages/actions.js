import axios from 'axios';
import {
    GET_CHATS,
    AFTER_POST_MESSAGE
} from './constants';
// import { CHAT_SERVER } from '../components/Config.js';

export function getChats() {
    const request = axios.get('/api/getChats')
        .then(response => response.data);

    return {
        type: GET_CHATS,
        payload: request
    }
}

export function afterPostMessage(data) {

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}

