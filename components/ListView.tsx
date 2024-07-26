import * as React from 'react';
import { Linking, ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

// Type
import { CategorieScreenNavigationProp } from '../@types/routes';
import { Categorie } from '../@types/categorie';
import { Professionnel } from '../@types/professionnel';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 130
  },
  containerCat: {
    // backgroundColor:"rgba(11, 192, 236, 0.5)"
  },
  headerScroll: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingRight:15
  },
  titleScroll: {
    marginLeft:15,
    fontSize:18,
    backgroundColor:"rgba(11, 192, 236, 0.7)",
    padding:5,
    borderRadius:7
  },
  card: {
    margin: 5, // Ajoute un espace entre les cartes
    width: 250,
  },
  cardCover: {
    height: 140, // Hauteur fixe
    width: '100%', // Largeur dynamique pour s'adapter au conteneur
    resizeMode: 'cover', // Ajuste l'image pour couvrir l'espace disponible
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },
});
export default function ListView({
  navigation,
  categories,
  professionnels,
}: {
  navigation: CategorieScreenNavigationProp;
  categories: Categorie[];
  professionnels: Professionnel[];
}) {


  console.log(categories);
  return (
    // Scroll vertical de la page
    <ScrollView style={styles.container}>
       {categories.length > 0 &&
        categories.map((cat) => (
          <View style={styles.containerCat}>
            <View style={styles.headerScroll}>
              <Text style={styles.titleScroll}>{cat.libelle}</Text>
              <Text onPress={ () => console.log("voir plus") }>voir plus</Text>
            </View>
            {/* Scroll Categorie 1 */}
            <ScrollView style={{marginLeft:5}} horizontal={true} showsHorizontalScrollIndicator={false}>
              {/* Card1 */}
              <Card style={styles.card}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
                <Card.Content>
                  <Text variant="titleMedium">Otsokop</Text>
                  <Text variant="bodySmall">Épicerie</Text>
                </Card.Content>
                <Card.Actions style={{}}>
                  <IconButton icon="arrow-right-top" mode="contained" size={18} onPress={() => console.log('Itineraire Pressed')} />
                  <IconButton icon="heart-outline" mode="contained" size={18} onPress={() => console.log('Favoris Pressed')} />
                  <IconButton icon="phone" mode="contained" size={18} onPress={() => console.log('Phone pressed')} />
                  <IconButton icon="share-variant-outline" mode="contained" size={18} onPress={() => console.log('Share pressed')} />
                  <IconButton icon="web" mode="contained" size={18} onPress={() => Linking.openURL('http://www.otsokop.org')} />
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
                  <IconButton icon="arrow-right-top" mode="contained" size={18} onPress={() => console.log('Itineraire Pressed')} />
                  <IconButton icon="heart-outline" mode="contained" size={18} onPress={() => console.log('Favoris Pressed')} />
                  <IconButton icon="phone" mode="contained" size={18} onPress={() => console.log('Phone pressed')} />
                  <IconButton icon="share-variant-outline" mode="contained" size={18} onPress={() => console.log('Share pressed')} />
                  <IconButton icon="web" mode="contained" size={18} onPress={() => Linking.openURL('http://www.otsokop.org')} />
                </Card.Actions>
              </Card>
              {/* Card3 */}
              <Card style={styles.card}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
                <Card.Content>
                  <Text variant="titleMedium">Card title</Text>
                  <Text variant="bodySmall">Card content</Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton icon="arrow-right-top" mode="contained" size={18} onPress={() => console.log('Itineraire Pressed')} />
                  <IconButton icon="heart-outline" mode="contained" size={18} onPress={() => console.log('Favoris Pressed')} />
                  <IconButton icon="phone" mode="contained" size={18} onPress={() => console.log('Phone pressed')} />
                  <IconButton icon="share-variant-outline" mode="contained" size={18} onPress={() => console.log('Share pressed')} />
                  <IconButton icon="web" mode="contained" size={18} onPress={() => Linking.openURL('http://www.otsokop.org')} />
                </Card.Actions>
              </Card>
            </ScrollView>
          </View>
        ))}
    </ScrollView>
  );
}
