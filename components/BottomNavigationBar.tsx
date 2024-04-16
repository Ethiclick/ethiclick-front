/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { Icon } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Profil from '../screens/Profil';
import Favorites from '../screens/Favorites';
import { isLogged, useAppSelector } from '../store';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();
function BottomNavigationBar() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
              tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} />,
            }}
            component={Home}
          />
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
          {useAppSelector(isLogged) ? (
            <Tab.Screen
              options={{
              headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => <Icon source="account" color={color} size={size} />,
              }}
              name="Profile"
              component={Profil}
            />
          ) : (
            <Tab.Screen
              options={{
                tabBarLabel: 'Se connecter',
                tabBarIcon: ({ color, size }) => <Icon source="login" color={color} size={size} />,
              }}
              name="Se connecter"
              component={Login}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default React.memo(BottomNavigationBar);
