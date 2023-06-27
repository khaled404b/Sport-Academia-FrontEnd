import React ,{ useEffect, useState }from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserContext from './Context/UserContext';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);


//screen of start
import StartScreen from './Screens/StartScreen';

//screen of player
import Client from './Screens/ClientScreen/Client';
import ClientLogin from './Screens/ClientScreen/ClientLogin';
import ClientRegister from './Screens/ClientScreen/ClientRegister';
import RequestResetPassword from './Screens/ClientScreen/RequestResetPassword';
import EnterResetCode from './Screens/ClientScreen/EnterResetCode';
import ProfileOfPlayer from './Screens/ClientScreen/ProfileOfPlayer';


//screen of company
import Guest_Selected_Company from './Screens/AcademiaScreen/SportsAcademiaScreen/Guest_Selected_Company';

 

//screen of GAMES
import Guest from './Screens/AcademiaScreen/SportsAcademiaScreen/Guest';
import GuestBasketballList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestBasketballList';
import GuestBoxingList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestBoxingList';
import GuestFootballList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestFootballList';
import GuestGymList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestGymList';
import GuestJudoList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestJudoList';
import GuestKarateList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestKarateList';
import GuestOtherList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestOtherList';
import GuestPadelList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestPadelList';
import GuestShootingList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestShootingList';
import GuestSwimmingList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestSwimmingList';
import GuestTennisList from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestTennisList';

//screen of guest for all
import GuestForAll from './Screens/AcademiaScreen/SportsAcademiaScreen/GuestForAll';



//screen of academia
import Academia from './Screens/AcademiaScreen/Academia';
import AcademiaLogin from './Screens/AcademiaScreen/AcademiaLogin';
import AcademiaRegister from './Screens/AcademiaScreen/AcademiaRegister';
import AcademiaDashboard from './Screens/AcademiaScreen/AcademiaDashboard';
import AcademiaUpdate from './Screens/AcademiaScreen/AcademiaUpdate ';


//screen of Payment
import Payment from './Screens/PaymentScreen/Payment';
import PaymentDetailsScreen from './Screens/PaymentScreen/PaymentDetailsScreen';
import InvoiceDetailsScreen from './Screens/PaymentScreen/InvoiceDetailsScreen';
import PaymentList from './Screens/PaymentScreen/PaymentList';
import PaymentDetails from './Screens/PaymentScreen/PaymentDetails';
import PaymentforEvent from './Screens/PaymentScreen/PaymentforEvent';
import PaymentForEventInvoice from './Screens/PaymentScreen/PaymentForEventInvoice';
import PaymentforEventList from './Screens/PaymentScreen/PaymentforEventList';

//Screen of Privacy Policy 
import PrivacyPolicyScreen from './Screens/PrivacyPolicyScreen/PrivacyPolicyScreen';
import PrivacyPolicyScreen2 from './Screens/PrivacyPolicyScreen/PrivacyPolicyScreen2';


//screen of Events for Admin
import EventsCalendar from './Screens/EventScreenForAdmin/EventsCalendar';
import EventDetails from './Screens/EventScreenForAdmin/EventDetails';
import AddEditEventScreen from './Screens/EventScreenForAdmin/AddEditEventScreen';
import DeleteEventConfirmationScreen from './Screens/EventScreenForAdmin/DeleteEventConfirmationScreen';
import AdminLogin from './Screens/AcademiaScreen/AdminLogin';
import ScreenOfAdmin from './Screens/EventScreenForAdmin/ScreenOfAdmin';
import ListInvoiceFromPlayer from './Screens/EventScreenForAdmin/ListInvoiceFromPlayer';
import ListInvoiceFromEvent from './Screens/EventScreenForAdmin/ListInvoiceFromEvent';
import InvoiceFromEvent from './Screens/EventScreenForAdmin/InvoiceFromEvent';
import InvoiceFromPlayer from './Screens/EventScreenForAdmin/InvoiceFromPlayer';

//screen of Events for Client
import EventsCalendarClient from './Screens/EventScreenForClient/EventsCalendarClient';
import EventDetailsClient from './Screens/EventScreenForClient/EventDetailsClient';


//screen of Event for ACA
import EventCalendarAcA from './Screens/EventScreenForAcA/EventCalendarAcA';
import EventDetailsAcA from './Screens/EventScreenForAcA/EventDetailsAcA';


 
const Stack = createStackNavigator();

