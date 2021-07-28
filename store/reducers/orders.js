import { ADD_ORDER } from "../actions/orders";
import Order from '../../models/order';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case ADD_ORDER:
            const newOrder = new Order( 
                new Date().toString() , 
                payload.cartItems, 
                payload.totalAmount, 
                new Date() );

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default: 
            return state;
    }
}
