import { ADD_ORDER, SET__ORDERS } from "../actions/orders";
import Order from '../../models/order';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET__ORDERS: {
            return {
                orders: payload
            }
        }
        case ADD_ORDER:
            const newOrder = new Order( 
                payload.id, 
                payload.cartItems, 
                payload.totalAmount, 
                payload.date );

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default: 
            return state;
    }
}
