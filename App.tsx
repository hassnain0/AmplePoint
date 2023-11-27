import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './Screens/Login';
import Register from './Screens/Register';
import DemoScreen from './Screens/DemoScreen';
import GiftDetails from './Screens/GiftDetails';
import OTP from './Screens/OTP';
import SplashScreen from './Screens/SplashScreen';
import Cart from './Screens/Cart';
import Checkout from './Screens/Checkout';
import Payement from './Screens/Payement';
import ForgotScreen from './Screens/ForgotPassword';
import Verify from './Screens/Verify';
// import StripePayement from './Screens/StripePayement';


const Stack=createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Register' component={Register}options={{ statusBarColor:'#FF2F00',headerShown:false}}/> 
      <Stack.Screen name='SplashScreen' component={SplashScreen}options={{ statusBarColor:'#FF2F00',headerShown:false}}/>  
      <Stack.Screen name='Checkout' component={Checkout} options={( ) => ({headerTintColor:'white',title:'Payment',headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {
        backgroundColor: '#FF2F00',    
        }, headerTitleContainerStyle: {
          top: 800,
        }, headerTitleStyle: {
          
          fontWeight: '600',fontSize:15 ,// Optionally customize the header title's style
        },           
})}/>
      <Stack.Screen name='DemoScreen' component={DemoScreen}options={{ statusBarColor:'#FF2F00',headerShown:false}}/>   
      <Stack.Screen name='GiftDetails' component={GiftDetails}options={{statusBarColor:'#FF2F00', headerShown:false,}}/>
      <Stack.Screen name='Cart' component={Cart} options={{headerShown:false,statusBarColor:'#FF2F00'}}/>
    
      <Stack.Screen name='Login' component={Login}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>  
      <Stack.Screen name='Verify' component={Verify}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>  
      
     
    
      {/* <Stack.Screen name='StripePayement' component={StripePayement} options={( ) => ({headerTintColor:'white',title:'Payment',headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {
        backgroundColor: '#FF2F00',    
        }, headerTitleContainerStyle: {
          top: 800,
        }, headerTitleStyle: {
          
          fontWeight: '600',fontSize:15 ,// Optionally customize the header title's style
        },           
})}/> */}
      
      
  
      <Stack.Screen name='Payement' component={Payement} options={( ) => ({headerTintColor:'white',title:'Payement',headerBackVisible:true,headerTitleAlign:'left',statusBarColor:'#FF2F00',headerStyle: {
        backgroundColor: '#FF2F00',    
        }, headerTitleStyle: {
          
          fontWeight: '600',fontSize:15 ,// Optionally customize the header title's style
        },           
})}/>    
 
     
      <Stack.Screen name='OTP' component={OTP} options={( ) => ({headerTintColor:'white',title:'OTP Verify',headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {
        backgroundColor: '#FF2F00',    
        }, headerTitleContainerStyle: {
          top: 800,
        }, headerTitleStyle: {
          
          fontWeight: '600',fontSize:15 ,// Optionally customize the header title's style
        },           
})}/>
  
      
   <Stack.Screen name='ForgotScreen' component={ForgotScreen} options={( ) => ({headerTintColor:'white',title:'Forgot Password',headerTitleAlign:'center',statusBarColor:'#FF2F00',headerStyle: {
        backgroundColor: '#FF2F00',    
        }, headerTitleContainerStyle: {
          top: 800,
        }, headerTitleStyle: {
          
          fontWeight: '600',fontSize:15 ,// Optionally customize the header title's style
        },           
})}/>      
  
      </Stack.Navigator>
       </NavigationContainer>
);
}