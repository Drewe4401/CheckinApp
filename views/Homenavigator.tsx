import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Employeeinfo from './Employeeinfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

interface LoginScreenProps {
  navigation: any;
}

function Homenavigator(props: LoginScreenProps) {
  const handleLogOut = async () => {
    await AsyncStorage.removeItem('authToken');
    props.navigation.navigate("Login");
  }

  const EmptyLogoutComponent = () => {
    return null;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Logout') {
            iconName = focused ? 'exit-to-app' : 'exit-to-app';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
      <Tab.Screen
        name="Logout"
        component={EmptyLogoutComponent}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size, focused }) => (
            <TouchableOpacity onPress={handleLogOut}>
              <Icon name={focused ? 'exit-to-app' : 'exit-to-app'} size={size} color={color} />
            </TouchableOpacity>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={handleLogOut} disabled />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Homenavigator;