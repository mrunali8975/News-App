import React from 'react';
import {LogBox} from 'react-native'
import Providers from './src/navigation';
import 'react-native-gesture-handler'

LogBox.ignoreAllLogs();

export default function App() {
  return <Providers />;
}