const App = () => {

  const [user, setUser] = useState(null);

  return (

    <UserContext.Provider value={{ user, setUser }}>

    <NavigationContainer >
      <Stack.Navigator screenOptions={{ 
        headerStyle: {
          backgroundColor: '#c3c3c3',
        },
        headerTitleStyle: {
          alignSelf: 'center',
        },
        headerTintColor: '#fff',
      }}> 

        <Stack.Screen
          name="StartScreen" 
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Client"
          component={Client}
          options={{
            headerTitle: 'Player',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ClientLogin"
          component={ClientLogin}
          options={{
            headerTitle: 'Player Login',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ClientRegister"
          component={ClientRegister}
          options={{
            headerTitle: 'Player Register',
            headerTitleAlign: 'center',
          }}
        />
          <Stack.Screen
          name="RequestResetPassword"
          component={RequestResetPassword}
          options={{
            headerTitle: 'Player Request Reset Password',
            headerTitleAlign: 'center',
          }}
        />
          <Stack.Screen 
          name="EnterResetCode"
          component={EnterResetCode}
          options={{
            headerTitle: 'Player Enter Reset Code',
            headerTitleAlign: 'center',
          }}
        />
 
 <Stack.Screen
          name="ProfileOfPlayer"
          component={ProfileOfPlayer}
          options={{ headerShown: false }}
        />




         <Stack.Screen
          name="Guest_Selected_Company"
          component={Guest_Selected_Company}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Guest"
          component={Guest}
          options={{
            headerTitle: 'Academy',
            headerTitleAlign: 'center',
          }}
        />
            <Stack.Screen
          name="GuestBasketballList"
          component={GuestBasketballList}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="GuestBoxingList"
          component={GuestBoxingList}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="GuestFootballList"
          component={GuestFootballList}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="GuestGymList"
          component={GuestGymList}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="GuestJudoList"
          component={GuestJudoList}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="GuestKarateList"
          component={GuestKarateList}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="GuestOtherList"
          component={GuestOtherList}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="GuestPadelList"
          component={GuestPadelList}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="GuestShootingList"
          component={GuestShootingList}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="GuestSwimmingList"
          component={GuestSwimmingList}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="GuestTennisList"
          component={GuestTennisList}
          options={{ headerShown: false }}
        />


   <Stack.Screen
          name="GuestForAll"
          component={GuestForAll}
          options={{ headerShown: false }}
        />
        




        <Stack.Screen
          name="Academia"
          component={Academia}
          options={{
            headerTitle: 'Academia',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AcademiaLogin"
          component={AcademiaLogin}
          options={{
            headerTitle: 'Academia Login',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AcademiaRegister"
          component={AcademiaRegister}
          options={{
            headerTitle: 'Academia Register',
            headerTitleAlign: 'center',
          }}
        />
          <Stack.Screen
          name="AcademiaDashboard"
          component={AcademiaDashboard}
          options={{
          headerStyle: {
          backgroundColor: '#1e90ff',
          },
            headerTitle: 'Academia Dashboard',
            headerTitleAlign: 'center',
          }}
        />
          <Stack.Screen
          name="AcademiaUpdate"
          component={AcademiaUpdate}
          options={{
            headerTitle: 'Academia Update',
            headerTitleAlign: 'center',
          }}
        />

         <Stack.Screen
          name="Payment"
         component={Payment}
         options={{ headerShown: false }}
          />
           <Stack.Screen
          name="PaymentDetailsScreen"
         component={PaymentDetailsScreen}
         options={{
          headerStyle: {
          backgroundColor: '#1e90ff',
          },
            headerTitle: '',
            headerTitleAlign: 'center',
          }}
          />
            <Stack.Screen
          name="InvoiceDetailsScreen"
         component={InvoiceDetailsScreen}
         options={{
          headerStyle: {
          backgroundColor: '#1e90ff',
          },
            headerTitle: '',
            headerTitleAlign: 'center',
          }}
          />
              <Stack.Screen
          name="PaymentList"
         component={PaymentList}
         options={{
          headerStyle: {
          backgroundColor: '#1e90ff',
          },
            headerTitle: 'Payment List',
            headerTitleAlign: 'center',
          }}
          />
              <Stack.Screen
          name="PaymentDetails"
         component={PaymentDetails}
         options={{
          headerStyle: {
          backgroundColor: '#f8f9fa',
          },
            headerTitle: '',
            headerTitleAlign: 'center',
          }}
          />

<Stack.Screen
          name="PaymentforEvent"
         component={PaymentforEvent}
         options={{ headerShown: false }}
          />
          <Stack.Screen
          name="PaymentforEventList"
         component={PaymentforEventList}
         options={{
       
            headerTitle: 'Payment List',
            headerTitleAlign: 'center',
          }}
          />
          <Stack.Screen
          name="PaymentForEventInvoice"
         component={PaymentForEventInvoice}
         options={{ headerShown: false }}
          />


          

<Stack.Screen
  name="PrivacyPolicyScreen"
  component={PrivacyPolicyScreen}
  options={{ title: 'Privacy Policy' }}
/>
<Stack.Screen
  name="PrivacyPolicyScreen2"
  component={PrivacyPolicyScreen2}
  options={{ title: 'Privacy Policy' }}
/>
         


<Stack.Screen
  name="EventsCalendar"
  component={EventsCalendar}
  options={{ title: false ,  headerStyle: {
          backgroundColor: 'lightblue',
          },}}
/>

<Stack.Screen
  name="AddEditEventScreen"
  component={AddEditEventScreen}
  options={{ title: 'AddEditEventScreen' }}
/>
<Stack.Screen
  name="DeleteEventConfirmationScreen"
  component={DeleteEventConfirmationScreen}
  options={{ title: 'DeleteEventConfirmationScreen' }}
/>
<Stack.Screen
  name="EventDetails"
  component={EventDetails}
  options={{ title: 'EventDetails' ,  headerStyle: {
          backgroundColor: '#403F9D',
          },}}
/>
<Stack.Screen
  name="AdminLogin"
  component={AdminLogin}
  options={{
            headerTitle: 'Admin Login',
            headerTitleAlign: 'center',
          }}
/>

<Stack.Screen
  name="ScreenOfAdmin"
  component={ScreenOfAdmin}
  options={{
            headerTitle: 'Admin',
            headerTitleAlign: 'center',
            headerStyle: {
          backgroundColor: '#1F1B24',
          },
            
          }}
/>
<Stack.Screen
  name="ListInvoiceFromPlayer"
  component={ListInvoiceFromPlayer}
  options={{
            headerTitle: 'ListInvoiceFromPlayer',
            headerTitleAlign: 'center',
            headerStyle: {
          backgroundColor: '#1F1B24',
          },
            
          }}
/>
<Stack.Screen
  name="ListInvoiceFromEvent"
  component={ListInvoiceFromEvent}
  options={{
            headerTitle: 'ListInvoiceFromEvent',
            headerTitleAlign: 'center',
            headerStyle: {
          backgroundColor: '#1F1B24',
          },
            
          }}
/>
<Stack.Screen
  name="InvoiceFromEvent"
  component={InvoiceFromEvent}
  options={{
            headerTitle: 'InvoiceFromEvent',
            headerTitleAlign: 'center',
            headerStyle: {
          backgroundColor: '#1F1B24',
          },
            
          }}
/>
<Stack.Screen
  name="InvoiceFromPlayer"
  component={InvoiceFromPlayer}
  options={{
            headerTitle: 'InvoiceFromPlayer',
            headerTitleAlign: 'center',
            headerStyle: {
          backgroundColor: '#1F1B24',
          },
            
          }}
/>



<Stack.Screen
  name="EventsCalendarClient"
  component={EventsCalendarClient}
  options={{ title: false ,  headerStyle: {
          backgroundColor: '#403F9D',
          },}}
/>
<Stack.Screen
  name="EventDetailsClient"
  component={EventDetailsClient}
  options={{ title: 'EventDetails' ,  headerStyle: {
          backgroundColor: '#403F9D',
          },}}
 
/>


<Stack.Screen
  name="EventCalendarAcA"
  component={EventCalendarAcA}
  options={{ title: 'Event Calendar' ,  headerStyle: {
          backgroundColor: '#403F9D',
          },}}
 
/>



<Stack.Screen
  name="EventDetailsAcA"
  component={EventDetailsAcA}
  options={{ title: 'Event Details' ,  headerStyle: {
          backgroundColor: '#403F9D',
          },}}
 
/>


        {/* Add additional screens here */}
        
      </Stack.Navigator>
    </NavigationContainer>

    </UserContext.Provider>
  


  );
};




export default App;
