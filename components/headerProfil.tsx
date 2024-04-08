import { Avatar, Icon, Appbar } from 'react-native-paper';

const HeaderProfil = () => {
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');
  
    return (
      <Appbar.Header>
        <Appbar.Content title="Title" titleStyle={{ }}/>
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
    );
  };
  
export default HeaderProfil;