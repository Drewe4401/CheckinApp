import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { auth, database } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CryptoJS from "crypto-js";
import { firebase } from '../config/firebase';

interface HomeProps {
  navigation: any;
}

const Register = (props: HomeProps) => {
  const [Email, setEmail] = useState('');
  const [FnameConfirm, setFnameConfirm] = useState('');
  const [Companyname, setCompanyname] = useState('');
  const [CompanyID, setCompanyID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selected, setSelected] = useState("");
  const [showInputEM, setShowInputEM] = useState(false);
  const [showInputCO, setShowInputCO] = useState(false);

  const data = [
    {key:'1', value:'Employee'},
    {key:'2', value:'Owner'},
]

  const handleRegister = () => {

  const todoRef = firebase.firestore().collection('users');

    // Perform registration logic (e.g., call an API or validate user input)
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    if(selected == 'Owner'){
    createUserWithEmailAndPassword(auth, Email, password)
        .then((credentials) => {
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const uniqueCompanyid = CryptoJS.SHA256(Email).toString(CryptoJS.enc.Hex);
          const todoRef = firebase.firestore().collection(uniqueCompanyid).doc('Owner');
          const Owner_data = {
            User_ID: credentials.user.uid,
            CreatedAt: timestamp,
            Company_Title: selected,
            Full_Name: FnameConfirm,
            Email_address: Email,
            Company_Name: Companyname,
            Company_ID: uniqueCompanyid
          };
          todoRef
            .set(Owner_data).then(() => {console.log("Signup Owner Success");props.navigation.navigate("Home");})
            .catch((err) => Alert.alert("Register Error", err.message))

          })
        .catch((err) => Alert.alert("Register Error", err.message));
    } else if(selected == 'Employee'){
      
      createUserWithEmailAndPassword(auth, Email, password)
      .then((credentials) => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const todoRef = firebase.firestore().collection(CompanyID).doc(Email);
        firebase.firestore().collection(CompanyID).doc('Owner')
        .get()
        .then((doc) => {
          const temp = doc.data().Company_Name;
          const Employee_data = {
            User_ID: credentials.user.uid,
            CreatedAt: timestamp,
            Company_Title: selected,
            Full_Name: FnameConfirm,
            Email_address: Email,
            Company_Name: temp,
            Company_ID: CompanyID
          };
          todoRef
          .set(Employee_data).then(() => {console.log("Signup Employee Success");props.navigation.navigate("Home");})
          .catch((err) => Alert.alert("Register Error", err.message))
        })
        .catch((err) => Alert.alert("Register Error", err.message));
        })
      .catch((err) => Alert.alert("Register Error", err.message));
    }
  };

  const handleInput = () => {
    if(selected == 'Employee'){
      setShowInputCO(false);
      setShowInputEM(true);
    } else if(selected == 'Owner'){
      setShowInputEM(false);
      setShowInputCO(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
    <KeyboardAvoidingView keyboardVerticalOffset={-200} behavior="position" style={styles.container}>
      <View style={styles.inputContainer}>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data}
        save="value"
        search={false}
        boxStyles={{marginBottom:20,borderRadius:0,marginTop:20}}
        dropdownStyles={{marginTop: -20,marginBottom:20,borderRadius:0}}
        onSelect={handleInput}
    />
     {showInputEM && (
        <TextInput
          style={styles.input}
          value={CompanyID}
          onChangeText={setCompanyID}
          placeholder="Enter Owner's Company ID"
          autoCapitalize="none"
        />
      )}
       {showInputCO && (
        <TextInput
          style={styles.input}
          value={Companyname}
          onChangeText={setCompanyname}
          placeholder="Enter Company Name"
          autoCapitalize="none"
        />
      )}
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={Email}
          placeholder="Enter Email Address"
          autoCapitalize="none"
        />
         <TextInput
          style={styles.input}
          onChangeText={setFnameConfirm}
          value={FnameConfirm}
          placeholder="Enter Full Name"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Register;