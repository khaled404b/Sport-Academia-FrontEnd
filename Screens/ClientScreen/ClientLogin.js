import React, { useState , useContext } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import API_URL from '../../API_URL/URL_Generate';
import UserContext from '../../Context/UserContext';
const ClientLogin = ({ navigation }) => {
  const [playerId, setPlayerId] = useState('');
  const [password, setPassword] = useState('');
  const { setUser }  = useContext(UserContext);
  
  const handleLogin = async () => {
    try {
      
      const response = await fetch(`${API_URL}/LoginClient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          playerId,
          password,
        }),    
      }); 
   
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        navigation.navigate('Guest', { userData }); 
      } else {
        const errorData = await response.json();
        alert("Invalid ID or Passsword.");
      }
      
    } catch (error) {
      console.error(errorj);
    }
  };


  return (
    <ImageBackground source={require('../../assets/Image/koko.jpg')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <TextInput
          placeholder="ID Number"
          onChangeText={(text) => setPlayerId(text)}
          value={playerId}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RequestResetPassword')} // Add this TouchableOpacity component
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  innerContainer: {
    
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
    paddingRight:10,
    paddingLeft:10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default ClientLogin;
