import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button, StyleSheet } from 'react-native';

// Define the Drawer Navigator
const Drawer = createDrawerNavigator();

// Home Screen Component
const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
    <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
  </View>
);

// Settings Screen Component
const SettingsScreen = () => (
  <View style={styles.container}>
    <Text>Settings Screen</Text>
  </View>
);

// Custom Drawer Content Component (optional)
const CustomDrawerContent = (props) => (
  <View style={styles.drawerContainer}>
    <Text>Custom Drawer Content</Text>
    {/* Add custom items here */}
  </View>
);

// Drawer Navigator Component
const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default DrawerNavigator;
