/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Avatar, FAB, Menu, Button, Searchbar, Chip, Text, Card } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
// import SplashScreen from 'react-native-splash-screen';
import { isLogged, useAppSelector } from '../store';

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
});

const filters = [
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
      {filters.map<React.JSX.Element>((filter) => {
        return (
          <Chip
            selected={filterActive.includes(filter.id)}
            key={filter.id}
            style={{ ...styles.filter, ...{ backgroundColor: filter.bgColor } }}
            textStyle={{ color: filter.color }}
            onPress={() => {
              const filterObj = filters.find((f) => f.id === filter.id);

              if (!filterObj) {
                throw new Error('filter not found');
              }
              filterObj.selected = !filterObj.selected;
              setFilterActive(filters.filter((fil) => fil.selected).map((a) => a.id));
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
                <Avatar.Text size={30} label={useAppSelector(isLogged) ? 'FW' : '?'} />
              </Button>
            }
          >
            <Menu.Item onPress={() => {}} title="Proposer un pro" leadingIcon="badge-account-outline" />
            <Menu.Item onPress={() => {}} title="Signaler un pro" leadingIcon="badge-account-alert-outline" />
            {useAppSelector(isLogged) ? (
              <>
                <Menu.Item
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate('Profile' as never);
                  }}
                  title="Mon profil"
                  leadingIcon="account-circle-outline"
                />
                <Menu.Item onPress={() => {}} title="Se déconnecter" leadingIcon="logout" />
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

    getLocation().catch(console.error);
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
        <Card style={{ width: 'auto' }}>
          <Card.Title title="Titre" subtitle="Sous titre" />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
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
