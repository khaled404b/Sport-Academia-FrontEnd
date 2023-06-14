import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Easing,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import API_URL from '../../API_URL/URL_Generate';
import * as Animatable from 'react-native-animatable';

const ProfileOfPlayer = ({ route, navigation }) => {
  
  const { userData } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [payments, setPayments] = useState([]);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear, 
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]); 

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_URL}/payments/${userData.playerId}`);
      const data = await response.json();
      setPayments(data.payments);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } 
  };
  
  const handleSubscriptionPress = () => {
    navigation.navigate('PaymentDetailsScreen', { payments: payments });
  };

  return (
    <LinearGradient colors={['#1A2980', '#26D0CE']} style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={28} color="#FFF" />
      </TouchableOpacity>
    
      <Animatable.Text
        animation="bounceInLeft"
        duration={2222}
        style={styles.title}
      >
        {userData.fullName}
      </Animatable.Text> 
      <Animatable.Text
        animation="bounceInLeft"
        duration={2222}
        style={styles.info}
      >
        Email: {userData.email}
      </Animatable.Text>
      <Animatable.Text
        animation="bounceInRight"
        duration={2222}
        style={styles.info}
      >
        Player ID: {userData.playerId}
      </Animatable.Text>
      <Animatable.Text
        animation="bounceInLeft"
        duration={2222}
        style={styles.info}
      >
        Gender: {userData.gender}
      </Animatable.Text>
      <Animatable.Text
        animation="bounceInRight"
        duration={2222}
        style={styles.info}
      >
        Age: {userData.age}
      </Animatable.Text>
      <Animatable.Text
        animation="bounceInLeft"
        duration={2222}
        style={styles.info}
      >
        Number: {userData.number}
      </Animatable.Text>
      <Animatable.View animation="bounceInRight" duration={1500}>
        <TouchableOpacity
          style={styles.subscriptionButton}
          onPress={handleSubscriptionPress}
        >
          <Text style={styles.subscriptionText}>Subscription</Text>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  ); };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  playerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    backgroundColor: 'rgba(52, 73, 94, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    letterSpacing: 2,
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
    color: '#FFFFFF',
    backgroundColor: 'rgba(44, 62, 80, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 55,
    letterSpacing: 1,
    },
    subscriptionButton: {
    backgroundColor: 'rgba(236, 240, 241,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    },
    subscriptionText: {
    fontSize: 18,
    color: '#2C3E50',
    letterSpacing: 4,
    },
    backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    left: 10,
    zIndex: 10,
    padding: 10,
    },
    });
    
    export default ProfileOfPlayer;
