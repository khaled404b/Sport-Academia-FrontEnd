import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';  
import { ActivityIndicator } from 'react-native-paper';
import * as Font from 'expo-font';

const sportsList = [
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
  // { id: 'other', name: 'Other', icon: 'help-circle-outline' },
];

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
const { width } = Dimensions.get("window");  // Get device's width to use for styles

const Guest = ({ navigation, route }) => {
  const { userData } = route.params;
  const [pressedIndex, setPressedIndex] = useState(-1);
  const [fontLoaded, setFontLoaded] = useState(false); // Add a state to track if the font has been loaded
  const [name, setName] = useState('User'); // Change this line
  useEffect(() => {
    // This will get the first name from the user data and set name
    const nameArray = userData.fullName.split(' ');
    setName(nameArray[0]);
  }, []);
  

  const loadFonts = async () => {
    await Font.loadAsync({
      'Arial': require('../../../assets/fonts/arial.ttf'),
    });
    setFontLoaded(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    // Add a loading spinner
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  const onPressIn = (index) => {
    setPressedIndex(index);
  };

  const onPressOut = () => {
    setPressedIndex(-1);
  };





  return (
    <ImageBackground
      source={require('../../../assets/Image/koko.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.topRightCircleContainer}>
        <Text style={styles.topRightCircleText}>Hi, {name}</Text>
        <TouchableOpacity
          style={styles.topRightCircleTouchable}
          onPress={() => navigation.navigate('ProfileOfPlayer', { userData })}
        >
          <Image
            source={require('../../../assets/Image/prof.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableOpacity
          onPress={() => navigation.navigate('EventsCalendarClient')}
        >
          <LinearGradient
            colors={['#de00ff', '#1e90ff']}
            style={styles.eventsButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 3, y:1 }}
          >
            <Text style={styles.eventsButtonText}>Events Calendar</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Animatable.View animation="fadeInDown" duration={1500} style={styles.header}>
          <Text style={styles.headerText}>Choose Your Sport</Text>
        </Animatable.View>
     
        <View style={styles.listContainer}>
          {sportsList.map((sport, index) => (
            <AnimatableTouchableOpacity
              key={sport.id}
              animation="bounceIn"
              duration={1000 + index * 500}
              style={[
                styles.itemContainer,
                index % 2 === 0
                  ? styles.itemContainerDark
                  : styles.itemContainerLight,
                {
                  transform: [{ scale: pressedIndex === index ? 0.95 : 1 }],
                },
              ]}
              onPressIn={() => onPressIn(index)}
              onPressOut={onPressOut}
              onPress={() => navigation.navigate('Guest' + sport.name + 'List')}
            >
              <Icon
                name={sport.icon}
                size={30}  
                color="#FFFFFF"
                style={styles.itemIcon}
              />
              <Text style={styles.itemText}>{sport.name}</Text>
              <Icon
                name={sport.icon}
                size={30}  
                color="#FFFFFF"
                style={styles.itemIcon2}
              />
            </AnimatableTouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  scrollViewContent: {
    padding: 20,
    alignItems: 'center', // align all items to center
  },
  header: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Arial',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    },
  listContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    borderRadius: 30,
    padding: 25,
    marginBottom: 15,
    width: width * 0.8,  // make it responsive
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // space items evenly
  },
  itemContainerDark: {
    backgroundColor: '#0080FF', // Update the color scheme for a more modern look
  },
  itemContainerLight: {
    backgroundColor: '#00C0FF', // Update the color scheme for a more modern look
  },
  itemIcon: {
    marginRight: 30,
  },
  itemIcon2: {
    marginLeft: 30,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontFamily: 'Arial', // Change the font family to a modern font
  },
  topRightCircleContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightCircleText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 10,
    fontFamily: 'Arial', // Change the font family to a modern font
  },
  topRightCircleTouchable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  eventsButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  eventsButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});


export default Guest;
