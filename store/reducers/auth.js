import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATE:
            return {
                ...state,
                token: payload.token,
                userId: payload.userId
            }
        case LOGOUT:
            return initialState;        
        default:
            return state;     
    }
}