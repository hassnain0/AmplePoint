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
import {StripeProvider} from '@stripe/stripe-react-native';
import Store from './Screens/Store';
import Mall from './Screens/Mall';
import OrderSummary from './Screens/OrderSummary';
import Brands from './Screens/Brands';
import MallDetail from './Screens/MallDetail';
import Search from './Screens/Search';
import MyPurchase from './Screens/MyPurchase';
import LocalPurchase from './Screens/LocalPurchase';
import Return from './Screens/Return';
import AskQuestion from './Screens/AskQuestion';
import Profile from './Screens/Profile';
import EditProfie from './Screens/EditProfile';
import { Platform } from 'react-native';
import DrawerNavigator from './DrawerNavigator';

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey='pk_test_51 NpOZ4GY4n5u6WbIlWOsccAKTTMLq7xnjfG8fFboidp6jZCx2XlssuBHyNbvBsqfGDkbVkZH2Knka498eIzAjdPZ00YZBjdzik'>
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ statusBarColor:'#ff3d00',headerShown:false}}/>
      <Stack.Screen name='EditProfile' component={EditProfie} options={( ) => ({headerTintColor:'white',title:'Edit Profile',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 , fontFamily:'Times New Roman',}})}/> 
        <Stack.Screen name='Return' component={Return} options={( ) => ({headerTintColor:'white',title:'Return Order',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
    <Stack.Screen name='MyPurchase' component={MyPurchase} options={( ) => ({headerTintColor:'white',title:'MyPurchase',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#FF2F00',headerStyle: {backgroundColor: '#FF2F00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
        <Stack.Screen name='Drawer' component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='GiftDetails' component={GiftDetails} options={( ) => ({headerTintColor:'white',title:'Gift Details',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Checkout' component={Checkout} options={( ) => ({headerTintColor:'white',title:'Checkout',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Cart' component={Cart} options={( ) => ({headerTintColor:'white',title:'My Cart',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown:false,statusBarColor:'#ff3d00'}}/>
      <Stack.Screen name='HomeScreen' component={DrawerNavigator} options={{ headerShown:false,statusBarColor:'#ff3d00'}}/>
      <Stack.Screen name='LocalPurchase' component={LocalPurchase} options={( ) => ({headerTintColor:'white',title:'My Local Purchases',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#FF2F00',headerStyle: {backgroundColor: '#FF2F00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='AskQuestion' component={AskQuestion} options={( ) => ({headerTintColor:'white',title:'Ask Question',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Search' component={Search} options={( ) => ({headerTintColor:'white',title:'Search',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='MallDetail' component={MallDetail}options={{ statusBarColor:'#ff3d00',headerShown:false}}/>
      <Stack.Screen name='OrderSummary' component={OrderSummary} options={( ) => ({headerTintColor:'white',title:'Order Summary',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Store' component={Store} options={( ) => ({headerTintColor:'white',headerShown:false,statusBarColor:'#ff3d00',})}/>   
      <Stack.Screen name='Mall' component={Mall} options={( ) => ({headerTintColor:'white',title:'Mall',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='Brands' component={Brands} options={( ) => ({headerTintColor:'white',title:'Brands',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00',}, headerTitleStyle: {fontWeight: '600',fontSize:15 }})}/>
      <Stack.Screen name='DemoScreen' component={DemoScreen}options={{ statusBarColor:'#ff3d00',headerShown:false}}/>
      <Stack.Screen name='Register' component={Register}options={{ statusBarColor:'#ff3d00',headerShown:false}}/>
      <Stack.Screen name='Login' component={Login}options={{ headerShown:false,statusBarColor:'#ff3d00'}}/>  
      <Stack.Screen name='Verify' component={Verify}options={{ headerShown:false,statusBarColor:'#ff3d00'}}/>  
      <Stack.Screen name='Payement' component={Payement} options={( ) => ({headerTintColor:'white',title:'Payement',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00'}, headerTitleStyle: {fontWeight: '600',fontSize:15}})}/>    
      <Stack.Screen name='ForgotScreen' component={ForgotScreen} options={( ) => ({headerTintColor:'white',title:'Forgot Password',headerTitleAlign:'left',statusBarColor:'#ff3d00',headerStyle: {backgroundColor: '#ff3d00'}, headerTitleContainerStyle: {top: 800}, headerTitleStyle: {fontWeight: '600',fontSize:15},})}/>      
      </Stack.Navigator>
      </NavigationContainer>
      </StripeProvider>
);
}