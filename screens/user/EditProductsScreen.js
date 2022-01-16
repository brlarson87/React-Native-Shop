import React, { useState, useLayoutEffect, useCallback, useReducer } from 'react';
import {Text, 
        View, 
        ScrollView, 
        StyleSheet, 
        Alert, 
        KeyboardAvoidingView,
        ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products';

import {HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
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

    

const EditProductsScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState();
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

    useEffect(() => {
        if(err) {
            Alert.alert('An error occured', err, [{ text: 'Okay' }]);
        }
    }, [err])
    

    const dispatch = useDispatch();

    const submitHandler = useCallback(async () => {
        if(!formState.formIsValid) {
            return Alert.alert("Invalid", "All fields required", [
                {text: "Okay", }
            ]);
        }
        setErr(null);
        setIsLoading(true);

        try {
            if(editedProduct) {
                await dispatch(productActions.editProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl
                ));
            } else {
                await dispatch(productActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl, 
                    +formState.inputValues.price
                ));
            }
            navigation.goBack();
        } catch (error) {
            setErr(error.message);
        }
        
        setIsLoading(false);
        
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

    if(isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    
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
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductsScreen;