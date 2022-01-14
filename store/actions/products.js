export const DELETE__PRODUCT = "DELETE__PRODUCT";
export const CREATE__PRODUCT = "CREATE__PRODUCT";
export const EDIT__PRODUCT = "EDIT__PRODUCT";



export const deleteProduct = productId => {
    return { type: DELETE__PRODUCT, payload: productId };
}

export const createProduct = (title, description, imageUrl, price) => {
    return { type: CREATE__PRODUCT, payload: { title, description, imageUrl, price} };
}

export const editProduct = (id, title, description, imageUrl) => {
    return { type: EDIT__PRODUCT, payload: { id, title, description, imageUrl} };
}