import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, Switch, TouchableNativeFeedback } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { TouchableWithoutFeedback,  TouchableHighlight} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Settings() {
  const navigation = useNavigation();
  const [text, setText, setNumber, number] = useState('');
  


  // const [number, setNumber] = useState('');

  // This function will be called every time the user types in the TextInput
  const onChangedNumber = (input) => {
    // Here you could add validation, formatting, etc.
    // For example, we only accept numbers:
    const formattedInput = input.replace(/[^0-9]/g, '');
    setNumber(formattedInput);
  };


  
  const { width, height } = Dimensions.get('window');
  

  const [switchStates, setSwitchStates] = useState({
    meloraInNotification: false,
    meloraInPopup: false,
    autoMelora: false,
    meloraOnStartup: false,
    vibrate: false,
  });

  const toggleSwitch = (key) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <LinearGradient
    colors={['#5e16ec', '#000033']}
    style={styles.scrollContainer}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer1}>
        <View style={styles.cloudSection}>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
              <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.settingsText}>Settings</Text>
          </View>

          <Image source={require('./assets/cloudImage.png')} style={styles.cloudImage} />
          <Text style={styles.meloraText}>Save your Meloras</Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SaveYourSearch')}>
            <Text style={styles.buttonText}>Sign up or log in</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.meloraInOtherApps}>MELORA IN OTHER APPS</Text>
        <View style={styles.line} />

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('meloraInNotification')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Melora from notification bar</Text>
              <Text style={styles.meloraDescriptionText1}>Show a persistent notification</Text>
              <Text style={styles.meloraDescriptionText2}>to Melora music in other apps</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.meloraInNotification ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('meloraInNotification')}
              value={switchStates.meloraInNotification}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('meloraInPopup')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Melora from Pop-up</Text>
              <Text style={styles.meloraDescriptionText1}>Show a floating button to see lyrics</Text>
              <Text style={styles.meloraDescriptionText2}>and Melora music in other apps</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.meloraInPopup ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('meloraInPopup')}
              value={switchStates.meloraInPopup}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.line} />

        <Text style={styles.streamingText}>STREAMING</Text>
        <View style={styles.line} />

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Apple Music</Text>
              <Text style={styles.meloraDescriptionText1}>Play full songs in Melora with</Text>
              <Text style={styles.meloraDescriptionText2}>Apple Music subscription</Text>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.buttonText2}>Connect</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContent}>
            <View>
            
              <Text style={styles.meloraNotification}><FontAwesome name="spotify" size={24} style={styles.spotifyIcon} /> Spotify</Text>
              <Text style={styles.meloraDescriptionText1}>Open songs in Spotify</Text>
            </View>
            <TouchableOpacity style={styles.connectButton2}>
              <Text style={styles.buttonText2}>Connect</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.line} />

        <Text style={styles.generalSettingsText}>GENERAL SETTINGS</Text>
        <View style={styles.line} />

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContentNoSwitch}>
            <View>
              <Text style={styles.meloraNotification}>Themes</Text>
              <Text style={styles.meloraDescriptionText1}>Change the appearance of Melora</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContentNoSwitch}>
            <View>
              <Text style={styles.meloraNotification}>Autoplay videos</Text>
              <Text style={styles.meloraDescriptionText1}>Allow videos to autoplay across the app</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('autoMelora')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Auto Melora</Text>
              <Text style={styles.meloraDescriptionText1}>Tip: Press and hold the Melora button</Text>
              <Text style={styles.meloraDescriptionText2}>on home to start auto Melora</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.autoMelora ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('autoMelora')}
              value={switchStates.autoMelora}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('meloraOnStartup')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Melora on startup</Text>
              <Text style={styles.meloraDescriptionText1}>Set Shazam to identify music</Text>
              <Text style={styles.meloraDescriptionText2}>in app launch</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.meloraOnStartup ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('meloraOnStartup')}
              value={switchStates.meloraOnStartup}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('vibrate')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Vibrate</Text>
              <Text style={styles.meloraDescriptionText1}>Set Shazam to vibrate once</Text>
              <Text style={styles.meloraDescriptionTextLast2}>Meloring finishes</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.vibrate ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('vibrate')}
              value={switchStates.vibrate}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.line} />

        <Text style={styles.supportText}>SUPPORT</Text>
        <View style={styles.line} />

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContentNoSwitch}>
            <View>
              <Text style={styles.meloraNotification}>About</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContentNoSwitch}>
            <View>
              <Text style={styles.meloraNotification}>Get help with Melora</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableNativeFeedback onPress={() => console.log('Pressed!')}>
  <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
</TouchableNativeFeedback>


<TouchableWithoutFeedback onPress={() => console.log('Pressed!')}>
  <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
</TouchableWithoutFeedback>

<TouchableHighlight 
  onPress={() => console.log('Pressed!')} 
  underlayColor="lightgray"
>
  <View style={{ width: 100, height: 100, backgroundColor: 'yellow' }} />
</TouchableHighlight>

<TouchableHighlight 
  onPress={() => console.log('Pressed!')} 
  underlayColor="lightgray"
>
  <View style={{ width: 100, height: 100, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center' }}>
    <Text>Press Me</Text>
  </View>
</TouchableHighlight>

<TextInput style = {{width: 150, height: 50,backgroundColor: 'pink', marginTop: 20, borderRadius:10}} keyboardType='numeric'></TextInput>



<View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, color:'white' }}
        placeholder="Type here"
        onChangeText={(newText) => setText(newText)}
        value={text}
      />
      <Text>You typed: {text}</Text>
    </View>


    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Enter your phone number"
        onChangeText={onChangedNumber} // This is where we use the custom function
        value={number} // Keeps the TextInput value synced with the state
      />
      <Text>Your phone number is: {number}</Text>
    </View>

        <View style={styles.line} />
      </View>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // backgroundColor: '#0C0C1A',
  },
  innerContainer1: {
    padding: 20,
  },
  cloudSection: {
    alignItems: 'center',
    // color: '#2d0f39',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  arrowIcon: {
    color: '#FFF',
  },
  settingsText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 24, 
  },
  cloudImage: {
    width: 300, // Updated to the full image width
    height: 200, // Ensure this matches the original image dimension
    marginVertical: 20,
  },
  meloraText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0d5bb3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {

    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  meloraInOtherApps: {
    marginTop: 20,
    color: '#8986c1',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meloraNotification: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  meloraDescriptionText1: {
    color: '#828282',
    fontSize: 12,
  },
  meloraDescriptionText2: {
    color: '#828282',
    fontSize: 12,
  },
  meloraDescriptionTextLast2: {
    color: '#828282',
    fontSize: 12,
    paddingBottom: 10,
  },
  streamingText: {
    color: '#8986c1',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  generalSettingsText: {
    color: '#8986c1',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  supportText: {
    color: '#8986c1',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonText2: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tab: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabContentNoSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
    width: '100%', 
  },
  connectButton: {
    backgroundColor: '#b30d0d',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  connectButton2: {
    backgroundColor: '#07ca3b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  spotifyIcon: {
    color: '#07ca3b',
   
  }
});
