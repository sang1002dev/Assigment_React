// HomeScreen.js
import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import HomeScreen from "./HomeScreen";
import VideoScreen from "./VideosScreen";
import NotificationScreen from "./NotificationScreen";
import MessageScreen from "./MessageScreen";
import UserScreen from "./UserScreen";
import NewPostScreen from "./NewPostScreen";
import MenuScreen from "./MenuScreen";

const Tab = createBottomTabNavigator();

const TabBarButton = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="TrangChu"
          options={{
            headerShown: false,
            tabBarLabel: "Trang Chủ",
            title: "Trang Chủ",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        >
          {(props) => <HomeScreen {...props} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="ThongBao"
          component={NotificationScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Thông Báo",
            title: "Thông Báo",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          // component={MenuScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Menu",
            title: "Menu",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={size} />
            ),
          }}
        >
          {(props) => <MenuScreen {...props} navigation={navigation}/>}
          </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabBarButton;
