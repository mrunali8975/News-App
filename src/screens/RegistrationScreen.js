import React, {useState, useContext} from 'react';
import {Formik} from 'formik';
import {AuthContext} from '../navigation/AuthProvider';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
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
      <Text style={styles.text}>Create an account</Text>
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
            <Button
              onPress={() => {
                handleSubmit, register(values.email, values.password);
              }}
              title="Sigup"
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
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
