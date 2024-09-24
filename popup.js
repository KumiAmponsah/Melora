import React, { useState } from 'react';
import { Modal, Text, View, Button } from 'react-native';

const MyComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Hello, I'm a modal!</Text>
            
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
          
        </View>
      </Modal>
    </View>
  );
};

export default MyComponent;
