import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ProductsStackNavigator, OrdersStackNavigator, UserProductsNavigator } from "./ShopNavigator";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerType="slide">
      <Drawer.Screen name="Home" component={ProductsStackNavigator} />
      <Drawer.Screen name="Orders" component={OrdersStackNavigator} />
      <Drawer.Screen name="Admin" component={UserProductsNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;