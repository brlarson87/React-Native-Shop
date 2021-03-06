import Product from "../../models/product";

export const DELETE__PRODUCT = "DELETE__PRODUCT";
export const CREATE__PRODUCT = "CREATE__PRODUCT";
export const EDIT__PRODUCT = "EDIT__PRODUCT";
export const SET__PRODUCTS = "SET__PRODUCTS";



export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch('https://rn-shop-app-156d9-default-rtdb.firebaseio.com/products.json');

            if(!response.ok) {
                throw new Error("Something went wrong!")
            }

            const resData = await response.json();
            const loadedProducts = [];

            for(const key in resData) {
                const { imageUrl, title, description, price, ownerId } = resData[key];
                loadedProducts.push(new Product(
                    key, 
                    ownerId, 
                    imageUrl, 
                    title, 
                    description, 
                    price
                ));
            }
            dispatch({ type: SET__PRODUCTS, 
                       payload: { 
                           allProducts : loadedProducts, 
                           userProducts: loadedProducts.filter(p => p.ownerId === userId) 
                        }
                    });
        } catch (error) {
            throw error;
        }
        
    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`https://rn-shop-app-156d9-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE' });

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }

            dispatch({ type: DELETE__PRODUCT, payload: productId });
        } catch (error) {
            throw error;
        }
        
    }
    
}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-shop-app-156d9-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        });

        const resData = await response.json();

        dispatch({ 
            type: CREATE__PRODUCT, 
            payload: {
                id: resData.name, 
                title, 
                description, 
                imageUrl, 
                price,
                ownerId: userId
            }});
    }
}

export const editProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`https://rn-shop-app-156d9-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
            });

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }
            
            dispatch({ type: EDIT__PRODUCT, payload: { id, title, description, imageUrl }});
        } catch (error) {
            throw error;
        }
    } 
  
}