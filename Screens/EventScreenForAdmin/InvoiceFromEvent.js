import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text, Card, Title, Paragraph, Divider } from 'react-native-paper';

const InvoiceFromEvent = ({ route }) => {
  const { payment } = route.params;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Payment Information</Title>
          <Divider style={styles.divider}/>
          <Paragraph>Invoice: {payment.invoice}</Paragraph>
          <Paragraph>Academia: {payment.academia}</Paragraph>

        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Event Details</Title>
          <Divider style={styles.divider}/>
          <Paragraph>Final Price: {payment.finalprice}</Paragraph>

          <Paragraph>Team Count: {payment.teamCount}</Paragraph>
          <Paragraph>Location: {payment.location}</Paragraph>
          <Paragraph>Date: {formatDate(payment.date)}</Paragraph>
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

export default InvoiceFromEvent;
