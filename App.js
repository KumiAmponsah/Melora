import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated, Easing, Modal, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NetInfo from '@react-native-community/netinfo';

import OnlyButton4 from './onlyButton4';
import Concert from './Concert';
import Library from './Library';
import Settings from './Settings';
import SearchScreen2 from './SearchScreen2';
import SaveYourSearch from './SaveYourSearch';
import ArtisteComponents from './ArtisteComponents';
import SongComponent from './SongComponent';
import Cards from './songCard';
import resultsNotFound from './resultsNotFound';
import ResultsScreen from './resultsScreen';
import ShowDisplay1 from './ShowDisplay1';
import ArtistsPage from './ArtistsPage';
import manuelApp from './manuelApp';
import SignIn from './SignIn';
import SignUp1 from './SignUp1';
import SignUp2 from './SignUp2';
import SignUp3 from './SignUp3';
import LyricsScreen from './LyricsScreen';
import MusicPlayer from './MusicPlayer';
import PlaySong from './PlaySong';
import LibraryMusic from './LibraryMusic';
import BottomDrawer from './BottomDrawer';
import Details from './Details';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const sound = useRef(null);

  useEffect(() => {
    const loadAndPlaySound = async () => {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        require('./assets/startup.m4a')
      );
      sound.current = playbackObject;
      await playbackObject.playAsync();

      setTimeout(async () => {
        await playbackObject.stopAsync();
        onFinish();
      }, 4000);
    };

    loadAndPlaySound();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, onFinish]);

  return (
    <LinearGradient
      colors={['#5e16ec', '#000033']}
      style={styles.splashContainer}
    >
      <Animated.Text style={[styles.splashText, { opacity: fadeAnim }]}>
        Let's discover with Melora
      </Animated.Text>
    </LinearGradient>
  );
};

