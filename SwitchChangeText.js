


import React, { useState } from 'react';
import { View, Switch, Text } from 'react-native';

const MyComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false); // State to track the switch value

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>{isEnabled ? 'Switch is ON' : 'Switch is OFF'}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default MyComponent;
