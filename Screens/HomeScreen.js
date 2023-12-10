import React, { useEffect,useState } from 'react';
import { Text, View,TouchableOpacity, SafeAreaView, StyleSheet, Image,TextInput,Platform} from "react-native";
import Mall from './Mall';
import Store from './Store';
import { Metrics } from '../themes';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { ImageSlider } from 'react-native-image-slider-banner';
import Cart from './Cart';
import Brands from './Brands';

const HomeScreen=({navigation})=>{
const Route=useRoute();
const [images,setImages]=useState(null);
const [amplePoints,setAmplePoints]=useState(0);
const user_ID=Route.params.Data;

useEffect(() => {
  const getHomeContent=async()=>{
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/gethomecontent';
      const response = await axios.get(apiUrl);
      console.log(response.data.data.sider_images)
     
        setImages(response.data.data.sider_images);
      }
     catch (err) {
      console.log("Error fetching data:", err);
    }
    
    }
  getHomeContent();
  getRewards();
  }, []);


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
          <Text style={{
  color: 'black',
  fontSize: 9,
  fontFamily: Platform.select({
    ios: 'Times New Roman',
    android: 'serif', // You may need to adjust this for Android
  }),
}}>
  {amplePoints}
</Text>
<Text style={{
  color: 'black',
  fontSize: 9,
  fontFamily: Platform.select({
    ios: 'Times New Roman',
    android: 'serif', // You may need to adjust this for Android
  }),
}}>
Amples
</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("Cart",{
            user_ID,
          })}>
          <Image source={require('../assets/Trolley.png') } style={styles.Icon}></Image>
          </TouchableOpacity>
        </View>
    
        <TouchableOpacity onPress={()=>navigation.navigate("Search")} style={styles.searchBar2Container}>
          <View style={styles.searchInput}>
            <Image source={require('../assets/Search.png')} style={{width:Metrics.ratio(20),height:Metrics.ratio(20)}}></Image>
            <Text >Search...</Text>
          </View>
        </TouchableOpacity>
    
    </View>
    <View style={{  margin: Metrics.ratio(20),bottom:Metrics.ratio(40),elevation:10,height:'100%'}}>
    {images && (
  <ImageSlider
    data={images.map((imgUrl) => ({ img: imgUrl }))}
    autoPlay={true}
    closeIconColor="white"
  />
)}
</View> 

  
  </SafeAreaView>)}
const styles=StyleSheet.create({
 
  text: {
    flex: 1,
    marginHorizontal: 16, // Adjust the spacing between components as needed
    textAlign: 'center',
    alignSelf: 'center',
    color:'black'
  },
  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    height: 50,
},
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
    flexDirection:'row',
    padding: Metrics.ratio(10),
      },
  searchInput: {
    top:Metrics.ratio(1),
    height: Metrics.ratio(40),
    borderColor: '#F0F0F0',
    borderWidth: 2,
    padding: Metrics.ratio(10),
    width: '90%',
    flex:1,
    flexDirection:'row',
    borderRadius:20,
    backgroundColor:'white'
  },
  ovalContainer: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 10, // Half of the width/height for a perfect circle
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
    height:Metrics.ratio(30),
  },  
  Icon:{
    width:Metrics.ratio(30),
    height:Metrics.ratio(30),
    left:Metrics.ratio(10)
  },
  SideMenu:{
    width:Metrics.ratio(30),
    height:Metrics.ratio(30),
    left:Metrics.ratio(10)
  },
  header: {
    backgroundColor: "#EEEEEE",

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