// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setUser(user: string) {
  try {
    await AsyncStorage.setItem('user', user);
  } catch (error) {
    // saving error
  }
}

export async function getUser() {
  try {
    await AsyncStorage.getItem('user');
  } catch (error) {
    // saving error
  }
}

/**
 * Remove user table
 */
export async function clearUser() {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    // saving error
  }
}
