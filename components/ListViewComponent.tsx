import * as React from 'react';
import { Linking, ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, Badge } from 'react-native-paper';

// Type
import { CategorieScreenNavigationProp } from '../@types/routes';
import { Categorie } from '../@types/categorie';
import { Professionnel } from '../@types/professionnel';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 130
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
    padding:5,
    borderRadius:7
  },
  card: {
    margin: 5, // Ajoute un espace entre les cartes
    width: 200,
    height: 150
  },
  cardCover: {
    height: 80, // Hauteur fixe
    width: '100%', // Largeur dynamique pour s'adapter au conteneur
    resizeMode: 'cover', // Ajuste l'image pour couvrir l'espace disponible
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },
  icones: {
    margin: 0
  }
});
export default function ListViewComponent({
  navigation,
  categories,
  professionnels,
}: {
  navigation: CategorieScreenNavigationProp;
  categories: Categorie[];
  professionnels: Professionnel[];
}) {
  const ICON_SIZE = 15;

  return (
    // Scroll vertical de la page
    <ScrollView style={styles.container}>
       {categories.length > 0 &&
        categories.map((cat) => (
          <View key={cat.id}>
            <View style={styles.headerScroll}>

              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.titleScroll}>{cat.libelle}</Text>
                <Badge style={{backgroundColor: cat.color, margin: 5}}></Badge> 
              </View>
              <Text onPress={ () => console.log("voir plus") }>voir plus</Text>
            </View>
            {/* Scroll Categorie 1 */}
            <ScrollView style={{marginLeft:5}} horizontal={true} showsHorizontalScrollIndicator={false}>
              {/* Card1 */}
              <Card style={styles.card}>
                <Card.Cover source={{ uri: 'https://picsum.photos/0' }} style={styles.cardCover} />
                <Card.Content style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 5}}>
                  <Text variant="titleSmall">Otsokop</Text>
                  <Text variant="bodySmall">Épicerie</Text>
                </Card.Content>
                <Card.Actions style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:"center"}}>
                  <IconButton style={styles.icones} icon="arrow-right-top" mode="contained" size={ICON_SIZE} onPress={() => console.log('Itineraire Pressed')} />
                  <IconButton style={styles.icones} icon="heart-outline" mode="contained" size={ICON_SIZE} onPress={() => console.log('Favoris Pressed')} />
                  <IconButton style={styles.icones} icon="phone" mode="contained" size={ICON_SIZE} onPress={() => console.log('Phone pressed')} />
                  <IconButton style={styles.icones} icon="share-variant-outline" mode="contained" size={ICON_SIZE} onPress={() => console.log('Share pressed')} />
                  <IconButton style={styles.icones} icon="web" mode="contained" size={ICON_SIZE} onPress={() => Linking.openURL('http://www.otsokop.org')} />
                </Card.Actions>
              </Card>

              {/* Card2 */}
              <Card style={styles.card}>
                <Card.Cover source={{ uri: 'https://picsum.photos/200' }} style={styles.cardCover} />
                <Card.Content style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 5}}>
                  <Text variant="titleSmall">Otsokop</Text>
                  <Text variant="bodySmall">Épicerie</Text>
                </Card.Content>
                <Card.Actions style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:"center"}}>
                  <IconButton style={styles.icones} icon="arrow-right-top" mode="contained" size={ICON_SIZE} onPress={() => console.log('Itineraire Pressed')} />
                  <IconButton style={styles.icones} icon="heart-outline" mode="contained" size={ICON_SIZE} onPress={() => console.log('Favoris Pressed')} />
                  <IconButton style={styles.icones} icon="phone" mode="contained" size={ICON_SIZE} onPress={() => console.log('Phone pressed')} />
                  <IconButton style={styles.icones} icon="share-variant-outline" mode="contained" size={ICON_SIZE} onPress={() => console.log('Share pressed')} />
                  <IconButton style={styles.icones} icon="web" mode="contained" size={ICON_SIZE} onPress={() => Linking.openURL('http://www.otsokop.org')} />
                </Card.Actions>
              </Card>
              {/* Card3 */}
              <Card style={styles.card}>
                <Card.Cover source={{ uri: 'https://picsum.photos/300' }} style={styles.cardCover} />
                <Card.Content style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 5}}>
                  <Text variant="titleSmall">Otsokop</Text>
                  <Text variant="bodySmall">Épicerie</Text>
                </Card.Content>
                <Card.Actions style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:"center"}}>
                  <IconButton style={styles.icones} icon="arrow-right-top" mode="contained" size={ICON_SIZE} onPress={() => console.log('Itineraire Pressed')} />
                  <IconButton style={styles.icones} icon="heart-outline" mode="contained" size={ICON_SIZE} onPress={() => console.log('Favoris Pressed')} />
                  <IconButton style={styles.icones} icon="phone" mode="contained" size={ICON_SIZE} onPress={() => console.log('Phone pressed')} />
                  <IconButton style={styles.icones} icon="share-variant-outline" mode="contained" size={ICON_SIZE} onPress={() => console.log('Share pressed')} />
                  <IconButton style={styles.icones} icon="web" mode="contained" size={ICON_SIZE} onPress={() => Linking.openURL('http://www.otsokop.org')} />
                </Card.Actions>
              </Card>
            </ScrollView>
          </View>
        ))}
    </ScrollView>
  );
}
