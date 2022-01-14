import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT__CHANGE = "INPUT__CHANGE";
const INPUT__BLUR = 'INPUT__BLUR';


const inputReducer = (state, action) => {
    switch(action.type) {
        case INPUT__CHANGE:
          return {
            ...state,
            value: action.value,
            isValid: action.isValid
          }
        case INPUT__BLUR:
          return {
            ...state,
            touched: true
          };
        default:
            return state;
    }

};

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        onInputChange(id, inputState.value, inputState.isValid);
    }, [inputState, onInputChange, id])
    
    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
          isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
          isValid = false;
        }
        if (props.min != null && +text < props.min) {
          isValid = false;
        }
        if (props.max != null && +text > props.max) {
          isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
          isValid = false;
        }
        dispatch({ type: INPUT__CHANGE, value: text, isValid: isValid });
      };

    
      const lostFocusHandler = () => {
        dispatch({ type: INPUT__BLUR });
      };

    return (
        <View style={styles.formControl}>
                    <Text style={styles.heading}>{props.label}</Text>
                    <TextInput
                        {...props} 
                        style={styles.input} 
                        value={inputState.value} 
                        onChangeText={textChangeHandler}
                        onBlur={lostFocusHandler}
                    />
                    {!inputState.isValid && inputState.touched &&
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{props.errorMsg}</Text>
                      </View>
                    }
        </View>
    )
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    heading: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    errorContainer: {
      marginVertical: 5
    },
    errorText: {
      fontFamily: 'open-sans',
      color: 'red',
      fontSize: 13
    }
});

export default Input;