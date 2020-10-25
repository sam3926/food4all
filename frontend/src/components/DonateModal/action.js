export const addDonation = (data) => async (dispatch) => {
    dispatch({
        type: 'ADD_DONATION',
        ...data
    })
}