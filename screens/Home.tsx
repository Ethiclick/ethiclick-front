import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
// import SearchBar from '../components/SearchBar';
// import ChangeHomeView from '../components/ChangeHomeView';
// import Locate from '../components/Locate';
import { Avatar, FAB, Menu, Button, Searchbar, Chip } from 'react-native-paper';


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
    bottom: 110,
  },
  locate: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 110,
  },
  filters: {
    marginTop: 10,
    alignSelf: "flex-start"
  },
  filter: {
    margin: 2,
    alignItems: 'baseline'
  }
});

function SearchBar({ navigation }: any) {
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
        placeholder="Search"
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
              <Button icon={'chevron-down'} style={{ padding: '0.75%' }} compact={true} onPress={() => openMenu()}>
                {/* <Icon source={'chevron-down'} size={20} /> */}
                <Avatar.Text size={30} label="FW" />
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setVisible(false);
                navigation.navigate('Profile');
              }}
              title="Mon profil"
              leadingIcon={'account-circle-outline'}
            />
            <Menu.Item onPress={() => {}} title="Se déconnecter" leadingIcon={'logout'} />
          </Menu>
        </View>
      </View>
      <Filters />
    </View>
  );
}

function Filters() {
  return (
    <ScrollView horizontal style={styles.filters}>
      <Chip style={styles.filter} onPress={() => console.log('Pressed')}>Alimentation</Chip>
      <Chip style={styles.filter} onPress={() => console.log('Pressed')}>Bien être</Chip>
      <Chip style={styles.filter} onPress={() => console.log('Pressed')}>Finances</Chip>
      <Chip style={styles.filter} onPress={() => console.log('Pressed')}>Nettoyage</Chip>
      <Chip style={styles.filter} onPress={() => console.log('Pressed')}>Transport</Chip>
      <Chip style={styles.filter} onPress={() => console.log('Pressed')}>Mode</Chip>
      <Chip style={styles.filter} onPress={() => console.log('Pressed')}>Habitat</Chip>
      <Chip style={styles.filter} onPress={() => console.log('Pressed')}>Faune & flore</Chip>
    </ScrollView >
  )
}



function ChangeHomeView() {
  return <FAB size="small" icon="view-list" style={styles.changeHomeView} onPress={() => console.log('Pressed')} />;
}

function Locate() {
  return <FAB size="small" icon="crosshairs-gps" style={styles.locate} onPress={() => console.log('Pressed')} />;
}

function Home({ navigation }: any) {
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      return true;
    };

    getLocation().then(console.log).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
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
      <SearchBar navigation={navigation} />
      <ChangeHomeView />
      <Locate />
    </View>
  );
}

export default Home;
