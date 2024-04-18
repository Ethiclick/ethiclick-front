import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


export default function WelcomeScreen({ navigation }) {
    

    const handleLoginPress = () => {
        navigation.navigate("Login");
    };
  return (
    // <NavigationContainer>
    <View style={styles.container}>
        {/* Utilisez ImageBackground pour afficher une image de fond */}
        <ImageBackground
        source={require('../assets/login.png')}
        style={styles.backgroundImage}
        >
            <View style={styles.buttonContainer}>
                <Button  mode="contained" onPress={handleLoginPress} style= {{ width: "80%"}} theme={{ colors: { primary: '#0BC0EC' } }}>
                    Se connecter
                </Button>
                <Button  mode="contained" onPress={() => console.log('Créer un compte')} style= {{ width: "80%"}} theme={{ colors: { primary: '#0BC0EC' } }}>
                    Créer un compte
                </Button>
            </View>
        </ImageBackground>
    </View>
    // </NavigationContainer>
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
  },
  buttonContainer : {
    // backgroundColor: "grey",
    flex:1,
    width: '100%',
    position: "absolute",
    top: "60%",
    justifyContent: 'space-between',
    height: "15%",
    alignItems: 'center'
  }
});
