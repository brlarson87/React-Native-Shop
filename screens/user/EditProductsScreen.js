import React, { useLayoutEffect, useCallback, useReducer } from 'react';
import {Text, View, ScrollView, TextInput, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products';

import {HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input';

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

const EditProductsScreen = ({ navigation, route }) => {
    const prodId = route.params.productId;
    const editedProduct = useSelector(state => state.products.userProducts.find(p => p.id === prodId));

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : "",
            imageUrl: editedProduct ? editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description : "",
            price: ""
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        }, 
        formIsValid: editedProduct ? true : false
    });
    

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if(!formState.formIsValid) {
            return Alert.alert("Invalid", "All fields required", [
                {text: "Okay", }
            ]);
        }
        if(editedProduct) {
            dispatch(productActions.editProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl
            ));
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                +formState.inputValues.price
            ));
        }

        navigation.goBack();
    }, [
        editedProduct, 
        formState.inputValues.title, 
        formState.inputValues.imageUrl, 
        formState.inputValues.price, 
        formState.inputValues.description, 
        formState.formIsValid
    ]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.productId ?  "Edit Product" : "Add Product",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                  title="Save"
                  iconName="ios-checkmark"
                  onPress={() => {
                      submitHandler();
                  }}
                />
              </HeaderButtons>
            )
        });
      }, [navigation, submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({ 
            type: FORM__UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier 
        });
    }, [dispatchFormState]);  

    
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect 
                        label='Title'
                        errorMsg="Title field can't be empty"
                        required
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ""}
                        initiallyValid={!!editedProduct}
                    />

                    <Input
                        id="imageUrl"
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect 
                        label='Image Url'
                        errorMsg="Image url field can't be empty"
                        required
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ""}
                        initiallyValid={!!editedProduct}
                    />

                    {!editedProduct &&
                        <Input
                            id="price"
                            keyboardType='decimal-pad'
                            label='Price'
                            errorMsg="Price field can't be 0"
                            required
                            onInputChange={inputChangeHandler}
                            min={0.1}
                        />
                    }

                    <Input
                        id="description"
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect 
                        label='Description'
                        errorMsg="Description field can't be empty"
                        multiline
                        numberOfLines={3}
                        required
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ""}
                        initiallyValid={!!editedProduct}
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    }
});

export default EditProductsScreen;