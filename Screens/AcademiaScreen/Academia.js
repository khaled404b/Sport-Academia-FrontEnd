import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Modal,
  TextInput
} from 'react-native';
import { PassCode } from './PassCode'; // Replace 'path/to/passcode' with the actual path to your passcode.js file

const Academia = ({navigation}) => {
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [passcode, setPasscode] = useState("");
console
  useEffect(() => {
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,       
    }).start();
  }, []);

  const handlePasscodeSubmit = () => {
    if (passcode === PassCode) {
      setModalVisible(false);
      setPasscode("");
      navigation.navigate('AcademiaRegister');
    } else {
      alert("Invalid passcode!");
      setPasscode("");
    }
  };
  const handleModalClose = () => {
    setModalVisible(false);
    setPasscode("");
  };
  return (
    <ImageBackground
      source={require('../../assets/Image/koko.jpg')}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome to Academia</Text>
      <Image style={styles.image} source={require('../../assets/Image/icon.png')} />
      <View style={styles.buttonContainer}>
        <Animated.View
          style={{ ...styles.buttonAnimation, opacity: buttonAnimation }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AcademiaLogin')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{ ...styles.buttonAnimation, opacity: buttonAnimation }}
        >
          <TouchableOpacity
            style={styles.button1}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </Animated.View>
            <Animated.View
          style={{ ...styles.buttonAnimation, opacity: buttonAnimation }}
        >
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('AdminLogin')}
          >
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Passcode if you not have it please Call us :</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPasscode}
              value={passcode}
              placeholder="Enter The Passcode"
              secureTextEntry={true}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={{ ...styles.button, marginTop: 20 }}
                onPress={handlePasscodeSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, marginTop: 20,}}
                onPress={handleModalClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    height: 270,
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
  button2: {
    width: 222,
    justifyContent: 'center',
    backgroundColor: 'black',
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
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
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  }
});

export default Academia;
 