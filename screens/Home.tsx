import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import { fetchData } from '../utils/fetch';
import { useAppSelector, getUser } from '../store';

// Types
import type { Categorie } from '../@types/categorie';
import type { Professionnel } from '../@types/professionnel';
// Components
import SearchBar from '../components/SearchBar';
import { CategorieScreenNavigationProp } from '../@types/routes';
import IconMarker from '../components/icons/IconMarker';
import ListViewComponent from '../components/ListViewComponent';
import Filters from '../components/Filters';
import BottomSheetPro from '../components/BottomSheetPro';

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
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 5,
    right: 5,
    borderRadius: 15,
    width: '97%',
  },
  changeHomeView: {
    position: 'absolute',
    margin: 16,
    left: '50%',
    transform: [{ translateX: -40 }],
    bottom: 90,
  },
  locate: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 90,
  },
});

function Home({ navigation }: { navigation: CategorieScreenNavigationProp }) {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [professionnels, setProfessionnels] = useState<Professionnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [currentView, setCurrentView] = useState<'map' | 'list'>('map');
  const mapViewRef = useRef<MapView>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const getFilters = (f: string[]) => {
    setFilters(f);
  };

  const user = useAppSelector(getUser) as { token: string };
  const TOKEN = user.token;

  const fetchAllData = async () => {
    const fetchedCat = await fetchData<Categorie[]>('/categorie/get/1', TOKEN);
    const fetchedPro = await fetchData<Professionnel[]>('/professionnel/', TOKEN);
    setCategories(fetchedCat);
    setProfessionnels(fetchedPro);
    setLoading(false);
  };

  // Récupération de la localisation
  useEffect(() => {
    // eslint-disable-next-line no-void
    void fetchAllData();

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

  const [selectedPro, setSelectedPro] = useState<Professionnel | null>(null);

  const handleMarkerPress = (pro: Professionnel) => {
    setSelectedPro(pro);
    // setBottomNavVisible(false);
    
  };
  const handleCloseBottomSheet = () => {
    setSelectedPro(null);
  };

  return (
    <View style={styles.container}>
      {initialRegion && currentView === 'map' && (
        <MapView ref={mapViewRef} style={styles.map} initialRegion={initialRegion} showsUserLocation={true} showsMyLocationButton={false} toolbarEnabled={false}
        >
          {professionnels.length > 0 &&
            professionnels.map(
              (pro) =>
                filters && filters.includes(pro.idcat1.toString()) && (
                  <Marker
                    key={pro.id}
                    coordinate={{
                      latitude: pro.coordinates.x,
                      longitude: pro.coordinates.y,
                    }}
                    pinColor={categories.filter((cat) => cat.id === pro.idcat1)[0].color}
                    onPress={() => handleMarkerPress(pro)}
                  > 
                    <View>
                      <IconMarker size={40} color={categories.filter((cat) => cat.id === pro.idcat1)[0].color} />
                    </View>
                  </Marker>
                )
            )}
        </MapView>
      )}
      {currentView === 'list' && <ListViewComponent navigation={navigation} categories={categories} professionnels={professionnels} />}
      {/* on check currentView pour éviter le doublon du composant */}
      {!loading && (
        <View style={styles.searchContainer}>
          <SearchBar navigation={navigation} currentView={currentView} categories={categories} loading={loading} />
          {currentView === 'map' && <Filters passFilterToMap={getFilters} categories={categories} loading={loading} />}
        </View>
      )}

      {/* Icone de changement de vue List/carte */}
      <FAB
        size="medium"
        icon={currentView === 'map' ? 'view-list' : 'map'}
        style={styles.changeHomeView}
        onPress={() => {
          setCurrentView((prev) => (prev === 'map' ? 'list' : 'map'));
        }}
      />

      {/* Icone centrer sur ma position */}
      {currentView === 'map' && (
        <FAB
          size="medium"
          icon="crosshairs-gps"
          style={styles.locate}
          onPress={() => {
            if (initialRegion && mapViewRef.current) {
              mapViewRef.current.animateToRegion(initialRegion);
            }
          }}
        />
      )}

      {/* Fiche pro */}
      {currentView === 'map' && selectedPro && categories && !loading && (
        <BottomSheetPro
          selectedPro={selectedPro}
          onClose={handleCloseBottomSheet}
          categories= {categories}
        />
      )}
    </View>
  );
}

export default Home;
