import React, { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ResultsNotFound() {
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate('Home');
      return true; // Return true to prevent default back action
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#5e16ec', '#000033']}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <FontAwesome name="ban" size={width * 0.27} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.NoResulttext}>No Result</Text>
        <Text style={styles.Messagetext}>We didn't quite catch that</Text>
        <TouchableOpacity style={styles.touchableButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.TryAgaintext}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NoResulttext: {
    fontSize: 29,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: height * 0.1,
  },
  icon: {
    marginBottom: height * 0.05,
  },
  Messagetext: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: height * 0.02,
  },
  TryAgaintext: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  touchableButton: {
    backgroundColor: '#3660D1',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: height * 0.1,
  },
});
