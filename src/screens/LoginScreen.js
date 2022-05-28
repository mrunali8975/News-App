import {AuthContext} from '../navigation/AuthProvider';
import React, {useState, useContext} from 'react';
import {Formik} from 'formik';
const staticImage = require('.assets/loginlogo.png');

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
  Image,
} from 'react-native';
import FormButton from '../../components/FormButton';
import * as yup from 'yup';

export default function LoginScreen({navigation}) {
  const {login} = useContext(AuthContext); //authcontext by firebase
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // validation for login

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Image source={require('/home/mambhore/React Native/demofirebase/assets/images.jpeg')}
       style={styles.loginImage}/>
     
      <Text style={styles.title}>NEWS INDIA</Text>

      {/* Form Input */}
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            {/* login function called from authprovider */}
           
            <Pressable
              style={styles.btn}
              onPress={() => {
                handleSubmit, login(values.email, values.password);
              }}
              disabled={!isValid}>
              <Text style={styles.text}>Login</Text>
            </Pressable>
          </>
        )}
      </Formik>

      {/* navigation.navigate() accepts the value of the screen to navigate to sign up page, */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Dont't have an account? Sign up.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  title: {
    fontSize: 35,
    alignItems: 'center',
    fontWeight: '900',
    color: 'black',
  },
  btntext: {
    fontSize: 15,
    fontWeight: '800',
  },
  btn: {
    borderRadius: 15,
    borderWidth: 2,
    padding: 1,
    width: '60%',
    color: '#f9f9f9',
    backgroundColor: '#457b9d',
    borderColor: 'gray',
  },
  container: {
    backgroundColor: '#a8dadc',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    width: '60%',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 15,
    borderWidth: 3,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
  },
});
