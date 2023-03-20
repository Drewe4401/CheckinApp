import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
    navigation: any;
  }

const Home = (props: LoginScreenProps) => {

    const handleLogOut = async () => {
        await AsyncStorage.removeItem('authToken');
        props.navigation.navigate("Login");
    }
  
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 150,
    backgroundColor: '#F5FCFF',
    justifyContent:'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0718C4',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Home;