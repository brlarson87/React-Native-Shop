import React, { useLayoutEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import {HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import ProductCard from '../../components/shop/ProductCard';

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
            )
        });
      }, [navigation]);

    return (
        <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductCard 
                                        title={itemData.item.title} 
                                        image={itemData.item.imageUrl} 
                                        price={itemData.item.price}
                                        user
                                  />}
            
            />
    )
}

const styles = StyleSheet.create({

});

export default UserProductsScreen;