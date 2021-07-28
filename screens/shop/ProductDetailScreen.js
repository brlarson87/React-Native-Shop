import React from 'react';
import { ScrollView, StyleSheet, Image, Button, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';

import Colors from '../../constants/Colors';

const ProductDetailScreen = ({ navigation, route }) => {

  const { id } = route.params;

  const product = useSelector(state => state.products.availableProducts.find(p => p.id === id));

  const dispatch = useDispatch();
  
  return (
    <ScrollView style={styles.scroll}>
      <Image style={styles.image} source={{ uri: product.imageUrl}} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {
          dispatch(cartActions.addToCart(product))
        }}/>
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 15,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 22,
    fontFamily: 'open-sans'
  }
});

export default ProductDetailScreen;