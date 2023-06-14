import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native';
import API_URL from '../../API_URL/URL_Generate';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const PaymentforEvent = ({ route, navigation }) => {
  const { event, teamCount,academia } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expireDate, setExpireDate] = useState('');
  
  const handlePayment = async () => {
    if (cardNumber.length !== 16) {
      Alert.alert('Invalid card number', 'Please enter a valid 16-digit card number.');
      return;
    }
    if(cvc.length !== 3 ){
      if(cvc.length !==4){

      Alert.alert('Invalid card number', 'Please enter a valid 3-digit or 4 card number.');
      return; 
    }
  }
    try {
      const response = await fetch(`${API_URL}/processPaymentACA`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',   
        }, 
        body: JSON.stringify({ 
          cardNumber,
          cvc,
          expireDate,
          event,
          teamCount,   
          academia:academia.academiaName,
          price:event.price,    
          date:event.date,  
          location:event.location,    
        }),  
      }); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json(); 

      if (result.success) {
        // Save the invoice for later use or display it to the user
        Alert.alert('Payment successful!', 'Thank you for your payment.');
        navigation.goBack();
      } else {
        Alert.alert('Payment failed', result.message);
      }
    } catch (err) {
      console.error('Failed to process payment:', err); 
      Alert.alert('Payment failed', 'Please try again.');
    }
  };

  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
        </View>
        <View style={styles.cardContainer}>
          <Image source={{ uri: event.image }} style={styles.photo} resizeMode="cover" />
          <Text style={styles.subtitle}>Event: {event.name}</Text>
          <Text style={styles.subtitle}>Date: {moment(event.date).format('DD/MM/YYYY')}</Text>
          <Text style={styles.subtitle}>Location: {event.location}</Text>
          <Text style={styles.subtitle}>Price per Team: {event.price * teamCount} KD</Text>
          <Text style={styles.subtitle}>Number of Teams: {teamCount}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          maxLength={16}
          onChangeText={(text) => setCardNumber(text.replace(/[^0-9]/g, ''))}
          value={cardNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV or CSC"
          keyboardType="numeric"
          maxLength={4}
          onChangeText={(text) => setCvc(text.replace(/[^0-9]/g, ''))}
          value={cvc}
        />
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          keyboardType="numeric"
          maxLength={5}
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, '');
            if (text.length >= 3) {
              text = text.replace(/(\d{2})(\d+)/, '$1/$2');
            }
            setExpireDate(text);
          }}
          value={expireDate}
        />
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f7f7f7',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 48,
      paddingBottom: 16,
      backgroundColor: '#f7f7f7',
      marginBottom: 20,
    },
    headerTitle: {
      flex: 1,
      fontSize: 24,
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    cardContainer: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 20,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    photo: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 18,
      color: 'black',
      marginBottom: 10,
      textAlign: 'center',
    },
    input: {
      backgroundColor: 'white',
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      color: 'black',
      fontSize: 16,
      marginBottom: 20,
    },
    payButton: {
      backgroundColor: '#FF5722',
      borderRadius: 5,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    payButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
  });



export default PaymentforEvent;
