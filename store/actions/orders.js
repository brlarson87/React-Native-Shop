export const ADD_ORDER = "ADD_ORDER";
export const SET__ORDERS = "SET__ORDERS";

import Order from '../../models/order';

export const fetchOrders = () => {
    return async dispatch => {

        try {
            const response = await fetch('https://rn-shop-app-156d9-default-rtdb.firebaseio.com/orders/u1.json');

            if(!response.ok) {
                throw new Error("Something went wrong!")
            }

            const resData = await response.json();
            const loadedOrders = [];

            for(const key in resData) {
                const {cartItems, totalAmount, date} = resData[key];
                loadedOrders.push(new Order(
                    key, 
                    cartItems,
                    totalAmount,
                    new Date(date)
                ));
            }
            dispatch({ type: SET__ORDERS, payload: loadedOrders });
        } catch (error) {
            throw error;
        }
        
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        try {
            const response = await fetch('https://rn-shop-app-156d9-default-rtdb.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if(!response.ok) {
            throw new Error("Something went wrong!");
        }

        const resData = await response.json();

        dispatch({ 
            type: ADD_ORDER, 
            payload: { id: resData.name, cartItems, totalAmount, date }
        });
        } catch (error) {
            throw error;
        }
        
    }
    
}