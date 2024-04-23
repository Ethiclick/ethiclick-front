import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store'; // Assurez-vous d'importer correctement votre store Redux
import WelcomeScreen from './screens/Welcome';
import Login from './screens/Login';
import Home from './screens/Home';
import Profil from './screens/Profil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigationBar from './components/BottomNavigationBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function App() {
  const Stack = createNativeStackNavigator();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  // const handleLogout = () => {
  //   setUserLoggedIn(false);
  // };

  console.log(userLoggedIn);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ReduxProvider store={store}>
          <NavigationContainer>
          <Stack.Navigator>
            {userLoggedIn ? (
                <Stack.Screen name="Home" options={{ headerShown: false }}>
                  {() => (
                    <>
                      <BottomNavigationBar />
                    </>
                  )}
                </Stack.Screen>
              ) : (
                <>
                  <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Login">
                    {(props) => <Login {...props} onLogin={handleLogin} />}
                  </Stack.Screen>
                </>
              )}
            </Stack.Navigator>
            <StatusBar />
          </NavigationContainer>
        </ReduxProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
