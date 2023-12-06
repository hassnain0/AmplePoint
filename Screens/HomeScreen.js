import React, { useEffect,useState } from 'react';
import { Text, View,TouchableOpacity, SafeAreaView, StyleSheet, Image } from "react-native";
import Mall from './Mall';
import Store from './Store';
import { Metrics } from '../themes';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { ImageSlider } from 'react-native-image-slider-banner';
import Cart from './Cart';

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
 useEffect(()=>{
getHomeContent();
 },[])
 const getHomeContent=async()=>{
  try{

    const apiUrl='https://amplepoints.com/apiendpoint/gethomecontent';
const response=await axios.get(apiUrl);
console.log("Response ",response.data)
  }catch(err){
console.log("Error",err)
  }
 }
return(
  <SafeAreaView>
    <View style={{backgroundColor:'#EEEEEE'}}>
        <View style={styles.header}>
        <Image source={require('../assets/SideMenu.png') } style={styles.SideMenu}></Image>
<Image source={require('../assets/Ample.png') } style={styles.Logo}></Image>
          <View>
            <Text style={{color:'black',right:Metrics.ratio(10)}}>{amplePoints}</Text>
            <Text style={{color:'black',right:Metrics.ratio(10)}}>Amples</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
          <Image source={require('../assets/Trolley.png') } style={styles.Icon}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'relative', marginBottom: 20 }}>
      <ImageSlider
        data={[
          { img: 'https://amplepoints.com/home_banners/club1.jpg' },
          { img: 'https://amplepoints.com/home_banners/club2.jpg' },
          { img: 'https://amplepoints.com/home_banners/club3.jpg' },
          { img: 'https://amplepoints.com/home_banners/club4.jpg' },
          { img: 'https://amplepoints.com/home_banners/club5.jpg' },
          { img: 'https://amplepoints.com/home_banners/club6.jpg' },
          { img: 'https://amplepoints.com/home_banners/club7.jpg' },
        ]}
        autoPlay={true}
        closeIconColor="#fff"
      />
      {/* Add the orange dots here at the bottom */}
      <PaginationDots style={styles.dotContainerStyle} dotStyle={dotStyle} />
    </View>
</View>
  </SafeAreaView>
)
}
const styles=StyleSheet.create({
  dotContainerStyle :{
    position: 'absolute',
    bottom: 10, // Adjust this value based on your design
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  dotStyle :{
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'orange',
    margin: 5,
  },
  Logo:{
    marginLeft:Metrics.ratio(70),
    width:Metrics.ratio(200),
    height:Metrics.ratio(50),
  },  
  Icon:{
    width:Metrics.ratio(30),
    height:Metrics.ratio(30),
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