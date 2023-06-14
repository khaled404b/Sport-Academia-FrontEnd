import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import moment from 'moment';
const PaymentDetails = ({ route }) => {
  const { payment } = route.params;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const printText = async () => {
    try {
      const formattedPayment = {
        ...payment,
        createdDate: moment(payment.createdDate).format('YYYY-MM-DD'),
        expireDate: moment(payment.expireDate).format('YYYY-MM-DD')
      };
    
      const filteredPayment = Object.entries(formattedPayment).filter(([key]) => key !== 'userId' && key !== '_id');
    
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
          <h1 class="title">Payment Details</h1>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(payment)
                .filter(([key, value]) => key !== 'companyId' && !key.startsWith('_'))
                .map(([key, value]) => (
                  `<tr>
                    <td>${key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>${value}</td>
                  </tr>`
                ))
                .join('')}
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


    } catch (err) {
      console.error(err);

    }
  };

  const formattedCreatedDate = moment(payment.createdDate).format('YYYY-MM-DD');
  const formattedExpireDate = moment(payment.expireDate).format('YYYY-MM-DD');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Payment Details</Text>
        {renderAnimatedText('Invoice', payment.invoice, fadeAnim, scaleAnim)}
        {renderAnimatedText('Full Name', payment.fullName, fadeAnim, scaleAnim)}
        {renderAnimatedText('Age', payment.age, fadeAnim, scaleAnim)}
        {renderAnimatedText('Number', payment.number, fadeAnim, scaleAnim)}
        {renderAnimatedText('Player ID', payment.playerId, fadeAnim, scaleAnim)}
        {renderAnimatedText('Email', payment.email, fadeAnim, scaleAnim)}
        {renderAnimatedText('Amount', `${payment.amount} KD`, fadeAnim, scaleAnim)}
        {renderAnimatedText('Period', payment.period, fadeAnim, scaleAnim)}
        {renderAnimatedText('Current Date', formattedCreatedDate, fadeAnim, scaleAnim)}
        {renderAnimatedText('Expiry Date', formattedExpireDate, fadeAnim, scaleAnim)}
        {renderAnimatedText('Academia Name', payment.academiaName, fadeAnim, scaleAnim)}
        {renderAnimatedText('Academia Phone Number', payment.academiaPhoneNumber, fadeAnim, scaleAnim)}
        {renderAnimatedText('Selected Sport', payment.selectedSport, fadeAnim, scaleAnim)}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.printButton} onPress={printText}>
            <Text style={styles.printButtonText}>Share as PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const renderAnimatedText = (label, value, fadeAnim, scaleAnim) => (
  <Animated.View style={[styles.textContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </Animated.View>
);

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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  printButton: {
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
  printButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentDetails;