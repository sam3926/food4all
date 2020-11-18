import axios from "axios"

export const addEvent = (data) => async (dispatch) => {
    const res = await axios.post('/api/event/create',{event:data});
    console.log(res.data);
    dispatch({
        type: 'ADD_EVENT',
        payload:res.data.event
    })
}
