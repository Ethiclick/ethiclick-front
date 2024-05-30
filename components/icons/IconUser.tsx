import React from 'react';
import { Icon } from 'react-native-paper';
import { Props } from 'react-native-paper/src/components/Icon';

export default function IconUser({ color, size = 20 }: Partial<Props>) {
  return <Icon source="account" color={color} size={size} />;
}
