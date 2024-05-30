/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
// import { Icon } from 'react-native-paper';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Profil from '../screens/Profil';
import Favorites from '../screens/Favorites';
import { isLogged, useAppSelector } from '../store';
import Login from '../screens/Login';

// Icons
import IconHome from './icons/IconHome';
import IconFavoris from './icons/IconFavoris';
import IconNotif from './icons/IconNotif';
import IconUser from './icons/IconUser';
import IconLogin from './icons/IconLogin';

const Tab = createBottomTabNavigator();
function BottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 15,
          right: 15,
          borderRadius: 12,
          opacity: route.name === 'Se connecter' ? 0 : 1, // on cache la bar de nav pour la page de login
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Accueil"
        options={{
          headerShown: false,
          tabBarLabel: 'Accueil',
          tabBarIcon: IconHome,
        }}
        component={Home}
      />
      <Tab.Screen
        options={{
          // headerShown: true, // Specific view
          tabBarLabel: 'Favoris',
          tabBarIcon: IconFavoris,
        }}
        name="Favoris"
        component={Favorites}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: IconNotif,
        }}
        name="Notifications"
        component={Notifications}
      />
      {useAppSelector(isLogged) ? (
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarIcon: IconUser,
          }}
          name="Profile"
          component={Profil}
        />
      ) : (
        <Tab.Screen
          options={{
            tabBarLabel: 'Se connecter',
            tabBarIcon: IconLogin,
          }}
          name="Se connecter"
          component={Login}
        />
      )}
    </Tab.Navigator>
  );
}

export default React.memo(BottomNavigationBar);
