import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Avatar, Appbar, Card, Text, Button } from 'react-native-paper';
import { getUser, logout, useAppDispatch, useAppSelector } from '../store';
import { getData } from '../utils/fetch';
import AvatarPNG from '../assets/avatar.png';

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
    backgroundColor: '#f0f0f0',
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonCard: {
    borderRadius: 8,
    flex: 1,
    height: 110,
    width: '100%',
    margin: 7,
    justifyContent: 'center',
    overflow: 'visible',
  }
});

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

    // eslint-disable-next-line no-void
    void fetchProfileData();
  }, [user.token]);

  // Données des cartes
  const cardsData = [
    { id: 1, title: 'Ajouter un pro', bgColor: '#FEF5CC' },
    { id: 2, title: 'Mettre à jour un pro', bgColor: '#B4ECFD' },
    { id: 3, title: 'Ajouter une catégorie', bgColor: '#D9F3CE' },
    { id: 4, title: 'Mettre à jour une catégorie' },
  ];
  // Rendu d'une carte
  const renderBtn = ({ item }: { item: CardData }) => {
    return (
      <Card style={{ ...styles.buttonCard, ...{ backgroundColor: item.bgColor || styles.card.backgroundColor } }}>
        <Card.Content>
          <Text variant="bodyMedium">{item.title}</Text>
        </Card.Content>
      </Card>
    );
  };

  // TODO: ajouter la route d'insertion d'un pro (+ création du user) directement depuis l'espace admin

  return (
    <View style={styles.container}>
      {/* Barre supérieure */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => console.log('goBack')} />
        <Appbar.Content title="Profil" />
        <Appbar.Action icon="magnify" onPress={() => console.log('Search')} />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log('dots Menu')} />
      </Appbar.Header>

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        {userData && (
          <>
            {/* Afficher le nom d'utilisateur si userData existe */}
            <Text>{userData.username}</Text>
            <Avatar.Image
              size={50}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              source={userData.avatar ? { uri: userData.avatar } : AvatarPNG}
              style={{ backgroundColor: 'transparent', marginLeft: '3%' }}
            ></Avatar.Image>
          </>
        )}

        {/* Grille de cartes */}
        <FlatList
          data={cardsData}
          renderItem={renderBtn}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Deux colonnes pour la grille
          contentContainerStyle={styles.cardGrid}
        />
      </View>
    </View>
  );
}
