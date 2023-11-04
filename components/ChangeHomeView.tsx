import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    left: '50%',
    transform: [{ translateX: -40 }],
    bottom: 110,
  },
});

function ChangeHomeView() {
  return <FAB icon="view-list" style={styles.fab} onPress={() => console.log('Pressed')} />;
}

export default ChangeHomeView;
