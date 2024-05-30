import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Square from './Square';
import { Categorie } from '../@types/categorie';
import { Professionnel } from '../@types/professionnel';
import { CategorieScreenNavigationProp } from '../@types/routes';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  containerList: {
    width: '100%',
    paddingVertical: '30%',
  },
});

export default function ListView({
  navigation,
  currentView,
  categories,
  professionnels,
  loading,
}: {
  navigation: CategorieScreenNavigationProp;
  currentView: 'map' | 'list';
  categories: Categorie[];
  professionnels: Professionnel[];
  loading: boolean;
}) {
  return (
    <View style={styles.listView}>
      <SearchBar navigation={navigation} currentView={currentView} categories={categories} loading={loading} />
      <FlatList
        contentContainerStyle={styles.containerList}
        keyExtractor={(item) => item.id.toString()}
        data={categories}
        renderItem={(item) => <Square item={item.item} navigation={navigation} professionnels={professionnels} />}
        numColumns={2}
      />
    </View>
  );
}
