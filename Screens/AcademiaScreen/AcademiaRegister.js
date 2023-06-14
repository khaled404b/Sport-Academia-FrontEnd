import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground ,ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { Switch } from 'react-native';

import API_URL from '../../API_URL/URL_Generate';
const AcademiaRegister = ({ navigation }) => {   
  const [loading, setLoading] = useState(false);
  
  const [ownerName, setOwnerName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [academiaName, setAcademiaName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [photos, setPhotos] = useState([]);
  const [city, setCity] = useState('');
  const [block, setBlock] = useState('');
  const [building, setBuilding] = useState('');
  const [street, setStreet] = useState('');
  const [subscription, setSubscription] = useState('');
  const [costMonth, setcostMonth] = useState('');
  const [costMonth3, setcostMonth3] = useState('');
  const [costMonth6, setcostMonth6] = useState('');
  const [costYearly, setcostYearly] = useState('');
  const [selectedSports, setSelectedSports] = useState([]);
  const [gender, setGender] = useState('');
  const [aboveAge, setAboveAge] = useState('');
  const [belowAge, setBelowAge] = useState('');



  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);


  const pickImage = async () => {
    // Check if the number of photos has reached the limit (5 in this case)
 
    if (photos.length >= 7) {
      alert('You can only upload up to 7 photos.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.3, // Lower the quality to reduce file size
    });
  
    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };


// CIVIL ID CHECKSUM in kuwait 
const isValidCivilId = (civilId) => {
  if (!/^\d{12}$/.test(civilId)) {
    alert('Civil ID number should contain exactly 12 digits without spaces.');
    return false;
  }


    var coeff  = [2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        sum = 0;
    for (var i = 0; i < civilId.length - 1; i++) {
      // assuming civilId is a 12 character string
      sum += parseInt(civilId[i]) * coeff[i];
    }
    return (civilId.length == 12) && 
           (11 - (sum % 11) == civilId[civilId.length-1]);
  
};


  // number check in kuwait 
  const isValidPhoneNumber = (phoneNumber) => {
    return /^([569]\d{7})$/.test(phoneNumber);
  };
  
  
  
  // just check :) 
  const validateForm = () => {
    if (!/^[a-zA-Z\s]+$/.test(ownerName)) {
      alert('Owner name should only contain letters and spaces.');
      return false;
    }

    if (!isValidCivilId(idNumber)) {
      alert('Invalid Civil ID.');
      return false;
    }
    if(!privacyPolicyAccepted){
      alert('Privacy Policy is required.');

      return false;
    }

    if (!academiaName) {
      alert('Academia name is required.');
      return false;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      alert('Invalid phone number. It should have exactly 8 digits and start with 5, 6, or 9.');
      return false;
    }
    

    if (!password) {
      alert('Password is required.');
      return false;
    }

    if (photos.length < 2) {
      
      alert('You should upload at least 2 ');
      return false;
    }
    


    

    if (!subscription) {
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
  
    if (subscription === 'monthly' && (costYearly !== '0' || costMonth === '0')) {
      alert('For month subscription, you should only provide a monthly cost greater than 0 and a yearly cost of 0.');
      return false;
    }
    
    if (subscription === '3-month' && (costYearly !== '0' || costMonth3 === '0')) {
      alert('For 3-month subscription, you should only provide a 3-month cost greater than 0 and a yearly cost of 0.');
      return false;
    }
    
    if (subscription === '6-month' && (costYearly !== '0' || costMonth6 === '0')) {
      alert('For 6-month subscription, you should only provide a 6-month cost greater than 0 and a yearly cost of 0.');
      return false;
    }
    
    if (subscription === 'yearly' && (costMonth !== '0' || costYearly === '0')) {
      alert('For year subscription, you should only provide a yearly cost greater than 0 and all monthly costs of 0.');
      return false;
    }
    
    if (subscription === 'monthly-yearly' && (costMonth === '0' || costYearly === '0' || costMonth3 === '0' || costMonth6 === '0')) {
      alert('For all types of subscription, you should provide costs greater than 0 for all durations.');
      return false;
    }
    if (!gender) {
      alert('Gender is required.');
      return false;
    }
    if (!aboveAge || isNaN(aboveAge)) {
      alert('Above age is required and should be a number.');
      return false;
    }

    if (!belowAge || isNaN(belowAge)) {
      alert('Below age is required and should be a number.');
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

  const registerAcademia = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('ownerName', ownerName);
    formData.append('idNumber', idNumber);
    formData.append('academiaName', academiaName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    photos.forEach((photo, index) => {
    const timestamp = new Date().getTime();
    formData.append('photos', {
        uri: photo,
        type: 'image/jpeg',
        name: `photo_${timestamp}_${index}.jpg`,
      });
    });
    formData.append('city', city);
    formData.append('block', block);
    formData.append('building', building);
    formData.append('street', street);

    formData.append('subscriptionType', subscription);
    formData.append('costMonth', costMonth);
    formData.append('costMonth3', costMonth3);    // New form data
    formData.append('costMonth6', costMonth6); 
    formData.append('costYearly', costYearly);
    formData.append('selectedSports', JSON.stringify(selectedSports));
    formData.append('gender', gender);
    formData.append('aboveAge', aboveAge);
    formData.append('belowAge', belowAge);


    try {
      const response = await fetch(`${API_URL}/registerACA`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.status === 409) {
        const errorMessage = await response.text();
        alert(errorMessage);
        return;
      } 
      const data = await response.json();

      if (response.ok) {
        
        Alert.alert('Registration successful');
        // navigate to the Academia screen after successful registration
        navigation.navigate('Academia');
      } else {
        
        Alert.alert('Registration failed');
      } 
    } catch (error) {
      
    } finally {
      setLoading(false); // Set loading to false after the process is finished (either successfully or with an error)
    }
  }  
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
    // { id: 'other', name: 'Other' },
  ];

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedSports(selectedItems);
  };

  return (
  
    <ImageBackground

    source={require('../../assets/Image/koko.jpg')}
    style={styles.container}
  >
   <ScrollView> 
  <View style={styles.innerContainer}>
    
   
      <TextInput
        placeholder="Name of the owner the Academia"
        onChangeText={text => setOwnerName(text)}
        value={ownerName}
        style={styles.input}
      />
      <TextInput
        placeholder="ID Number of the owner"
        onChangeText={text => setIdNumber(text)}
        value={idNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Name of academia"
        onChangeText={text => setAcademiaName(text)}
        value={academiaName}
        style={styles.input}
      />
      <TextInput
  placeholder="Phone Number"
  keyboardType="numeric"
  onChangeText={text => setPhoneNumber(text)}
  value={phoneNumber}
  style={styles.input}
/>
<Text style={styles.text2}><Text style={styles.text}>Importana !!!!</Text> make the password hard and save it in notepad</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
          onChangeText={text => setPassword(text)}
value={password}
style={styles.input}
/>
<Text style={styles.text2}><Text style={styles.text}>Importana !!!!</Text> make first photo the logo of your company</Text>
<TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
<Text style={styles.buttonText}>Upload photos: {photos.length}  Min:2  Max:7</Text>

</TouchableOpacity> 

<TextInput
  placeholder="City"
  onChangeText={text => setCity(text)}
  value={city}
  style={styles.input}
/>
<TextInput
  placeholder="Block"
  onChangeText={text => setBlock(text)}
  value={block}
  style={styles.input}
/>
<TextInput
  placeholder="Number or name Building"
  onChangeText={text => setBuilding(text)}
  value={building}
  style={styles.input}
/>
<TextInput
  placeholder="Street"
  onChangeText={text => setStreet(text)}
  value={street}
  style={styles.input}
/>

<Picker
  selectedValue={subscription}
  onValueChange={(itemValue) => setSubscription(itemValue)}
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
placeholder="Cost Month (if dont have = 0 )"
keyboardType="numeric"
onChangeText={text => setcostMonth(text)}
value={costMonth}
style={styles.input}
/>
<TextInput
    placeholder="Cost for 3 Months (if don't have = 0)"
    keyboardType="numeric"
    onChangeText={text => setcostMonth3(text)}
    value={costMonth3}
    style={styles.input}
  />
  
  <TextInput
    placeholder="Cost for 6 Months (if don't have = 0)"
    keyboardType="numeric"
    onChangeText={text => setcostMonth6(text)}
    value={costMonth6}
    style={styles.input}
  />
  
<TextInput 
placeholder="Cost Year (if dont have = 0 )"
keyboardType="numeric"
onChangeText={text => setcostYearly(text)}
value={costYearly}
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
      placeholder="Above age"
      keyboardType="numeric"
      onChangeText={text => setAboveAge(text)}
      value={aboveAge}
      style={styles.input}
    />
    <TextInput
      placeholder="Below age"
      keyboardType="numeric"
      onChangeText={text => setBelowAge(text)}
      value={belowAge}
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
    <View style={styles.checkboxContainer}>
  <Switch
    value={privacyPolicyAccepted}
    onValueChange={(newValue) => setPrivacyPolicyAccepted(newValue)}
    trackColor={{ true: '#6a068f', false: 'gray' }}
  />
  <Text style={styles.checkboxText}>I agree to the </Text>
  <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicyScreen2')}>
    <Text style={[styles.checkboxText, { textDecorationLine: 'underline' }]}>
      Privacy Policy 
    </Text>
  </TouchableOpacity>
    <Text style={styles.checkboxText}>(أنت هو الطرف الثاني) </Text>

</View>
    <TouchableOpacity style={styles.loginButton} onPress={registerAcademia}>
  <Text style={styles.buttonText}>Register</Text>
</TouchableOpacity>
     

        {
          loading && (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )
        }

        </View>
     </ScrollView>
    </ImageBackground>
    
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  uploadButton: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#1e90ff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  text: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
    textDecorationLine: 'underline',

  },
  text2: {
    color: '#1e90ff',
    backgroundColor: 'black',
    fontSize: 17,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    backgroundColor: 'lightgray',
    borderColor: '#ccc',
    borderWidth: 1,
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
    backgroundColor: '#1e90ff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 5,
    color: 'white',
  },
  privacyPolicyLink: {
    color: '#6a068f',
    textDecorationLine: 'underline',
  },
});
  export default AcademiaRegister;