import React, { useRef, useEffect } from 'react';
import { Text, Linking, Image, StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView  } from '@gorhom/bottom-sheet';
import { IconButton, MD3Colors, List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
// Types
import { Professionnel } from '../@types/professionnel';
import { Categorie } from '../@types/categorie';

const styles = StyleSheet.create({
  bottomSheetParent: {
    position: 'absolute',
    zIndex: 99999
  },
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
  },
  buttonComponent: {
    alignItems: 'center'
  }
})
export default function BottomSheetPro({ selectedPro, onClose, categories }: { selectedPro: Professionnel | null, onClose: () => void, categories: Categorie[] | null} ) {
  if (!selectedPro) return null;
  if (!categories) return null;

    // On récupère la categorie du pro sélectionné
    const CAT = categories.find(cat => cat.id === selectedPro?.idcat1);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const adress = `${selectedPro.adresse}, ${selectedPro.city} ${selectedPro.postal_code}`;
    const iconSize = 25;
    // ** TEST ***
    function isBetween8and17(): boolean {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
    
      // Vérifie si l'heure actuelle est entre 8h (inclus) et 17h (exclus)
      return currentHour >= 8 && currentHour < 17;
    }
    const isOfficeHours = isBetween8and17(); // Cette variable sera true si l'heure est entre 8h et 17h, sinon false
    // **********

    useEffect(() => {
      if (selectedPro) {
        bottomSheetRef.current?.snapToIndex(0)
      } else {
        onClose();
        bottomSheetRef.current?.close();
      }
    }, [selectedPro]);

    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    // TODO: pourquoi la nav bar passe au dessu du composant bottomSheet
    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '100%']}
        enablePanDownToClose={true}
        onClose={onClose}
        style={styles.bottomSheetParent}
      >
        <BottomSheetScrollView   
        style={styles.bottomView}>
          {selectedPro && CAT && (
            <>
            {/* ScrollView pictures */}
            {/* TODO: mettre les photo en base et crée la boucle */}
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
              <View style={styles.buttonComponent}>
                {/* TODO: ouvrir Gmaps avec l'itineraires */}
                <IconButton icon="arrow-right-top" mode="contained" size={iconSize} onPress={() => console.log('Itineraire Pressed')}/>
                <Text style={{fontSize: 13}}>Itinéraire</Text>
              </View>
              <View style={styles.buttonComponent}>
                {/* TODO: Enregistrer dans les favoris + snackBar pour l'util */}
                <IconButton icon="heart-outline" mode="contained" size={iconSize} onPress={() => console.log('Favoris Pressed')}/>
                <Text style={{fontSize: 13}}>Ajouter</Text>
                <Text style={{fontSize: 13}}>au favoris</Text>
              </View>
              <View style={styles.buttonComponent}>
                {/* TODO: Renvoyer vers le clavier natif ou lançer l'appel directe ? */}
                <IconButton icon="phone" mode="contained" size={iconSize} onPress={() => console.log('Phone pressed')}/>
                <Text style={{fontSize: 13}}>Appeler</Text>
              </View>
              <View style={styles.buttonComponent}>
                {/* TODO: envoyer un lien vers la fiche pro Ethiclick */}
                <IconButton icon="share-variant-outline" mode="contained" size={iconSize} onPress={() => console.log('Share pressed')}/>
                <Text style={{fontSize: 13}}>Partager</Text>
              </View>
              <View style={styles.buttonComponent}>
                <IconButton icon="web" mode="contained" size={iconSize} onPress={() => Linking.openURL(selectedPro.website)}/>
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
              >
              <List.Item
                title={<Text style={{margin:0, padding:0, fontWeight:"bold", fontSize:14}}>Lundi</Text>}
                style={{paddingVertical:0}}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right={() =>
                  <View>
                    <Text style={{fontWeight:"bold", fontSize:14}}>16:30-20:00</Text>
                  </View>}
                />
              <List.Item
                title={<Text style={{fontSize:14}}>Mardi</Text>}
                style={{paddingVertical:0}}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-13:30</Text>
                    <Text>16:30-20:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text style={{fontSize:14}}>Mercredi</Text>}
                style={{paddingVertical:0}}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-13:30</Text>
                    <Text>16:30-20:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text style={{fontSize:14}}>Jeudi</Text>}
                style={{paddingVertical:0}}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-13:30</Text>
                    <Text>16:30-20:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text style={{fontSize:14}}>Vendredi</Text>}
                style={{paddingVertical:0}}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>09:00-13:30</Text>
                    <Text>16:30-20:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text style={{fontSize:14}}>Samedi</Text>}
                style={{paddingVertical:0}}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text style={{margin:0, padding:0}}>09:00-19:00</Text>
                  </View>
                }
                />
                <List.Item
                title={<Text style={{fontSize:14}}>Dimanche</Text>}
                style={{paddingVertical:0}}
                left={props => <List.Icon {...props} color="white" icon="clock-time-five-outline" style={{margin:0, padding:0}}/>}
                right = {() =>
                  <View>
                    <Text>Fermé</Text>
                  </View>
                }
                />
            </List.Accordion>

            </>   /* Fin du container*/
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    )
}