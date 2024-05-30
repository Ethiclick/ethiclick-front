import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { CategorieScreenRouteProp } from '../@types/routes';
import IconNewPro from '../components/icons/IconNewPro';

export default function Categorie({ route }: { route: CategorieScreenRouteProp }) {
  const { id, professionnels, name } = route.params;
  const filteredPro = professionnels.filter((pro) => pro.id_cat1 === id);
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 30,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      {filteredPro.length ? (
        filteredPro.map((pro) => (
          <Card>
            <Card.Title titleVariant="titleLarge" title={pro.nom} subtitle="Activité: ..." />
            <Card.Content>
              <Text variant="bodyMedium">{pro.adresse}</Text>
            </Card.Content>
            <Card.Cover source={{ uri: pro.photos }} style={{ borderRadius: 0, marginTop: 10 }} />
            <Card.Actions>
              <Button mode="contained-tonal" onPress={() => console.log('pressed')}>
                Itinéraire
              </Button>
              {/* <Button mode="contained" onPress={() => console.log(`Consulter le pro ${pro.nom}`)}>
                Consulter
              </Button> */}
            </Card.Actions>
          </Card>
        ))
      ) : (
        <>
          <Text>Désolé, aucun professionnel n&apos;est disponible dans la catégorie {name}..</Text>
          <Button mode="contained" onPress={() => console.log('pressed')} icon={IconNewPro}>
            Suggerer un professionnel
          </Button>
        </>
      )}
    </ScrollView>
  );
}
