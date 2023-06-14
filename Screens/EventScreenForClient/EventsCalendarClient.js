import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, TouchableOpacity, FlatList, RefreshControl, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import API_URL from '../../API_URL/URL_Generate';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Title, Paragraph, IconButton, FAB, Button } from 'react-native-paper';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

const EventCalendarAcA = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('football');
  const [modalVisible, setModalVisible] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/getEvent`, { params: { category: filter || '', page: 1, limit: 10 } }); // Adjusted filter usage
      const eventsArray = res.data.events || [];
      setEvents(eventsArray);
    } catch (error) {
      setError("We're sorry, something went wrong. Please try again."); // friendly error message
      setModalVisible(true); // show error modal
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter]);
  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [fetchEvents])
  );
  if (loading) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.modalText}>Loading Events...</Text>
          </View>
        </View>
      </Modal>
    );

  }
  


  const renderItem = ({ item }) => (
    <TouchableOpacity       onPress={() => navigation.navigate('EventDetailsClient', { event: item })}
    >
    <Card style={styles.eventCard}>
    <ImageBackground source={{ uri: item.image }} style={styles.cardImage}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.linearGradient}
      >
        <Title style={styles.cardTitle}>{item.name}</Title>
        <Paragraph style={styles.cardDate}>{moment(item.date).format('DD/MM/YYYY')}</Paragraph>
        <Paragraph style={styles.cardLocation}>Location: {item.location}</Paragraph>
      </LinearGradient>
    </ImageBackground>

  </Card>
  </TouchableOpacity>
  );
  const NoData = () => (
    <View style={styles.noData}>
      <Text>No events found. Wait for The Event</Text>
    </View>
  );

  const FilterBar = () => {
    const filters = [
      { id: 'football', name: 'Football', icon: 'soccer' },
      { id: 'basketball', name: 'Basketball', icon: 'basketball' },
      { id: 'tennis', name: 'Tennis', icon: 'tennis' },
      { id: 'swimming', name: 'Swimming', icon: 'swim' },
      { id: 'karate', name: 'Karate', icon: 'karate' },
      { id: 'judo', name: 'Judo', icon: 'mixed-martial-arts' },
      { id: 'padel', name: 'Padel', icon: 'tennis' },
      { id: 'boxing', name: 'Boxing', icon: 'boxing-glove' },
      { id: 'shooting', name: 'Shooting', icon: 'bullseye-arrow' },
      { id: 'gym', name: 'Gym', icon: 'dumbbell' },
    ];
    
    const FilterItem = ({ filterItem }) => (
      <TouchableOpacity
        style={[
          styles.filterItem,
          filter === filterItem.id && styles.filterItemActive,
        ]}
        onPress={() => setFilter(filterItem.id)}
      >
        <MaterialCommunityIcons
          name={filterItem.icon}
          size={20}
          color={filter === filterItem.id ? '#6200ee' : 'red'}
        />
        <Text
          style={[
            styles.filterItemText,
            filter === filterItem.id && styles.filterItemTextActive,
          ]}
        >
          {filterItem.name}
        </Text>
      </TouchableOpacity>
    );
  
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.filterContainer, events.length === 0 && styles.filterContainerWhenNoEvents]}
      >
        {filters.map((filterItem) => (
          <View key={filterItem.id} style={styles.filterItemContainer}>
            <FilterItem filterItem={filterItem} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };
  return (
    <View style={styles.container}>
          <FilterBar />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events Calendar</Text>
      </View>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => item && item.id ? `${item.id.toString()}-${index}` : `${index}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#6200ee']} // Add this line to change the color of the refresh indicator
          />
        }
        ListEmptyComponent={NoData}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{error}</Text>
            <Button onPress={fetchEvents} mode="contained" color="#6200ee">Retry</Button> 
          </View>
        </View>
      </Modal>
    </View>
  );
};

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 18,
      textAlign: "center",
      color: '#6200ee', // Change the text color to a purple
    },
    container: {
      flex: 1,
      backgroundColor: '#403F9A', // Change the background color to a light gray
      padding: 10,
    },
    header: {
      padding: 15,
      backgroundColor: '#403F9A', // Change the background color to a purple
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    headerTitle: {
      color: '#FFFFFF', // Change the text color to white
      fontSize: 21,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    // other styles...
    fab: {
      position: 'absolute',
      margin: 16, 
      left: 0,
      bottom: 0,
      backgroundColor: '#6200ee',
      width: 100,  // Increased width to accommodate label
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
    },
    noData: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,  // Added padding
    },

    eventCard: {
      margin: 15, // increased margin for more spacing
      overflow: 'hidden', // this will make the card corners rounded
      borderRadius: 10, // this will add round corners to the card
      elevation: 2, // this will add shadow under the card on Android
      shadowColor: "#000", // this will add shadow under the card on iOS
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    },
    
    cardImage: {
      width: '100%',
      height: 300,
      justifyContent: 'center', // align the content to the bottom
      borderRadius: 14, // to make the image corners rounded
    },
    
    linearGradient: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
      padding: 5,
      borderRadius: 5, // to make the gradient corners rounded
    },
    
    cardTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18, // increase the font size for title
    },
    
    cardDate: {
      color: '#fff',
      fontSize: 14, // decrease the font size for date
    },
    
    cardLocation: {
      color: '#fff',
      fontSize: 14, // decrease the font size for location
    },
    
    cardActions: {
      justifyContent: 'flex-end',
      padding: 10, // added padding for actions
    },
    
    
  filterContainer: {
    height: 55, // adjust this value according to your need
  },
  filterItemContainer: {
        height: 40, // adjust this value according to your need

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: 'blue',
  },
  filterItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterItemText: {
    marginLeft: 7,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
  filterItemTextActive: {
    marginLeft: 7,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },

  filterContainerWhenNoEvents: {
    height: 40, // adjust this value according to your need
    paddingHorizontal: 10, 
  
  },
  });

  export default EventCalendarAcA;
