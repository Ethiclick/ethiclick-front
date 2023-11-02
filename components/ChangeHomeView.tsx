import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const ChangeHomeView = () => (
  <FAB
    icon="view-list"
    style={styles.fab}
    onPress={() => console.log('Pressed')}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    left: '50%',
    transform: [{ translateX: -40}],
    bottom: 0,
  },
})

export default ChangeHomeView;