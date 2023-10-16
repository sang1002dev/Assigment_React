import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./LoginScreen";
import NewPostScreen from './NewPostScreen';
import TabBarButton from './TabBarButton';
import SingUpScreen from './SignUpScreen';
import RegistrationInformation from './Registration';
import UserScreen from './UserScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name = "Login"
          component = {LoginScreen}
          option = {{title: 'WellCome'}}
        ></Stack.Screen>
        <Stack.Screen
          // options={{ headerShown: false }}
          name = "NewPost" 
          component = {NewPostScreen}
          option = {{title: 'NewPost'}}>
        </Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name = "Quay lại" 
          component = {TabBarButton}
          option = {{title: 'TabBar'}}>
        </Stack.Screen>
        <Stack.Screen
          // options={{ headerShown: false }}
          name = "SignUp" 
          component = {SingUpScreen}
          option = {{title: 'SignUp'}}>
        </Stack.Screen>
        <Stack.Screen
          // options={{ headerShown: false }}
          name = "RegistrationInformation" 
          component = {RegistrationInformation}
          option = {{title: 'RegistrationInformation'}}>
        </Stack.Screen>
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Trangchu" component={HomeScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




