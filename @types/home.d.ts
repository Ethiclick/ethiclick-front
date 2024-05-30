export interface SearchBarProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  currentView: string;
  categories: Categorie[];
  loading: boolean;
}
