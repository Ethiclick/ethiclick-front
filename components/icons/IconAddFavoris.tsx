import React from 'react';
import { Icon } from 'react-native-paper';
import { Props } from 'react-native-paper/src/components/Icon';

export default function IconAddFavoris({ color, size = 20 }: Partial<Props>) {
  return <Icon source="heart-plus-outline" color={color} size={size} />;
}
