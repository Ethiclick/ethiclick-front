/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';

import { Icon, Portal } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
// import About from '../screens/About';
// import Favorites from '../screens/Favorites';
import Notifications from '../screens/Notifications';
import Profil from '../screens/Profil';
import Favorites from '../screens/Favorites';

const Tab = createBottomTabNavigator();
function BottomNavigationBar() {
  return (
    <Portal>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            // headerShown: false, // Globally
            tabBarStyle: { position: 'absolute', bottom: 30, left: 15, right: 15, borderRadius: 12, opacity: 0.9 },
          }}
        >
          <Tab.Screen
            name="Accueil"
            options={{
              headerShown: false,
              tabBarLabel: 'Accueil',
              tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} />,
            }}
            component={Home}
          />
          {/* <Tab.Screen
          options={{
            tabBarLabel: 'Rechercher',
            tabBarIcon: ({ color, size }) => <Icon source="magnify" color={color} size={size} />,
          }}
          name="Rechercher"
          component={Favorites}
        /> */}
          <Tab.Screen
            options={{
              // headerShown: true, // Specific view
              tabBarLabel: 'Favoris',
              tabBarIcon: ({ color, size }) => <Icon source="heart" color={color} size={size} />,
            }}
            name="Favoris"
            component={Favorites}
          />
          <Tab.Screen
            options={{
              tabBarLabel: 'Notifications',
              tabBarIcon: ({ color, size }) => <Icon source="bell" color={color} size={size} />,
            }}
            name="Notifications"
            component={Notifications}
          />
          <Tab.Screen
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => <Icon source="account" color={color} size={size} />,
            }}
            name="Profile"
            component={Profil}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Portal>
  );
}

export default BottomNavigationBar;
