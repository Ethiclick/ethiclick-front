import * as React from 'react';

import { BottomNavigation, Icon, Surface } from 'react-native-paper';
import Home from '../screens/Home';
import About from '../screens/About';
import Favorites from '../screens/Favorites';
import Notifications from '../screens/Notifications';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

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
          name="Home"
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} />,
          }}
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => <Icon source="magnify" color={color} size={size} />,
          }}
          name="Search"
          component={Favorites}
        />
        <Tab.Screen
          options={{
            // headerShown: true, // Specific view
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color, size }) => <Icon source="heart" color={color} size={size} />,
          }}
          name="Notifications"
          component={Notifications}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'settings',
            tabBarIcon: ({ color, size }) => <Icon source="cog" color={color} size={size} />,
          }}
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomNavigationBar;
