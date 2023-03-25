import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import CryptoJS from "crypto-js";
import { firebase, auth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

interface LoginScreenProps {
    navigation: any;
  }

  interface DecodedToken {
    email: string;
    // Add other properties you expect in the token here
  }

const NewUser = (props: LoginScreenProps) => {

const [name, setName] = useState('');
const [email, setemail] = useState('');
const [password, setPassword] = useState('');
const [Cpassword, setCpassword] = useState('');
const [OwnerEmail, setOwnerEmail] = useState('');


const getEmailFromAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
  
      if (authToken) {
        const decodedToken = jwtDecode(authToken) as DecodedToken;
        setOwnerEmail(decodedToken.email); // Assuming the token payload contains an 'email' field
        return OwnerEmail;
      } else {
        console.log('No auth token found');
        return null;
      }
    } catch (error) {
      console.log('Error getting email from auth token:', error);
      return null;
    }
  };

  getEmailFromAuthToken().then((email) => {
  });


  const handleCreateUser = () => {

    // Add your user creation logic here
    if (password !== Cpassword) {
        console.log('Passwords do not match');
        return;
      }
    
      createUserWithEmailAndPassword(auth, email, password)
      .then(async (credentials) => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const token = await credentials.user.getIdToken();
        const todoRef = firebase.firestore().collection('Users').doc(email.toLowerCase());
        firebase.firestore().collection('Users').doc(OwnerEmail.toLowerCase())
        .get()
        .then((doc) => {
          const temp = doc.data().Company_Name;
          const Employee_data = {
            User_ID: credentials.user.uid,
            CreatedAt: timestamp,
            Company_Title: 'Employee',
            Full_Name: name,
            Email_address: email,
            Company_Name: temp,
            Owner_Email: OwnerEmail.toLowerCase(),
          };
          todoRef
          .set(Employee_data).then(() => {console.log("Signup Employee Success");props.navigation.navigate("Homenavigator", {screen: 'Home'});})
          .catch((err) => Alert.alert("Register Error", err.message))
        })
        .catch((err) => Alert.alert("Register Error", err.message));
        })
      .catch((err) => Alert.alert("Register Error", err.message));
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Employee Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email Address"
        onChangeText={setemail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={setCpassword}
        value={Cpassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default NewUser;