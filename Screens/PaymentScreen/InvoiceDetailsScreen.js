import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Easing, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const InvoiceDetailsScreen = ({ route }) => {
  const { payment } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();  
  }, [fadeAnim]);
  
  useEffect(() => {
  }, []); 

  const printText = async () => {
    const formattedPayment = {
      ...payment,

    };

    const filteredPayment = Object.entries(formattedPayment).filter(([key]) => key !== '_id' && key !== 'userId' && key !== 'companyId');
 
    try {
      const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f6f6f6;
            }
            .wrapper {
              width: 100%;
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #e3e3e3;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              background-color: #fff;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 30px;
              color: #333;
              border-bottom: 2px solid #0072ff;
              padding-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            th, td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #e3e3e3;
            }
            th {
              font-weight: bold;
              background-color: #f6f6f6;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <h1 class="title">Payment Details</h1>
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                ${filteredPayment.map(([key, value]) => (
                  `<tr>
                    <td>${key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>${value}</td>
                  </tr>`
                )).join('')}
              </tbody>
            </table>
          </div>
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

  return (
    <LinearGradient colors={['#1A2980', '#26D0CE']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Payment Details</Animated.Text>
      <View style={styles.infoContainer}>
  {Object.entries(payment).map(([key, value]) => {
    if (key !== 'companyId' && key !== '_Id' && !key.startsWith('_')) {
      return (
        <Animated.Text key={key} style={[styles.info, { opacity: fadeAnim }]}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
        </Animated.Text>
      );
    }
  })}
</View>
      <TouchableOpacity onPress={printText} style={styles.printButton}>
        <Text style={styles.printButtonText}>Share</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    backgroundColor: 'rgba(52, 73, 94, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    letterSpacing: 2,
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFFFFF',
    backgroundColor: 'rgba(44, 62, 80, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 55,
    letterSpacing: 1,
    },
    printButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5, 
    marginTop: 20,
    },
    printButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    }, 
    }); 
    
    export default InvoiceDetailsScreen;