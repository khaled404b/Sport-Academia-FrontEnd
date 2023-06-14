import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated, 
  Linking,
  Alert, 
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Ionicons,  
  MaterialCommunityIcons 
} from '@expo/vector-icons';
import API_URL from '../../../API_URL/URL_Generate';
import UserContext from '../../../Context/UserContext';
const Guest_Selected_Company = ({ route, navigation }) => {
  const userData = useContext(UserContext);
  const companyId = route.params.companyId;  
  const [company, setCompany] = useState(null);
  const [selectedSport, setSelectedSport] = useState('');
    // Check if selected sport is available at the company
 
  // Use useRef for the fade-in animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const getSportIcon = (sport) => {
    switch (sport) {
      case 'football':
        return 'soccer';
      case 'basketball': 
        return 'basketball';
      case 'tennis':
        return 'tennis';
      case 'swimming':
        return 'swim';
      case 'karate':
        return 'karate';
      case 'judo':
        return 'yoga';
      case 'padel':
        return 'tennis';
      case 'boxing':
        return 'boxing-glove';
      case 'shooting':
        return 'pistol';
      case 'gym':
        return 'dumbbell';
      case 'other':
        return 'lock-reset';
      // Add more cases for other sports and their respective icons
      default:
        return 'help-circle-outline'; // Default icon if no sport matches
    }
  };
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`${API_URL}/getCompany/${companyId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedCompany = await response.json();
        setCompany(fetchedCompany);
      } catch (err) {
        console.error('Failed to fetch company:', err);
      }
    };
    fetchCompany();
  }, [companyId]);
  useEffect(() => {
    // Fade-in animation for photos
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  if (!company) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <StatusBar translucent backgroundColor="transparent" />
    <LinearGradient
      colors={['#1e90ff', '#de00ff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={28} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        {company.photos.length > 0 && (
          <Image
            source={{ uri: company.photos[0] }} 
            style={styles.firstPhoto}
          />
        )} 
        <Text style={styles.title}>{company.academiaName}</Text>
      </View>
      <LinearGradient  
    colors={['#1e90ff', '#de00ff']} 
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}    
    style={styles.card}
>
    <View style={styles.infoContainer}>
        <Ionicons name="call-sharp" size={28} color="#de00ff" />
        <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${company.phoneNumber}`)}
        >
            <Text style={styles.info}>  Tap here to call : {company.phoneNumber}</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.photosContainer}>
  <Swiper showsButtons={false}>
    {company.photos.map((photo, index) => (
      <View key={index} style={styles.photoWrapper}>
        <Animated.Image
          source={{ uri: photo }}
          style={[
            styles.photo,
            {
              opacity: fadeAnim, 
              transform: [
                {
                  scale: new Animated.Value(1.03),
                },
              ],
            },
          ]}
        />
      </View>
    ))}
  </Swiper>
