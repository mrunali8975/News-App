import {AuthContext} from '../navigation/AuthProvider';
import React, {useState, useContext} from 'react';
import {Formik} from 'formik';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
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
      <Text style={styles.title}>NEWS INDIA</Text>
      <Text style={styles.text}>Welcome to News app</Text>

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
            <TouchableOpacity
            
             style={styles.btn}
             onPress={() => {
               handleSubmit, login(values.email, values.password);
             }}
            
             disabled={!isValid}>
               <Text style={styles.btntext}>Login</Text>

            </TouchableOpacity>
            {/* <Button
            style={styles.btn}
              onPress={() => {
                handleSubmit, login(values.email, values.password);
              }}
              title="Login"
              disabled={!isValid}
            /> */}
          </>
        )}
      </Formik>

     
{/* navigation.navigate() accepts the value of the screen to navigate to sign up page, */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>New user? Join here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    alignItems: 'center',
    fontWeight: '900',
    color: 'black',
    marginBottom: 80,
  },
  btntext:
  {
fontSize:15,fontWeight:'800'
  },
  btn:
  {
borderRadius:20,
borderWidth:2,padding:10,
  },
  container: {
    backgroundColor: '#f5f5f5',

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
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
    color: '#6646ee',
  },
  errorStyle: {
    color: 'red',
    fontSize: 15,
  },
});
