import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Easing,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentDetailsScreen = ({ navigation, route }) => {
  const { payments } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2222,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2222,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  useEffect(() => {
  }, []);

const renderItem = (item) => {
  if (!item || !item.invoice) return null;

  return (
    <TouchableOpacity
      key={item.invoice.toString()}
      style={styles.invoiceItem}
      onPress={() => navigation.navigate('InvoiceDetailsScreen', { payment: item })}
    >
      <Text style={styles.invoiceText}>Invoice: {item.invoice}</Text>
    </TouchableOpacity>
  );
};
  
  return (
    <LinearGradient colors={['#1e90ff', 'white']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Payment Details</Animated.Text>
      <ScrollView contentContainerStyle={styles.invoiceListContainer}>
        {payments.map(renderItem)}
        </ScrollView>
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
  invoiceListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  invoiceItem: {
    backgroundColor: 'rgba(236, 240, 241, 1)',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  invoiceText: {
    fontSize: 18,
    color: '#2C3E50',
  },
});

export default PaymentDetailsScreen;
