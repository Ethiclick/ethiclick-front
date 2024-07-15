import React, { useRef, useEffect } from 'react';
import { Text, Linking, Image, StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { IconButton, MD3Colors, List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
// Types
import { Professionnel } from '../@types/professionnel';
import { Categorie } from '../@types/categorie';

const styles = StyleSheet.create({
  bottomView: {
    paddingLeft: 10
  },
  pictureView : {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    paddingTop:5,
  },
  pictures: {
    width: 200,
    height: 200,
    borderRadius:20,
    marginRight: 10
  },
  container: {
    paddingLeft:15,
    paddingTop:20
  },
  proName: {
    fontWeight: 'bold'
  },
  buttonView: {
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom:10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  }
})
export default function BottomSheetPro({ selectedPro, categories }: { selectedPro: Professionnel | null, categories: Categorie[] | null} ) {
  if (!selectedPro) return null;
  if (!categories) return null;

    // On récupère la categorie du pro sélectionné
    const CAT = categories.find(cat => cat.id === selectedPro?.id_cat1);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const adress = `${selectedPro.adresse}, ${selectedPro.city} ${selectedPro.postal_code}`;

    function isBetween8and17(): boolean {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
    
      // Vérifie si l'heure actuelle est entre 8h (inclus) et 17h (exclus)
      return currentHour >= 8 && currentHour < 17;
    }
    
    // Exemple d'utilisation :
    const isOfficeHours = isBetween8and17(); // Cette variable sera true si l'heure est entre 8h et 17h, sinon false
    // console.log("Is office hours:", isOfficeHours);


    useEffect(() => {
      if (selectedPro) {
        bottomSheetRef.current?.snapToIndex(0)
      } else {
        bottomSheetRef.current?.close();
      }
    }, [selectedPro]);

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (
      <BottomSheet
        ref={bottomSheetRef}
        // TODO: voir pourquoi la bottomSheet ne scroll pas ( on ne vois pas les horaires des jours suivant)
        snapPoints={['50%', '150%']}
        index={-1}
        enablePanDownToClose={true}
      >
        <BottomSheetView 
        style={styles.bottomView}>
          {selectedPro && CAT && (
            <>
            {/* ScrollView pictures */}
             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pictureView}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipNMlc6A5uO7LyofKQaXoxRI7W8QDr4nW-HdvJzv=s680-w680-h510' }}
                style={styles.pictures}
              />
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipPbdz78tLBLIhM4HrGgK7JSbY2yDTBWUKwRyIvG=s680-w680-h510' }}
                style={styles.pictures}
              />
              <Image
              source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipN5AENXOMeiymv3o_XSxhVNWBnvJFHrdJYjmIoT=s680-w680-h510' }}
              style={styles.pictures}
            />
            </ScrollView>
            <View style={styles.container}>
              <Text style={styles.proName}>{selectedPro.nom}</Text>
              <Text>{CAT.libelle}</Text>
            </View>
            {/* Bouton d'action */}
            <View style={styles.buttonView}>
              <View style={{ alignItems: 'center' }}>
                <IconButton
                  icon="arrow-right-top"
                  mode="contained"
                  size={25}
                  onPress={() => console.log('Itineraire Pressed')}
                />
                <Text style={{fontSize: 13}}>Itinéraire</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <IconButton
                  icon="heart-outline"
                  mode="contained"
                  size={25}
                  onPress={() => console.log('Favoris Pressed')}
                />
                <Text style={{fontSize: 13}}>Ajouter</Text>
                <Text style={{fontSize: 13}}>au favoris</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <IconButton
                  icon="phone"
                  mode="contained"
                  size={25}
                  onPress={() => console.log('Phone pressed')}
                />
                <Text style={{fontSize: 13}}>Appeler</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <IconButton
                  icon="share-variant-outline"
                  mode="contained"
                  size={25}
                  onPress={() => console.log('Share pressed')}
                />
                <Text style={{fontSize: 13}}>Partager</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <IconButton
                  icon="web"
                  mode="contained"
                  size={25}
                  onPress={() => Linking.openURL(selectedPro.website)}
                />
                <Text style={{fontSize: 13}}>Site</Text>
              </View>
            </View>
            <List.Item
              title={adress}
              left={() => <List.Icon color={MD3Colors.primary40} icon="map-marker" />}
              onPress= {() => console.log("Adress Pressed")}
            />
            <List.Accordion
              title={!isOfficeHours ? "Fermé" : "Ouvert" }
              left={props => <List.Icon {...props} color={MD3Colors.primary40} icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
              expanded={expanded}
              onPress={handlePress}
              style={{marginLeft:0, paddingLeft:0}}
              >
              <List.Item
                title={<Text>Lundi</Text>}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right={() =>
                  <View>
                    <Text>16:30-20:00</Text>
                  </View>}
                />
              <List.Item
                title={<Text>Mardi</Text>}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-13:30</Text>
                    <Text>16:30-20:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text>Mercredi</Text>}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-13:30</Text>
                    <Text>16:30-20:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text>Jeudi</Text>}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-13:30</Text>
                    <Text>16:30-20:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text>Vendredi</Text>}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-13:30</Text>
                    <Text>16:30-20:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text>Samedi</Text>}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-19:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text>Dimanche</Text>}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>Fermé</Text>
                  </View>
                }
                />
            </List.Accordion>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    )
}