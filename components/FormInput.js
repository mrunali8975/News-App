import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { windowHeight,windowWidth } from '../src/utils/Dimensions';

export default function FormInput({ error,labelValue, placeholderText, ...rest }) {
  return (
    
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='#666'
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 15,
    marginTop: 5,
    marginBottom:15,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 2
  }
});