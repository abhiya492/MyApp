// App.tsx  

import React from 'react';  
import { NavigationContainer } from '@react-navigation/native';  
import { createStackNavigator } from '@react-navigation/stack';  
import SignUpScreen from './src/screens/SignUpScreen';  
import LoginScreen from './src/screens/LoginScreen';  

const Stack = createStackNavigator();  

const App: React.FC = () => {  
  return (  
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="Login">  
        <Stack.Screen name="Login" component={LoginScreen} />  
        <Stack.Screen name="SignUp" component={SignUpScreen} />  
      </Stack.Navigator>  
    </NavigationContainer>  
  );  
};  

export default App;