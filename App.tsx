import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import BottomNavigationBar from './components/BottomNavigationBar';
import { isLogged, store, useAppSelector } from './store'; // Assurez-vous d'importer correctement votre store Redux
import WelcomeScreen from './screens/Welcome'; // Assurez-vous que le chemin d'accès au fichier est correct

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ReduxProvider store={store}>
         <WelcomeScreen />
          <StatusBar />
        </ReduxProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
