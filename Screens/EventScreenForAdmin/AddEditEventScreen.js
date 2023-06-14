import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button ,TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import API_URL from '../../API_URL/URL_Generate';
import { ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddEditEventScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date()); // setting the current date
  const [formattedDate, setFormattedDate] = useState(moment(new Date()).format("MMM DD, YYYY"));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // new loading state

  const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date ;
    setShow(Platform.OS === 'ios'); 
    setDate(currentDate);
    setFormattedDate(moment(currentDate).format("MMM DD, YYYY"));
    if (Platform.OS === 'android') {
      setShow(false);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  const validCategories = ['football', 'basketball', 'tennis', 'swimming', 'karate', 'judo', 'padel', 'boxing', 'shooting', 'gym'];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
      
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  

  const verifyPassword = async (eventId, password) => {
    try {
      const response = await axios.post(`${API_URL}/VerifyPassword/${eventId}`, { password });
      return response.status === 200;
    } catch (error) {
      Alert.alert('Invalid password. Please try again.');
      return false;
    }
  };
  

  const submitForm = async () => {
    if (!price ||!name || !date || !location || !description || !category || !image || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }
    if (!validCategories.includes(category.toLowerCase())) {
      Alert.alert('Invalid category. Please enter one of the following: ' 
      + validCategories.join(', '));
      return;
    }  
    setLoading(true); // Start the loading

    let formData = new FormData();
    formData.append('name', name);
    formData.append('date', moment(date).toISOString()); // format date as ISO string
    formData.append('price', price);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('password', password); // Add this line

    formData.append('image', {
      uri: image,
      name: 'image.jpg', 
      type: 'image/jpg'
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      if (route.params && route.params.event) {
        const { event } = route.params;
        const isPasswordValid = await verifyPassword(event._id, password);
        if (!isPasswordValid) {
          setLoading(false); // Stop the loading if password is invalid

          return;
        }
        await axios.put(`${API_URL}/PutEvent/${event._id}`, formData, config);
      } else {
        await axios.post(`${API_URL}/PostEvent`, formData, config);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error submitting form, please try again');
    } 
    finally {
      setLoading(false); // Stop the loading in any case
    }
  };

  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  }
  useEffect(() => {
    if (route.params && route.params.event) {
      const { event } = route.params;
      setName(event.name);
      setDate(new Date(event.date)); // setting the date from the database
      setFormattedDate(moment(new Date(event.date)).format("MMM DD, YYYY")); // format the date from the database
      setLocation(event.location);
      setDescription(event.description);
      setCategory(event.category);
      setPrice(event.price.toString());
      setImage(event.image);
      // setPassword(event.password); // set password
    }
  }, []);
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Event Name"
        style={styles.input} 
      />

      <Text style={styles.label}>Event Category:</Text>
      <View style={styles.categoriesContainer}>
        {validCategories.map((validCategory, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton} onPress={() => selectCategory(validCategory)}>
            <Text style={styles.categoryButtonText}>{validCategory}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Event Category"
        style={styles.input}
        editable={false}
      />

      <Text style={styles.label}>Event Date:</Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.buttonText}>Show Date </Text>
      </TouchableOpacity>
      {show && (
  <DateTimePicker
    testID="dateTimePicker"
    value={date}
    is24Hour={true}
    display="default"
    onChange={onChange}
  />
)}

      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Event Location"
        style={styles.input}
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Event Description"
        style={styles.descriptionInput}
        multiline
        numberOfLines={4}
      />

<TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price Per Team"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Event Password"
        secureTextEntry={true}
        style={styles.input}
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {!image && <Text style={styles.label}>No Image Selected</Text>}

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      {loading ? (
        <Text>Loading...</Text> // Show loading text when the form is being submitted
      ) : (
        <TouchableOpacity onPress={submitForm} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  descriptionInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 21,
    borderRadius: 8,
    marginTop: 10, 
marginBottom:10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: '#007BFF',
    width:'40%',
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
export default AddEditEventScreen;
