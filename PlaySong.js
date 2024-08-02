import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, BackHandler, Animated, Dimensions, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider'; // Updated import
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function PlaySong() {
    const route = useRoute();
    const navigation = useNavigation();
    const { song } = route.params;
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const soundRef = useRef(new Audio.Sound());

    const screenWidth = Dimensions.get('window').width;
    const titleWidth = screenWidth + 300;

    // Create animated value
    const scrollAnim = useRef(new Animated.Value(0)).current;

    // Animation configuration
    const scrollAnimation = () => {
        scrollAnim.setValue(0);
        Animated.loop(
            Animated.sequence([
                Animated.timing(scrollAnim, {
                    toValue: -titleWidth,
                    duration: 10000,
                    useNativeDriver: true,
                }),
                Animated.timing(scrollAnim, {
                    toValue: 0,
                    duration: 1,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const playPauseSong = async () => {
        try {
            if (isPlaying) {
                await soundRef.current.pauseAsync();
            } else {
                if (soundRef.current._loaded) {
                    await soundRef.current.playAsync();
                } else {
                    const { sound, status } = await Audio.Sound.createAsync(
                        { uri: song.song_url },
                        { shouldPlay: true }
                    );
                    soundRef.current = sound;
                    setDuration(status.durationMillis);
                }
            }
            setIsPlaying(!isPlaying);
            if (!isPlaying) scrollAnimation();
        } catch (error) {
            console.error('Error playing/pausing sound:', error);
        }
    };

    const skipToPrevious = () => {
        console.log('Previous button pressed');
    };

    const skipToNext = () => {
        console.log('Next button pressed');
    };

    const handleBackButtonPress = async () => {
        if (isPlaying) {
            await soundRef.current.stopAsync();
            setIsPlaying(false);
        }
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
    }, [isPlaying]);

    useEffect(() => {
        const updateProgress = async () => {
            if (soundRef.current._loaded && isPlaying) {
                const status = await soundRef.current.getStatusAsync();
                setProgress(status.positionMillis);
            }
        };

        const interval = setInterval(updateProgress, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleSeek = async (value) => {
        if (soundRef.current._loaded) {
            await soundRef.current.setPositionAsync(value);
        }
    };

    // Download functionality
    const sanitizeFileName = (name) => name.replace(/[^a-zA-Z0-9]/g, '_');

    const handleDownloadSong = async () => {
        const sanitizedTitle = sanitizeFileName(song.title);
        const sanitizedArtist = sanitizeFileName(song.artist);
        const fileUri = `${FileSystem.documentDirectory}${sanitizedTitle}_${sanitizedArtist}.mp3`;

        setIsDownloading(true);

        const downloadCallback = (downloadProgress) => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            setDownloadProgress(progress);
        };

        try {
            const downloadResumableInstance = FileSystem.createDownloadResumable(
                song.song_url,
                fileUri,
                {},
                downloadCallback,
            );

            const { uri: downloadedUri } = await downloadResumableInstance.downloadAsync();
            console.log('Finished downloading to ', downloadedUri);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(downloadedUri);
            }
        } catch (error) {
            console.error('Error downloading song:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: song.album_art_url }} style={styles.albumArt} />
            <View style={styles.songTitleContainer}>
                <Animated.View style={[styles.songTitle, { transform: [{ translateX: scrollAnim }] }]}>
                    <Text style={styles.songTitleText}>{song.title}</Text>
                    <Text style={styles.artistText}> - {song.artist}</Text>
                    <Text style={[styles.songTitleText, { position: 'absolute', left: titleWidth }]}>
                        {song.title} - {song.artist}
                    </Text>
                </Animated.View>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity onPress={skipToPrevious} style={styles.controlButton}>
                    <FontAwesome name="step-backward" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={playPauseSong} style={styles.controlButton}>
                    <FontAwesome
                        name={isPlaying ? "pause-circle" : "play-circle"}
                        size={60}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext} style={styles.controlButton}>
                    <FontAwesome name="step-forward" size={40} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.progressContainer}>
                <Slider
                    style={styles.progressBar}
                    value={progress}
                    minimumValue={0}
                    maximumValue={duration}
                    onValueChange={handleSeek}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#f0e6e6"
                />
            </View>
            <TouchableOpacity onPress={handleDownloadSong} style={styles.downloadButton}>
                <Text style={styles.downloadText}>{isDownloading ? `Downloading ${Math.round(downloadProgress * 100)}%` : 'Download'}</Text>
                <Image source={require('./assets/downloadIconGray.png')} style={styles.downloadIcon} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumArt: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginBottom: 20,
    },
    songTitleContainer: {
        overflow: 'hidden',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    songTitle: {
        flexDirection: 'row',
        position: 'absolute',
        whiteSpace: 'nowrap',
    },
    songTitleText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    artistText: {
        color: 'white',
        fontSize: 24,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlButton: {
        marginHorizontal: 20,
    },
    progressContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    progressBar: {
        height: 40,
    },
    downloadButton: {
        marginTop: 20,
        padding: 10,
        width: 150,
        height: 70,
        flexDirection: 'row',
        backgroundColor: 'rgba(19, 126, 197, 1)',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    downloadIcon: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
    downloadText: {
        fontSize: 18,
        color: 'black',
    },
});
