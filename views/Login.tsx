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
} from 'react-native';

interface LoginScreenProps {
  navigation: any;
}

const Login = (props: LoginScreenProps) => {
  const [Fname, setFname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic (e.g., call an API or validate user credentials)
    console.log('Full Name:', Fname);
    console.log('Password:', password);
  };



  const registera = () => props.navigation.navigate("Register")

  return (

    <KeyboardAvoidingView keyboardVerticalOffset={-200} behavior="position" style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
         style={{
          resizeMode: 'contain',
          height: 200,
          width: 400,
        }}
        source={require('../assets/check-in-high-resolution-logo-color-on-transparent-background.png')}/>
        <TextInput
          style={styles.input}
          onChangeText={setFname}
          value={Fname}
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Button
        title="Don't have an account? Click here to Register."
        onPress={registera}
      />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 150,
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

export default Login;