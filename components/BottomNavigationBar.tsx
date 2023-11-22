/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { Icon, Portal } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-extraneous-dependencies
import Home from '../screens/Home';
// import About from '../screens/About';
// import Favorites from '../screens/Favorites';
import Notifications from '../screens/Notifications';
import Profil from '../screens/Profil';
import Favorites from '../screens/Favorites';
// import { RootState, useAppSelector } from '../store';

const connected = true;
const Tab = createBottomTabNavigator();
function BottomNavigationBar() {
  // const connected = useAppSelector((state: RootState) => state.counter.value);
  // const dispatch = useAppDispatch();
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
          {connected && (
            <Tab.Screen
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => <Icon source="account" color={color} size={size} />,
              }}
              name="Profile"
              component={Profil}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Portal>
  );
}

export default BottomNavigationBar;
