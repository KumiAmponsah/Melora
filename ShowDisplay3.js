import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ShowDisplay1({ route, navigation }) {
  const { metadata } = route.params;
  const [albumImageUrl, setAlbumImageUrl] = useState(metadata.album_art_url);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    const fetchAlbumImage = async () => {
      if (!metadata.album_art_url) {
        try {
          const artist = encodeURIComponent(metadata.artist.replace(/ /g, '+'));
          const album = encodeURIComponent(metadata.album.replace(/ /g, '+'));

          const response = await axios.get(`https://itunes.apple.com/search?term=${artist}+${album}&entity=album`);
          const results = response.data.results;

          if (results.length > 0) {
            const hdImageUrl = results[0].artworkUrl100.replace('100x100', '1000x1000');
            setAlbumImageUrl(hdImageUrl);
          } else {
            setAlbumImageUrl(null);
          }
        } catch (err) {
          console.error('Failed to fetch album image:', err);
          setAlbumImageUrl(null);
        }
      }
      setLoading(false);
    };

    const fetchLyrics = async () => {
      if (metadata.artist && metadata.title) {
        try {
          const response = await axios.get(`https://api.lyrics.ovh/v1/${metadata.artist}/${metadata.title}`);
          if (response.data.lyrics) {
            setLyrics(response.data.lyrics);
          } else {
            setLyrics('Lyrics not found');
          }
        } catch (error) {
          console.error('Error fetching lyrics:', error.message);
          setLyrics('Lyrics not found');
        }
      }
    };

    fetchAlbumImage();
    fetchLyrics();
  }, [metadata]);

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (metadata.preview_url) {
        const { sound } = await Audio.Sound.createAsync({ uri: metadata.preview_url });
        setSound(sound);
        setIsPlaying(true);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      }
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = async () => {
        await stopPlayback();
        navigation.navigate('Home');
        return true; // Return true to prevent default back action
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        stopPlayback();
      };
    }, [navigation, sound])
  );

  const handleBackPress = async () => {
    await stopPlayback();
    navigation.navigate('Home');
    return true; // Return true to prevent default back action
  };

  // Construct the YouTube search URL
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(metadata.title + ' ' + metadata.artist)}`;

  // Construct the VK Music Bot URL
  const vkMusicBotUrl = `https://t.me/vkmusic_bot?start=${encodeURIComponent(metadata.title + ' ' + metadata.artist)}`;

  return (
    <LinearGradient colors={['#121212', '#1c1c1c']} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : albumImageUrl ? (
          <Image source={{ uri: albumImageUrl }} style={styles.albumArt} resizeMode="cover" />
        ) : (
          <Text style={styles.noImageText}>No Image Available</Text>
        )}
      </View>
      <LinearGradient colors={['#121212', '#5e16ec']} style={styles.metadataContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>{metadata.title}</Text>
          <Text style={styles.text}>Artist: {metadata.artist}</Text>
          <Text style={styles.text}>Album: {metadata.album}</Text>
          <Text style={styles.text}>Release Date: {metadata.release_date}</Text>
          <Text style={styles.text}>Genre: {metadata.genre}</Text>
          {metadata.preview_url ? (
            <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
              <FontAwesome name={isPlaying ? "pause-circle" : "play-circle"} size={60} color="white" />
              <Text style={styles.previewText}>Preview</Text>
            </TouchableOpacity>
          ) : null}
          {metadata.song_url ? (
            <TouchableOpacity onPress={() => openURL(metadata.song_url)}>
              <Text style={styles.clickToPlay}>Click to play full song</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={() => openURL(`https://tubidy.ws/search/${metadata.title.replace(/ /g, '-')}-${metadata.artist.replace(/ /g, '-')}`)}>
            <Text style={styles.clickToPlay}>Click to download</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openURL(youtubeSearchUrl)}>
            <Text style={styles.clickToPlay}>Search on YouTube</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openURL(vkMusicBotUrl)}>
            <Text style={styles.clickToPlay}>VK Music Bot</Text>
          </TouchableOpacity>
          <View style={styles.lyricsContainer}>
            <Text style={styles.lyricssubText}>Lyrics</Text>
            <Text style={styles.lyricsText}>{lyrics}</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  imageContainer: {
    marginTop: 60,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderColor: 'blue',
  },
  albumArt: {
    width: width - 40,
    height: height / 3 - 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#121212',
  },
  noImageText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  metadataContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 8,
    textAlign: 'center',
  },
  linkText: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  playButton: {
    marginTop: 30,
    alignSelf: 'center',
  },
  clickToPlay: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  lyricsContainer: {
    marginTop: 20,
    padding: 10,
  },
  lyricssubText: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
  },
  lyricsText: {
    fontSize: 18,
    color: '#d3d3d3',
    textAlign: 'center',
  },
});
