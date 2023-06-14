import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native';

const PrivacyPolicyScreen = () => {
  const pdfUri = 'https://firebasestorage.googleapis.com/v0/b/sport-123-123.appspot.com/o/Agreement-with-a-sports-counseling-student-ForPlayer.pdf?alt=media&token=843e93c4-42c7-46ff-bd9c-d86749d0a2d4';

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

export default PrivacyPolicyScreen;
