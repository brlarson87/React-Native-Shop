import React, { useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import ProductCard from '../../components/shop/ProductCard';
import * as productActions from '../../store/actions/products';

import Colors from "../../constants/Colors";

const UserProductsScreen = ({ navigation }) => {

    const products = useSelector(state => state.products.userProducts);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item 
                  title="Menu" 
                  iconName='menu'
                  onPress={() => navigation.toggleDrawer() }/>
            </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                  title="Add"
                  iconName="ios-create"
                  onPress={() => navigation.navigate('Edit Product', { productId: false})}
                />
              </HeaderButtons>
            )
        });
      }, [navigation]);

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
      Alert.alert('Are you sure?', "Do you really want to delete product?", [
          {text: 'No', style: 'default'},
          {text: 'Yes', style: 'destructive', onPress: () => {dispatch(productActions.deleteProduct(id))}}
      ]);  
  }
    
    const editProductHandler = id => {
      navigation.navigate('Edit Product', { productId: id })
    };

    return (
        <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductCard 
                                        title={itemData.item.title} 
                                        image={itemData.item.imageUrl} 
                                        price={itemData.item.price}
                                        onSelect={() => {
                                          editProductHandler(itemData.item.id)
                                        }}
                                  >
                                    <Button color={Colors.primary} title="Edit" onPress={() => {
                                      editProductHandler(itemData.item.id)
                                  }} />
                                    <Button color={Colors.primary} title="Delete" onPress={() => {
                                      deleteHandler(itemData.item.id);
                                  }} />  
                                  </ ProductCard>}
            
            />
    )
}

const styles = StyleSheet.create({

});

export default UserProductsScreen;