import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, payload: {userId, token}})
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBui7B_mkS5MvVVGiBu2jZWpp9CpNt7bXc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            })

            if(!response.ok) {
                const errorResData = await response.json();
                const errId = errorResData.error.message
                let message = "Something went Wrong!";
                if(errId === 'EMAIL_EXISTS') {
                    message = "This email already exists!"
                } else if(errId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                    message = 'You have tried to login too many times. Try again later!'
                }
                throw new Error(message);
            }

            const resData = await response.json();
            const { token, localId, expiresIn } = resData;
            dispatch(authenticate(localId, token, parseInt(expiresIn) * 1000));
            const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
            saveDataToStorage(token, localId, expirationDate);
        } catch (error) {
            throw error;
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBui7B_mkS5MvVVGiBu2jZWpp9CpNt7bXc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            })

            if(!response.ok) {
                const errorResData = await response.json();
                const errId = errorResData.error.message
                let message = "Something went Wrong!";
                if(errId === 'EMAIL_NOT_FOUND') {
                    message = "This email does not exist!"
                } else if(errId === 'INVALID_PASSWORD') {
                    message = 'Incorrect Password!'
                }
                throw new Error(message);
            }

            const resData = await response.json();
            const { token, localId, expiresIn } = resData;
            dispatch(authenticate(localId, token, parseInt(expiresIn) * 1000));
            const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
            saveDataToStorage(token, localId, expirationDate);
        } catch (error) {
            throw error;
        }
    }
}

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
}

const clearLogoutTimer = () => {
    if(timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => 
AsyncStorage.setItem('userData', JSON.stringify({
    token, 
    userId, 
    expiryDate: expirationDate.toISOString() 
}));