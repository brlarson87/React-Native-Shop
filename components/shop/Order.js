import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

import CartItem from './CartItem';

import Colors from '../../constants/Colors';

export const Order = (props) => {
    const [openDescription, setOpenDescription ] = useState(false);
   

    return (
        <View style={styles.orderItem}>
          <View style={styles.summary}>
              <Text style={styles.amount}>${props.order.totalAmount.toFixed(2)}</Text>
              <Text styles={styles.date}>{props.order.readableDate}</Text>
          </View>
          
          <Button 
            color={Colors.primary} 
            title={openDescription ? 'Hide Details' : 'Show Details'} 
            onPress={() => setOpenDescription(prevState => !prevState)}/>

        {openDescription && 
            <FlatList
            data={props.order.items}
            keyExtractor={item => item.productId}
            renderItem={itemData => 
            <CartItem 
              title={itemData.item.productTitle} 
              price={itemData.item.productPrice}
              quantity={itemData.item.quantity}
              sum={itemData.item.sum}
            />}
          />
        }
          
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: .3,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 20,
        padding: 15
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    }
});

export default Order;
