import * as React from 'react';
import { Avatar, Card, Icon, IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    rowList: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      height: 120,
    },
    cardList: {
        borderRadius: 20,
        flex: 1,
        height: '100%',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        // color: 'black',
      },
});


const Square = ({ data1, data2 }) => (
    <View style={styles.rowList}>
        <Card.Title
            style={ [styles.cardList, { backgroundColor: data1.color, marginRight: 10 }]}
            title={data1.libelle}
            titleStyle= { styles.title }
            // titleStyle={{ textAlign: 'center' }}
            // left={() => <Icon size={30} source="pasta" />}
            // left={(props) => <Avatar.Icon {...props} icon="folder" />}
            // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />
        <Card.Title
            style={ [styles.cardList, { backgroundColor: data2.color, marginLeft: 10 }]}
            title={data2.libelle}
            titleStyle= { styles.title }
            // left={() => <Icon size={30} source="pasta" />}
        />
    </View>
);

export default Square;