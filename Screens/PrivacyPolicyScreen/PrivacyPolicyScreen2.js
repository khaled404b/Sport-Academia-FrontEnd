import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native';
const PrivacyPolicyScreen2 = () => {
  const pdfUri = 'https://firebasestorage.googleapis.com/v0/b/sport-123-123.appspot.com/o/Signing-an-agreement-with-the-trainee-rehabilitation-center-(ForAcA).pdf?alt=media&token=efd89f98-db94-4a3c-a077-3f920564cad8';

  const openPdf = async () => {
    await WebBrowser.openBrowserAsync(pdfUri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={openPdf}>
        <Text style={styles.text}>Click here to view the Privacy Policy</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#6a068f',
  },
});

export default PrivacyPolicyScreen2;
