import React from 'react';
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
});

export function Container({ children }: { children: React.JSX.Element[] }) {
  return <View style={styles.container}>{children}</View>;
}
export function Row({ children }: { children: React.JSX.Element[] }) {
  return <View style={styles.row}>{children}</View>;
}

export function Col({ children }: { children: React.JSX.Element }) {
  return <View style={styles.col}>{children}</View>;
}
