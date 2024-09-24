import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { createClient } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';

const supabaseUrl = 'https://odmahancvvtqqbiagszq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbWFoYW5jdnZ0cXFiaWFnc3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwOTgwODUsImV4cCI6MjAzNTY3NDA4NX0.JFdMw7hpaQXPEWYlG5FK-dEr5EuCXyNH8192kMQWDVE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const navigation = useNavigation();

  const handleSignIn = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const { data: user, error } = await supabase
        .from('account')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error && error.code !== 'PGRST116') { // Check if error is not "No rows found"
        Alert.alert('Error', 'Error fetching user data.');
        console.error('Error:', error.message);
        return;
      }

      if (user) {
        navigation.navigate('SaveYourSearch', {
          firstName: user.first_name,
          lastName: user.last_name
        });
      } else {
        Alert.alert('Error', 'Incorrect email or password.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error('Unexpected Error:', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require('./assets/meloraImage.png')}
                style={styles.headerImg}
                alt="Logo"
              />
              <Text style={styles.title}>Sign in to Melora</Text>
              <Text style={styles.subtitle}>
                Access all discoveries, all in one place
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  style={styles.inputControl}
                  placeholder="joyce@example.com"
                  placeholderTextColor="#6b7280"
                  value={form.email}
                  onChangeText={email => setForm({ ...form, email })}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  secureTextEntry
                  style={styles.inputControl}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  value={form.password}
                  onChangeText={password => setForm({ ...form, password })}
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={handleSignIn}
                >
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign in</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={{ marginTop: 'auto' }}
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text style={styles.formFooter}>
                Get started with Melora.{' '}
                <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Place the footer image here */}
          <Image
            source={require('./assets/waveImage.png')}
            style={styles.footerImg}
            alt="waveDesign"
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 45,
    marginTop: 25,
  },
  footerImg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: '#5e16ec',
    borderWidth: 1.5,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  btn: {
    backgroundColor: '#5e16ec',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#075eec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
