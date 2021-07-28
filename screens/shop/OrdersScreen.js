import React, { useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import Order from '../../components/shop/Order';

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector(state => state.orders.orders);

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
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Order order={itemData.item}/>
      )}
    />
  );
}

const styles = StyleSheet.create({
 
});

export default OrdersScreen;