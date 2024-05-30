import React from 'react';
import { Icon } from 'react-native-paper';
import { Props } from 'react-native-paper/src/components/Icon';

export default function IconNotif({ color, size = 20 }: Partial<Props>) {
  return <Icon source="bell-outline" color={color} size={size} />;
}
