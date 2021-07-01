import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetails from "../screens/shop/ProductDetails";
import Colors from "../constants/Colors";
import CustomHeaderButton from "../components/HeaderButton";
import Cart from "../screens/shop/Cart";
import Orders from "../screens/shop/Orders";
import UserProducts from "../screens/user/UserProduct";
import EditProduct from "../screens/user/EditProduct";
import AuthScreen from "../screens/user/AuthScreen";
import { logout } from "../store/actions/auth";

const Stack = createStackNavigator();

function ProductNavigator() {
  return (
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
        options={({ navigation }) => ({
          title: "All Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={ProductDetails}
        options={({ route }) => ({
          title: route.params.product.title + " Details",
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={() => ({
          title: "Your Cart",
        })}
      />
    </Stack.Navigator>
  );
}

function OrderNavigator() {
  return (
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
        name="Orders"
        component={Orders}
        options={({ navigation }) => ({
          title: "Your Orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function AdminNavigator() {
  return (
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
        name="UserProducts"
        component={UserProducts}
        options={({ navigation }) => ({
          title: "Your Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => {
                  navigation.navigate("EditProduct");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={({ navigation, route }) => ({
          title: route.params?.productId ? "Edit Product" : "Add Product",
        })}
      />
    </Stack.Navigator>
  );
}

export const AuthNavigator = () => {
  return (
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
        name="Auth"
        component={AuthScreen}
        options={({ navigation }) => ({
          headerTitleStyle: { alignSelf: "center" },
          title: "Authenticate",
        })}
      />
    </Stack.Navigator>
  );
};

function LogoutDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        inactiveTintColor={Colors.primary}
        icon={() => (
          <Ionicons
            size={23}
            color={Colors.primary}
            name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
          />
        )}
        onPress={() => dispatch(logout())}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export const ShopNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: "white",
        width: 240,
      }}
      drawerContent={(props) => <LogoutDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={focused ? Colors.primary : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={focused ? Colors.primary : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="UserProducts"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={focused ? Colors.primary : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
