import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import axios from 'axios';
import API_URL from '../../API_URL/URL_Generate';


const DeleteEventConfirmationScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [password, setPassword] = useState('');

  const verifyPassword = async () => {
    try {
      const response = await axios.post(`${API_URL}/VerifyPassword/${eventId}`, { password });
      return response.status === 200;
    } catch (error) {
      Alert.alert('Invalid password. Please try again.');
      return false;
    }
  };

  const deleteEvent = async () => {
    const isPasswordCorrect = await verifyPassword();
    if (isPasswordCorrect) {
      try {
        await axios.delete(`${API_URL}/DeleteEvent/${eventId}`);
        Alert.alert('Event deleted successfully');
        navigation.navigate('EventsCalendar')
      } catch (error) {
        Alert.alert('Error', 'Error deleting event');
      }
    }
  };

  return ( 
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to delete this event?</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Event Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={deleteEvent}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 21,
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginLeft: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
    
export default DeleteEventConfirmationScreen;
