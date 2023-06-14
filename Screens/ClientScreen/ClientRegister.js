import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native';

import API_URL from '../../API_URL/URL_Generate';

const ClientRegister = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [age, setAge] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState(''); // Add this line
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');


  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

 

  const validateInput = () => {
    const fullNameRegex = /^[a-zA-Z ]+$/;
    
    const isValidCivilId = (civilId) => {
      if (!/^\d{12}$/.test(civilId)) {
        alert('Civil ID number should contain exactly 12 digits without spaces.');
        return false;
      }
    
    
        var coeff  = [2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            sum = 0;
        for (var i = 0; i < civilId.length - 1; i++) {
          // assuming civilId is a 12 character string
          sum += parseInt(civilId[i]) * coeff[i];
        }
        return (civilId.length == 12) && 
               (11 - (sum % 11) == civilId[civilId.length-1]);
      
    };
    
    const ageRegex = /^\d+$/; 
    
      // number check in kuwait   
  const isValidPhoneNumber = (number) => { 
    return /^([569]\d{7})$/.test(number);
  };
  


    if (!fullNameRegex.test(fullName)) {
      return { valid: false, message: 'Full Name can only contain letters and spaces' };
    }
    if (!isValidCivilId(playerId)) {
      alert('Invalid Civil ID.');
      return false;
    }
  
    if (!ageRegex.test(age)) {
      return { valid: false, message: 'Age must be a number' };
    }



     if (!isValidPhoneNumber(number)) {
      alert('Invalid phone number. It should have exactly 8 digits and start with 5, 6, or 9.');
      return false;
    }
    
    if (!privacyPolicyAccepted) {
      Alert.alert('Error', 'You must accept the privacy policy to register');
      return;
    }

    return { valid: true, message: 'Register Complete' };
  }; 

 
    
  const handleSubmit = async () => {
    const validationResult = validateInput(); 
    if (!validationResult.valid) { 
      Alert.alert('Validation Error', validationResult.message);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/registerClient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ 
          fullName,
          playerId,
          age: parseInt(age),
          number,
          password,
          gender,
          email, // Add email here
        }),
        
      });

      if (response.status === 201) {
        Alert.alert('Registration successful');
        navigation.navigate('Client');
      } else {
        const errorData = await response.text();
        Alert.alert('Registration failed', errorData);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while registering the client');
    }
  };
 
  return (
    <ImageBackground source={require('../../assets/Image/koko.jpg')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <TextInput
          placeholder="Full Name"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          style={styles.input}
        />
        <TextInput
          placeholder="ID"
          onChangeText={(text) => setPlayerId(text)}
          value={playerId}
          style={styles.input}
        />
        <Picker
  selectedValue={gender}
  style={styles.picker}
  onValueChange={(itemValue) => setGender(itemValue)}
>
  <Picker.Item label="Male" value="Male" />
  <Picker.Item label="Female" value="Female" />
</Picker>

        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          onChangeText={(text) => setAge(text)}
          value={age}
          style={styles.input}
        />
        <TextInput
          placeholder="Number"
          keyboardType="numeric"
          onChangeText={(text) => setNumber(text)}
          value={number}
          style={styles.input}
        />
        <TextInput
  placeholder="Email"
  keyboardType="email-address"
  onChangeText={(text) => setEmail(text)}
  value={email}
  style={styles.input}
/>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.input}
        />
<View style={styles.checkboxContainer}>
  <Switch
    value={privacyPolicyAccepted}
    onValueChange={(newValue) => setPrivacyPolicyAccepted(newValue)}
    trackColor={{ true: '#6a068f', false: 'gray' }}
  />
  <Text style={styles.checkboxText}>I agree to the </Text>
  <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
    <Text style={[styles.checkboxText, { textDecorationLine: 'underline' }]}>
      Privacy Policy 
    </Text>
  </TouchableOpacity>
</View>


        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
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
  registerButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    textDecorationLine:true,

  },
  checkboxText: {
    marginLeft: 5,
    color:'white',

  },
  privacyPolicyLink: {
    color: '#6a068f',
    textDecorationLine: 'underline',
  },
  
});

export default ClientRegister;