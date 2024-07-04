import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import Login from './screens/Login';
import BottomNavigationBar from './components/BottomNavigationBar';
import { isLogged, store, useAppSelector } from './store';
import Categorie from './screens/Categorie';
import { RootStackParamList } from './@types/routes';
import { THEME } from './utils/constantes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const theme = {
  ...DefaultTheme,
  colors: THEME,
};

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator>
        {useAppSelector(isLogged) ? (
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {() => <BottomNavigationBar />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <Login />}
          </Stack.Screen>
        )}
        <Stack.Screen
          name="Categorie"
          component={Categorie}
          // eslint-disable-next-line react/no-unstable-nested-components
          options={({ route }) => ({
            headerBackTitle: 'Accueil',
            title: route.params.name,
          })}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}

export default function AppWrapper() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={THEME}>
        <ReduxProvider store={store}>
          <NavigationContainer>
            <StatusBar />
            <App />
          </NavigationContainer>
        </ReduxProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
