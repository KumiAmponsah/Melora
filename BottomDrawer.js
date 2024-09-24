// BottomDrawer.js
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const BottomDrawer = ({ isVisible, onClose, children }) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const [drawerHeight, setDrawerHeight] = useState(0);

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? height - drawerHeight : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END && nativeEvent.translationY > 100) {
      onClose();
    }
  };

  return (
    <Animated.View style={[styles.drawer, { transform: [{ translateY }] }]}>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleStateChange}
      >
        <View
          style={styles.drawerContent}
          onLayout={(event) => setDrawerHeight(event.nativeEvent.layout.height)}
        >
          {children}
        </View>
      </PanGestureHandler>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#f00',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BottomDrawer;
