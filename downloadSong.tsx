import { shareAsync } from "expo-sharing";
import { supabase } from "./supabase";
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

// Ensure Buffer is available
global.Buffer = global.Buffer || require('buffer').Buffer;

const downloadSong = async (uri: string): Promise<string> => {
    console.log("Attempting to get public URL for URI:", uri);

    // Get the public URL from Supabase
    const { data } = await supabase
        .storage
        .from('song-database')
        .getPublicUrl(uri);

    if (!data || !data.publicUrl) {
        console.error("No public URL found");
        throw new Error('No public URL found');
    }

    const publicURL = data.publicUrl;
    console.log("Public URL:", publicURL);

    try {
        const response = await fetch(publicURL);
        console.log("Response Status:", response.status);
        console.log("Response Headers:", JSON.stringify(response.headers));

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Network response was not ok: ${response.statusText}, ${errorText}`);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString('base64');

        const fileName = uri.split('/').pop();
        const filePath = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.writeAsStringAsync(filePath, base64Data, {
            encoding: FileSystem.EncodingType.Base64
        });

        console.log('Download complete. File saved to:', filePath);
        return filePath;
    } catch (fetchError) {
        console.error("Error fetching or saving the file:", fetchError.message);
        throw fetchError;
    }
};

export default downloadSong;
