import * as React from 'react';

import { Icon } from 'react-native-paper';

import Home from '../screens/Home';
import About from '../screens/About';
import Favorites from '../screens/Favorites';
import Notifications from '../screens/Notifications';
import Profil from '../screens/Profil';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
function BottomNavigationBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          // headerShown: false, // Globally
          tabBarStyle: { position: 'absolute', bottom: 30, left: 15, right: 15, borderRadius: 12, opacity: 0.8 },
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
        <Tab.Screen
          options={{
            tabBarLabel: 'Rechercher',
            tabBarIcon: ({ color, size }) => <Icon source="magnify" color={color} size={size} />,
          }}
          name="Rechercher"
          component={Favorites}
        />
        <Tab.Screen
          options={{
            // headerShown: true, // Specific view
            tabBarLabel: 'Favoris',
            tabBarIcon: ({ color, size }) => <Icon source="heart" color={color} size={size} />,
          }}
          name="Favoris"
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
  );
}

export default BottomNavigationBar;
