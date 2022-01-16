import React, { useState } from 'react';
import { Platform } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'

import DrawerNavigator from './navigation/DrawerNavigator';

import productsReducer from './store/reducers/products';
import cartsReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';

import { NavigationContainer } from '@react-navigation/native';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartsReducer,
    orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [assestsLoaded, setAssetsLoaded] = useState(false);

  if(!assestsLoaded) {
    return <AppLoading 
              startAsync={fetchFonts} 
              onFinish={() => {setAssetsLoaded(true)}}
              onError={(err) => console.log(err)}  
            />
  }

  return (
    <Provider store={store}>
     <NavigationContainer>
        <DrawerNavigator />
     </NavigationContainer>
    </Provider>
  );
}
