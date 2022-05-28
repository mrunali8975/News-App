import React from 'react';
import {LogBox} from 'react-native'
import Providers from './src/navigation';

LogBox.ignoreAllLogs();

export default function App() {
  return <Providers />;
}