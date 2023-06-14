import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import API_URL from '../../API_URL/URL_Generate';

const EnterResetCode = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${API_URL}/resetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, newPassword }), 
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        navigation.navigate('ClientLogin');  
        alert('Password updated successfully.');
      } else {
        if (responseData.message) {
          alert(responseData.message); 
        } else {
          alert('Error resetting password.');
        } 
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        placeholder="Enter Reset Code"
        onChangeText={(text) => setCode(text)}
        value={code}
        style={styles.input}
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry={true}
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6a068f',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default EnterResetCode;
