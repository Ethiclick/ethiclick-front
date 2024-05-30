import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Categorie } from '../@types/categorie';
import { CategorieScreenNavigationProp } from '../@types/routes';
import { Professionnel } from '../@types/professionnel';

const styles = StyleSheet.create({
  container: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: 'auto',
    width: 400,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 2,
    margin: 5,
  },
  btn: {
    borderRadius: 8,
    flex: 1,
    height: 110,
    width: '100%',
    margin: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
});

function Square({
  item,
  navigation,
  professionnels,
}: {
  item: Categorie;
  navigation: CategorieScreenNavigationProp;
  professionnels: Professionnel[];
}) {
  return (
    <Button
      key={item.id}
      style={styles.btn}
      labelStyle={styles.title}
      buttonColor={item.color}
      mode="contained"
      contentStyle={{ height: '100%' }}
      onPress={() => navigation.navigate('Categorie', { id: item.id, name: item.libelle, professionnels })}
    >
      {item.libelle}
    </Button>
  );
}

export default Square;
