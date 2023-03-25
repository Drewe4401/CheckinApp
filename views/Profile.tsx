import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://your-image-url-here.jpg',
        }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>John Doe</Text>
      <Text style={styles.profileEmail}>john.doe@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileEmail: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Profile;