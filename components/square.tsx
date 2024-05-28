import React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

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

function Square({ data1, data2 }: { data1: { libelle: string; color: string }; data2: { libelle: string; color: string } }) {
  return (
    <Row>
      <Col>
        <Button
          style={styles.btn}
          labelStyle={styles.title}
          buttonColor={data1.color}
          mode="contained"
          contentStyle={{ height: '100%' }}
          onPress={() => console.log(`${data1.libelle} pressed`)}
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
          onPress={() => console.log(`${data2.libelle} pressed`)}
        >
          {data2.libelle}
        </Button>
      </Col>
    </Row>
  );
}

export default Square;
