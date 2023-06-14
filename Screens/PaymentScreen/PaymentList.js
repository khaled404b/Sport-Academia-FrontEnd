import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../API_URL/URL_Generate';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentList = ({ route }) => {
  const { academiaId } = route.params;
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] =useState([]);

  const navigation = useNavigation();
  
  
  useEffect(() => {
  const fetchData = async () => {
  try {
  const response = await fetch(
  `${API_URL}/academia/${academiaId}/payments`
  ); 
  if (!response.ok) {
    const errorData = await response.json();
    console.error(
      `Error fetching payments: ${response.status}, errorType: ${errorData.errorType}`
    );
    return;
  }

  const data = await response.json();
  setPayments(data.payments);
  setFilteredPayments(data.payments);
} catch (error) {
  console.error(`Error fetching payments: ${error.message}`);
}
};

fetchData();
}, [academiaId]);

const searchFilter = (text) => {
  if (text === '') {
    setFilteredPayments(payments);
  } else {
    const filtered = payments.filter((payment) => {
      if (payment.invoice) {
        const invoiceString = payment.invoice.toString();
        return invoiceString.toLowerCase().indexOf(text.toLowerCase()) > -1;
      }
      return false;
    });
    setFilteredPayments(filtered);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
const renderPaymentItem = ({ item, index }) => {
  const { fullName, invoice, createdDate, expireDate } = item;
  const currentDate = formatDate(createdDate);
  const formattedExpireDate = formatDate(expireDate);
  // Determine if the expireDate has passed
  const hasExpired = new Date(expireDate) < new Date();

  // Set the background color based on the hasExpired status
  const backgroundColor = hasExpired ? 'lightred' : 'lightgreen';

  return (
    <TouchableOpacity key={index} onPress={() => navigateToPaymentDetails(item)}>
      <View style={[styles.paymentItem, { backgroundColor }]}>
        <View>
          <Text style={styles.paymentItemTitle}>Name</Text>
          <Text style={styles.paymentItemText}>{fullName}</Text>
        </View>
        <View>
          <Text style={styles.paymentItemTitle}>Current Date</Text>
          <Text style={styles.paymentItemText}>{currentDate}</Text>
        </View>
        <View>
          <Text style={styles.paymentItemTitle}>Expire Date</Text>
          <Text style={styles.paymentItemText}>{formattedExpireDate}</Text>
        </View>
        <View>
          <Text style={styles.paymentItemTitle}>Invoice</Text>
          <Text style={styles.paymentItemText}>{invoice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const navigateToPaymentDetails = (payment) => {
navigation.navigate('PaymentDetails', { payment });
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
    renderItem={renderPaymentItem}
    keyExtractor={(item, index) => index.toString()}
    ListEmptyComponent={
      <Text style={styles.errorMessage}>No payments found.</Text>
    }
  />
</View>
);
};


const styles = StyleSheet.create({
container: {
flex: -1,
backgroundColor: '#f0f0f0',
},
header: {
paddingTop: 20,
paddingBottom: 20,
paddingHorizontal: 20,
alignItems: 'center',
},
title: {
fontSize: 20,
fontWeight: 'bold',
color: '#ffffff',
},
errorMessage: {
fontSize: 18,
color: '#333',
marginTop: 20,
textAlign: 'center',
},
paymentItem: {
  flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
},
paymentItemGradient: {
  flex: 1,
  borderRadius: 10,
  padding: 2,
},
paymentItemInner: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 10,
},
paymentItemInfo: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 5,
},
paymentItemTitle: {
  fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
},
paymentItemText: {
  fontSize: 16,
  color: '#333',
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

export default PaymentList;
