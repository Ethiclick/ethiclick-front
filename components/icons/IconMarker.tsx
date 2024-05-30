import React from 'react';
import { Icon } from 'react-native-paper';
import { Props } from 'react-native-paper/src/components/Icon';

export default function IconMarker({ color, size = 20 }: Partial<Props>) {
  return <Icon source="map-marker-radius" color={color} size={size} />;
}
