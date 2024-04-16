import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';


export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* Utilisez ImageBackground pour afficher une image de fond */}
      <ImageBackground
        source={require('../assets/login.png')}
        style={styles.backgroundImage}
      >
      </ImageBackground>
    </View>
  );
}

// Définissez vos styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center', // Ajustez selon vos besoins
    alignItems: 'center', // Ajustez selon vos besoins
  },
});
