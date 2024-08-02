// Import components from React Native
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';

// Import FontAwesome icon set from Expo
import { FontAwesome } from '@expo/vector-icons';


export default function App() {
  return (

    <View style ={styles.viewContainer}>

      <View style ={styles.librayAndConcert}>
      {/* Library section containing the icon and text */}
      <View style={styles.libraryContainer}>
      <FontAwesome name="book" size={40} color="#110f0f" style={styles.icon} />
      <Text style ={styles.libraryText}>Library</Text>
      </View>

      {/* Concert section containing the icon and text */}
      <View style={styles.concertContainer}>
      <FontAwesome name="ticket" size={50} color="#110f0f" style={styles.icon} />
      <Text style ={styles.concertText} >Concerts</Text>
      </View>

      </View>


      {/* "Tap to" section with text */}
      <View style={styles.tapTo}>
        <Text style={styles.tapToText}>Taap to</Text>
      </View>

       {/* TouchableOpacity component with an image */}
      <View>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require('./assets/meloraImage.png')} // Replace this with an actual URL
          style={styles.logo}
        />
      </TouchableOpacity>
      </View>

      {/* Search icon container */}
      <View style={styles.searchContainer}>
      <FontAwesome name="search" size={40} color="#ffffff" />
      </View>
      
    </View>

  );
}

const styles = StyleSheet.create({

  viewContainer: {

    padding: 50,
    flexDirection: 'row',
    backgroundColor: '#195497',
    flex:1,
    top:10

  },
  librayAndConcert: {

    flexDirection: 'row',
    backgroundColor: '#195497',
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between'
    
  },

  libraryContainer: {

    width: 50,
    height:50,
  
  },
 
  concertContainer: {

    width: 75,
    height:50
  },
  
  logo: {
    
    width: 120,
    height: 110
    
  },

  button: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
    width: 150,
    height: 150,
    borderRadius: 75,
    top: 260,
    right: 120

  },


  tapTo: {

    width: 100,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 100,
    right:40

  },

  searchContainer: {

    width: 60,
    height:60,
    backgroundColor: '#7a777a',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
    top: 560,
    right:230

  },

  tapToText: {

    fontSize: 30,
    color: '#ffffff',
    fontWeight:'bold'

  },

  libraryText: {

    fontSize: 15,

  },

  concertText: {

    fontSize: 16,
    fontWeight: 'bold'

  }

});
