import React, {useState, useContext} from 'react';
import {Formik} from 'formik';
import {AuthContext} from '../navigation/AuthProvider';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TextInput,
  Button,
  Pressable,
  Dimensions,
} from 'react-native';

// validation of input data
const isValidObjFiels = obj => {
  return Object.values(obj).every(value => value.trim());
};
const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater('');
  }, 2500);
};

const isValidEmail = value => {
  let rjx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return rjx.test(value);
};

const SignupScreen = ({navigation}) => {
  const [userInfo, setUserinfo] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const {email, password} = userInfo;
  const handleOnchangeText = (value, fieldname) => {
    userInfo['email'];
    userInfo['password'];
    setUserinfo({...userInfo, [fieldname]: value});
  };
  const isValidForm = () => {
    if (!isValidObjFiels(userInfo))
      return updateError('Required all field', setError);
    if (!isValidEmail(email)) return updateError('Invalid Email', setError);
    if (!password.trim() || password.length < 8)
      return updateError('password length is less than 8', setError);
    return true;
  };
  const submitForm = () => {
    if (isValidForm()) {
      return true;
    }
  };
  const showtoastmsg=()=>
  {
   
    ToastAndroid.show("Registerd successfully")

  }

  // Authcontext calling register function
  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      {/* Form Inputs */}
      {error ? (
        <Text style={{color: 'red', fontSize: 18, textAlign: 'center'}}>
          {error}
        </Text>
      ) : null}

      <>
        <TextInput
          multiline={true}
          autoCapitalize="none"
          name="email"
          placeholder="Email Address"
          style={styles.textInput}
          onChangeText={value => handleOnchangeText(value, 'email')}
        
          value={email}
          keyboardType="email-address"
        />

        <TextInput
          autoCapitalize="none"
          name="password"
          placeholder="Password"
          style={styles.textInput}
          onChangeText={value => handleOnchangeText(value, 'password')}
          value={password}
          secureTextEntry
        />

        <Pressable
          style={styles.btn}
          onPress={() => {
            if (submitForm()) {
              register(email, password), navigation.navigate('Login')
              
            }
            
          }}>

          <Text style={styles.text}>Signup</Text>
        </Pressable>
      </>
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
    height: 60,
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
