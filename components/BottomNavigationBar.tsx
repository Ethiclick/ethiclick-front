import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
// import { StyleSheet } from 'react-native';
import Home from '../screens/Home';
import About from '../screens/About';
import Favorites from '../screens/Favorites';
import Notifications from '../screens/Notifications';

function BottomNavigationBar() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'about',
      title: 'About',
      focusedIcon: 'information',
      unfocusedIcon: 'information-outline',
    },
    {
      key: 'favorites',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    about: About,
    favorites: Favorites,
    notifications: Notifications,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      compact={false}
      labeled
      barStyle={{
        display: 'flex',
        position: 'relative',
        width: '85%',
        bottom: 50,
        transform: [{ translateX: 50 }],
        borderRadius: 30,
      }}
    />
  );
}

export default BottomNavigationBar;
