import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import Order from '../../components/shop/Order';
import { fetchOrders } from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState();
  const [err, setErr] = useState()
  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    setErr(null);
    setIsLoading(true);
    dispatch(fetchOrders())
    .then(() => setIsLoading(false))
    .catch((error => setErr(error.message)));
  }, [fetchOrders, dispatch]);

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

  if(err) {
    return (
      <View style={styles.center}>
        <Text>An error occured..</Text>
      </View>
    )
  }

  if(!isLoading && !orders.length) {
    return (
      <View style={styles.center}>
        <Text>No orders...</Text>
      </View>
    )
  }

  if(isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>
    )
  }

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
 center: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default OrdersScreen;