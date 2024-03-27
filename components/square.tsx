import * as React from 'react';
import { Card, Icon } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerList: {
      marginTop: 30,
      backgroundColor: 'black',
      flex: 1,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    rowList: {
      width: '100%',
      flexDirection: 'row',
      // backgroundColor: 'red',
      justifyContent: 'space-around',
  
    },
    cardList: {
        borderRadius: 20,
    }
  });

const Square = ({ data1, data2 }) => (
    <View style={styles.rowList}>
        <Card.Title
                  style={ [styles.cardList, { backgroundColor: data1.bgColor }]}
                  title={data1.label}
                  subtitle={data1.label}
                  left={() => <Icon size={30} source="pasta" />}
        />
        <Card.Title
            style={ [styles.cardList, { backgroundColor: data2.bgColor }]}
            title={data2.label}
            subtitle={data2.label}
            left={() => <Icon size={30} source="pasta" />}
        />
    </View>
);

export default Square;