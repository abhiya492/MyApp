// src/screens/LoginScreen.tsx  

import React from 'react';  
import { View, Text } from 'react-native';  
import AuthForm from '../components/AuthForm';  

const LoginScreen: React.FC = () => {  
  return (  
    <View style={{ padding: 16 }}>  
      <Text style={{ fontSize: 24 }}>Login</Text>  
      <AuthForm formType="login" />  
    </View>  
  );  
};  

export default LoginScreen;