import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Platform } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';


import * as cartActions from '../../store/actions/cart';

import ProductCard from '../../components/shop/ProductCard';

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

  
  return (
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => <ProductCard 
                                  title={itemData.item.title} 
                                  image={itemData.item.imageUrl} 
                                  price={itemData.item.price}
                                  onViewDetail={() => {
                                    navigation.navigate('Product Details', {
                                      id: itemData.item.id,
                                      name: itemData.item.title
                                    })
                                  }}
                                  onAddToCart={() => {
                                    dispatch(cartActions.addToCart(itemData.item))
                                  }}
                                  />}
      />
  );
}

export default ProductsOverviewScreen