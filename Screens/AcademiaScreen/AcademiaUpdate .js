import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../API_URL/URL_Generate';
import axios from 'axios';
 

const AcademiaUpdate = ({ route, navigation }) => {
  const { academia } = route.params;
   const [phoneNumber, setPhoneNumber] = useState(academia.phoneNumber);
  const [password, setPassword] = useState('');
  const [photos, setPhotos] = useState(academia.photos);
  const [subscriptionType, setSubscriptionType] = useState(academia.subscriptionType);
  const [costMonth, setCostMonth] = useState(academia.costMonth.toString());
  const [costMonth3, setCostMonth3] = useState(academia.costMonth3.toString());
  const [costMonth6, setCostMonth6] = useState(academia.costMonth6.toString());
  const [costYearly, setCostYearly] = useState(academia.costYearly.toString());
  const [gender, setGender] = useState(academia.gender);
  const [selectedSports, setSelectedSports] = useState(academia.selectedSports);
  const [aboveAge, setAboveAge] = useState(academia.aboveAge?.toString() || '');
  const [belowAge, setBelowAge] = useState(academia.belowAge?.toString() || '');
  const [city, setCity] = useState(academia.location.city);
const [block, setBlock] = useState(academia.location.block);
const [building, setBuilding] = useState(academia.location.building);
const [street, setStreet] = useState(academia.location.street);

// const ImportantCode = "jkd12dx12"
  const sportsList = [
    { id: 'football', name: 'Football' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'padel', name: 'Padel' },
    { id: 'swimming', name: 'Swimming' },
    { id: 'karate', name: 'Karate' },
    { id: 'judo', name: 'Judo' },
    { id: 'boxing', name: 'Boxing' },
    { id: 'shooting', name: 'Shooting' },
    { id: 'gym', name: 'Gym' },
    { id: 'other', name: 'Other' },
  ];
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedSports(selectedItems);
  };
  
  
  // just check :) 

  const validateForm = () => {
 

    if (!/^\d{8}$/.test(phoneNumber)) {
      alert('Phone number should contain exactly 8 digits without spaces.');
      return false;
    }

    if (!password) {
      alert('Password is required.');
      return false;
    }
    // if (photos.length < 2) {
    //   alert('You should upload at least 2 photos.');
    //   return false;
    // }

    if (!subscriptionType) {
      alert('Subscription type is required.');
      return false;
    }

    if (!costMonth || isNaN(costMonth)) { 
      alert('Monthly cost is required and should be a number.');
      return false;
    }
    if (!costMonth3 || isNaN(costMonth3)) { 
      alert('Monthly cost is required and should be a number.');
      return false;
    }
    if (!costMonth6 || isNaN(costMonth6)) { 
      alert('Monthly cost is required and should be a number.');
      return false;
    }

    if (!costYearly || isNaN(costYearly)) {
      alert('Yearly cost is required and should be a number.');
      return false;
    }

    if (selectedSports.length === 0) {
      alert('At least one sport should be selected.');
      return false;
    }
    // if (photos.length < 2) {
    //   alert('You should upload at least 2 photos.');
    //   return false;
    // }

    if (subscriptionType === 'monthly' && (costYearly !== '0' || costMonth === '0')) {
      alert('For month subscription, you should only provide a monthly cost greater than 0 and a yearly cost of 0.');
      return false;
    }
    
    if (subscriptionType === '3-month' && (costYearly !== '0' || costMonth3 === '0')) {
      alert('For 3-month subscription, you should only provide a 3-month cost greater than 0 and a yearly cost of 0.');
      return false;
    }
    
    if (subscriptionType === '6-month' && (costYearly !== '0' || costMonth6 === '0')) {
      alert('For 6-month subscription, you should only provide a 6-month cost greater than 0 and a yearly cost of 0.');
      return false;
    }
    
    if (subscriptionType === 'yearly' && (costMonth !== '0' || costYearly === '0')) {
      alert('For year subscription, you should only provide a yearly cost greater than 0 and all monthly costs of 0.');
      return false;
    }
    
    if (subscriptionType === 'monthly-yearly' && (costMonth === '0' || costYearly === '0' || costMonth3 === '0' || costMonth6 === '0')) {
      alert('For all types of subscription, you should provide costs greater than 0 for all durations.');
      return false;
    }
    if (!gender) {
      alert('Gender is required.');
      return false;
    }
    if (!aboveAge || isNaN(aboveAge) || parseInt(aboveAge) < 0) {
      alert('Above age is required and should be a non-negative number.');
      return false;
    }
    
    if (!belowAge || isNaN(belowAge) || parseInt(belowAge) < 0) {
      alert('Below age is required and should be a non-negative number.');
      return false;
    }
    
    if (parseInt(aboveAge) > parseInt(belowAge)) {
      alert('Above age should not be greater than below age.');
      return false;
    }
    
    if (!city) {
      alert('City is required.');
      return false;
    }
    if (!block) {
      alert('Block is required.');
      return false;
    }
    if (!building) {
      alert('Building is required.');
      return false;
    }
    if (!street) {
      alert('Street is required.');
      return false;
    }
    

    return true;
  };
  const handleUpdate = async () => {
    if (!validateForm()) { 
      return;
    }
    try { 
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.put(`${API_URL}/academia/update`, {
        phoneNumber, 
        password,
        photos, 
        subscriptionType,
        costMonth: parseFloat(costMonth),
        costMonth3: parseFloat(costMonth3),
        costMonth6: parseFloat(costMonth6),
        costYearly: parseFloat(costYearly),
        gender,
        selectedSports,  
        aboveAge: parseInt(aboveAge),
        belowAge: parseInt(belowAge),   
        location: {
          city,
          block,
          building, 
          street,
        },  
      }, { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = response.data;

      if (response.status === 200) {
        navigation.navigate('AcademiaDashboard');
        alert('Academia data updated successfully.');
      } else {
        if (response.status === 401) {
          await AsyncStorage.removeItem('userToken');
          navigation.navigate('AcademiaLogin');
        } else {

          alert('Error updating academia. Please try again.');
        } 
        
      } 
    } catch (error) {   
      

      console.log('Error updating academia:', error.message);
      alert('Error updating academia. Please try again.');
    }
    
  };
  
  return (
    <ImageBackground
      source={require('../../assets/Image/koko.jpg')}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="Phone Number"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            style={styles.input}
          />
          <TextInput
            placeholder="New Password (or same password)"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.input}
          />
               
               <Picker
  selectedValue={subscriptionType}
  onValueChange={(itemValue) => setSubscriptionType(itemValue)}
  style={styles.picker}
  dropdownIconColor="#000"
>
  <Picker.Item label="Select a subscription type" value="" />
  <Picker.Item label="Month" value="monthly" />
  <Picker.Item label="3-Month" value="3-month" />
  <Picker.Item label="6-Month" value="6-month" />   
  <Picker.Item label="Year" value="yearly" />
  <Picker.Item label="Monthly , Yearly" value="monthly-yearly" />
</Picker>

<TextInput
  placeholder="City"
  onChangeText={(text) => setCity(text)}
  value={city}
  style={styles.input}
/>
<TextInput
  placeholder="Block"
  onChangeText={(text) => setBlock(text)}
  value={block}
  style={styles.input}
/>
<TextInput
  placeholder="Building"
  onChangeText={(text) => setBuilding(text)}
  value={building}
  style={styles.input}
/>
<TextInput
  placeholder="Street"
  onChangeText={(text) => setStreet(text)}
  value={street}
  style={styles.input}
/>
          <TextInput
            placeholder="Cost Month (if dont have = 0 )"
            onChangeText={(text) => setCostMonth(text)}
            value={costMonth}
            keyboardType="numeric"
            style={styles.input}
          />
           <TextInput
            placeholder="Cost 3 Month (if dont have = 0 )"
            onChangeText={(text) => setCostMonth3(text)}
            value={costMonth3}
            keyboardType="numeric"
            style={styles.input}
          />
           <TextInput
            placeholder="Cost 6 Month (if dont have = 0 )"
            onChangeText={(text) => setCostMonth6(text)}
            value={costMonth6}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Cost Year (if dont have = 0 )"
            onChangeText={(text) => setCostYearly(text)}
            value={costYearly}
            keyboardType="numeric"
            style={styles.input}
          />
        <Picker
  selectedValue={gender}
  onValueChange={(itemValue) => setGender(itemValue)}
  style={styles.picker}
  dropdownIconColor="#000"
>
  <Picker.Item label="Select gender" value="" />
  <Picker.Item label="Male" value="male" />
  <Picker.Item label="Female" value="female" />
  <Picker.Item label="Male , Female" value="male-female" />
</Picker>
<TextInput
  placeholder="Above Age"
  onChangeText={(text) => setAboveAge(text)}
  value={aboveAge}
  keyboardType="numeric"
  style={styles.input}
/>
<TextInput
  placeholder="Below Age"
  onChangeText={(text) => setBelowAge(text)}
  value={belowAge}
  keyboardType="numeric"
  style={styles.input}
/>

        <View style={styles.multiSelectContainer}>
<SectionedMultiSelect
  items={[{ title: 'Sports', id: 0, children: sportsList }]}
  uniqueKey="id"
  subKey="children"
  onSelectedItemsChange={onSelectedItemsChange}
  selectedItems={selectedSports}
  selectText="Select sports"
  searchInputPlaceholderText="Search sports..."
  showDropDowns={false}
  readOnlyHeadings={true}
  confirmText="Done"
  IconRenderer={Icon}
/>
    </View>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Information</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    
    justifyContent: 'center',
    
    paddingBottom: 50,
    paddingRight:30,
    paddingLeft:30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  updateButton: {
  backgroundColor: '#4b4cb4',
  borderRadius: 5,
  padding: 10,
  width: '100%',
  alignItems: 'center',
  },
  buttonText: {
  color: 'white',
  fontWeight: 'bold',
  },
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    },
    multiSelectContainer: {
      marginBottom: 10, 
    },
    activityIndicatorContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 255, 0.8)', // Optional: Add a semi-transparent background
    },
  });
  
  export default AcademiaUpdate;