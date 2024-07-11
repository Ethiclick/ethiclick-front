import React, { useRef, useEffect } from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
// Types
import { Professionnel } from '../@types/professionnel';
import { Categorie } from '../@types/categorie';

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
        <BottomSheetView style={{ padding: 20}}>
          {selectedPro && (
            <>
            <Text style={{ fontWeight: 'bold'}}>{selectedPro.nom}</Text>
            <Text style={{}}>{CAT.libelle}</Text>
            {/* Bouton d'action */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "flex-start", paddingTop: 5, paddingBottom:5, flexDirection: "row", justifyContent: "space-between"}}>
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