import React from 'react';
import { Text, View,TouchableOpacity } from "react-native";
import Mall from './Mall';
import Store from './Store';


const HomeScreen=({navigation})=>{
  const MallScreen=()=>{
    navigation.navigate("Mall")
  }
  const StoreScreen=()=>{
    navigation.navigate("Store")
  }
return(
  <View>
    <TouchableOpacity onPress={MallScreen}>
    <Text>Mall</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={StoreScreen}>
    <Text>Store</Text>
    </TouchableOpacity>
  </View>
)
}
export default HomeScreen;