</View>
    <View style={styles.cardContainer}>
        {[
            { icon: "receipt-sharp", text: `Subscription: ${company.subscriptionType}` },
      
            { icon: "cash-sharp", text: `Unlock all benefits for just 
${company.costMonth} KD / month` },
            { icon: "cash-sharp", text: `Unlock all benefits for just 
${company.costMonth3} KD / 3-month` },
            { icon: "cash-sharp", text: `Unlock all benefits for just 
${company.costMonth6} KD / 6-month` },
            { icon: "cash-sharp", text: `dive in for a year at:
${company.costYearly} KD - great value!` },
            { icon: "male-female-sharp", text: `${company.gender} welcome here` },
            { icon: "timer-sharp", text: `Inviting ages ${company.aboveAge} to ${company.belowAge}` },
            { icon: "location-sharp", 
              text: `We're at:
         City:  ${company.location.city}
         Block:  ${company.location.block}
         Building:  ${company.location.building}
         Street:  ${company.location.street}`},
        ].map((item, index) => (
            <View key={index} style={styles.infoContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name={item.icon} size={28} color="#de00ff" />
                </View>
                <View style={styles.textBackground}>
                    <LinearGradient
                        colors={["#de00ff", "#1e90ff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientBackground}
                    >
                        <Text style={styles.info}>{item.text}</Text>
                    </LinearGradient>
                </View>
            </View>
        ))}
    </View>
</LinearGradient>

 <Text style={[styles.subtitle, selectedSport !== '' && { color: 'blue' }]}>
  {selectedSport === '' ? 'Select any sport:' : `Sport Selected: ${selectedSport}`}
  <MaterialCommunityIcons
    name={getSportIcon(selectedSport)}
    size={23}
    color={selectedSport === '' ? "#000" : "#fff"}
    style={{     alignItems: 'center', }}
  />
</Text>
<View style={styles.sportsHorizontalContainer}>
  <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.sportsContainer}>
    {company.selectedSports.map((sport, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.sportContainer,
          { borderColor: selectedSport === sport ? "#daae51" : "transparent" },
        ]}
        onPress={() => setSelectedSport(sport)}
      >
        <LinearGradient
          colors={
            selectedSport === sport
              ? ["#1e90ff", "#de00ff"]
              : ["#1e90ff", "#de00ff"]
          }
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 1 }}
          style={styles.sportGradient}
        >
          <MaterialCommunityIcons
            name={getSportIcon(sport)}
            size={18}
            color="#fff"
            style={{     justifyContent: 'center',     alignItems: 'center',}}
          />
        </LinearGradient>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>
    <View style={styles.buttonContainer}>
    {company.costMonth > 0 && (
    <TouchableOpacity
      style={styles.payButton}
      onPress={() => {
        if (userData.user && userData.user.fullName) {
          if(userData.user.gender==="Male"){
       const M="male";
            if (M=== company.gender || company.gender === 'male-female') {
            navigation.navigate('Payment', {
              photo:company.photos[0],
              email:userData.user.email,
                            fullName: userData.user.fullName,
              companyName: company.academiaName,
              amount: company.costMonth,
              selectedSport: selectedSport,
              period: 'month'
            });
          } else {
            Alert.alert('Error', `This academia is for ${company.gender} only.`);
          }  
          }
          else  if(userData.user.gender==="Female"){
            const F="female";
            if (F === company.gender || company.gender === 'male-female') {    
            navigation.navigate('Payment', {
              photo:company.photos[0],
              email:userData.user.email,
              fullName: userData.user.fullName,
              companyName: company.academiaName,
              amount: company.costMonth,
              selectedSport: selectedSport,
              period: 'month'
            });
          } else {
            Alert.alert('Error', `This academia is for ${company.gender} only.`);
          }
          }  
      } else {
          Alert.alert('Error', 'Please go Sign In First');
        }
      }}
      disabled={!selectedSport} // Disable button if no sport is selected
    >
      <Text style={styles.payButtonText}>Pay (${company.costMonth}) Month</Text>
    </TouchableOpacity>
  )}



  {company.costMonth3 > 0 && (
    <TouchableOpacity
      style={styles.payButton}
      onPress={() => {
        if (userData.user && userData.user.fullName) {
          if(userData.user.gender==="Male"){
       const M="male";
            if (M=== company.gender || company.gender === 'male-female') {
            navigation.navigate('Payment', {
              photo:company.photos[0],
              email:userData.user.email,
              fullName: userData.user.fullName,
              companyName: company.academiaName,
              amount: company.costMonth3,
              selectedSport: selectedSport,
              period: '3-month'
            });
          } else {
            Alert.alert('Error', `This academia is for ${company.gender} only.`);
          }  
          }
          else  if(userData.user.gender==="Female"){
            const F="female";
            if (F === company.gender || company.gender === 'male-female') {    
            navigation.navigate('Payment', {
              photo:company.photos[0],
              email:userData.user.email,
              fullName: userData.user.fullName,
              companyName: company.academiaName,
              amount: company.costMonth3,
              selectedSport: selectedSport,
              period: '3-month'
            });
          } else {
            Alert.alert('Error', `This academia is for ${company.gender} only.`);
          }
          }  
      } else {
          Alert.alert('Error', 'Please go Sign In First');
        }
      }}
      disabled={!selectedSport} // Disable button if no sport is selected
    >
      <Text style={styles.payButtonText}>Pay (${company.costMonth3}) 3-Month</Text>
    </TouchableOpacity>
  )}



  {company.costMonth6 > 0 && (
    <TouchableOpacity
      style={styles.payButton}
      onPress={() => {
        if (userData.user && userData.user.fullName) {
          if(userData.user.gender==="Male"){
       const M="male";
            if (M=== company.gender || company.gender === 'male-female') {
            navigation.navigate('Payment', {
              photo:company.photos[0],
              email:userData.user.email,
              fullName: userData.user.fullName,
              companyName: company.academiaName,
              amount: company.costMonth6,
              selectedSport: selectedSport,
              period: '6-month'
            });
          } else {
            Alert.alert('Error', `This academia is for ${company.gender} only.`);
          }  
          }
          else  if(userData.user.gender==="Female"){
            const F="female";
            if (F === company.gender || company.gender === 'male-female') {    
            navigation.navigate('Payment', {
              photo:company.photos[0],
              email:userData.user.email,
              fullName: userData.user.fullName,
              companyName: company.academiaName,
              amount: company.costMonth6,
              selectedSport: selectedSport,
              period: '6-month'
            });
          } else {
            Alert.alert('Error', `This academia is for ${company.gender} only.`);
          }
          }  
      } else {
          Alert.alert('Error', 'Please go Sign In First');
        }
      }}
      disabled={!selectedSport} // Disable button if no sport is selected
    >
      <Text style={styles.payButtonText}>Pay (${company.costMonth6}) 6-Month</Text>
    </TouchableOpacity>
  )} 




  {company.costYearly > 0 && (
    <TouchableOpacity
      style={styles.payButton}
      onPress={() => {
        if (userData.user && userData.user.fullName) {
          if(userData.user.gender==="Male"){
       const M="male";
            if (M=== company.gender || company.gender === 'male-female') {
            navigation.navigate('Payment', {
              photo:company.photos[0],
              email:userData.user.email,
              fullName: userData.user.fullName,
              companyName: company.academiaName,
              amount: company.costYearly,
              selectedSport: selectedSport,
              period: 'year'
            });
          } else {
            Alert.alert('Error', `This academia is for ${company.gender} only.`);
          }
          }
          else  if(userData.user.gender==="Female"){
            const F="female";
            if (F === company.gender || company.gender === 'male-female') {      
            navigation.navigate('Payment', {
              photo:company.photos[0],
              email:userData.user.email,
              fullName: userData.user.fullName,
              companyName: company.academiaName,
              amount: company.costYearly,
              selectedSport: selectedSport,
              period: 'year'
            });
          } else {
            Alert.alert('Error', `This academia is for ${company.gender} only.`);
          }
          }
        } else {
          Alert.alert('Error', 'Please go SignIn First');
        }
      }}
      disabled={!selectedSport} // Disable button if no sport is selected
    >
      <Text style={styles.payButtonText}>Pay (${company.costYearly}) Year</Text>
    </TouchableOpacity>
  )}
</View>
  </LinearGradient>
  </ScrollView>
);
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 0,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    marginHorizontal: 10,
  },
  card: {
    borderRadius: 80, // Increase border radius for a more exciting feel
    paddingHorizontal: 28, // Increase horizontal padding
    paddingVertical: 36, // Increase vertical padding
    marginBottom: 22, // Add more space at the bottom
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 }, // Increase shadow offset
    shadowOpacity: 2.5, // Increase the shadow opacity
    shadowRadius: 24, // Increase the shadow radius
    elevation: 20, // Increase the elevation
    width: '95%',
    marginLeft: 12, // Add more space to the left
  },
  cardContainer: { 
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginRight: 8,
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 16,
    },
