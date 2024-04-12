import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar, Appbar, Card } from 'react-native-paper';
import { getUser , useAppDispatch, useAppSelector } from '../store';
import { getData } from '../utils/fetch';

export default function Profil() {

  const user = useAppSelector(getUser) as { token: string };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = await getData('users/get', user.token);
        if (userData.errors) {
          throw new Error(userData.errors[0].message);
        }
        setUserData(userData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de profil :', error);
      }
    };

    fetchProfileData();
  }, [user.token]);


  // console.log(userData); //! on récupère bien les user info iciiii !!

  // Données des cartes
  // const cardsData = [
  //   { id: 1, title: 'Card 1' },
  //   { id: 2, title: 'Card 2' },
  //   { id: 3, title: 'Card 3' },
  //   { id: 4, title: 'Card 4' },
  // ];

  // Rendu d'une carte
  // const renderCard = ({ item }) => (
  //   <Card style={styles.card}>
  //     <Card.Content>
  //       <Text>{item.title}</Text>
  //     </Card.Content>
  //   </Card>
  // );

  return (
    <View style={styles.container}>
      {/* Barre supérieure */}
      <Appbar.Header style={styles.appBar}>
        <Avatar.Image size={50} source={require('../assets/avatar.png')} style={{backgroundColor: "transparent"}}/>
        <Appbar.Content title={userData.username} style= {{ marginLeft:"3%" }}/>
      </Appbar.Header>

      {/* Grille de cartes */}
      {/* <FlatList
        data={cardsData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Deux colonnes pour la grille
        contentContainerStyle={styles.cardGrid}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    backgroundColor: '#fff',
    elevation: 0, // Supprimer l'ombre
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  cardGrid: {
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
