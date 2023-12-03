import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './Screens/Login';
import Register from './Screens/Register';
import DemoScreen from './Screens/DemoScreen';
import GiftDetails from './Screens/GiftDetails';
import SplashScreen from './Screens/SplashScreen';
import Cart from './Screens/Cart';
import Checkout from './Screens/Checkout';
import Payement from './Screens/Payement';
import ForgotScreen from './Screens/ForgotPassword';
import Verify from './Screens/Verify';
import { StripeProvider } from '@stripe/stripe-react-native';
import Store from './Screens/Store';

const Stack=createNativeStackNavigator();
export default function App() {
  return (
    <StripeProvider publishableKey='pk_test_51 NpOZ4GY4n5u6WbIlWOsccAKTTMLq7xnjfG8fFboidp6jZCx2XlssuBHyNbvBsqfGDkbVkZH2Knka498eIzAjdPZ00YZBjdzik'>
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Store' component={Store} options={( ) => ({headerTintColor:'white',title:'Brand',headerBackVisible:true,headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {backgroundColor: '#FF2F00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='SplashScreen' component={SplashScreen}options={{ statusBarColor:'#FF2F00',headerShown:false}}/>
      <Stack.Screen name='DemoScreen' component={DemoScreen}options={{ statusBarColor:'#FF2F00',headerShown:false}}/>
      <Stack.Screen name='GiftDetails' component={GiftDetails} options={( ) => ({headerTintColor:'white',title:'Gift Details',headerBackVisible:true,headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {backgroundColor: '#FF2F00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Register' component={Register}options={{ statusBarColor:'#FF2F00',headerShown:false}}/>
      <Stack.Screen name='Cart' component={Cart} options={( ) => ({headerTintColor:'white',title:'Gift Details',headerBackVisible:true,headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {backgroundColor: '#FF2F00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Checkout' component={Checkout} options={( ) => ({headerTintColor:'white',title:'Checkout',headerBackVisible:true,headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {backgroundColor: '#FF2F00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Login' component={Login}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>  
      <Stack.Screen name='Verify' component={Verify}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>  
      <Stack.Screen name='Payement' component={Payement} options={( ) => ({headerTintColor:'white',title:'Payement',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#FF2F00',headerStyle: {backgroundColor: '#FF2F00'}, headerTitleStyle: {fontWeight: '600',fontSize:15}})}/>    
      <Stack.Screen name='ForgotScreen' component={ForgotScreen} options={( ) => ({headerTintColor:'white',title:'Forgot Password',headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {backgroundColor: '#FF2F00'}, headerTitleContainerStyle: {top: 800}, headerTitleStyle: {fontWeight: '600',fontSize:15},})}/>      
      </Stack.Navigator>
      </NavigationContainer>
      </StripeProvider>
);
}