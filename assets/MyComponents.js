import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <View style={styles.container}>
      <MyComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
