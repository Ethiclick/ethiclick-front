import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { Categorie } from '../@types/categorie';

const styles = StyleSheet.create({
  filters: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  filter: {
    margin: 2,
    alignItems: 'baseline',
  },
});

export default function Filters({ categories, loading }: { categories: Categorie[]; loading: boolean }) {
  // const [filterQuery, setFilterQuery] = React.useState(defaultCat);
  const [filterActive, setFilterActive] = React.useState(['']);

  return (
    <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
      {!loading &&
        categories.map<React.JSX.Element>((filter) => {
          return (
            <Chip
              selected={filterActive.includes(filter.id.toString())}
              key={filter.id}
              style={{ ...styles.filter, ...{ backgroundColor: filter.color } }}
              textStyle={{ color: 'black' }} // à voir si on enregistre en base la couleur du txt pour la lisibilité pour si on le gère ici ?
              onPress={() => {
                const filterObj = categories.find((f) => f.id === filter.id);

                if (!filterObj) {
                  throw new Error('filter not found');
                }
                filterObj.selected = !filterObj.selected;
                setFilterActive(categories.filter((fil) => fil.selected).map((a) => a.id.toString()));
              }}
            >
              {filter.libelle}
            </Chip>
          );
        })}
    </ScrollView>
  );
}
