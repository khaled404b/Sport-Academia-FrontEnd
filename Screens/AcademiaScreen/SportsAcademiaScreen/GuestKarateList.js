import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import API_URL from '../../../API_URL/URL_Generate';
import { TextInput } from 'react-native';

const GuestKarateList = ({ navigation }) => {
  const [companies, setCompanies] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [searchTerm, setSearchTerm] = useState(''); // Add this state variable

  useEffect(() => {   
    const fetchFootballAcademies = async () => {
      try {    
        const response = await fetch(`${API_URL}/getKarateAcademies`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);   
        }
        const academies = await response.json(); 
        setCompanies(academies);
      } catch (err) {
        console.error('Failed to fetch academies:', err);
      }
    };   
    fetchFootballAcademies();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const backgroundImg = {
    uri: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699',
  };
  const filteredCompanies = () => {
    if (!searchTerm) return companies;
    return companies.filter((company) =>
      company.academiaName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <ImageBackground 
    source={require('../../../assets/Image/koko.jpg')}

style={styles.backgroundImg}>
    <StatusBar translucent backgroundColor="transparent" />
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="arrow-back" size={28} color="#FFF" />
    </TouchableOpacity>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Karate Academies</Text>
        <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              onChangeText={setSearchTerm}
              value={searchTerm}
              placeholder="Search for academies..."
              placeholderTextColor="#777"
            />
            <Ionicons name="search" size={24} color="#777" />
          </View>
        
        {filteredCompanies().length > 0 ? (
            filteredCompanies().map((company, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('Guest_Selected_Company', {
                    companyId: company.idNumber,
                  });
                }}
              >
              <View style={styles.companyContainer}>
              <LinearGradient
                    colors={['#1e90ff', '#de00ff', '#1e90ff']}  
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 1 }}
                  >
                    <Image source={{ uri: company.photo }} style={styles.companyImage} />
                    <View style={styles.companyInfoContainer}>
                      <Text style={styles.companyName}>{company.academiaName}</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="#333" />
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCompanies}>No companies available</Text>
          )}
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginTop: StatusBar.currentHeight + 20,
    marginBottom: 40,
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingLeft: 25,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 25,
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#FFFFFF',
  },
  companyImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  companyInfoContainer: {
    flex: -1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 15,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  companyPhone: {
    fontSize: 18,
    color: '#777',
  },
  noCompanies: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    left: 10,
    zIndex: 10,
    padding: 10,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: Dimensions.get('window').width * 0.85,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    marginRight: 10,
  },
});


export default GuestKarateList;