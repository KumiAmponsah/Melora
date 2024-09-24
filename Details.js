// Details.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://odmahancvvtqqbiagszq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbWFoYW5jdnZ0cXFiaWFnc3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwOTgwODUsImV4cCI6MjAzNTY3NDA4NX0.JFdMw7hpaQXPEWYlG5FK-dEr5EuCXyNH8192kMQWDVE';
const supabase = createClient(supabaseUrl, supabaseKey);

const Details = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Fetch data from Supabase
        const { data, error } = await supabase
          .from('account')
          .select('*');

        // Debugging information
        console.log('Fetch result:', { data, error });

        if (error) {
          throw error;
        }

        // Check if data is correctly received
        if (data && Array.isArray(data) && data.length > 0) {
          setAccounts(data);
        } else {
          setError('No data found in the table.');
          setVisible(true);
        }
      } catch (err) {
        // Detailed error message
        console.error('Error fetching data:', err.message);
        setError('Failed to fetch data from Supabase: ' + err.message);
        setVisible(true);
      }
    };

    fetchAccounts();
  }, []);

  const handleDismissSnackBar = () => setVisible(false);

  return (
    <ScrollView style={styles.container}>
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <View key={account.id} style={styles.card}>
            <Text style={styles.text}>ID: {account.id}</Text>
            <Text style={styles.text}>Created At: {new Date(account.created_at).toLocaleString()}</Text>
            <Text style={styles.text}>Email: {account.email}</Text>
            <Text style={styles.text}>First Name: {account.first_name}</Text>
            <Text style={styles.text}>Last Name: {account.last_name}</Text>
            <Text style={styles.text}>Country: {account.country}</Text>
            <Text style={styles.text}>Birthdate: {new Date(account.birthdate).toLocaleDateString()}</Text>
            <Text style={styles.separator} />
          </View>
        ))
      ) : (
        <Text style={styles.noData}>{error || 'No data available'}</Text>
      )}
      <Snackbar
        visible={visible}
        onDismiss={handleDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => handleDismissSnackBar(),
        }}>
        {error}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  noData: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Details;
