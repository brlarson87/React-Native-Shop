import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Button, Platform } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';


import * as cartActions from '../../store/actions/cart';

import ProductCard from '../../components/shop/ProductCard';

import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {

  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item 
              title="Favorite" 
              iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
              onPress={() => navigation.navigate('Cart')}/>
        </HeaderButtons>
        ),
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

  const selectItemHandler = (id, title) => {
    navigation.navigate('Product Details', {
      id,
      name: title
    })
  }

  
  return (
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => <ProductCard 
                                  title={itemData.item.title} 
                                  image={itemData.item.imageUrl} 
                                  price={itemData.item.price}
                                  onSelect={() => {
                                    selectItemHandler(itemData.item.id, itemData.item.title)
                                  }}
                                  >
                                    <Button color={Colors.primary} title="View Details" onPress={() => {
                                    selectItemHandler(itemData.item.id, itemData.item.title)
                                  }} />
                                    <Button color={Colors.primary} title="Add To Cart" onPress={() => {
                                    dispatch(cartActions.addToCart(itemData.item))
                                  }} />
                                  </ProductCard>}
      />
  );
}

export default ProductsOverviewScreen