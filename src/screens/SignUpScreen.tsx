// src/screens/SignUpScreen.tsx  

import React from 'react';  
import { View, Text } from 'react-native';  
import AuthForm from '../components/AuthForm';  

const SignUpScreen: React.FC = () => {  
  return (  
    <View style={{ padding: 16 }}>  
      <Text style={{ fontSize: 24 }}>Sign Up</Text>  
      <AuthForm formType="signup" />  
    </View>  
  );  
};  

export default SignUpScreen;