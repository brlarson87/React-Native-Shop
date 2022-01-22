export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN"

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
            dispatch({ type: SIGNUP, payload: { token: resData.idToken, userId: resData.localId }});
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
            console.log(resData);
            dispatch({ type: LOGIN, payload: { token: resData.idToken, userId: resData.localId }});
        } catch (error) {
            throw error;
        }
    }
}