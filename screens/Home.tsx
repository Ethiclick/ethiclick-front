/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Avatar, FAB, Menu, Button, Searchbar, Chip, Card, Icon } from 'react-native-paper';
import type { NavigationProp } from '@react-navigation/native';
// import SplashScreen from 'react-native-splash-screen';
import { isLogged, getUser, logout, useAppDispatch, useAppSelector } from '../store';
import Square from './../components/square';

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
    marginTop: 30,
    paddingTop: '5%',
    paddingLeft: '2%',
    paddingRight: '2%',
    backgroundColor: 'yellow',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

// TODO: récuprérer les categorie en base
const categories = [
  {
    id: '1',
    label: 'Alimentation',
    bgColor: '#0BC0EC',
    color: '#fff',
    selected: false,
  },
  {
    id: '2',
    label: 'Bien être',
    bgColor: '#F9DB67',
    color: '#fff',
    selected: false,
  },
  {
    id: '3',
    label: 'Finances',
    bgColor: '#82D658',
    color: '#fff',
    selected: false,
  },
  {
    id: '4',
    label: 'Nettoyage',
    bgColor: '#A80BEC',
    color: '#fff',
    selected: false,
  },
  {
    id: '5',
    label: 'Transport',
    bgColor: '#EC370B',
    color: '#fff',
    selected: false,
  },
  {
    id: '6',
    label: 'Mode',
    bgColor: '#F967CE',
    color: '#fff',
    selected: false,
  },
  {
    id: '7',
    label: 'Habitat',
    bgColor: '#28D7D6',
    color: '#fff',
    selected: false,
  },
  {
    id: '8',
    label: 'Faune & flore',
    bgColor: '#1EE153',
    color: '#fff',
    selected: false,
  },
];

// function setFilterActive(setFilterQuery: React.Dispatch<React.SetStateAction<string>>, id: string) {

// }

function Filters() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterQuery, setFilterQuery] = React.useState('');
  const [filterActive, setFilterActive] = React.useState(['']);

  return (
    <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
      {categories.map<React.JSX.Element>((filter) => {
        return (
          <Chip
            selected={filterActive.includes(filter.id)}
            key={filter.id}
            style={{ ...styles.filter, ...{ backgroundColor: filter.bgColor } }}
            textStyle={{ color: filter.color }}
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
            {filter.label}
          </Chip>
        );
      })}
    </ScrollView>
  );
}

function SearchBar({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList> }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const dispatch = useAppDispatch();
  const logged = useAppSelector(isLogged);
  console.log(logged);
  // todo : voir pourquoi le rendu searchbar n'est pas relancer après changement de page..
  const user = useAppSelector(getUser) as { email: string };

  return (
    <View
      style={{
        position: 'absolute',
        top: 50,
        left: 30,
        right: 30,
        borderRadius: 15,
      }}
    >
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
            // contentStyle={{backgroundColor: COLORS.controlNormal}}
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
      <Filters />
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

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        alert("Vous avez refusé l'accès à votre localisation.");
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
              title="Your Location"
            />
          )}
        </MapView>
      )}
      {currentView === 'list' && (
        <ScrollView centerContent style={{ flex: 2, width: '100%', height: '100%' }}>
          <View style={styles.containerList}>
        {(() => {
            const squares = [];
            for (let i = 0; i < categories.length; i++) {
              const data1 = categories[i];
              const data2 = categories[i + 1];
              
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
      )}
      {currentView === 'map' && <SearchBar navigation={navigation} />}

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
