import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import type { NavigationProp } from '@react-navigation/native';
import Square from '../components/square';
import { fetchData } from '../utils/fetch';
import { Categorie } from '../@types/categorie';
import SearchBar from '../components/SearchBar';
// Définition des type des props du composant SearchBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  changeHomeView: {
    position: 'absolute',
    margin: 16,
    left: '50%',
    transform: [{ translateX: -40 }],
    bottom: Platform.OS === 'ios' ? 110 : 80,
  },
  locate: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: Platform.OS === 'ios' ? 110 : 80,
  },
  filters: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  filter: {
    margin: 2,
    alignItems: 'baseline',
  },
  containerList: {
    marginVertical: '32%',
    paddingHorizontal: '2%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

function Home({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList> }) {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [currentView, setCurrentView] = useState('map');
  const mapViewRef = useRef<MapView>(null);

  const fetchCategories = async () => {
    const data = await fetchData<Categorie[]>('/categorie/get/1');
    setCategories(data);
    setLoading(false);
  };

  // Récupération de la localisation
  useEffect(() => {
    // eslint-disable-next-line no-void
    void fetchCategories();

    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        Alert.alert("Vous avez refusé l'accès à votre localisation");
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.105,
        longitudeDelta: 0.105,
      });
    };

    getLocation().catch(alert);
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && currentView === 'map' && (
        <MapView ref={mapViewRef} style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Votre position"
            />
          )}
        </MapView>
      )}
      {currentView === 'list' && (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
          <SearchBar navigation={navigation} currentView={currentView} categories={categories} loading={loading} />
          <ScrollView>
            <View style={styles.containerList}>
              {(() => {
                const squares = [];
                for (let i = 0; i < categories.length; i += 2) {
                  const data1 = categories[i];
                  const data2 = categories[i + 1];

                  if (!data1 || !data2) break;

                  squares.push(<Square key={i} data1={data1} data2={data2} setCurrentView={setCurrentView} />);
                }
                return squares;
              })()}
            </View>
          </ScrollView>
        </View>
      )}
      {currentView === 'map' && <SearchBar navigation={navigation} currentView={currentView} categories={categories} loading={loading} />}

      {/* Icone de changement de vue List/carte */}
      <FAB
        size="small"
        icon={currentView === 'map' ? 'view-list' : 'map'}
        style={styles.changeHomeView}
        onPress={() => {
          if (currentView === 'map') {
            setCurrentView('list');
          } else {
            setCurrentView('map');
          }
        }}
      />

      {/* Icone centrer sur ma position */}
      {currentView === 'map' && (
        <FAB
          size="small"
          icon="crosshairs-gps"
          style={styles.locate}
          onPress={() => {
            if (initialRegion && mapViewRef) {
              mapViewRef.current?.animateToRegion(initialRegion);
            }
          }}
        />
      )}
    </View>
  );
}

export default Home;
