import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'

import DrawerNavigator from './navigation/DrawerNavigator';
import { AuthNavigator } from './navigation/ShopNavigator';

import productsReducer from './store/reducers/products';
import cartsReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

import { NavigationContainer } from '@react-navigation/native';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartsReducer,
    orders: ordersReducer,
    auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const ACCESS_TOKEN = rootReducer.auth.token;

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default App = (props) => {
  const [assestsLoaded, setAssetsLoaded] = useState(false);

  if(!assestsLoaded) {
    return <AppLoading 
              startAsync={fetchFonts} 
              onFinish={() => {setAssetsLoaded(true)}}
              onError={(err) => console.log(err)}  
            />
  }
  const isAuth = ACCESS_TOKEN;

  return (
    <Provider store={store}>
     <NavigationContainer>
        {isAuth ? (<DrawerNavigator />) : (<AuthNavigator />)}
     </NavigationContainer>
    </Provider>
  )
}

// export default function App() {
  

//   return (
    
//   );
// }

// export default AppNavigator;
