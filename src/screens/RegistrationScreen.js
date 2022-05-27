import React, {useState, useContext} from 'react';
import {Formik} from 'formik';
import {AuthContext} from '../navigation/AuthProvider';
import {View, Text, StyleSheet, TextInput, Button,Pressable} from 'react-native';
// import FormButton from '../../components/FormButton';
// import FormInput from '../../components/FormInput';
import * as yup from 'yup';


// validation of input data
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

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Authcontext calling register function
  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      {/* Form Inputs */}

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
            <Pressable
              style={styles.btn}
              onPress={() => {
                handleSubmit, register(values.email, values.password), navigation.navigate('Login')
              }}
              disabled={!isValid}>
              <Text style={styles.text}>Signup</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a8dadc',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: '900',
    color: 'black',
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

  errorText: {
    fontSize: 15,
    color: 'red',
  },
});

export default SignupScreen;
