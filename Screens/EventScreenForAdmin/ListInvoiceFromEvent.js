import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import API_URL from '../../API_URL/URL_Generate';

const ListInvoiceFromEvent = ({ navigation }) => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/paymentsForEventstoadmin`)
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.error(error));
  }, []);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.search}
        onChangeText={text => setSearch(text)}
        value={search}
        placeholder="Search by invoice or academia"
        placeholderTextColor="#F8F9FA"
      />
      {invoices.map((invoice, index) => (
        invoice.paymentsForEvents
          .filter(payment => payment.invoice.toString().includes(search) || payment.academia.toLowerCase().includes(search.toLowerCase()))
          .map((payment, idx) => (
            <TouchableOpacity 
              style={styles.card} 
              key={idx} 
              onPress={() => navigation.navigate('InvoiceFromEvent', { payment })}>
              <Text style={styles.cardText}>Academia: {payment.academia}</Text>
              <Text style={styles.cardText}>Invoice: {payment.invoice}</Text>
              <Text style={styles.cardText}>Date: {formatDate(payment.date)}</Text>
            </TouchableOpacity>
          ))
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1F1B24',
  },
  search: {
    height: 40,
    borderColor: '#3E3845',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#F8F9FA',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#272530',
    borderColor: '#3E3845',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#F8F9FA',
    marginBottom: 5,
  },
});

export default ListInvoiceFromEvent;