function HomeScreen() {
  const navigation = useNavigation();
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-width * 0.75)).current; // start hidden
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // For darkening background

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  const toggleDrawer = () => {
    if (isDrawerVisible) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Darken background
    Animated.timing(fadeAnim, {
      toValue: 0.5, // Darken to 50% opacity
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -width * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerVisible(false));

    // Restore background
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx > 10 || gestureState.dx < -10,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < 0) {
          // dragging left, close drawer
          drawerAnim.setValue(Math.max(gestureState.dx, -width * 0.75));
        } else {
          // dragging right, open drawer
          drawerAnim.setValue(Math.min(gestureState.dx, 0));
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > width / 4) {
          openDrawer();
        } else if (gestureState.dx < -width / 4) {
          closeDrawer();
        } else {
          if (isDrawerVisible) {
            closeDrawer();
          } else {
            openDrawer();
          }
        }
      },
    })
  ).current;

  return (
    <LinearGradient
      colors={['#5e16ec', '#0d1f4e']}
      style={styles.viewContainer}
    >
      <View {...panResponder.panHandlers}>
        <View style={styles.libraryAndConcert}>
          <TouchableOpacity style={styles.libraryContainer} onPress={toggleDrawer}>
            <Image
              source={require('./assets/menu01.png')}
              style={styles.iconMenu}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.libraryContainer} onPress={() => navigation.navigate('Library')}>
            <Image
              source={require('./assets/library.png')}
              style={styles.icon2}
            />
            <Text style={styles.libraryText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.concertContainer} onPress={() => navigation.navigate('Concert')}>
            <Image
              source={require('./assets/concert.png')}
              style={styles.icon3}
            />
            <Text style={styles.concertText}>Concerts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centerContainer}>
          <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity onPress={() => navigation.navigate('OnlyButton4')}>
              <Image source={require('./assets/meloraImage.png')} style={styles.logo} />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.meloraText}>Discover With Melora</Text>
        </View>

        {isDrawerVisible && (
          <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: drawerAnim }] }]}>
            <LinearGradient colors={['#5e16ec', '#0d1f4e']} style={styles.drawer}>
              <View style={styles.drawerHeader}>
                <Image source={require('./assets/meloraImage.png')} style={styles.drawerHeaderImage} />
                <Text style={styles.drawerHeaderText}>Melora</Text>
              </View>
              <View style={styles.drawerTabs}>
                <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('Settings'); }} style={styles.drawerTab}>
                  <Image source={require('./assets/gear.png')} style={styles.drawerTabIcon} />
                  <Text style={styles.drawerTabText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('ContactUs'); }} style={styles.drawerTab}>
                  <Image source={require('./assets/chat.png')} style={styles.drawerTabIcon} />
                  <Text style={styles.drawerTabText}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { closeDrawer(); navigation.navigate('SignIn'); }} style={styles.drawerTab}>
                  <Image source={require('./assets/user1.png')} style={styles.drawerTabIcon} />
                  <Text style={styles.drawerTabText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => closeDrawer()} style={styles.drawerTab}>
                  <Image source={require('./assets/exit.png')} style={styles.drawerTabIcon} />
                  <Text style={styles.drawerTabText}>Exit</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {isDrawerVisible && (
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
        )}
      </View>
    </LinearGradient>
  );
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1b1919' },
        tabBarLabelStyle: { fontSize: 12, color: '#ffffff' },
        tabBarIconStyle: { width: 24, height: 24 },
        headerShown: false,
        tabBarActiveTintColor: '#5e16ec',
        tabBarInactiveTintColor: '#313173',
      }}
    >
      <Tab.Screen
        name="Favorite"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/concert.png')} style={[styles.tabIcon, { tintColor: color }]} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen2}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/user.png')} style={[styles.tabIcon, { tintColor: color }]} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/library.png')} style={[styles.tabIcon, { tintColor: color }]} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={Settings}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/history.png')} style={[styles.tabIcon, { tintColor: color }]} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSplashFinish = () => {
    setSplashVisible(false);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected || !state.isInternetReachable) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Stack.Navigator initialRouteName="BottomTabs">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="OnlyButton4" component={OnlyButton4} options={{ headerShown: false }} />
          <Stack.Screen name="Concert" component={Concert} options={{ headerShown: false, gestureEnabled: true, freezeOnBlur: true }} />
          <Stack.Screen name="Library" component={Library} options={{ headerShown: false, title: 'Welcome Home', animationEnabled: true }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name="SearchScreen2" component={SearchScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="SaveYourSearch" component={SaveYourSearch} options={{ headerShown: false }} />
          <Stack.Screen name="ArtisteComponents" component={ArtisteComponents} options={{ headerShown: false }} />
          <Stack.Screen name="SongComponent" component={SongComponent} options={{ headerShown: false }} />
          <Stack.Screen name="songCard" component={Cards} options={{ headerShown: false }} />
          <Stack.Screen name="resultsNotFound" component={resultsNotFound} options={{ headerShown: false }} />
          <Stack.Screen name="resultsScreen" component={ResultsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ShowDisplay1" component={ShowDisplay1} options={{ headerShown: false }} />
          <Stack.Screen name="ArtistsPage" component={ArtistsPage} options={{ headerShown: false }} />
          <Stack.Screen name="manuelApp" component={manuelApp} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="MusicPlayer" component={MusicPlayer} options={{ headerShown: false }} />
          <Stack.Screen name="LyricsScreen" component={LyricsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PlaySong" component={PlaySong} options={{ headerShown: false }} />
          <Stack.Screen name="LibraryMusic" component={LibraryMusic} options={{ headerShown: false }} />
          <Stack.Screen name="BottomDrawer" component={BottomDrawer} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp1" component={SignUp1} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp2" component={SignUp2} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp3" component={SignUp3} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
          <Stack.Screen name="ContactUs" component={Details} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Make sure you have a strong internet connection</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </NavigationContainer>
  );
}
// Rest of the code remains the same

const styles = StyleSheet.create({
  // ... your previous styles

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100000000000,
    height: 100000000,
    backgroundColor: 'black',
   
  },
  
  // Drawer styling
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75,
    height: 750,
    backgroundColor: '#5e16ec',
    zIndex: 10,
    marginLeft:width * -0.050
  },

  drawer: {
    flex: 1,
   
  },

  drawerHeader: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: width * -0.3
  },

  drawerHeaderImage: {
    width: 60,
    height: 60,
  },

  drawerHeaderText: {
    marginTop: 10,
    fontSize: 25,
    fontWeight:'900',
    color: '#2b2323',
    left: width * 0.03
  },

  drawerTabs: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 20,
  },

  drawerTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  drawerTabIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  drawerTabText: {
    fontSize: 18,
    color: '#fff',
  },

  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: width * 0.1,
    color: '#ffffff',
    fontWeight: '900',
  },
  viewContainer: {
    flex: 1,
    padding: width * 0.05,
  },
  libraryAndConcert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.08,
    marginTop: height * 0.05,
  },
  libraryContainer: {
    alignItems: 'center',
  },
  concertContainer: {
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    top: height * 0.15
  },
  button: {
    borderRadius: (width * 0.6) / 2,
    width: width * 0.50,
    height: width * 0.5,
    backgroundColor: '#1b1919',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  logo: {
    width: width * 0.6,
    height: (width * 0.575) * 1.04,
  },
  meloraText: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: height * 0.02,
    marginTop: height * 0.2,
  },
  libraryText: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#110f0f',
  },
  concertText: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#110f0f',
  },
  iconMenu: {
    width: 30,
    height: 30,
  },
  icon2: {
    width: 30,
    height: 30,
  },
  icon3: {
    width: 40,
    height: 40,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#5e16ec',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  // Other styling...
});
