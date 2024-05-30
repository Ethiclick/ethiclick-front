/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { View } from 'react-native';
import { Searchbar, Menu, Avatar, Button } from 'react-native-paper';
import { SearchBarProps } from '../@types/home';
import { useAppDispatch, useAppSelector, isLogged, getUser, logout } from '../store';

export default function SearchBar({ navigation }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const dispatch = useAppDispatch();
  const logged = useAppSelector(isLogged);
  const user = useAppSelector(getUser) as { email: string };

  return (
    <View>
      <Searchbar
        elevation={2}
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          paddingEnd: 65,
        }}
        placeholder="Rechercher"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{ flex: 1, position: 'absolute', right: 5, top: 7, bottom: 0 }}>
        <View style={{ alignItems: 'flex-end' }}>
          <Menu
            anchorPosition="bottom"
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button icon="chevron-down" style={{ padding: '0.75%' }} compact onPress={() => openMenu()}>
                {logged ? <Avatar.Text size={30} label={user.email} /> : <Avatar.Text size={30} label="?" />}
              </Button>
            }
          >
            <Menu.Item onPress={() => {}} title="Proposer un pro" leadingIcon="badge-account-outline" />
            <Menu.Item onPress={() => {}} title="Signaler un pro" leadingIcon="badge-account-alert-outline" />
            {logged ? (
              <>
                <Menu.Item
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate('Profile' as never);
                  }}
                  title="Mon profil"
                  leadingIcon="account-circle-outline"
                />
                <Menu.Item
                  onPress={() => {
                    dispatch(logout());
                  }}
                  title="Se déconnecter"
                  leadingIcon="logout"
                />
              </>
            ) : null}
          </Menu>
        </View>
      </View>
    </View>
  );
}
