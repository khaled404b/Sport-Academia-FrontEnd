import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import API_URL from '../../API_URL/URL_Generate';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentforEventList = ({ navigation, route }) => {
  const { userId } = route.params;
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/paymentsForEvents?userId=${userId}`);
        setPayments(response.data);
        setFilteredPayments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const searchFilter = (text) => {
    if (text === '') {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter((payment) => {
        const invoiceString = payment.invoice.toString();
        return invoiceString.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setFilteredPayments(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => searchFilter(text)}
          placeholder="Search by Invoice"
        />
      </View>
      <FlatList
        data={filteredPayments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.paymentItem}
            onPress={() => navigation.navigate('PaymentForEventInvoice', { invoice: item })}
          >
            <LinearGradient colors={['#1A2980', '#26D0CE']} style={styles.paymentItemGradient}>
              <View style={styles.paymentItemInner}>
                <Text style={styles.paymentItemTitle}>{`Invoice: ${item.invoice}`}</Text>
                <Text style={styles.paymentItemText}>{`Academia: ${item.academia}`}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  paymentItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  paymentItemGradient: {
    flex: 1,
    borderRadius: 10,
  },
  paymentItemInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  paymentItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentItemText: {
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: '#1A2980',
    borderRadius: 33,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign:'center',
    fontSize: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default PaymentforEventList;
