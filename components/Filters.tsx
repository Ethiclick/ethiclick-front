import React, { useEffect } from 'react';
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

export default function Filters({
  categories,
  loading,
  passFilterToMap,
}: {
  categories: Categorie[];
  loading: boolean;
  passFilterToMap: (filterActive: string[]) => void;
}) {
  // const [filterQuery, setFilterQuery] = React.useState(defaultCat);
  const activeFilters = categories.map((cat) => cat.id.toString());
  const [filterActive, setFilterActive] = React.useState(activeFilters);

  useEffect(() => {
    passFilterToMap(filterActive);
  });

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
                const id = filterObj.id.toString();
                const selected = filterActive.includes(id);
                let actualFilters: string[] = [];
                if (!selected && !filterActive.includes(id)) {
                  actualFilters = [...filterActive, id];
                  setFilterActive(actualFilters);
                } else if (selected) {
                  actualFilters = filterActive.filter((f) => f !== id);
                  setFilterActive(actualFilters);
                }
                passFilterToMap(actualFilters);
              }}
            >
              {filter.libelle}
            </Chip>
          );
        })}
    </ScrollView>
  );
}
