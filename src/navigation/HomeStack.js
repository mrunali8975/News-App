import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {AuthContext} from '../navigation/AuthProvider';

// function implent stack navigation pattern

import SeachProduct from '../screens/SeachProduct';
import Imagepicker from '../screens/imagepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { DrawerItemList } from '@react-navigation/drawer';

const Stack = createStackNavigator(); 
const Drawer=createDrawerNavigator();
export default function HomeStack() {

  const {user, logout} = useContext(AuthContext);


  return (
   <NavigationContainer independent={true} >
     <Drawer.Navigator initialRouteName='Home' drawerContent={(props)=>
    {
      return(
        <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() =>logout()} />
      </DrawerContentScrollView>
      )
    }}>
       <Drawer.Screen name='Home' component={HomeScreen}/>
       <Drawer.Screen name='SeachProduct' component={SeachProduct}/>
       <Drawer.Screen name='Imagepicker' component={Imagepicker}/>

       


     </Drawer.Navigator>
   </NavigationContainer>
  );
}