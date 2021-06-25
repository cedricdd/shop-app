import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetails from "../screens/shop/ProductDetails";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

function ShopNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={Platform.OS === "android" ? "screen" : "float"}
        initialRouteName="Overview"
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Overview"
          component={ProductsOverview}
          options={{ title: "All Products" }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetails}
          options={({ route }) => ({
            title: route.params.product.title + " Details",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigator;
