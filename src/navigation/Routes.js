import React, {useContext, useState, useEffect} from 'react';
import {Text,View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import LoginScreen from '../screens/LoginScreen';
import {AuthContext} from './AuthProvider';
import Loading from '../../components/loading';
import SignupScreen from '../screens/RegistrationScreen';
import navigatescreen from './navigatescreen';
export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
 
  // Handle user state changes
  function onAuthStateChanged(user) {
    
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }
  useEffect(() => {
   
  
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading />; 
  }

    
  return (
    <NavigationContainer>
      {/* if user is not null then homeStack called else AuthStack called */}
      { user ? 
      
      
      <HomeStack/>
  
      :<AuthStack /> }
      
    
    </NavigationContainer>
  );
}
