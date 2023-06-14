import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { ID, TextCode, Passcode } from './adminPassCode';

const AdminLogin = ({ navigation }) => {
  
  const [idNumber, setIdNumber] = useState('');
  const [academiaName, setAcademiaName] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Just check if fields are filled
    if(idNumber == ID && academiaName == TextCode && password == Passcode) {
     
      navigation.navigate('ScreenOfAdmin')
    } else {
      alert("Please fill in all fields."); 
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Image/koko.jpg')}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="ID"
          onChangeText={text => setIdNumber(text)}
          value={idNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="TextCode"
          onChangeText={text => setAcademiaName(text)}
          value={academiaName}
          style={styles.input}
        />
        <TextInput
          placeholder="Passcode"
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

export default AdminLogin;
