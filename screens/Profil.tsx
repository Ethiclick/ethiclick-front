import React from 'react';
import { View, Text } from 'react-native';
import HeaderProfil from './../components/headerProfil';

export default function Profil() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderProfil />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profil</Text> 
      </View>
    </View>
  );
}
