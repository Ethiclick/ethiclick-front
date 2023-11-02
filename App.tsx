import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from 'react-native'
// import { useColorScheme } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomNavigationBar from './components/BottomNavigationBar';

// import AppBar from './components/layout/partials/AppBar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
        <BottomNavigationBar />
        <StatusBar />
    </SafeAreaProvider>
  );
}
