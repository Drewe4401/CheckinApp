import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Employeeinfo = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Info</Text>
      <Text>Email: {item.Email_address}</Text>
      <Text>Name: {item.Full_Name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Employeeinfo;