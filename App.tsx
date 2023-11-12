import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
// import { useColorScheme } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-native-paper';
import BottomNavigationBar from './components/BottomNavigationBar';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider>
        <BottomNavigationBar />
        <StatusBar />
      </Provider>
    </SafeAreaProvider>
  );
}
