import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Avatar, Appbar, Card } from 'react-native-paper';
import { getUser, useAppDispatch, useAppSelector } from '../store';
import { getData } from '../utils/fetch';

interface UserData {
  username: string;
  email: string;
  avatar: string;
  favoris: string;
  id: number;
  idrole: number;
  phone_number: string;
  created_at: string;
  updated_at: string;
}
interface CardData {
  id: number;
  title: string;
  bgColor?: string;
}
interface VignetteData {
  id: number;
  title: string;
  icone?: string;
}
export default function Profil() {
  const user = useAppSelector(getUser) as { token: string };
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getData('users/get', user.token);
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }
        setUserData(data as UserData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de profil :', error);
      }
    };

    fetchProfileData();
  }, [user.token]);

  // Données des cartes
  const cardsData = [
    { id: 1, title: 'Consulter mes favoris', bgColor: '#FEF5CC' },
    { id: 2, title: 'Suggérer un professionnel', bgColor: '#B4ECFD' },
    { id: 3, title: 'Nous contacter', bgColor: '#D9F3CE' },
    { id: 4, title: 'La charte ethiclick' },
  ];

  const vignetteData = [
    { id: 1, title: 'Découvrir Ethiclick', icone: '' },
    { id: 2, title: 'Consulter \n la charte', icone: '' },
    { id: 3, title: 'Nous \n contacter', icone: '' },
    { id: 4, title: 'FAQ', icone: '' },
    { id: 5, title: "L'histoire \n d'Ethiclick", icone: '' },
  ];

  // console.log(vignetteData.length);
  // Rendu d'une carte
  const renderCard = ({ item }: { item: CardData }) => {
    return (
      <Card style={[styles.card, { backgroundColor: item.bgColor || styles.card.backgroundColor }]}>
        <Card.Content>
          <Text>{item.title}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barre supérieure */}
      <Appbar.Header style={styles.appBar}>
        {/* Afficher le nom d'utilisateur si userData existe */}
        {userData && (
          <>
            {/* uri pour charger une source distante, require pour une source local */}
            <Avatar.Image
              size={50}
              source={userData.avatar ? { uri: userData.avatar } : require('../assets/avatar.png')}
              style={{ backgroundColor: 'transparent', marginLeft: '3%' }}
            />
            <Appbar.Content title={userData.username} style={{ marginLeft: '3%' }} />
          </>
        )}
      </Appbar.Header>

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        {/* Carte de fidélité */}
        <Card style={[styles.card, { backgroundColor: '#D9F3CE', marginTop: '5%', width: '93%', alignSelf: 'center', padding: 18 }]}>
          <Card.Content>
            <Text>Carte de fidélité</Text>
            <Text style={{ color: 'grey' }}>Questionnaire sur les envies/besoins</Text>
          </Card.Content>
        </Card>

        {/* Slider horizontal avec les petites vignettes */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {vignetteData.map((vignette, index) => (
            <View key={vignette.id} style={styles.smallCard}>
              <Text>{vignette.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Grille de cartes */}
        <FlatList
          data={cardsData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Deux colonnes pour la grille
          contentContainerStyle={styles.cardGrid}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    backgroundColor: '#fff',
    elevation: 0, // Supprimer l'ombre
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  mainContent: {
    flex: 1,
  },
  cardGrid: {
    width: '100%',
    marginTop: '5%',
  },
  card: {
    borderRadius: 8,
    elevation: 2,
    padding: 18,
    backgroundColor: '#f0f0f0',
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 18,
  },
  horizontalScroll: {
    marginTop: '5%',
    flexGrow: 0, // Pour empecher le scrollHorizontal de prendre trop de place
  },
  smallCard: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#0BC0EC',
    borderColor: 'grey',
    marginHorizontal: 4,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
