import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, Platform, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
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
            <FontAwesome name="arrow-left" size={width * 0.1} style={styles.arrowIcon} />
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
    marginTop: height * 0.006,
    backgroundColor: '#828282',
    width: '100%',
    height: height * 0.001,
  },
  arrowIcon: {
    color: 'white',
  },
  meloraNotification: {
    color: '#ffffff',
    fontSize: width * 0.052,
    fontWeight: '500',
  },
  meloraDescriptionText1: {
    color: '#828282',
    fontSize: width * 0.044,
    fontWeight: '300',
    letterSpacing: width * 0.002,
  },
  meloraDescriptionText2: {
    color: '#828282',
    fontSize: width * 0.044,
    fontWeight: '300',
    letterSpacing: width * 0.002,
  },
  meloraDescriptionTextLast2: {
    color: '#828282',
    fontSize: width * 0.044,
    fontWeight: '300',
    letterSpacing: width * 0.002,
  },
  meloraInOtherApps: {
    marginLeft: width * 0.03,
    marginTop: height * 0.02,
    color: '#0D41F9',
    fontSize: width * 0.055,
  },
  streamingText: {
    marginLeft: width * 0.03,
    marginTop: height * 0.03,
    color: '#0D41F9',
    fontSize: width * 0.055,
  },
  meloraText: {
    color: 'white',
    left: width * 0.04,
    fontSize: width * 0.08,
    marginLeft: width * 0.03,
    fontWeight: '600',
    letterSpacing: width * 0.004,
    bottom: height * 0.05,
  },
  cloudSection: {
    backgroundColor: '#5D17E7',
    height: height * 0.52,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  settingsText: {
    color: 'white',
    left: width * 0.13,
    fontSize: width * 0.08,
    marginLeft: width * 0.03,
    fontWeight: '600',
    letterSpacing: width * 0.004,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#000000',
  },
  innerContainer1: {
    flex: 1,
    backgroundColor: '#23152c',
    marginTop: width * 0.01,
    marginLeft: width * 0.02,
    marginRight: width * 0.01,
  },
  cloudImage: {
    bottom: height * 0.03,
    width: width * 1,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#0C3EF1',
    borderRadius: 10,
    bottom: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#E41212',
    bottom: height * 0.08,
    left: height * 0.172,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopLeftRadius: 90,
    borderBottomLeftRadius: 90,
  },
  buttonText2: {
    fontSize: 19,
    color: '#ffffff',
    fontWeight: '500',
  },
  generalSettingsText: {
    marginLeft: width * 0.03,
    marginTop: height * 0.016,
    marginBottom: height * 0.016,
    color: '#0D41F9',
    fontSize: width * 0.055,
  },
  line5: {
    backgroundColor: '#828282',
    height: height * 0.001,
  },
  supportText: {
    marginLeft: width * 0.03,
    marginTop: height * 0.02,
    color: '#0D41F9',
    fontSize: width * 0.055,
    marginBottom: height * 0.01,
  },
});

