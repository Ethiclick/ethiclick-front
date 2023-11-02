import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <Searchbar
            elevation={2}
            style={{ position: 'absolute', top: 50, left: 30, right: 30, backgroundColor: 'white', borderRadius: 15 }}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
};

export default SearchBar;