import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders'

import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0    
};

export default (state = initialState, action) => {
    const { type, payload } = action

    switch(type) {
        case ADD_TO_CART: 
            const prodPrice = payload.price;
            const prodTitle = payload.title;
            let newOrUpdatedCartItem;

            if(state.items[payload.id]) {

                 newOrUpdatedCartItem = new CartItem(
                    state.items[payload.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[payload.id].sum + prodPrice
                );
                
            } else {
                newOrUpdatedCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }

            return {
                ...state,
                items: { ...state.items, [payload.id] : newOrUpdatedCartItem},
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART:
            let itemSelected = state.items[payload];
            const {productTitle, productPrice, quantity, sum } = itemSelected;
            let updatedCartItems;

            if(quantity > 1) {
                const updatedCartItem = new CartItem(quantity - 1, productPrice, productTitle, sum - productPrice);
                updatedCartItems = { ...state.items, [payload] : updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[payload];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: Math.abs(state.totalAmount - productPrice)
            }
        case ADD_ORDER:
            return initialState;
        default: 
            return state;
    }
};