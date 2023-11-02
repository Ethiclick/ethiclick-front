import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from 'react-native'
// import { useColorScheme } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home'
import About from './screens/About'

// import AppBar from './components/layout/partials/AppBar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="About" options={{ headerShown: false}} component={About} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
