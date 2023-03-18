import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { auth } from '../firebase';

const Register = () => {
  const [Fname, setFname] = useState('');
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
    // Perform registration logic (e.g., call an API or validate user input)
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    if (Fname !== FnameConfirm) {
      console.log('Full Name did not match');
      return;
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
          onChangeText={setFname}
          value={Fname}
          placeholder="Enter Full Name"
          autoCapitalize="none"
        />
         <TextInput
          style={styles.input}
          onChangeText={setFnameConfirm}
          value={FnameConfirm}
          placeholder="Confirm Full Name"
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