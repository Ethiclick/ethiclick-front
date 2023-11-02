import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import Home from "../screens/Home";
import About from "../screens/About";

const BottomNavigationBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "about",
      title: "About",
      focusedIcon: "about",
      unfocusedIcon: "about-outline",
    },
    {
      key: "favorites",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    about: About,
    // recents: RecentsRoute,
    // notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      style={styles.container}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "auto",
    width: "90%",
    // justifyContent: "flex-end",
    // alignItems: "center",
    position: "absolute",
    bottom: 40,
    margin: 2,
  },
});

export default BottomNavigationBar;