textBackground: {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
  overflow: 'hidden',
},
iconContainer: {
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 22,
  marginRight: 8,
},
photosContainer: {
  height: 360,
  marginBottom: 20,
},
image: {
  width: '100%',
  flex: 1,
},
slide: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'transparent',
},
photoWrapper: {
width: '100%',
height: 300,
marginBottom: 8,
borderRadius: 22,
shadowColor: '#000',
shadowOffset: { width: 2, height: 2 },
shadowOpacity: 11,
shadowRadius: 10,
elevation: 9,
},
photo: {
width: '100%',
height: '100%',
borderRadius: 22,
},
firstPhoto: {
  width: 111,
  height:111,
  borderRadius: 70,
  marginBottom:22,
  marginRight: 10,
},
subtitle: {
  fontSize: 22,
  marginBottom: 8,
  color: '#de00ff',
  textAlign: 'center',
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 1,
},
sportsHorizontalContainer: {
marginBottom: 32,
},
sportContainer: {
flexDirection: 'row',
marginRight: 8,
marginBottom: 8,
borderRadius: 70,
overflow: 'hidden',
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 1, // Increase the shadow opacity
shadowRadius: 11, // Increase the shadow radius
elevation: 5, // Increase the elevation
alignItems: 'center',
},
sportGradient: {
  flex: 1,
  padding: 16,
  alignItems: 'center',
  justifyContent: 'center',
},
backButton: {
  position: 'absolute',
  left: 10,
  top: 50,
  zIndex: 2,
  backgroundColor: 'rgba(0,0,0,0.1)',
  padding: 8,
  borderRadius: 15,
},
buttonContainer: {
  marginTop: 16,
},
  payButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 4,
    paddingHorizontal: 77,

    borderRadius: 55,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  payButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 55,
    backgroundColor: '#007BFF',
    letterSpacing: 1.2,
    elevation: 3, // This adds a drop shadow effect for Android
    shadowColor: '#000', // Shadow properties for iOS
  
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  
  
      gradientBackground: {
        borderRadius: 8,
      },
      info: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
},
        
});
export default Guest_Selected_Company;