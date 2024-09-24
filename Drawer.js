import React, { useRef } from 'react';
import { DrawerLayoutAndroid, Text, View, Button, StyleSheet } from 'react-native';

const App = () => {
  const drawer = useRef(null);

  const navigationView = (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerText}>Drawer Content</Text>
      <Button title="Close Drawer" onPress={() => drawer.current.closeDrawer()} />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left" // Updated to use string values
      renderNavigationView={() => navigationView}
    >
      <View style={styles.mainContent}>
        <Text>Main Content</Text>
        <Button title="Open Drawer" onPress={() => drawer.current.openDrawer()} />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  drawerText: {
    fontSize: 18,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
