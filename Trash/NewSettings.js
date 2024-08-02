import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, Platform, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Settings() {
  const navigation = useNavigation();

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer1}>
        <View style={styles.cloudSection}>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
              <FontAwesome name="arrow-left" size={width * 0.1} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.settingsText}>Settings</Text>
          </View>

          <Image source={require('./assets/cloudImage.png')} style={styles.cloudImage} />
          <Text style={styles.meloraText}>Save your Meloras</Text>

          <TouchableOpacity style={[styles.button, { width: width * 0.6, height: 50 }]}>
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

        <View style={styles.line2} />

        <Text style={styles.streamingText}>STREAMING</Text>
        <View style={styles.line3} />

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Apple Music</Text>
              <Text style={styles.meloraDescriptionText1}>Play full songs in Melora with</Text>
              <Text style={styles.meloraDescriptionText2}>Apple Music subscription</Text>
            </View>
            <TouchableOpacity style={[styles.connectButton, { width: width * 0.26, height: height * 0.05 }]}>
              <Text style={styles.buttonText2}>Connect</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.connectButton, { width: width * 0.26, height: height * 0.05 }]}>
          <Text style={styles.buttonText2}>Connect</Text>
        </TouchableOpacity>

        <View style={styles.line3} />

        <Text style={styles.generalSettingsText}>GENERAL SETTINGS</Text>
        <View style={styles.line5} />

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

        <View style={styles.line5} />

        <Text style={styles.supportText}>SUPPORT</Text>
        <View style={styles.line3} />

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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tab: {
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  tabContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContentNoSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    backgroundColor: 'white',
    width: '100%',
    height: height * 0.001,
  },
  line2: {
    backgroundColor: '#828282',
    width: '100%',
    height: height * 0.001,
    marginTop: height * 0.02,
  },
  line3: {
    backgroundColor: 'white',
    width: '100%',
    height: height * 0.001,
    marginTop: height * 0.02,
  },
  line5: {
    backgroundColor: 'white',
    width: '100%',
    height: height * 0.001,
    marginTop: height * 0.02,
  },
  connectButton: {
    backgroundColor: '#009AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  buttonText2: {
    color: 'white',
    fontSize: height * 0.02,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#004AAE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  settingsText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'black',
    marginTop: height * 0.015,
    marginLeft: width * 0.08,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingVertical: height * 0.005,
  },
  arrowIcon: {
    color: '#333',
    marginLeft: width * 0.02,
  },
  innerContainer1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  cloudSection: {
    width: width * 0.9,
    marginTop: height * 0.02,
    backgroundColor: 'white',
    padding: width * 0.05,
    borderRadius: 20,
    alignItems: 'center',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cloudImage: {
    marginTop: height * 0.02,
    width: width * 0.2,
    height: height * 0.1,
  },
  meloraText: {
    marginTop: height * 0.02,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333',
  },
  meloraInOtherApps: {
    marginTop: height * 0.05,
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  meloraNotification: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'white',
  },
  meloraDescriptionText1: {
    fontSize: width * 0.03,
    color: '#828282',
  },
  meloraDescriptionText2: {
    fontSize: width * 0.03,
    color: '#828282',
    marginBottom: height * 0.01,
  },
  meloraDescriptionTextLast2: {
    fontSize: width * 0.03,
    color: '#828282',
    marginBottom: height * 0.05,
  },
  streamingText: {
    marginTop: height * 0.05,
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  generalSettingsText: {
    marginTop: height * 0.05,
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  supportText: {
    marginTop: height * 0.05,
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
});

