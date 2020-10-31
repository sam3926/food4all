
import axios from "axios"

export const addDonation = (data,contact) => async (dispatch) => {
    console.log('this is add donations',data);
    const res = await axios.post('/api/donation/create',{donation:data});
    console.log(res.data.donation);    
    dispatch({
        type: 'ADD_DONATION',
        payload:{...res.data.donation,contact:contact}
    })
}