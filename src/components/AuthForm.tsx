// src/components/AuthForm.tsx  

import React, { useEffect, useState } from 'react';  
import { View, Text, TextInput, Button, Alert, Switch } from 'react-native';  
import { Formik } from 'formik';  
import * as Yup from 'yup';  
import AsyncStorage from '@react-native-async-storage/async-storage';  

interface AuthFormProps {  
  formType: 'signup' | 'login';  
}  

const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {  
  const [rememberMe, setRememberMe] = useState(false);  
  const [savedEmail, setSavedEmail] = useState<string | null>(null);  
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);  

  useEffect(() => {  
    const fetchSavedEmail = async () => {  
      const email = await AsyncStorage.getItem('savedEmail');  
      if (email) {  
        setSavedEmail(email);  
      }  
    };  
    fetchSavedEmail();  
  }, []);  

  const handlePasswordChange = (password: string) => {  
    if (password.length < 6) {  
      setPasswordStrength('Weak');  
    } else if (password.match(/[0-9]/) && password.match(/[!@#$%^&*]/)) {  
      setPasswordStrength('Strong');  
    } else {  
      setPasswordStrength('Moderate');  
    }  
  };  

  const handleLoginSubmit = async (values: { email: string; password: string }) => {  
    if (rememberMe) {  
      await AsyncStorage.setItem('savedEmail', values.email);  
    } else {  
      await AsyncStorage.removeItem('savedEmail');  
    }  
    Alert.alert("Login Successful", `Welcome back, ${values.email}!`);  
  };  

  const handleSignupSubmit = async (values: { email: string; password: string }) => {  
    Alert.alert("Sign Up Successful", `Welcome, ${values.email}!`);  
  };  

  const validationSchema = Yup.object().shape({  
    email: Yup.string().email('Invalid email').required('Required'),  
    password: Yup.string().min(6, 'Password is too short').required('Required'),  
  });  

  return (  
    <Formik  
      initialValues={{ email: savedEmail || '', password: '' }}  
      validationSchema={validationSchema}  
      onSubmit={formType === 'signup' ? handleSignupSubmit : handleLoginSubmit}  
    >  
      {({ handleChange, handleSubmit, values, errors }) => (  
        <View>  
          <TextInput  
            accessibilityLabel="Email Address"  
            placeholder="Email"  
            onChangeText={handleChange('email')}  
            value={values.email}  
            style={{ borderBottomWidth: 1, marginBottom: 12 }}  
          />  
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}  
          <TextInput  
            accessibilityLabel="Password"  
            placeholder="Password"  
            secureTextEntry  
            onChangeText={(password) => {  
              handleChange('password')(password);  
              handlePasswordChange(password);  
            }}  
            value={values.password}  
            style={{ borderBottomWidth: 1, marginBottom: 12 }}  
          />  
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}  
          {formType === 'signup' && (  
            <Text style={{ color: passwordStrength === 'Weak' ? 'red' : passwordStrength === 'Moderate' ? 'orange' : 'green' }}>  
              Password Strength: {passwordStrength}  
            </Text>  
          )}  
          {formType === 'login' && (  
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>  
              <Switch  
                value={rememberMe}  
                onValueChange={setRememberMe}  
              />  
              <Text>Remember Me</Text>  
            </View>  
          )}  
          <Button title={formType === 'signup' ? 'Sign Up' : 'Login'} onPress={handleSubmit as any} />  
        </View>  
      )}  
    </Formik>  
  );  
};  

export default AuthForm;