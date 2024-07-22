/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MD3Colors } from 'react-native-paper';

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
  const logged = useAppSelector(isLogged);
  return (
    <Tab.Navigator
      safeAreaInsets={{
        bottom: 0,
      }}
      screenOptions={() => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 15,
          right: 15,
          borderRadius: 12,
          height: 60,
          // display: 'none'
        },
        tabBarItemStyle: {
          borderRadius: 12,
          padding: 10,
        },
        tabBarActiveTintColor: MD3Colors.tertiary0,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: MD3Colors.primary60,
        // eslint-disable-next-line react/jsx-props-no-spreading
        tabBarButton: (props) => <TouchableOpacity {...props} />,
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
      {logged ? (
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
