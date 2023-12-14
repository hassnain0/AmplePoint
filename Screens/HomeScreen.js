import React, { useEffect,useRef,useState } from 'react';
import { Text, View,TouchableOpacity, SafeAreaView, StyleSheet,Alert,BackHandler, Image,TextInput,Platform, ScrollView} from "react-native";
import Mall from './Mall';
import Store from './Store';
import Ionicons from 'react-native-vector-icons'
import { Metrics } from '../themes';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { ImageSlider } from 'react-native-image-slider-banner';
import Cart from './Cart';
import Brands from './Brands';

// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// // import { createDrawerNavigator} from '@react-navigation/drawer';
// const Drawer=createDrawerNavigator();
// import Animated from 'react-native-reanimated';

// Animated.initializeReanimated();

const HomeScreen=({navigation})=>{

const [images,setImages]=useState(null);
const [amplePoints,setAmplePoints]=useState(0);
// const videoUrl = 'https://amplepoints.com/images/HowItWork.mp4';
// const thumbnailUrl = 'https://amplepoints.com/images/vthumbnail.png';

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [thumbnail, setThumbnail] = useState(thumbnailUrl);
//   const videoRef = useRef(null);


useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel'
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp()
          }
        ],
        { cancelable: false }
      );
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])
);
//Navigation Store
const MoveStore=()=>{
  
  navigation.navigate("Store",{
    // user_ID

  })
}
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
//Video section methods
const handlePlayPause = async () => {
  if (isPlaying) {
    videoRef.current.pause();
  } else {
    const thumbnail = await getThumbnail(videoUrl);
    setThumbnail(thumbnail);
    videoRef.current.seek(0); // Reset video to the beginning
    videoRef.current.play();
  }

  setIsPlaying(!isPlaying);
};
return(
  <SafeAreaView>
    <ScrollView>
  
    <View style={{backgroundColor:'white'}}>
    <View style={{
  marginLeft: Metrics.ratio(7),
  bottom: Metrics.ratio(50),
  width: Metrics.ratio(370),
  height: Metrics.ratio(250),
  borderRadius: 20,
  
  }}> 
  {images && (
    <ImageSlider
      data={images.map((imgUrl) => ({ img: imgUrl }))}
      autoPlay={true}
      closeIconColor="white"
    />
  )}
</View>

 </View> 
  <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.itemContainer} onPress={MoveStore}>
      
        <Image style={styles.ovalImage2} source={require('../assets/Store.jpeg')} />
        <Text style={{ fontSize:12,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>Store</Text>
        <Text style={{ fontSize:10,fontWeight:'250',textAlign:'center',}}>Create your own store to</Text>
        <Text style={{ fontSize:10,fontWeight:'250',textAlign:'center',}}>maximizes the sale</Text>
      
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate("Brands")}>
    
        <Image style={styles.ovalImage2} source={require('../assets/Brand.jpeg')} />
        <Text style={{ fontSize:12,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>BRANDS</Text>
        <Text style={{ fontSize:10,fontWeight:'250',textAlign:'center',}}>Add your brand to promote</Text>
        <Text style={{ fontSize:10,fontWeight:'250',textAlign:'center',}}>on an interactive platform</Text>
    
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate("Mall")}>
      
        <Image style={styles.ovalImage2} source={require('../assets/Mall.jpeg')} />
        <Text style={{ fontSize:12,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>MALL</Text>
        <Text style={{ fontSize:10,fontWeight:'250',textAlign:'center',}}>Find your online shop at </Text>
        <Text style={{ fontSize:10,fontWeight:'250',textAlign:'center',}}>your online mall</Text>
      </TouchableOpacity>
      
    </View>
    
    <View style={{backgroundColor:'white',top:Metrics.ratio(30),}}>
    <Text style={{ fontSize:15,fontWeight:'700',textAlign:'left',paddingTop:Metrics.ratio(20),paddingLeft:Metrics.ratio(20),
       color:'black',}}>How it Works</Text>
        <View style={styles.AnotherrowContainer}>

      <View style={styles.cartContainer}>
        <Image style={styles.ovalImageCarts} source={require('../assets/Join.png')} />
        <Text style={{ fontSize:8,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>Join Free</Text>
        <Text style={{ fontSize:8,fontWeight:'300',textAlign:'center',}}>SignUp for A Free</Text>
        <Text style={{ fontSize:8,fontWeight:'300',textAlign:'center',}}>Membership & Get 42</Text>
        <Text style={{ fontSize:8,fontWeight:'300',textAlign:'center',}}>Ample Points Valued at $5</Text>
        <View style={styles.horizontalLine} />
        <Text style={{ color:'#FF2E00',fontSize:9,fontWeight:'300',textAlign:'center',bottom:Metrics.ratio(10)}}>1 Ample Point=12 cents</Text>
      </View>

      {/* Second Cart Component */}
      <View style={styles.cartContainer}>
        <Image style={styles.ovalImageCarts} source={require('../assets/Earn.png')} />
        <Text style={{ fontSize:8,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>Earn More</Text>
        <Text style={{ fontSize:9,fontWeight:'300',textAlign:'center',}}>Earn Ample Points For</Text>
        <Text style={{ fontSize:9,fontWeight:'300',textAlign:'center',}}>Shopping, Sharing Links &</Text>
        <Text style={{ fontSize:9,fontWeight:'300',textAlign:'center',}}>Watching Personlized Ads</Text>
        <View style={styles.horizontalLine} />
        <Text style={{ color:'#FF2E00',fontSize:9,fontWeight:'300',textAlign:'center',bottom:Metrics.ratio(10)}}>60 min = 60 AmplePoints =$7.20</Text>
      </View>

      <View style={styles.cartContainer}>
        <Image style={styles.ovalImageCarts} source={require('../assets/Cards.png')} />
        <Text style={{ fontSize:8,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>Use Amples</Text>
        <Text style={{ fontSize:9,fontWeight:'300',textAlign:'center',}}>Use Your Ample Points </Text>
        <Text style={{ fontSize:9,fontWeight:'300',textAlign:'center',}}>To Get Free Products &</Text>
        <Text style={{ fontSize:9,fontWeight:'300',textAlign:'center',}}>Discounts</Text>
        <View style={styles.horizontalLine} />
        <Text style={{ color:'#FF2E00',fontSize:9,fontWeight:'300',textAlign:'center',bottom:Metrics.ratio(10)}}>100 AmplePoints= $12.00</Text>
      </View>
    </View>
    <View >  
    </View>
    <View style={{alignItems:'center',paddingTop:Metrics.ratio(30),paddingBottom:Metrics.ratio(40),backgroundColor:'white'}}>
    <Image style={{width:'80%',height:Metrics.ratio(200)}} source={{uri:'https://amplepoints.com/images/vthumbnail.png'}}/>
    </View>
    </View>
    </ScrollView>
  </SafeAreaView>)}
const styles=StyleSheet.create({
  container: {
    flex: 1,

  },  horizontalLine: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#B6B8B5', // Adjust the color as needed
    alignSelf: 'stretch',
    marginVertical: 10, // Adjust the margin as needed
  },
  AnotherrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
    borderRadius:10
  },
  cartImage: {
    width: Metrics.ratio(40), // Adjust the width and height as needed
    height: Metrics.ratio(40),
    resizeMode: 'cover', // Adjust the resizeMode as needed
  },
  cartText: {
    fontSize: 16,
    marginTop: 8, // Adjust the margin as needed
  },
  thumbnail: {
    width: 300,
    height: 200,
  },
  video: {
    width: 300,
    height: 200,
  },
  text: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    height: '50%',
},
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
    flexDirection:'row',
    padding: Metrics.ratio(10),
    bottom:Metrics.ratio(20)
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
    marginLeft:Metrics.ratio(50),
    width:Metrics.ratio(200),
    height:Metrics.ratio(30),
  },  
  Icon:{
    width:Metrics.ratio(27),
    height:Metrics.ratio(32),
    left:Metrics.ratio(10)
  },
  SideMenu:{
    width:Metrics.ratio(40),
    height:Metrics.ratio(40),
    left:Metrics.ratio(10)
  },
  header: {
    backgroundColor: "#EEEEEE",

    flexDirection: 'row',
    paddingVertical: Metrics.ratio(10),
    // paddingHorizontal:Metrics.ratio(5),
  },rowContainer: {
    marginTop:Metrics.ratio(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'white',
   
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    top:Metrics.ratio(10),
    bottom:Metrics.ratio(10)
  },
  ovalImage: {
    width: Metrics.ratio(90), // Adjust the width and height as needed
    height: Metrics.ratio(120),
    borderRadius: Metrics.ratio(40),
    borderColor:'skyblue',
    borderWidth:0.7
  },
  ovalImageCarts: {
    width: Metrics.ratio(40), // Adjust the width and height as needed
    height: Metrics.ratio(40),
    borderRadius: Metrics.ratio(40),
    borderColor:'skyblue',
    borderWidth:0.7
  },
  ovalImage1: {
    paddingTop:Metrics.ratio(10),
    width: Metrics.ratio(90), // Adjust the width and height as needed
    height: Metrics.ratio(120),
    borderRadius: Metrics.ratio(40),
    borderColor:'skygreen',
    borderWidth:0.7
  },
  ovalImage2: {
    width: Metrics.ratio(90), // Adjust the width and height as needed
    height: Metrics.ratio(120),
    borderRadius: Metrics.ratio(40),
    borderColor:'purple',
    borderWidth:0.7
  },
  text: {
    fontSize: 16,
    marginTop: 8, // Adjust the margin as needed
  },
})
export default HomeScreen;
//   return (
//     <View style={{ flex: 1 ,}}>
//       <DrawerNavigation />
//     </View>
//   );
// }

// function DrawerNavigation() {
//   return (
//       <Drawer.Navigator  initialRouteName="HomeScreen"   >
//       <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{drawerIcon:({color})=>(<Ionicons name='home-outline' size={22} color={color} />),headerTitleAlign:'center'}} />
  
//       </Drawer.Navigator>
//   );
// }