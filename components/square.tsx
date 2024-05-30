import React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Categorie } from '../@types/categorie';

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
  data1,
  data2,
  setCurrentView,
}: {
  data1: Categorie;
  data2: Categorie;
  setCurrentView: React.Dispatch<React.SetStateAction<'map' | 'list'>>;
}) {
  return (
    <View style={styles.container}>
      <Row>
        <Col>
          <Button
            style={styles.btn}
            labelStyle={styles.title}
            buttonColor={data1.color}
            mode="contained"
            contentStyle={{ height: '100%' }}
            // L'idée ici serait rendre visible une vue contenant les pro de cette catégorie
            // identique à map/list (ex setCurrentView('pros&id=1')) afin de changer juste le contenu
            onPress={() => setCurrentView(`list`)}
          >
            {data1.libelle}
          </Button>
        </Col>

        <Col>
          <Button
            style={styles.btn}
            labelStyle={styles.title}
            buttonColor={data2.color}
            mode="contained"
            contentStyle={{ height: '100%' }}
            onPress={() => setCurrentView(`list`)}
          >
            {data2.libelle}
          </Button>
        </Col>
      </Row>
    </View>
  );
}

export default Square;
