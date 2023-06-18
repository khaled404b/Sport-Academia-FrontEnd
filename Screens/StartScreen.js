import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AudioBackground from '../AudioBackground';
import { PanResponder } from 'react-native';

const StartScreen = ({ navigation }) => {
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const [playAudio, setPlayAudio] = useState(true);

  useEffect(() => {
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setPlayAudio(!playAudio);
      },
    })
  ).current;
  const toggleAudio = () => {
    setPlayAudio(!playAudio);
  };
  const [greetingIndex, setGreetingIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const greetings = [

    "Welcome, let's start your journey!",

    "Hello! Ready to get fit?",

    "Hey there! Let's pick a sport, shall we?",

    "Good to see you! What sport are we doing today?",

    "Welcome back! Ready to break a sweat?",
    
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
      
      setGreetingIndex((greetingIndex + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [greetingIndex]);
  
  return (
    <LinearGradient colors={['#1e90ff', '#00FFFF']} style={styles.container}>
      <AudioBackground
        source={require('../assets/Sound/Luke-Bergs-Waesto-Take-Off.mp3')}
        isLooping={true}
        play={playAudio}
      />
      <View style={styles.content}>
        <Image style={styles.logo} source={require('../assets/Image/icon.png')} />
        
        <Animated.View style={{ ...styles.greetingContainer, opacity: fadeAnim }}>
  <Text style={styles.greetingText}>{greetings[greetingIndex]}</Text>
</Animated.View>

        <View style={styles.buttonContainer}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.audioButton, { opacity: buttonAnimation }]}
          >
            <TouchableOpacity onPress={toggleAudio}>
              <Text style={styles.audioButtonText}>{playAudio ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ ...styles.buttonAnimation, opacity: buttonAnimation }}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate('GuestForAll')}
            >
              <Text style={styles.buttonText}>Take A Look First</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.playerAcademiaContainer}>
            <Animated.View style={{ ...styles.buttonAnimation, opacity: buttonAnimation }}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => navigation.navigate('Client')}
              >
                <Text style={styles.buttonText}>Player</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ ...styles.buttonAnimation, opacity: buttonAnimation }}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => navigation.navigate('Academia')}
              >
                <Text style={styles.buttonText}>Academia</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          </View>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    backgroundColor: '#1e90ff',
  },
  content: {
    marginTop: 3,
    alignItems: 'center',
  },
  logo: {
    width: 222,  // Reduced logo size
    height: 222, // Reduced logo size
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  playerAcademiaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20,
    },
    button: {
      width: 190, // Reduced button width
      justifyContent: 'center',
      backgroundColor: '#FF7F50',
      borderRadius: 25,
      alignItems: 'center',
      padding: 15, // Reduced padding
      marginHorizontal: 10,
    },
    button2: {
      width: 190, // Reduced button width
      justifyContent: 'center',
      backgroundColor: 'blue',
      borderRadius: 25,
      alignItems: 'center',
      padding: 15, // Reduced padding
      marginHorizontal: 10,
    },
    buttonAnimation: {
      transform: [
      {
      translateY: Animated.multiply(
      Animated.diffClamp(
      Animated.modulo(Animated.divide(new Date().getTime(), 1000), 2),
      0,
      1
      ),15),},],
      },
    
      audioButton: {
        marginTop: 20,
        backgroundColor: '#FF7F50', // Changed color to match other buttons
        borderRadius: 55, // Matched border radius with other buttons
        width: 77, // Reduced button width
        height: 77, // Reduced button height
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 30,
        },
        audioButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        },
        greetingContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          height: 70,
        },
        greetingText: {
          fontSize: 22, // Reduced font size
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: 10,
        },
    });
    
    export default StartScreen;
