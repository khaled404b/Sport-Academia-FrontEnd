import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ScreenOfAdmin = () => {
  const navigation = useNavigation();

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigateTo('EventsCalendar')}>
        <Text style={styles.buttonText}>Events Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigateTo('ListInvoiceFromPlayer')}>
        <Text style={styles.buttonText}>List Invoice From Player</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigateTo('ListInvoiceFromEvent')}>
        <Text style={styles.buttonText}>List Invoice From Event</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1F1B24'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F1F1F1',
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18
  }
});

export default ScreenOfAdmin;
