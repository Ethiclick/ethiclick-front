import * as React from 'react';
import { memo } from 'react';
import { Text } from 'react-native';

function HelperMessage({ message, type }: { message: string; type: string }) {
  return <Text style={{ color: type === 'error' ? 'red' : 'black' }}>{message}</Text>;
}

export default memo(HelperMessage);
