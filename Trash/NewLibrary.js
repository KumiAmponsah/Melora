import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Library() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.viewContainer}>
        <View style={styles.libraryTextAndIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <FontAwesome name="gear" size={width * 0.1} color="white" />
          </TouchableOpacity>
          <Text style={styles.libraryText}>Library</Text>
        </View>

        {/* Your existing UI for the Library screen */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    paddingTop: height * 0.03,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingVertical: height * 0.005,
  },
  libraryTextAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03,
  },
  libraryText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: width * 0.02,
  },
});

