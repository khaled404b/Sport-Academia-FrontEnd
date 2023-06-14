// AcademiaScreen.js
import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Animated, 
  Easing,
  Image,   
} from 'react-native';

const AcademiaScreen = ({navigation}) => {
 
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/Image/koko.jpg')}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome Player</Text>
      
      <Image style={styles.image} source={require('../../assets/Image/icon.png')} />
      <View style={styles.buttonContainer}>
        <Animated.View
          style={{ ...styles.buttonAnimation, opacity: buttonAnimation }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ClientLogin')}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{ ...styles.buttonAnimation, opacity: buttonAnimation }}
        >
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate('ClientRegister')}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
    marginBottom: 50,
  },
 
  image: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    height: 150,
  },
  button: {
    width: 222,
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
    borderRadius: 40,
    alignItems: 'center',
    padding: 18,
  },
  button1: {
    width: 222,
    justifyContent: 'center',
    backgroundColor: '#de00ff',
    borderRadius: 40,
    alignItems: 'center',
    padding: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonAnimation: {
    transform: [
      {
        translateY: Animated.multiply(
          Animated.diffClamp(
            Animated.modulo(Animated.divide(new Date().getTime(), 1000), 2),
            0,
            1
          ),
          10
        ),
      },
    ],
  },
});

export default AcademiaScreen;
