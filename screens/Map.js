import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 56.26392,
    longitude: 9.501785,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);

  const getMarkers = async () => {
    try {
      const storedMarkers = await AsyncStorage.getItem('markers');
      if (storedMarkers !== null) {
        const parsedMarkers = JSON.parse(storedMarkers);
        setMarkers(parsedMarkers);
        const latestMarker = parsedMarkers[parsedMarkers.length - 1];
        setInitialRegion({
          latitude: latestMarker.latitude,
          longitude: latestMarker.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error retrieving markers', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getMarkers();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            pinColor="#FF0000" // Custom pin color
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});