// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    // saving error
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (e) {
    // saving error
    return '';
  }
};

export const logged = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (token) return true;
    return false;
  } catch (e) {
    // saving error
    return false;
  }
};
