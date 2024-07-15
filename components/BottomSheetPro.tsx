import React, { useRef, useEffect } from 'react';
import { Text, TouchableOpacity, Linking, Image, StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, IconButton } from 'react-native-paper';
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
  containerName: {
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
    justifyContent: "space-between"
  }
})
export default function BottomSheetPro({ selectedPro, categories }: { selectedPro: Professionnel | null, categories: Categorie[] | null} ) {
  if (!selectedPro) return;
  if (!categories) return;

    // On récupère la categorie du pro sélectionné
    const CAT = categories.find(cat => cat.id === selectedPro?.id_cat1);

    const bottomSheetRef = useRef<BottomSheet>(null);
    useEffect(() => {
      if (selectedPro) {
        bottomSheetRef.current?.snapToIndex(0)
      } else {
        bottomSheetRef.current?.close();
      }
    }, [selectedPro]);

    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '100%']}
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
            <View style={styles.containerName}>
              <Text style={styles.proName}>{selectedPro.nom}</Text>
              <Text>{CAT.libelle}</Text>
            </View>
            {/* Bouton d'action */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonView}>
              {/* <Button style={{display:"flex", flexDirection:"column", backgroundColor:"grey"}}> */}
                <IconButton
                  icon="camera"
                  mode="contained"
                  // iconColor={MD3Colors.error50}
                  size={20}
                  onPress={() => console.log('Pressed')}
                />
                <Text>Caméra</Text>
              {/* </Button> */}

              <Button icon="map-marker" mode="elevated" style={{marginRight: 5}} compact={true} onPress={() => console.log('Itineraire pressed')}>
                Itinéraire
              </Button>
              <Button icon="heart-outline" mode="elevated" style={{marginRight: 5}} compact={true} onPress={() => console.log('Favoris pressed')}>
                Ajouter au favoris
              </Button>
              <Button icon="phone" mode="elevated" style={{marginRight: 5}} compact={true} onPress={() => console.log('phone pressed')}>
                Appeler
              </Button>
              <Button icon="share-variant-outline" mode="elevated" compact={true} onPress={() => console.log('share pressed')}>
                Partager
              </Button>
            </ScrollView>
              <Text>{selectedPro.adresse}, {selectedPro.city} {selectedPro.postal_code}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(selectedPro.website)}>
                <Text style={{ color: 'blue' }}>{selectedPro.website}</Text>
              </TouchableOpacity>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    )
}