import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store'; // Assurez-vous d'importer correctement votre store Redux
import WelcomeScreen from './screens/Welcome';
import Login from './screens/Login';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigationBar from './components/BottomNavigationBar';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            {/* <Stack.Screen name="BottomNavigationBar" component={BottomNavigationBar} options={{ headerShown: false }}/> */}
          </Stack.Navigator>
          {/* <BottomNavigationBar /> */}
          <StatusBar />
          
        </NavigationContainer>
        </ReduxProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
