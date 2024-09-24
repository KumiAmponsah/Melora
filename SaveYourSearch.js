import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function SaveYourSearch() {
  const route = useRoute();
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(require('./assets/user1.png'));
  const [isEditable, setIsEditable] = useState(false);

  const { firstName, lastName, isLoggedIn } = route.params || { firstName: 'User', lastName: '0', isLoggedIn: false };
  const fullName = `${firstName} ${lastName}`;

  useEffect(() => {
    if (isLoggedIn) {
      setIsEditable(true);
    }
  }, [isLoggedIn]);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    navigation.navigate('SignIn');
    setImageUri(require('./assets/user1.png'));
    navigation.replace('SaveYourSearch', {
      firstName: 'User',
      lastName: '0',
      isLoggedIn: false,
    });
  };

  return (
    <GestureHandlerRootView style={styles.viewContainer}>
      <View style={styles.centerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof imageUri === 'string' ? { uri: imageUri } : imageUri}
            style={styles.cloudImage}
          />
          {isEditable && (
            <TouchableOpacity style={styles.pencilIcon} onPress={handleImagePicker}>
              <FontAwesome name="pencil" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.saveSearchText}>{fullName}</Text>
      </View>
      <View style={styles.centerContainerTabs}>
        <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => navigation.navigate('SignUp1')}>
          <Image
            source={require('./assets/sign up.png')}
            style={styles.icon2}
          />
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.emailButton]} onPress={isLoggedIn ? handleLogout : () => navigation.navigate('SignIn')}>
          <Image
            source={isLoggedIn ? require('./assets/logout.png') : require('./assets/sign in.png')}
            style={styles.icon2}
          />
          <Text style={styles.buttonText}>{isLoggedIn ? 'Log Out' : 'Sign In'}</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#07070a',
  },
  centerContainer: {
    alignItems: 'center',
  },
  centerContainerTabs: {
    marginTop: 20,
    width: '80%',
    top: 150,
    marginBottom: 90,
  },
  imageContainer: {
    position: 'relative',
  },
  cloudImage: {
    width: 250,
    height: 250,
  },
  pencilIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  saveSearchText: {
    color: '#eae4e4',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  emailButton: {
    backgroundColor: 'blue',
  },
  icon2: {
    width: 30,
    height: 30,
    marginRight: 10,
    right: 40,
  },
  buttonText: {
    color: '#eae4e4',
    fontSize: 18,
    fontWeight: '700',
  },
});
