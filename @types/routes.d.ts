enum Routes {
  Home = 'home',
  Login = 'login',
  Profile = 'profile',
  Settings = 'settings',
  Favorites = 'favorites',
  Notifications = 'notifications',
}

export type NavigationParams = RootStackParams;

export type RootStackParams = {
  [Routes.Home]: { id: string; username: string };
  [Routes.Login]: { id: string; username: string };
  [Routes.Profile]: { id: string; username: string };
  [Routes.Settings]: { id: string; username: string };
  [Routes.Favorites]: { id: string; username: string };
  [Routes.Notifications]: { id: string; username: string };
};

export default Routes;
