import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { ScrollView, 
         StyleSheet, 
         View, 
         KeyboardAvoidingView, 
         Text, 
         Button,
         ActivityIndicator,
         Alert
        } from 'react-native';
import { useDispatch } from 'react-redux';

import { signup, login } from '../../store/actions/auth';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM__UPDATE = "FORM__UPDATE";

const formReducer = (state, action) => {
    const { type } = action;
    if(type === FORM__UPDATE) {
        const updateValues = {
            ...state.inputValues,
            [action.input] : action.value
        }

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let formIsValid = true;
        for (const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key];
        }

        return {
            formIsValid: formIsValid,
            inputValues: updateValues,
            inputValidities: updatedValidities
        }
    }
    return state;

}

const AuthScreen = props => {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [err, setErr] = useState();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        }, 
        inputValidities: {
            email: false,
            password: false
        }, 
        formIsValid: false
    });

    useEffect(() => {
        if(err) {
            Alert.alert('An error occured', err, [{ text: 'Okay' }])
        }
    }, [err])
  const dispatch = useDispatch();
  
  const authHandler = async () => {
      let action;
      if(isSignedUp) {
          action = signup(formState.inputValues.email, formState.inputValues.password);
      } else {
          action = login(formState.inputValues.email, formState.inputValues.password)
      }
      setErr(null);
      setIsLoading(true);
      try {
        await dispatch(action);
      } catch (error) {
        setErr(err.message)  
      }
      setIsLoading(false);
  };

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({ 
            type: FORM__UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier 
        });
    }, [dispatchFormState]);

   

  if(isloading) {
      return (
          <View style={styles.center}>
              <ActivityIndicator size="large" color={Colors.primary}/>
          </View>
      )
  }  


  return (
     <KeyboardAvoidingView 
        behavior='padding' 
        KeyboardAvoidingView={50} 
        style={styles.screen}>
         <View style={styles.authContain}>
            <ScrollView>
                <Input 
                    id="email" 
                    label="E-Mail" 
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter a valid email address"
                    onInputChange={inputChangeHandler}
                    initialValue=''
                />
                <Input 
                    id="password" 
                    label="Password" 
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorText="Please enter a correct password"
                    onInputChange={inputChangeHandler}
                    initialValue=''
                />
                <Button 
                    title={isSignedUp ? 'Signup' : 'Login'} 
                    color={Colors.primary} 
                    onPress={authHandler}
                />
                <Button 
                    title={`Switch to ${isSignedUp ? "Login" : "Signup"}`} 
                    color={Colors.accent} onPress={() => {
                        setIsSignedUp(prevState => !prevState);
                    }}
                />
            </ScrollView>
         </View>
     </KeyboardAvoidingView> 
    
  )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    authContain: {
        marginTop: 100,
        width: '80%',
        maxWidth: 400
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
});

export default AuthScreen;
