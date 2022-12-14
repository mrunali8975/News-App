import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { windowHeight,windowWidth } from '../src/utils/Dimensions';

export default function FormButton({ buttonTitle, ...rest }) {
    return (
      <TouchableOpacity style={styles.buttonContainer} {...rest}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  }
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: windowWidth / 2,
      height: windowHeight / 15,
      backgroundColor: '#ef233c',
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8
    },
    buttonText: {
      fontSize: 28,
      color: '#ffffff'
    }
  });