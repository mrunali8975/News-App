import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homescreen from './HomeScreen';
import Imagepicker from './imagepicker';
import SeachProduct from './SeachProduct';
import 'react-native-gesture-handler';

const Drawer=createDrawerNavigator();


const MyDrawer = () => {
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'> 
        <Drawer.Screen  name='Home' component={Homescreen}/>
        <Drawer.Screen  name='product' component={SeachProduct}/>

        </Drawer.Navigator>

    </NavigationContainer>
  )
}

export default MyDrawer;