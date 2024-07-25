import * as React from 'react';
import { Linking, View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Optionnel : ajuste l'espace entre les cartes
    padding: 10, // Optionnel : ajoute du padding autour des cartes
  },
  card: {
    flex: 1,
    margin: 5, // Ajoute un espace entre les cartes
  },
  cardCover: {
    height: 150, // Hauteur fixe
    width: '100%', // Largeur dynamique pour s'adapter au conteneur
    resizeMode: 'cover', // Ajuste l'image pour couvrir l'espace disponible
  },
});
export default function ListView() {
  return (
    <View style={{width: "100%", marginTop:130, marginLeft:15}}>
      {/* Categorie 1 */}
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* Card1 */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
          <Card.Content>
            <Text variant="titleMedium">Card title</Text>
            <Text variant="bodySmall">Card content</Text>
          </Card.Content>
          <Card.Actions>
            <IconButton icon="arrow-right-top" mode="contained" size={25} onPress={() => console.log('Itineraire Pressed')} />
            <IconButton icon="heart-outline" mode="contained" size={25} onPress={() => console.log('Favoris Pressed')} />
            <IconButton icon="phone" mode="contained" size={25} onPress={() => console.log('Phone pressed')} />
            <IconButton icon="share-variant-outline" mode="contained" size={25} onPress={() => console.log('Share pressed')} />
            <IconButton icon="web" mode="contained" size={25} onPress={() => Linking.openURL("http://www.otsokop.org")} />
          </Card.Actions>
        </Card>

        {/* Card2 */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
          <Card.Content>
            <Text variant="titleMedium">Card title</Text>
            <Text variant="bodySmall">Card content</Text>
          </Card.Content>
          <Card.Actions>
            <IconButton icon="arrow-right-top" mode="contained" size={25} onPress={() => console.log('Itineraire Pressed')} />
            <IconButton icon="heart-outline" mode="contained" size={25} onPress={() => console.log('Favoris Pressed')} />
            <IconButton icon="phone" mode="contained" size={25} onPress={() => console.log('Phone pressed')} />
            <IconButton icon="share-variant-outline" mode="contained" size={25} onPress={() => console.log('Share pressed')} />
            <IconButton icon="web" mode="contained" size={25} onPress={() => Linking.openURL("http://www.otsokop.org")} />
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
      {/* Categorie2 */}
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* Card1 */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
          <Card.Content>
            <Text variant="titleMedium">Card title</Text>
            <Text variant="bodySmall">Card content</Text>
          </Card.Content>
          <Card.Actions>
            <IconButton icon="arrow-right-top" mode="contained" size={25} onPress={() => console.log('Itineraire Pressed')} />
            <IconButton icon="heart-outline" mode="contained" size={25} onPress={() => console.log('Favoris Pressed')} />
            <IconButton icon="phone" mode="contained" size={25} onPress={() => console.log('Phone pressed')} />
            <IconButton icon="share-variant-outline" mode="contained" size={25} onPress={() => console.log('Share pressed')} />
            <IconButton icon="web" mode="contained" size={25} onPress={() => Linking.openURL("http://www.otsokop.org")} />
          </Card.Actions>
        </Card>

        {/* Card2 */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
          <Card.Content>
            <Text variant="titleMedium">Card title</Text>
            <Text variant="bodySmall">Card content</Text>
          </Card.Content>
          <Card.Actions>
            <IconButton icon="arrow-right-top" mode="contained" size={25} onPress={() => console.log('Itineraire Pressed')} />
            <IconButton icon="heart-outline" mode="contained" size={25} onPress={() => console.log('Favoris Pressed')} />
            <IconButton icon="phone" mode="contained" size={25} onPress={() => console.log('Phone pressed')} />
            <IconButton icon="share-variant-outline" mode="contained" size={25} onPress={() => console.log('Share pressed')} />
            <IconButton icon="web" mode="contained" size={25} onPress={() => Linking.openURL("http://www.otsokop.org")} />
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
    </View>
  )
}

