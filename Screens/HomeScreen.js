import React, { useEffect,useState } from 'react';
import { Text, View,TouchableOpacity, SafeAreaView, StyleSheet, Image,} from "react-native";
import Mall from './Mall';
import Store from './Store';
import { Metrics } from '../themes';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { ImageSlider } from 'react-native-image-slider-banner';
import Cart from './Cart';

const HomeScreen=({navigation})=>{
const Route=useRoute();
const [images,setImages]=useState(null);
const [amplePoints,setAmplePoints]=useState(0);
const user_ID=Route.params.Data;

useEffect(() => {
  getHomeContent();
  getRewards();
  }, []);
const getHomeContent=async()=>{
try {
  const apiUrl = 'https://amplepoints.com/apiendpoint/gethomecontent';
  const response = await axios.get(apiUrl);
  
  if (response.data.data && response.data.data.sider_images) {
    setImages(response.data.data);

  }
} catch (err) {
  console.log("Error fetching data:", err);
}

}
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
    <View style={{backgroundColor:'#EEEEEE'}}>
        <View style={styles.header}>
        <Image source={require('../assets/SideMenu.png') } style={styles.SideMenu}></Image>
<Image source={require('../assets/Ample.png') } style={styles.Logo}></Image>
          <View>
            <Text style={{color:'black',right:Metrics.ratio(10),fontSize:12}}>{amplePoints}</Text>
            <Text style={{color:'black',right:Metrics.ratio(10),fontSize:12}}>Amples</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
          <Image source={require('../assets/Trolley.png') } style={styles.Icon}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ top: Metrics.ratio(-30), borderRadius: 20, overflow: 'hidden', width: Metrics.ratio(300), height: Metrics.ratio(0), alignSelf: 'center', marginBottom: Metrics.ratio(20) }}>
{images &&(
      <ImageSlider
        data={images.sider_images.map(imgUrl => ({ img: imgUrl }))}
        autoPlay={true}
        closeIconColor="#fff"
      />
      )}
  </View>
    <View style={styles.container}>
      <View style={styles.row}>
        {/* First Component: Image */}
       <TouchableOpacity onPress={()=>navigation.navigate("Store")}> 

       
        <View style={styles.ovalContainer}>
          <Image
            source={require('../assets/Store.jpeg')}
            style={styles.ovalImage}
          />
        </View>
        </TouchableOpacity>
        {/* Second Component: Text */}
        <Text style={styles.text}>Your Text Here</Text>

        <TouchableOpacity onPress={()=>navigation.navigate("Mall")}>

       
<View style={styles.ovalContainer}>
  <Image
    source={require('../assets/Store.jpeg')}
    style={styles.ovalImage}
  />
</View>
</TouchableOpacity>
      </View>

      {/* Repeat the above row structure for additional rows */}
    </View>
</View>
  </SafeAreaView>
)
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16, // Adjust the spacing between rows as needed
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius: 8, // Adjust the border radius for rounded corners
  },
  text: {
    flex: 1,
    marginHorizontal: 16, // Adjust the spacing between components as needed
    textAlign: 'center',
    alignSelf: 'center',
    color:'black'
  },
  ovalContainer: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 50, // Half of the width/height for a perfect circle
    overflow: 'hidden',
  },
  ovalImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
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
  }, container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16, // Adjust the spacing between rows as needed
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius: 8, // Adjust the border radius for rounded corners
  },
  text: {
    flex: 1,
    marginHorizontal: 16, // Adjust the spacing between components as needed
    textAlign: 'center',
    alignSelf: 'center',
  },
  ovalContainer: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 50, // Half of the width/height for a perfect circle
    overflow: 'hidden',
  },
  ovalImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})
export default HomeScreen;