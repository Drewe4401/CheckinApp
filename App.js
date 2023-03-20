import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect, useRef } from 'react';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App(navigation) {

  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home}/>
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>
      <Stack.Screen  name="Register" component={Register}/>
   </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
