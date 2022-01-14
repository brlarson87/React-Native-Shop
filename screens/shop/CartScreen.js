import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';

import CartItem from '../../components/shop/CartItem';

const CartScreen = ({ navigation }) => {

  const cartTotal = useSelector(state => state.cart.totalAmount);

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    const items = state.cart.items;

    for (const key in items) {
      transformedCartItems.push({
        productId: key,
        productTitle: items[key].productTitle,
        productPrice: items[key].productPrice,
        quantity: items[key].quantity,
        sum: items[key].sum
      })
    }

    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });

  const dispatch = useDispatch(); 

  let itemsToRender = (
    <View style={styles.emptyMessage}>
      <Text style={styles.emptyText}>Your cart is empty...</Text>
    </View>
  );

  if(cartItems.length) {
    itemsToRender = (
      <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => 
          <CartItem 
            title={itemData.item.productTitle} 
            price={itemData.item.productPrice}
            quantity={itemData.item.quantity}
            sum={itemData.item.sum}
            trash
            onRemoveFromCart={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />}
        />
    );
  }
  

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.total}>Total: <Text style={styles.number}>${Math.round(cartTotal.toFixed(2) * 100) / 100}</Text></Text>
        <Button 
          title="Order Now" 
          color={Colors.accent} 
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotal));
          }}
          />
      </View>

      {itemsToRender}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 20,
    backgroundColor: '#999',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2
  },
  total: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#fff'
  },
  number: {
    color: Colors.accent,
    fontFamily: 'open-sans-bold',
  },
  emptyMessage: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

export default CartScreen;