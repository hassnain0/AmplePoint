
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GiftCard from './Screens/GiftCard';
import DemoScreen from './Screens/DemoScreen';
const Stack=createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Demo' component={DemoScreen}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>
    
            {/* <Stack.Screen name='GiftCard' component={GiftCard}options={{ headerShown:false,statusBarColor:'#FF2F00'}}/>
     */}
         </Stack.Navigator>
    </NavigationContainer>
  );
}