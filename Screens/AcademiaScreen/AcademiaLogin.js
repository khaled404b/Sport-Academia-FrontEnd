import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import API_URL from '../../API_URL/URL_Generate';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AcademiaLogin = ({ navigation }) => {
  
  const [idNumber, setIdNumber] = useState('');
  const [academiaName, setAcademiaName] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/loginACA`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idNumber,
          academiaName,
          password,
        }),
      });
  
      if (response.ok) { 
        const { token } = await response.json();
        await AsyncStorage.setItem('userToken', token);
        navigation.navigate('AcademiaDashboard');
      } else {
        const errorMessage = await response.text();
        alert("Invalid id or username or password.");
        console.log(" erorr?? ",errorMessage)
      }
    } catch (error) {
      alert("Error logging in. Please try again.");
    }
  };
  
   

  return (
    <ImageBackground
      source={require('../../assets/Image/koko.jpg')}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="ID Number"
          onChangeText={text => setIdNumber(text)}
          value={idNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="Name of academia"
          onChangeText={text => setAcademiaName(text)}
          value={academiaName}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.input}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
    paddingRight:5,
    paddingLeft:5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AcademiaLogin;
