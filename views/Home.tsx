import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { auth } from "../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { firebase } from '../config/firebase';

interface DecodedToken {
  email: string;
  // Add other properties you expect in the token here
}

interface LoginScreenProps {
  navigation: any;
}

const Home = (props: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [documents, setDocuments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getEmailFromAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');

      if (authToken) {
        const decodedToken = jwtDecode(authToken) as DecodedToken;
        setEmail(decodedToken.email);
        return decodedToken.email;
      } else {
        console.log('No auth token found');
        return null;
      }
    } catch (error) {
      console.log('Error getting email from auth token:', error);
      return null;
    }
  };

  const fetchData = async (email: string) => {
    try {
      const collectionName = 'Users';
      const filterField = 'Owner_Email';
      const filterValue = email;
      const snapshot = await firebase
        .firestore()
        .collection(collectionName)
        .where(filterField, '==', filterValue)
        .get();
      const fetchedDocuments: Array<{ id: string; Email_address: string; Full_Name: string }> = [];

      snapshot.forEach((doc) => {
        fetchedDocuments.push({ id: doc.id, Email_address: doc.data().Email_address, Full_Name: doc.data().Full_Name });
      });

      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    getEmailFromAuthToken().then((email) => {
      if (email) {
        fetchData(email);
      }
    });
  }, []);

  const renderItem = ({ item }: { item: { id: string; Email_address: string, Full_Name: string } }) => (
    <View>
      <TouchableOpacity style={styles.fancyContainer} onPress={() => props.navigation.navigate('Employeeinfo', { item })}>
        <Text style={styles.itemText}>Email: {item.Email_address}</Text>
        <Text style={styles.itemText}>Name: {item.Full_Name}</Text>
      </TouchableOpacity>
    </View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    const emailFromToken = await getEmailFromAuthToken();
    if (emailFromToken) {
      fetchData(emailFromToken);
    }
    setRefreshing(false);
  };

  const renderHeader = () => (
    <>
      <Text style={styles.title}>Employees:</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => props.navigation.navigate('NewUser')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={documents}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={renderHeader}
        />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Add background color to avoid overlapping with fancyContainer
  },
  flatlist: {
    paddingTop: 80, // Add background color to avoid overlapping with fancyContainer
  },
  fancyContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginVertical: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    left: 10,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
  },
  itemText: {
    color: '#FFF',
    fontSize: 14,
  },

});

export default Home;