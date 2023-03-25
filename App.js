import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect, useRef } from 'react';
import Login from './views/Login';
import Register from './views/Register';
import NewUser from './views/NewUser';
import Employeeinfo from './views/Employeeinfo';
import Homenavigator from './views/Homenavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(navigation) {

  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen options={{headerShown: false}} name="Homenavigator" component={Homenavigator}/>
      <Tab.Screen name="NewUser" options={{headerTitle: ''}} component={NewUser} />
      <Tab.Screen name="Employeeinfo" options={{ title: 'Employee Info' }} component={Employeeinfo}/>
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
