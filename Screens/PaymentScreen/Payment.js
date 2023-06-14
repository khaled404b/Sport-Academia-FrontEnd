 import React, { useState } from 'react';
import { View, Text,ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native';
import API_URL from '../../API_URL/URL_Generate';
import { Ionicons } from '@expo/vector-icons';

const Payment = ({ route, navigation }) => {
  const { fullName, companyName, photo,email, amount, period, selectedSport } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setcvc] = useState('');
  const [expiredate, setexpiredate] = useState('');

  const handlePayment = async () => {
    if (cardNumber.length !== 16) {
      Alert.alert('Invalid card number', 'Please enter a valid 16-digit card number.');
      return;
    }
    if (cvc.length !== 3 && cvc.length !== 4) {
      Alert.alert('Invalid CVC', 'Please enter a valid 3 or 4-digit CVC.');
      return;
    }
    // Check that expiry date is valid 
    const [expiryMonth, expiryYear] = expiredate.split('/');
    if (!expiryMonth || !expiryYear || expiryMonth.length !== 2 || expiryYear.length !== 2) {
      Alert.alert('Invalid expiry date', 'Please enter a valid expiry date in the format MM/YY.');
      return; 
    }
    console.log('Processing payment for card number:', cardNumber);

    try { 
      const response = await fetch(`${API_URL}/processPaymentForPlayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName, 
          email,
          companyName,
          amount, 
          period,
          cardNumber,
          cvc,
          expiredate,
          selectedSport, 
        }),
      });
      setCardNumber('');
      setcvc('');
      setexpiredate('');
      
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(`HTTP error! status: ${response.status}, message: ${errorDetails.message}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        Alert.alert('Payment successful!', 'Thank you for your payment.');
        navigation.goBack();
      } else {
        Alert.alert('Payment failed', result.message);
      }
    }  catch (err) {
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
        <Image source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
        <Text style={styles.subtitle}>Academia: {companyName}</Text>
        <Text style={styles.subtitle}>Amount: ${amount} ({period})</Text>
        <Text style={styles.subtitle}>Sport: {selectedSport}</Text>
        <Text style={styles.subtitle}>your Email: {email}</Text>
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
        placeholder="cvv or CSC" 
        keyboardType="numeric"
        maxLength={4}
        onChangeText={(text) => setcvc(text.replace(/[^0-9]/g, ''))}
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
    setexpiredate(text);
  }}
  value={expiredate}
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
    padding: 40,
    backgroundColor: 'gray',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
    backgroundColor: 'gray',
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 28,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 22,
    elevation: 12,
  },
  photo: {
    width: '100%',
    height: 250,
    borderRadius: 11,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 21,
    color: 'black',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: 'orange',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 10,
    elevation: 9,
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default Payment;

