import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/RegistrationScreen';
import Homescreen from '../screens/HomeScreen';

// function implent stack navigation pattern
const Stack = createStackNavigator();  
export default function AuthStack() {
  return (
    // Screens
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name='Signup' component={SignupScreen}
              options={{ header: () => null }}

      />
       <Stack.Screen name='Homescreen' component={Homescreen}
              options={{ header: () => null }}

      />

    </Stack.Navigator>
  );
}