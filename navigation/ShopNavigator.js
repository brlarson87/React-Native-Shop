import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Cart from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';

import Colors from '../constants/Colors';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../store/StartupScreen';

const Stack = createStackNavigator();

const screenOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans'
      },
      headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary 
}

export const ProductsStackNavigator = () => {
    return (
        <Stack.Navigator 
          screenOptions={screenOptions}
        >
          <Stack.Screen 
            name="Products" 
            component={ProductsOverviewScreen}
            options={{ 
              title: 'Products'
            }}
          />
          <Stack.Screen 
            name="Product Details" 
            component={ProductDetailScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen 
            name="Cart" 
            component={Cart}
            options={{
              title: 'Your Cart'
            }}
          />
      </Stack.Navigator>
    )
}

export const OrdersStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen 
            name="Orders" 
            component={OrdersScreen}
            options={{
              title: 'Your Orders'
            }}
          />
      </Stack.Navigator>
    )
}

export const UserProductsNavigator = () => {
  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen 
          name="Your Products" 
          component={UserProductsScreen}
          options={{
            title: 'Your Products'
          }}
        />
        <Stack.Screen 
          name="Edit Product"
          component={EditProductsScreen}
          options={{
            title: "Edit Product"
          }}
        />
    </Stack.Navigator>
  )
}

// export const logoutNavigator = () => {

// }

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="Login"
        component={AuthScreen}
        options={{
          title: 'Login'
        }}
      />
    </Stack.Navigator>
  )
}