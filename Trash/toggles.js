import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer1}>

        <View style={styles.cloudSection}>
          {/* Arrow Icon and Text inside cloudSection */}
          <View style={styles.topSection}>
            <FontAwesome name="arrow-left" size={width * 0.1} style={styles.arrowIcon} />
            <Text style={styles.settingsText}>Settings</Text>
          </View>

          <Image
            source={require('./assets/cloudImage.png')}
            style={styles.cloudImage}
          />

          <Text style={styles.meloraText}>Save your Meloras</Text>

          {/* Custom Button */}
          <TouchableOpacity style={[styles.button, { width: width * 0.6, height: 50 }]}>
            <Text style={styles.buttonText}>Sign up or log in</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.meloraInOtherApps}>MELORA IN OTHER APPS</Text>
        <View style={styles.line} />

        <Text style={styles.meloraNotification}>Melora from notification bar</Text>
        <Text style={styles.meloraDescriptionText1}>Show a pesistent notification</Text>
        <Text style={styles.meloraDescriptionText2}>to Melora music in other apps</Text>
        <Text style={styles.meloraNotification2}>Melora from Pop-up</Text>
        <Text style={styles.meloraDescriptionText1}>Show a floating button to see lyrics</Text>
        <Text style={styles.meloraDescriptionText2}>and Melora music in other apps</Text>
        <View style={styles.line2} />

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  line:{
    backgroundColor: 'white',
    width : '100%',
    height : height * 0.001
  },
  line2:{
    backgroundColor: 'white',
    width : '100%',
    height : height * 0.00054,
    marginTop : height * 0.01
  },
  arrowIcon: {
    color: 'white',
  },  
  meloraNotification: {
    marginLeft: width * 0.03,
    marginTop : height * 0.02,
    color: '#ffffff',
    fontSize: width * 0.052,
    fontWeight: '500'

  },
  meloraNotification2: {
    marginLeft: width * 0.03,
    marginTop : height * 0.05,
    color: '#ffffff',
    fontSize: width * 0.052,
    fontWeight: '500'

  },
  meloraDescriptionText1: {
    marginLeft: width * 0.03,
    marginTop : height * 0.02,
    color: '#ffffff',
    fontSize: width * 0.044,
    fontWeight: '300',
    letterSpacing: width * 0.002,
  },
  meloraDescriptionText2: {
    marginLeft: width * 0.03,
    // marginTop : height * 0.02,
    color: '#ffffff',
    fontSize: width * 0.044,
    fontWeight: '300',
    letterSpacing: width * 0.002,
  },
  meloraInOtherApps: {
    marginLeft: width * 0.03,
    marginTop : height * 0.02,
    color: '#0D41F9',
    fontSize: width * 0.055

  },
  meloraText: {
    color: 'white',
    left: width * 0.04,
    fontSize: width * 0.08,
    marginLeft: width * 0.03,
    fontWeight: '600',
    letterSpacing: width * 0.004,
    bottom : height * 0.05
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
    bottom : height * 0.03,
    width: width * 1,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#0C3EF1',
    borderRadius: 10,
    bottom : height * 0.03,
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
    color: '#ffffff', // Change text color as needed
    fontWeight : '500',
    // letterSpacing: width * 0.002
  },
});
