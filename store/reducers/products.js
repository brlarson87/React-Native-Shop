import PRODUCTS from '../../data/dummy-data';
import { CREATE__PRODUCT, DELETE__PRODUCT, EDIT__PRODUCT, SET__PRODUCTS } from '../actions/products';

import Product from "../../models/product";

const initialState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET__PRODUCTS: {
            return {
                ...state,
                availableProducts: payload.allProducts,
                userProducts: payload.userProducts
            }
        }
        case DELETE__PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== payload),
                availableProducts: state.availableProducts.filter(product => product.id !== payload)
            }
        case CREATE__PRODUCT:
            
            const newProd = new Product(
                payload.id, 
                payload.ownerId, 
                payload.title, 
                payload.imageUrl, 
                payload.description, 
                payload.price
            );

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProd),
                userProducts: state.userProducts.concat(newProd)
            }
        case EDIT__PRODUCT:
            const { id } = payload;
            const productIndex = state.userProducts.findIndex(prod => prod.id === id);
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === id);

            const updatedProduct = new Product(
                payload.id, 
                state.userProducts[productIndex].ownerId, 
                payload.title, 
                payload.imageUrl, 
                payload.description, 
                state.userProducts[productIndex].price
            );

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;


            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }

    }
    return state;
};