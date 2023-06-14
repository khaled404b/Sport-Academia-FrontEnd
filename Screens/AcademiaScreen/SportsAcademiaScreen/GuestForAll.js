import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Font from 'expo-font';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';  // import LinearGradient
import { ActivityIndicator } from 'react-native-paper';



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
const { width } = Dimensions.get("window");  // Get device's width to use for styles
const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);

const GuestForAll = ({navigation}) => {
  const [pressedIndex, setPressedIndex] = useState(-1);
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Arial': require('../../../assets/fonts/arial.ttf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const onPressIn = (index) => {
    setPressedIndex(index);
  };

  const onPressOut = () => {
    setPressedIndex(-1);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (!fontLoaded) {
    // Add a loading spinner
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <ImageBackground
    source={require('../../../assets/Image/koko.jpg')}
    style={styles.container}
    resizeMode="cover"
  >
         <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-left" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EventsCalendarClient')}
          >
            <LinearGradient
            colors={['#de00ff', '#1e90ff']}
            style={styles.eventsButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 3, y: 1 }}
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
  eventsButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',

  },
  eventsButton: {
    borderRadius: 20,
    width: width * 0.8,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
   // Adjust styles to fill width
   borderRadius: 30,
   padding: 25,
   marginBottom: 15,
   width: width * 0.8,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between', // space items evenly
    
    },
    itemContainerDark: {
    backgroundColor: '#1E88E5',
    },
    itemContainerLight: {
    backgroundColor: '#29B6F6',
    },
    itemIcon: {
    marginRight: 30,
    },
    itemIcon2: {
    marginLeft: 30,
    },
    itemText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    },
    backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    padding: 10,
    },
    });
    
    
    
    export default GuestForAll;
    
    