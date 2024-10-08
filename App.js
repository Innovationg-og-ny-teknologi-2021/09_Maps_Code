// npm i react-native-vector-icons @react-navigation/bottom-tabs react-native-maps
//npx expo install expo-location expo-constants
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './screens/Home';
import Map from './screens/Map';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: '#FF0000',
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({color, size}) => {
            let iconName;

            if(route.name === 'Home'){
              iconName = 'home'
            }else if(route.name === 'Map'){
              iconName = 'map'
            }

            return <Ionicons name={iconName} size={size} color={color}/>
          }
        })}
        >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
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
