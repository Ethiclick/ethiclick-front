import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Menu, Searchbar } from 'react-native-paper';

function SearchBar({ navigation }: any) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const MenuButton = (
    <Button onPress={openMenu}>
      Show menu <Avatar.Text size={35} label="FW" />
    </Button>
  );

  return (
    <View
      style={{
        position: 'absolute',
        top: 50,
        left: 30,
        right: 30,
        backgroundColor: 'white',
        borderRadius: 15,
      }}
    >
      <Searchbar
        elevation={2}
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          paddingEnd: 65,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{ flex: 1, position: 'absolute', right: 5, top: 7, bottom: 0 }}>
        <View style={{ alignItems: 'flex-end' }}>
          <Menu
            anchorPosition="bottom"
            visible={visible}
            onDismiss={closeMenu}
            // contentStyle={{backgroundColor: COLORS.controlNormal}}
            anchor={
              <Button icon={'chevron-down'} style={{ padding: '0.75%' }} compact={true} onPress={() => openMenu()}>
                {/* <Icon source={'chevron-down'} size={20} /> */}
                <Avatar.Text size={30} label="FW" />
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setVisible(false);
                navigation.navigate('Profil');
              }}
              title="Mon profil"
              leadingIcon={'account-circle-outline'}
            />
            <Menu.Item onPress={() => {}} title="Se déconnecter" leadingIcon={'logout'} />
          </Menu>
        </View>
      </View>
    </View>
  );
}

export default SearchBar;
