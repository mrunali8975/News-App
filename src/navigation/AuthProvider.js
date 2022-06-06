import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react/cjs/react.production.min';
import Homescreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '../../components/loading';
import {
 
  Text,
  ToastAndroid
 
} from 'react-native';
// createContext provide authentication options
export const AuthContext = createContext({});
export const AuthProvider = ({children,navigation}) => {
  const [user, setUser] = useState(null);

 
 

  return (
    // calling firebase method to interact with real-time backend service through @react-native-firebase/auth package

    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            
          } catch (e) {
            
             
           
           
          }
        },
      
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          
            // shotoastmsg();
            ToastAndroid.show('Registered successfully')

             auth().signOut();
            


          } catch (e) {
            console.log(e);
            alert(e)
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
