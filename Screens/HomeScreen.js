import React, { useEffect,useState } from 'react';
import { Text, View,TouchableOpacity, SafeAreaView, StyleSheet, Image } from "react-native";
import Mall from './Mall';
import Store from './Store';
import { Metrics } from '../themes';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';


const HomeScreen=({navigation})=>{
const Route=useRoute();
const [amplePoints,setAmplePoints]=useState(0);
console.log("Route",Route.params.Data)
const user_ID=Route.params.Data;
  console.log()
 useEffect(()=>{
  getRewards();
 })

 //Get Reward Function
 const getRewards=async()=>{
  try{
    const apiUrl="https://amplepoints.com/apiendpoint/getuserampleandreward?"

   const Response= await axios.get(apiUrl, {
      params: {
        user_id:user_ID
      },
    });
   if(Response.data &&Response.data.data.user_total_ample)
   {
    setAmplePoints(Response.data.data.user_total_ample);
   }

  }catch(erro){
    console.log("Error",erro)
  }
 }
return(
  <SafeAreaView>
        <View style={styles.header}>
        <Image source={require('../assets/SideMenu.png') } style={styles.SideMenu}></Image>
<Image source={require('../assets/Ample.png') } style={styles.Logo}></Image>
          <View>
            <Text style={{color:'black',right:Metrics.ratio(10)}}>{amplePoints}</Text>
            <Text style={{color:'black',right:Metrics.ratio(10)}}>Amples</Text>
          </View>
          <Image source={require('../assets/Trolley.png') } style={styles.Icon}></Image>
        </View>
  </SafeAreaView>
)
}
const styles=StyleSheet.create({
  Logo:{
    marginLeft:Metrics.ratio(70),
    width:Metrics.ratio(200),
    height:Metrics.ratio(50),
  },  
  Icon:{
    width:Metrics.ratio(40),
    height:Metrics.ratio(40),
  },
  SideMenu:{
    width:Metrics.ratio(30),
    height:Metrics.ratio(30),
    left:Metrics.ratio(10)
  },
  header: {
    backgroundColor: "#EEEEEE",
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(15),
    // paddingHorizontal:Metrics.ratio(5),
  },
})
export default HomeScreen;