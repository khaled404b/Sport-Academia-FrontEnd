import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import API_URL from '../../API_URL/URL_Generate';

const ListInvoiceFromPlayer = ({ navigation }) => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/paymentstoadmin`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setInvoices(data)
        })
        .catch(error => console.error(error));
}, []);

return (
  <ScrollView style={styles.container}>
    <TextInput
      style={styles.search}
      onChangeText={text => setSearch(text)}
      value={search}
      placeholder="Search by invoice or academia"
      placeholderTextColor="#F8F9FA"
    />
    {invoices.map((invoice, index) => {

      if (!Array.isArray(invoice.payments)) {
        return null;
      }
      return invoice.payments
  .filter(payment => {
    return payment.invoice.toString().includes(search) || payment.academiaName.toLowerCase().includes(search.toLowerCase());
  })
  .map((payment, idx) => (
    <TouchableOpacity style={styles.card} key={idx} onPress={() => navigation.navigate('InvoiceFromPlayer', {payment})}>
      <Text style={styles.cardText}>Academia: {payment.academiaName}</Text>
      <Text style={styles.cardText}>Name of Player: {payment.fullName}</Text>
      <Text style={styles.cardText}>Invoice: {(payment.invoice)}</Text>
    </TouchableOpacity>
  ));

    })}
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

export default ListInvoiceFromPlayer;
