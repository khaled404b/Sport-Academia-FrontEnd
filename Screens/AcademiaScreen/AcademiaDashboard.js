import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView,ActivityIndicator , StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../API_URL/URL_Generate';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { ImportantCodeUpdate } from './ImportantCodeUpdate';

const AcademiaDashboard = ({ navigation }) => {
  const [academia, setAcademia] = useState(null);
  const [inputCode, setInputCode] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const isCodeValid = () => {
    return inputCode === ImportantCodeUpdate; 
  };
  useFocusEffect( 
    React.useCallback(() => {
      setInputCode('');
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      const fetchAcademia = async () => {
        setIsLoading(true); // Set loading to true when starting fetch
        try {
          const token = await AsyncStorage.getItem('userToken');

          const response = await fetch(`${API_URL}/academia/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setAcademia(data);
          } else {
          if (response.status === 401) {
            await AsyncStorage.removeItem('userToken');
            navigation.navigate('AcademiaLogin');
          } else {
            const errorText = await response.text();
            console.log(`Error fetching academia: ${errorText}`);
          }
        }
      } catch (error) {
        console.log('Error fetching academia:', error.message);
      } finally {
        setIsLoading(false); // Set loading to false after finishing fetch
      }
    };

    fetchAcademia();
  }, [])
);
if (isLoading) {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
}

return (
  <LinearGradient 
    colors={['#1e90ff', 'white']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <ScrollView contentContainerStyle={styles.scrollView}>
      {academia && ( 
        <>
          {renderInfoCard('Phone Number', academia.phoneNumber, 'phone')}
          {renderInfoCard('Subscription Type', academia.subscriptionType, 'subscriptions')}
          {renderInfoCard('City', academia.location.city, 'location-city')}
          {renderInfoCard('Block', academia.location.block, 'location-on')}
          {renderInfoCard('Building', academia.location.building, 'business')}
          {renderInfoCard('Street', academia.location.street, 'directions')}
          {renderInfoCard('Cost per Month', academia.costMonth, 'attach-money')}
          {renderInfoCard('Cost per 3 Month', academia.costMonth3, 'attach-money')}
          {renderInfoCard('Cost per 6 Month', academia.costMonth6, 'attach-money')}
          {renderInfoCard('Cost per Year', academia.costYearly, 'attach-money')}
          {renderInfoCard('Gender', academia.gender, 'wc')}
          {renderInfoCard('Selected Sports', (academia.selectedSports || []).join(', '), 'sports')}
          {renderInfoCard('Above Age', academia.aboveAge, 'arrow-upward')}
          {renderInfoCard('Below Age', academia.belowAge, 'arrow-downward')}
       
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EventCalendarAcA', { academia })}

          >
            <Text style={styles.buttonText}>Events Calendar</Text>
          </TouchableOpacity>

          <TextInput 
            style={styles.input} 
            onChangeText={setInputCode}
            value={inputCode}
            placeholder="Enter code to enable Update Information"
          />
          <TouchableOpacity
            style={[styles.button, !isCodeValid() && styles.buttonDisabled]}
            onPress={() => navigation.navigate('AcademiaUpdate', { academia })}
            disabled={!isCodeValid()}
          >
            <Text style={styles.buttonText}>Update  Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('PaymentforEventList', { userId: academia._id })}
>
  <Text style={styles.buttonText}>View Payments for Events</Text>
</TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('PaymentList', {
                academiaId: academia._id,
                payments: academia.payments || [],
              })
            } 
          >
            <Text style={styles.buttonText}>View Payment Player List</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  </LinearGradient>
);
};

const renderInfoCard = (title, value, iconName) => (
<View style={styles.card}>
  <View style={styles.infoContainer}>
    <MaterialIcons name={iconName} size={24} color="red" />
    <Text style={styles.infoTitle}>{title}</Text>
  </View>
  <Text style={styles.infoValue}>{value}</Text>
</View>
);

const styles = StyleSheet.create({
container: {
  flex: 1,
},
scrollView: {
  padding: 20,
},
card: {
  backgroundColor: '#ffffff',
  borderRadius: 10,
  padding: 20,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
},
infoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
},
infoTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginLeft: 10,
},
infoValue: {
  fontSize: 16,
  color: '#333',
  marginTop: 5,
},
button: {
  backgroundColor: '#5e90ff',
  borderRadius: 5,
  padding: 15,
  alignItems: 'center',
  marginBottom: 20,
},
buttonDisabled: {
  backgroundColor: '#ccc',
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
},
input: {
  backgroundColor: '#fff',
  borderRadius: 5,
  paddingHorizontal: 10,
  paddingVertical: 5,
  fontSize: 16,
  marginBottom: 20,
  borderColor: '#ccc',
  borderWidth: 1,
},
loaderContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});

export default AcademiaDashboard;