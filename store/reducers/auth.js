import { LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN:
            return {
                ...state,
                token: payload.token,
                userId: payload.userId
            }
        case SIGNUP: 
            return {
                ...state,
                token: payload.token,
                userId: payload.userId
            }    
        default:
            return state;     
    }
}