import React from 'react';
import { Appbar } from 'react-native-paper';

export default function HeaderProfil() {
  const handleSearch = () => console.log('Searching');
  const handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      <Appbar.Content title="Title" titleStyle={{}} />
      <Appbar.Action icon="magnify" onPress={handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={handleMore} />
    </Appbar.Header>
  );
}
