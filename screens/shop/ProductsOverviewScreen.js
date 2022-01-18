import React, { useState, 
                useLayoutEffect, 
                useEffect,
                useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, 
         FlatList, 
         Button, 
         Platform, 
         ActivityIndicator, 
         Text, 
         StyleSheet } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';


import * as cartActions from '../../store/actions/cart';

import ProductCard from '../../components/shop/ProductCard';

import Colors from '../../constants/Colors';
import { fetchProducts } from '../../store/actions/products';
import Product from '../../models/product';

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [err, setErr] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();


  const loadProducts = useCallback(async () => {
    setErr(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
      setIsLoading(false);
    } catch (error) {
      setErr(error.message)
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setErr]);


  // useEffect(() => {
  //   const willFocusSub = navigation.addListener('willFocus', loadProducts);

  //   return () => {
  //     willFocusSub.remove();
  //   }
  // }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts])

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

  if(!isLoading && !products.length) {
    return (
      <View style={styles.center}>
        <Text>No products...</Text>
      </View>
    )
  }

  if(err) {
    return (
      <View style={styles.center}>
        <Text>An error occured..</Text>
        <Button title="Try Again" color={Colors.primary} onPress={loadProducts}></Button>
      </View>
    )
  }

  if(isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary}/>
      </View>
    )
  }

  
  return (
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProductsOverviewScreen