import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
// function implent stack navigation pattern

import SeachProduct from '../screens/SeachProduct';

const Stack = createStackNavigator(); 
export default function HomeStack() {
  return (
    <Stack.Navigator
    initialRouteName='Home'
    screenOptions={{
      headerShown:false
    }}
    >
      <Stack.Screen name='Home' component={HomeScreen} 
      />
      <Stack.Screen name='SeachProduct' component={SeachProduct} 
      />
    </Stack.Navigator>
  );
}