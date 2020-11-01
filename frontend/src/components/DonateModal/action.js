
import axios from "axios"

export const addDonation = (data,contact) => async (dispatch) => {
    const res = await axios.post('/api/donation/create',{donation:data});
    dispatch({
        type: 'ADD_DONATION',
        payload:{...res.data.donation,contact:contact}
    })
}