import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = 'https://odmahancvvtqqbiagszq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbWFoYW5jdnZ0cXFiaWFnc3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwOTgwODUsImV4cCI6MjAzNTY3NDA4NX0.JFdMw7hpaQXPEWYlG5FK-dEr5EuCXyNH8192kMQWDVE';
const supabase = createClient(supabaseUrl, supabaseKey);

const SignUp1 = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Password state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    // Check if all fields are completed
    if (email && firstName && lastName && country && birthdate && password && confirmPassword) {
      // Validate email format
      if (!validateEmail(email)) {
        setEmailError(true);
        Alert.alert('Error', 'Please enter a valid email address.');
        return;
      } else {
        setEmailError(false);
      }

      if (password.length < 5) {
        // Set password error and show error message
        setPasswordError(true);
        Alert.alert('Error', 'Password must be at least 5 characters long.');
      } else if (password === confirmPassword) {
        // Clear any previous errors
        setPasswordError(false);
        setConfirmPasswordError(false);

        // Insert user data into Supabase
        const { data, error } = await supabase
          .from('account')
          .insert([
            {
              email: email,
              first_name: firstName,
              last_name: lastName,
              password: password,
              country: country,
              birthdate: birthdate.toISOString(),
            },
          ]);

        if (error) {
          Alert.alert('Error', 'An error occurred while signing up.');
          console.error('Supabase insert error:', error);
        } else {
          // Show success message and navigate to the next screen
          Alert.alert('Success', 'Sign Up Successful!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SignIn'),
            },
          ]);
        }
      } else {
        // Set error states and show mismatch message
        setPasswordError(true);
        setConfirmPasswordError(true);
        Alert.alert('Error', 'Password mismatch.');
      }
    } else {
      Alert.alert('Error', 'Please complete all fields.');
    }
  };

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString();
    }
    return '';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.form}>
            <Text style={styles.header}>Sign Up</Text>
            
            <TextInput
              style={[styles.inputControl, emailError && styles.errorBorder]}
              placeholder="Email"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.inputControl}
              placeholder="First Name"
              placeholderTextColor="#6b7280"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.inputControl}
              placeholder="Last Name"
              placeholderTextColor="#6b7280"
              value={lastName}
              onChangeText={setLastName}
            />
            
            {/* Password Input */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.inputControl, passwordError && styles.errorBorder]}
                placeholder="Enter Password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Icon name={passwordVisible ? "visibility-off" : "visibility"} size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.inputControl, confirmPasswordError && styles.errorBorder]}
                placeholder="Type Password Again"
                placeholderTextColor="#6b7280"
                secureTextEntry={!confirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                <Icon name={confirmPasswordVisible ? "visibility-off" : "visibility"} size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={country}
              style={styles.picker}
              onValueChange={(itemValue) => setCountry(itemValue)}
            >
              <Picker.Item label="Select Country" value="" />
              <Picker.Item label="United States" value="US" />
              <Picker.Item label="Canada" value="CA" />
              <Picker.Item label="United Kingdom" value="UK" />
              <Picker.Item label="Australia" value="AU" />
              <Picker.Item label="Germany" value="DE" />
              <Picker.Item label="France" value="FR" />
              <Picker.Item label="India" value="IN" />
              <Picker.Item label="Brazil" value="BR" />
              <Picker.Item label="China" value="CN" />
              {/* Add more countries as needed */}
            </Picker>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>Select Birthdate</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthdate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            
            {birthdate && (
              <Text style={styles.selectedDate}>Selected Birthdate: {formatDate(birthdate)}</Text>
            )}

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleSignUp}
            >
              <Text style={styles.nextButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
{/* 
          <Image
            source={require('./assets/waveImage.png')}
            style={styles.footerImg}
            alt="waveDesign"
          /> */}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  form: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5e16ec',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputControl: {
    height: 48,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: '#5e16ec',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  picker: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: '#5e16ec',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  selectedDate: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#5e16ec',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  footerImg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  passwordContainer: {
    position: 'relative',
   
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1.5,
  },
});

export default SignUp1;
