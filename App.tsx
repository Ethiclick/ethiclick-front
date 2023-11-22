/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
// import { useColorScheme } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import BottomNavigationBar from './components/BottomNavigationBar';
import { store } from './store';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ReduxProvider store={store}>
          <BottomNavigationBar />
          <StatusBar />
        </ReduxProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
