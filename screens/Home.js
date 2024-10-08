// npm i react-native-vector-icons @react-navigation/bottom-tabs react-native-maps
//npx expo install expo-location expo-constants
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function Home({navigation}) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [markers, setMarkers] = useState([]);
  
    const addAndSaveMarker = async () => {
      const newMarker = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
      const updatedMarkers = [...markers, newMarker];
      setMarkers(updatedMarkers);
      setLatitude('');
      setLongitude('');
  
      try {
        await AsyncStorage.setItem('markers', JSON.stringify(updatedMarkers));
        navigation.navigate('Map');
      } catch (error) {
        console.error('Error saving markers', error);
      }
    };

  
  return (
    <View style={styles.container}>
        <Image source={require('../assets/backgroun.jpeg')} style={{width: '100%', height: '100%'}}/>
        <LinearGradient
        // Background Linear Gradient
        colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.75)','rgba(255,255,255,1)', 'rgba(255,255,255,1)']}
        style={styles.background}
      />
        <View style = {styles.bcg}>
            <Image source={require('../assets/logo.png')} style={{width: 100, height: 100, marginBottom: 50}}/>
            <Text style={styles.title}> INNT Map App </Text>
            <TextInput style={styles.input} value={latitude} onChangeText={setLatitude} placeholder="lattitude"/>
            <TextInput style={styles.input} value={longitude} onChangeText={setLongitude} placeholder="longitude"/>
            <TouchableOpacity style={styles.button} onPress={addAndSaveMarker}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>

        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
    bcg: {
        padding: 80,
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',

    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 80,
    },
    input: {
        height: 40,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '90%',
        borderRadius: 20, // Makes the input round
        backgroundColor: '#f9f9f9', // Light background color for minimalistic look
    },
    button: {
        backgroundColor: '#FF0000', // Red color matching the logo
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        width: '90%',
        marginTop: 40,
      },
    buttonText: {
        color: '#FFFFFF', // White text color
        fontSize: 16,
        fontWeight: 'bold',
      },
});