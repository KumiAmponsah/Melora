import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, PanResponder, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import SongComponent from './SongComponent';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function DownloadsPage() {
    const navigation = useNavigation();
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx < -100) {
                    navigation.navigate('Home');
                }
            },
            onPanResponderRelease: () => {},
        })
    ).current;

    useEffect(() => {
        const fetchDownloads = async () => {
            setLoading(true);
            try {
                const result = await getDownloads();
                setDownloads(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDownloads();
    }, []);

    const getDownloads = async () => {
        try {
            const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
            return files.map(file => ({
                id: file,
                title: file,
                artist: 'Unknown Artist',
                album_art_url: null,
                path: `${FileSystem.documentDirectory}${file}`
            }));
        } catch (error) {
            console.error('Error reading directory:', error);
            throw error;
        }
    };

    const renderHeader = useCallback(() => (
        <View style={styles.headerElements}>
            <FontAwesome name="chevron-left" size={24} color="white" style={styles.arrowIcon} onPress={() => navigation.goBack()} />
            <Text style={styles.headerText}>Downloads</Text>
        </View>
    ), [navigation]);

    const renderItem = useCallback(({ item }) => (
        <SongComponent
            SongId={item.id}
            SongTitle={item.title}
            Artiste={item.artist}
            imagePlaceholder={item.album_art_url}
        />
    ), []);

    return (
        <>
            {renderHeader()}
            <LinearGradient colors={['#3C1450', '#0d1f4e']} style={styles.container}>
                <ScrollView {...panResponder.panHandlers}>
                    {loading ? (
                        <Text style={styles.loadingText}>Loading...</Text>
                    ) : error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : (
                        <View style={styles.listContainer}>
                            <FlatList
                                data={downloads}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.listContent}
                                horizontal={false}
                                scrollEnabled={false}
                            />
                        </View>
                    )}
                </ScrollView>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3C1450',
        paddingLeft: width * 0.05,
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    headerElements: {
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#3C1450',
    },
    arrowIcon: {
        marginTop: 24,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 24,
        color: 'white',
        marginLeft: 20,
        marginTop: 24,
    },
    loadingText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
});
