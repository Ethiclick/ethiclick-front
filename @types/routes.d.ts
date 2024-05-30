import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Professionnel } from './professionnel';

export enum Routes {
  Home = 'home',
  Login = 'login',
  Categorie = 'categorie',
  Profile = 'profile',
  Settings = 'settings',
  Favorites = 'favorites',
  Notifications = 'notifications',
}

export type RootStackParamList = {
  Home: undefined;
  Login: { id: number; username: string };
  Categorie: { id: number; name: string; professionnels: Professionnel[] };
  Profile: { id: number };
  Settings: { id: number };
  Favorites: { id: number };
  Notifications: { id: number };
};

export type CategorieScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Categorie'>;
export type CategorieScreenRouteProp = RouteProp<RootStackParamList, 'Categorie'>;
