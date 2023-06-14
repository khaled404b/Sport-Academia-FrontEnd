
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const PaymentForEventInvoice = ({ route }) => {
  const { invoice } = route.params;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const shareAsPdf = async () => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
          }
          .title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1 class="title">Invoice Details</h1>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Invoice Number</td><td>${invoice.invoice}</td></tr>
            <tr><td>Academia</td><td>${invoice.academia}</td></tr>
            <tr><td>Team Count</td><td>${invoice.teamCount}</td></tr>
            <tr><td>Final Price</td><td>${invoice.finalprice} KD</td></tr>
            <tr><td>Location</td><td>${invoice.location}</td></tr>
            <tr><td>Date</td><td>${formatDate(invoice.date)}</td></tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

    const pdfOptions = {
      html: htmlContent,
      base64: false,
    };

    const pdf = await Print.printToFileAsync(pdfOptions);

    const fileExists = await FileSystem.getInfoAsync(pdf.uri);
    if (!fileExists.exists) {
      console.error("File doesn't exist");
      return;
    }

    if (!(await Sharing.isAvailableAsync())) {
      console.error("Sharing isn't available on this platform");
      return;
    }

    Sharing.shareAsync(pdf.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Invoice Details</Text>
        <Text style={styles.label}>Invoice Number</Text>
        <Text style={styles.value}>{invoice.invoice}</Text>
        
        <Text style={styles.label}>Academia</Text>
        <Text style={styles.value}>{invoice.academia}</Text>
        
        <Text style={styles.label}>Team Count</Text>
        <Text style={styles.value}>{invoice.teamCount}</Text>
        
        <Text style={styles.label}>Final Price</Text>
        <Text style={styles.value}>{invoice.finalprice} KD</Text>
        
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{invoice.location}</Text>
        
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{formatDate(invoice.date)}</Text>

        <TouchableOpacity style={styles.shareButton} onPress={shareAsPdf}>
          <Text style={styles.shareButtonText}>Share as PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: '#444',
  },
  shareButton: {
    backgroundColor: '#00c6ff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentForEventInvoice;
