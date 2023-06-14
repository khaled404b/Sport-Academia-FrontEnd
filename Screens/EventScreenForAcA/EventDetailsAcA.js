import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import moment from 'moment';
import axios from 'axios';
import API_URL from '../../API_URL/URL_Generate';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const EventDetailsAcA = ({ route, navigation }) => {
    const [event, setEvent] = useState(null);
    const [teamCount, setTeamCount] = useState(1); // Initialize team count as 1
    const [error, setError] = useState(false);
    const { event: eventProp } = route.params;
const {academia} =route.params;

    const handleIncreaseTeam = () => {
      setTeamCount(teamCount + 1); // Increase team count
    }
    const handleCancel = () => {
      setTeamCount(1); // Reset team count
    }
    useFocusEffect(
      React.useCallback(() => {
          const fetchEvent = async () => {
              try {
                  const res = await axios.get(`${API_URL}/getEvent/${eventProp._id}`);
                  setEvent(res.data.event);
              } catch (error) {
                  console.error('Error fetching event:', error);
                  setError(true);
                  Alert.alert('Error', 'Error fetching event');
              }
          };

          if (eventProp) {
              fetchEvent();
          }

          return () => {
              setEvent(null); // Clean up function
          };
      }, [eventProp])
  );

  if (error) {
      return <Text style={styles.errorText}>Error fetching event</Text>;
  }

  if (!event) {
      return <Text style={styles.loadingText}>Loading...</Text>;
  }


  return (
    <LinearGradient
        colors={['#403F9D', '#A9CBF0', '#A5CBF0']}
        style={styles.gradient}
        start={[0, 0]}
        end={[1, 1]}  
    >
        <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Cover style={styles.cardCover} source={{ uri: event.image }} />
                    <Card.Content>
                        <Title style={styles.title}>{event.name}</Title>
                        <Paragraph style={styles.paragraph}>{moment(event.date).format('DD/MM/YYYY')}</Paragraph>
                        <Paragraph style={styles.paragraph}>Location: {event.location}</Paragraph>
                        <Paragraph style={styles.paragraph}>Price per Team: {event.price * teamCount} KD</Paragraph>
                        <Paragraph style={styles.paragraph}>Number of Teams: {teamCount}</Paragraph>
                        <View style={styles.buttons}>
                            <Button mode="contained" onPress={handleIncreaseTeam}>Add Team</Button>
                            <Button mode="outlined" onPress={handleCancel}>Cancel</Button>

                        </View>
                       <Paragraph style={styles.paragraph}>Description: {event.description}</Paragraph>
                    
                     
                        <Button mode="contained" onPress={() => navigation.navigate('PaymentforEvent', {event, teamCount,academia})}>Pay Now</Button>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    </LinearGradient>
);
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  cardCover: {
      width: '100%',
      height: 350,
  },
  gradient: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  },
  scrollView: {
      flexGrow:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
  },
  card: {
      width: 350,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 12,
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1A237E',
      marginBottom: 8,
  },
  paragraph: {
      fontSize: 18,
      color: '#1A237E',
      marginBottom: 10,
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 10,
  },
  errorText: {
      fontSize: 18,
      color: '#F44336',
      textAlign: 'center',
      marginTop: 20,
  },
  loadingText: {
      fontSize: 18,
      color: '#4CAF50',
      textAlign: 'center',
             marginTop: 20,
  },
});

export default EventDetailsAcA;

