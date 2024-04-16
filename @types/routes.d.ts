enum Routes {
  Welcome = 'welcome',
  Home = 'home',
  Login = 'login',
  Profile = 'profile',
  Settings = 'settings',
  Favorites = 'favorites',
  Notifications = 'notifications',
}

export type NavigationParams = RootStackParams;

export type RootStackParams = {
  [Routes.Welcome]: undefined;
  [Routes.Home]: undefined;
  [Routes.Login]: undefined;
};

export type ProfileStackParams = {
  [Routes.Profile]: undefined;
  [Routes.Settings]: undefined;
  [Routes.Favorites]: { id: string; username: string };
  [Routes.Notifications]: { id: string; username: string };
};

export default Routes;
