import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text, Card, Title, Paragraph, Divider, IconButton } from 'react-native-paper';


const InvoiceFromPlayer = ({ route }) => {
  const { payment } = route.params;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Player Information</Title>
          <Divider style={styles.divider}/>
          <Paragraph>Full Name: {payment.fullName}</Paragraph>
          <Paragraph>Age: {payment.age}</Paragraph>
          <Paragraph>Number: {payment.number}</Paragraph> 
          <Paragraph>Player ID: {payment.playerId}</Paragraph>
          <Paragraph>Email: {payment.email}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Payment Details</Title>
          <Divider style={styles.divider}/>
          <Paragraph>Invoice: {payment.invoice}</Paragraph>
          <Paragraph>Amount: {payment.amount}</Paragraph>
          <Paragraph>Period: {payment.period}</Paragraph>
          <Paragraph>Created Date: {formatDate(payment.createdDate)}</Paragraph>
          <Paragraph>Expire Date: {formatDate(payment.expireDate)}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Academia Information</Title>
          <Divider style={styles.divider}/>
          <Paragraph>Academia Name: {payment.academiaName}</Paragraph>
          <Paragraph>Academia Phone Number: {payment.academiaPhoneNumber}</Paragraph>
          <Paragraph>Selected Sport: {payment.selectedSport}</Paragraph>
        </Card.Content>
      </Card>
      
 
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  card: {
    marginVertical: 10
  },
  divider: {
    marginVertical: 10
  },
  title: {
    color: '#1976D2'
  }
});

export default InvoiceFromPlayer;
