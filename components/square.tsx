import React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
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
    borderRadius: 20,
    height: 110,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
});

function Row({ children }: { children: React.JSX.Element[] }) {
  return <View style={styles.row}>{children}</View>;
}

function Col({ children }: { children: React.JSX.Element }) {
  return <View style={styles.col}>{children}</View>;
}

function Square({
  navigation,
  firstCat,
  secondCat,
  professionnels,
}: {
  navigation: CategorieScreenNavigationProp;
  firstCat: Categorie;
  secondCat: Categorie;
  professionnels: Professionnel[];
}) {
  return (
    <View style={styles.container}>
      <Row>
        <Col>
          <Button
            style={styles.btn}
            labelStyle={styles.title}
            buttonColor={firstCat.color}
            mode="contained"
            contentStyle={{ height: '100%' }}
            onPress={() => navigation.navigate('Categorie', { id: firstCat.id, name: firstCat.libelle, professionnels })}
          >
            {firstCat.libelle}
          </Button>
        </Col>

        <Col>
          <Button
            style={styles.btn}
            labelStyle={styles.title}
            buttonColor={secondCat.color}
            mode="contained"
            contentStyle={{ height: '100%' }}
            onPress={() => navigation.navigate('Categorie', { id: secondCat.id, name: secondCat.libelle, professionnels })}
          >
            {secondCat.libelle}
          </Button>
        </Col>
      </Row>
    </View>
  );
}

export default Square;
