/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Avatar, FAB, Menu, Button, Searchbar, Chip } from 'react-native-paper';
import type { NavigationProp } from '@react-navigation/native';
// import SplashScreen from 'react-native-splash-screen';
import { isLogged, getUser, logout, useAppDispatch, useAppSelector } from '../store';
import Square from './../components/square';
// import * as Network from 'expo-network'; // récupération de l'ip
// Définition des type des props du composant SearchBar
interface SearchBarProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  currentView: string;
}


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
    marginTop: "32%",
    paddingTop: '5%',
    paddingLeft: '2%',
    paddingRight: '2%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

function fectchCat1 () {
  const [categories, setDataArray] = useState([]);

  useEffect(() => {
    fetchData(); // Appel à l'API lors du chargement du composant
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://51.77.193.240:42553/categorie/get/1'); // On récupère les categories de niv1
      const jsonData = await response.json();

      setDataArray(jsonData); // On stock les données dans un tableau
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
  return categories;
}

function Filters() {

  const categories = fectchCat1();
  const [filterQuery, setFilterQuery] = React.useState('');
  const [filterActive, setFilterActive] = React.useState(['']);

  return (
    <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
      {categories.map<React.JSX.Element>((filter : Array) => {
        return (
          <Chip
            selected={filterActive.includes(filter.id)}
            key={filter.id}
            style={{ ...styles.filter, ...{ backgroundColor: filter.color } }}
            textStyle={{ color: "black" }} // à voir si on enregistre en base la couleur du txt pour la lisibilité pour si on le gère ici ?
            onPress={() => {
              const filterObj = categories.find((f) => f.id === filter.id);

              if (!filterObj) {
                throw new Error('filter not found');
              }
              filterObj.selected = !filterObj.selected;
              setFilterActive(categories.filter((fil) => fil.selected).map((a) => a.id));
              setFilterQuery(filter.id);
            }}
          >
            {filter.libelle}
          </Chip>
        );
      })}
    </ScrollView>
  );
}

function SearchBar({ navigation, currentView }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const dispatch = useAppDispatch();
  const logged = useAppSelector(isLogged);
  const user = useAppSelector(getUser) as { email: string };
  

 const sbStyle = StyleSheet.create({
    map: {
      position: 'absolute',
      top: 50,
      left: 5,
      right: 5,
      borderRadius: 15,
      width: "97%"
    },
    list : {
      position: "absolute",
      top: 50,
      left: 5,
      right: 5,
      width: '97%',
      borderRadius: 15,
      zIndex: 1,
    }

 });
  return (
    <View style={currentView === "map" ? sbStyle.map : sbStyle.list}>
      <Searchbar
        elevation={2}
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          paddingEnd: 65,
        }}
        placeholder="Rechercher"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{ flex: 1, position: 'absolute', right: 5, top: 7, bottom: 0 }}>
        <View style={{ alignItems: 'flex-end' }}>
          <Menu
            anchorPosition="bottom"
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button icon="chevron-down" style={{ padding: '0.75%' }} compact onPress={() => openMenu()}>
                {logged ? <Avatar.Text size={30} label={user.email} /> : <Avatar.Text size={30} label="?" />}
              </Button>
            }
          >
            <Menu.Item onPress={() => {}} title="Proposer un pro" leadingIcon="badge-account-outline" />
            <Menu.Item onPress={() => {}} title="Signaler un pro" leadingIcon="badge-account-alert-outline" />
            {logged ? (
              <>
                <Menu.Item
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate('Profile' as never);
                  }}
                  title="Mon profil"
                  leadingIcon="account-circle-outline"
                />
                <Menu.Item
                  onPress={() => {
                    dispatch(logout());
                  }}
                  title="Se déconnecter"
                  leadingIcon="logout"
                />
              </>
            ) : null}
          </Menu>
        </View>
      </View>
      {currentView === 'map' && <Filters/>}
    </View>
  );
}

function Home({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList> }) {
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [currentView, setCurrentView] = useState('map');
  const mapViewRef = useRef<MapView>(null);
  const categories = fectchCat1();

  // Récupération de la localisation
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        alert("Vous avez refusé l'accès à votre localisation");
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

 
  // récupération adresse IP expoGo
  // useEffect(() => {
  //   fetchIpAddress();
  // }, []);
  // const fetchIpAddress = async () => {
  //   try {
  //     const ipAddress = await Network.getIpAddressAsync();
  //     console.log(ipAddress);
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération de l\'adresse IP:', error);
  //   }
  // };

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
        <SearchBar navigation={navigation} currentView={currentView}/>
          <ScrollView centerContent>
              <View style={styles.containerList}>
          {(() => {
              const squares = [];
              for (let i = 0; i < categories.length; i++) {
                const data1 = categories[i];
                const data2 = categories[i + 1];

                if (!data1 || !data2) break;
                
                squares.push(
                  <Square key={i} data1={data1} data2={data2} />
                );
                // On incrémente pour tjrs être sur le bon index
                i++
              }
              return squares;
          })()}
          </View>
        </ScrollView>
      </View>

      )}
      {currentView === 'map' && <SearchBar navigation={navigation} currentView={currentView}/>}
        
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
