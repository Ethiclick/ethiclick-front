import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';
import { FAB, Icon, Text } from 'react-native-paper';
import { fetchData } from '../utils/fetch';
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// Types
import type { Categorie } from '../@types/categorie';
import type { Professionnel } from '../@types/professionnel';
// Components
import SearchBar from '../components/SearchBar';
import { CategorieScreenNavigationProp } from '../@types/routes';
import IconMarker from '../components/icons/IconMarker';
import IconAdresse from '../components/icons/IconAdresse';
import ListView from '../components/ListView';
import Filters from '../components/Filters';

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
  containerPro: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
  const fetchAllData = async () => {
    const fetchedCat = await fetchData<Categorie[]>('/categorie/get/1');
    const fetchedPro = await fetchData<Professionnel[]>('/professionnel/');
    setCategories(fetchedCat);
    setProfessionnels(fetchedPro);
    setProfessionnels([
      {
        nom: 'Otsokop',
        adresse: '4 Av. de Lattre de Tassigny',
        siret: '81463818500037',
        city: 'Bayonne',
        postal_code: 64100,
        website: 'https://www.otsokop.org/',
        acc_card: true,
        photos: 'https://www.ethiclick.fr/wp-content/uploads/2024/04/otsokop-300x150.jpg',
        id: 1,
        coordinates: [43.502246856780125, -1.468032644379112],
        createdAt: undefined,
        updatedAt: undefined,
        iduser: 0,
        profile: undefined,
        id_cat1: 1,
        id_cat2: undefined,
        id_cat3: undefined,
        id_priceRange: undefined,
        id_abo: undefined,
      },
      {
        nom: 'Grain de soleil',
        siret: '479 509 762 00023',
        adresse: '34 Rue Arnaud Détroyat',
        city: 'Bayonne',
        postal_code: 64100,
        website: 'https://magasins.lescomptoirsdelabio.fr/fr/grain-de-soleil-bayonne-105456',
        acc_card: true,
        photos: 'https://www.ethiclick.fr/wp-content/uploads/2024/04/grain2soleil.jpeg',
        id: 2,
        coordinates: [43.491955966018, -1.4947859130452246],
        createdAt: undefined,
        updatedAt: undefined,
        iduser: 0,
        profile: undefined,
        id_cat1: 1,
        id_cat2: undefined,
        id_cat3: undefined,
        id_priceRange: undefined,
        id_abo: undefined,
      },
      {
        nom: 'La licorne de victorine',
        siret: 'dde',
        adresse: '15 Imp. Oihana, 64200 Bassussarry',
        city: 'Bayonne',
        postal_code: 64100,
        website: 'https://lalicornedevictorine.com/',
        acc_card: true,
        photos: '[ {"1": "superPhoto.jpg" } ]',
        id: 3,
        coordinates: [43.44530395982366, -1.4864462418907547],
        createdAt: undefined,
        updatedAt: undefined,
        iduser: 0,
        profile: undefined,
        id_cat1: 2,
        id_cat2: undefined,
        id_cat3: undefined,
        id_priceRange: undefined,
        id_abo: undefined,
      },
      {
        nom: 'Brasserie BASA',
        siret: '85332303800010',
        adresse: "74 Rue d'Espagne",
        city: 'Bayonne',
        postal_code: 64100,
        website: 'https://www.brasserie-basa.com/',
        acc_card: true,
        photos: '[ {"1": "superPhoto.jpg" } ]',
        id: 0,
        coordinates: [43.49026989376102, -1.4764395885596069],
        createdAt: undefined,
        updatedAt: undefined,
        iduser: 0,
        profile: undefined,
        id_cat1: 1,
        id_cat2: undefined,
        id_cat3: undefined,
        id_priceRange: undefined,
        id_abo: undefined,
      },
    ]);
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

  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks bottomSheetRef
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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

          {professionnels.length > 0 &&
            professionnels.map(
              (pro) =>
                filters.includes(pro.id_cat1.toString()) && (
                  <Marker
                    key={pro.id}
                    coordinate={{
                      latitude: pro.coordinates[0],
                      longitude: pro.coordinates[1],
                    }}
                    pinColor={categories.filter((cat) => cat.id === pro.id_cat1)[0].color}
                  >
                    <View>
                      <IconMarker size={40} color={categories.filter((cat) => cat.id === pro.id_cat1)[0].color} />
                    </View>
                    <Callout style={{ width: 250, gap: 10, padding: 5, overflow: 'visible' }}>
                      {/* <BottomSheet
                        ref={bottomSheetRef}
                        onChange={handleSheetChanges}
                        snapPoints={[1, '50%', '75%']}
                        style={styles.containerPro}
                        >
                        <BottomSheetView style={styles.contentContainer}>
                          <Text>Awesome 🎉</Text>
                        </BottomSheetView>
                      </BottomSheet> */}
                      <Text variant="titleMedium">{pro.nom}</Text>
                      <Text>
                        <IconAdresse />
                        {pro.adresse}
                      </Text>
                      <Text style={{ flex: 1, justifyContent: 'center' }}>
                        <Icon source="web" size={15} />
                        Site :{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => Linking.openURL(pro.website)}>
                          <Text style={{ color: 'blue' }}>{pro.nom}</Text>
                        </TouchableOpacity>
                      </Text>
                      <Text>Itinéraire : </Text>
                    </Callout>
                  </Marker>
                )
            )}
        </MapView>
      )}
      {currentView === 'list' && <ListView navigation={navigation} categories={categories} professionnels={professionnels} />}
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
          size="medium"
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
