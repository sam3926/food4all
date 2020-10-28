import { ACTION } from "../EditProfile/constants";

const initialState = {
    user: [
        {
        name: 'Krishnendu Sudheesh',
        email:"xyz",
        contact: "9373321987",
        address: "777 Brockton Avenue, Abington MA 2351",
        description:'Brief Description',
        id:1
        },
    ],
}

const EditReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload }
        }
    }
    return state;
}

export default EditReducer; 