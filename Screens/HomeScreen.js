import React, { useEffect,useState } from 'react';
import { Text, View,TouchableOpacity, SafeAreaView, StyleSheet, Image } from "react-native";
import Mall from './Mall';
import Store from './Store';
import { Metrics } from '../themes';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { ImageSlider } from 'react-native-image-slider-banner';

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
          <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
          <Image source={require('../assets/Trolley.png') } style={styles.Icon}></Image>
          </TouchableOpacity>
        </View>
        <View style={{top:Metrics.ratio(20),borderRadius: 20, overflow: 'hidden' ,width:Metrics.ratio(380),height:Metrics.ratio(150),alignSelf:'center',marginBottom:Metrics.ratio(20)}}>
        <ImageSlider 
        data={[
          {img: 'https://img.freepik.com/free-photo/stylish-beautiful-woman-posing-against-wooden-wall_285396-4810.jpg?size=626&ext=jpg&uid=R110769931&ga=GA1.1.687601769.1690259058&semt=ais'},
          {img: 'https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg?size=626&ext=jpg&ga=GA1.1.2097605529.1691319045&semt=ais'},
          {img: 'https://img.freepik.com/premium-photo/woman-black-long-skirt-shirt-with-colored-patterns-sneakers-white-background-studio-shot_481253-384.jpg?size=626&ext=jpg&ga=GA1.1.2097605529.1691319045&semt=ais'},
          {img: 'https://img.freepik.com/free-photo/emotional-brunette-woman-blue-coat-posing-purple-wall-indoor-photo-beautiful-short-haired-female-model-trendy-midi-dress_197531-5181.jpg?size=626&ext=jpg&ga=GA1.1.2097605529.1691319045&semt=ais'}
      ]}
    autoPlay={true}
   
    closeIconColor="#fff"
/> 
</View>
<View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(40)}}></View>
<TouchableOpacity onPress={()=>navigation.navigate('Store')}>
<Text>Store</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Mall')}>
<Text>Mall</Text>
</TouchableOpacity>
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