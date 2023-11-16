import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './Screens/Login';
import Register from './Screens/Register';
import GiftCard from './Screens/GiftCard';
import DemoScreen from './Screens/DemoScreen';
import GiftDetails from './Screens/GiftDetails';
import OTP from './Screens/OTP';
import SplashScreen from './Screens/SplashScreen';
import Cart from './Screens/Cart';


const Stack=createNativeStackNavigator();
export default function App() {

  return (
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='GiftDetails' component={GiftDetails}options={{statusBarColor:'#FF2F00', headerShown:false,}}/>
      <Stack.Screen name='Cart' component={Cart}options={{statusBarColor:'#FF2F00', headerShown:false,}}/>
      <Stack.Screen name='DemoScreen' component={DemoScreen}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>
      <Stack.Screen name='SplashScreen' component={SplashScreen}options={{ statusBarColor:'#FF2F00',headerShown:false}}/>
      <Stack.Screen name='Login' component={Login}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>    
      <Stack.Screen name='OTP' component={OTP}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>
      <Stack.Screen name='GiftCard' component={GiftCard}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>
      <Stack.Screen name='Register' component={Register}options={{ statusBarColor:'#FF2F00',headerShown:false}}/>
      </Stack.Navigator>
       </NavigationContainer>
);
}