
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Dimensions , ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';
import axios from 'axios';
import API_URL from '../../API_URL/URL_Generate';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const EventDetailsClient = ({ route, navigation }) => {
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(false);
    const { event: eventProp } = route.params;


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
              <Paragraph style={styles.date}>{moment(event.date).format('DD/MM/YYYY')}</Paragraph>
              <Paragraph style={styles.location}>Location</Paragraph>
              <Paragraph style={styles.location2}>{event.location}</Paragraph>
              <Paragraph style={styles.location}>Price Per Team</Paragraph>
              <Paragraph style={styles.location2}>{event.price} KD</Paragraph>
              <Paragraph style={styles.description}>Description</Paragraph>
              <Paragraph style={styles.description2}>{event.description}</Paragraph>
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
        width: '100%', // Cover full width of the card
        height: 350, // Fix the height
    },
    
    gradient: {
        flex: 1,
        width: Dimensions.get('window').width, // cover the full width of the screen
        height: Dimensions.get('window').height, // cover the full height of the screen
    },
    
      scrollView: {
        flexGrow:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // Decrease padding
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
          alignSelf:'center'
    
      },
      date: {
          fontSize: 17,
          color: '#1A237E',
          marginBottom: 8,
          alignSelf:'center'
    
      },
      location: {
          fontSize: 18,
          color: '#1A237E',
          marginBottom: 8,
          alignSelf:'center'
    
        },
        location2: {
            fontSize: 19,
            color: 'blue',
            marginBottom: 8,
            alignSelf:'center'
      
          },
      description: {
          fontSize: 18,
          color: '#1A237E',
          marginBottom: 8,
          alignSelf:'center'
    
      },
      description2: {
        fontSize: 21,
        color: 'blue',
        marginBottom: 8,
        alignSelf:'center'

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
       
cardActions: {
    justifyContent: 'space-around', // Distribute buttons evenly
    alignItems:'center',
    alignSelf:'center'
 
},
cardActions2: {
    justifyContent: 'space-around', // Distribute buttons evenly
    alignItems:'center',
    alignSelf:'center'

},
buttons:{
    justifyContent: 'space-around', // Distribute buttons evenly
    alignItems:'center',
    alignSelf:'center'

},
});

export default EventDetailsClient;

