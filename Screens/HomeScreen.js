import React, { useEffect,useState } from 'react';
import { Text, View,TouchableOpacity, SafeAreaView, StyleSheet,Alert,BackHandler, Image,ScrollView, Dimensions} from "react-native";
import Mall from './Mall';

import { createDrawerNavigator,  } from '@react-navigation/drawer';
import Store from './Store';
import { Metrics } from '../themes';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { CarouselSlider } from "react-native-carousel-image-slider";
import Cart from './Cart';
import Brands from './Brands';
import MyPurchase from './MyPurchase';
import LocalPurchase from './LocalPurchase';
import { moderateScale, verticalScale } from 'react-native-size-matters';
const Drawer=createDrawerNavigator();

const  HomeScreen=({navigation})=>{
const route=useRoute();
const [images,setImages]=useState(null);
const [amplePoints,setAmplePoints]=useState(0);

console.log("CompleteProfile",route.params.CompleteProfile)
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
  
  navigation.navigate("Store")
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

  }, []);



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

const { width: screenWidth } = Dimensions.get('window');
const RoundedImageSlider = ({ images }) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null; // or handle the case when images are not available
  }
  const renderDots = (index, currentIndex, opacity) => (
    <View
      key={index}
      style={{
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 5,
        backgroundColor: 'white',
        opacity,
      }}
    />
  );

  return (
    <CarouselSlider
      autoplay
      autoplayTimeout={5000}
      loop
      index={0}
      items={images.map(imgUrl => ({ image: imgUrl }))}
      renderItem={(item, index) => (
        <View key={index} style={{ borderRadius: 10, overflow: 'hidden' }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: 10 }}
          />
        </View>
      )}
      renderDots={renderDots} // Pass the renderDots function to CarouselSlider
    />
  );
};
  
return(
  <SafeAreaView>
    <ScrollView>
  
    <View style={{backgroundColor:'white'}}>
     
    {images && <RoundedImageSlider images={images} />}

 </View> 
  <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.itemContainer} onPress={MoveStore}>

        <Image style={styles.ovalImage2} source={require('../assets/Store.jpeg')} />
        <Text style={{ fontSize:12,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>Store</Text>
        <Text style={{ fontSize:8,fontWeight:'400',textAlign:'center',}}>Create your own store to</Text>
        <Text style={{ fontSize:8,fontWeight:'400',textAlign:'center',}}>maximizes the sale</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate("Brands")}>
    
        <Image style={styles.ovalImage2} source={require('../assets/Brand.jpeg')} />
        <Text style={{ fontSize:12,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>BRANDS</Text>
        <Text style={{ fontSize:8,fontWeight:'400',textAlign:'center',}}>Add your brand to promote</Text>
        <Text style={{  fontSize:8,fontWeight:'400',textAlign:'center',}}>on an interactive platform</Text>
    
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate("Mall")}>
      
        <Image style={styles.ovalImage2} source={require('../assets/Mall.jpeg')} />
        <Text style={{ fontSize:12,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>MALL</Text>
        <Text style={{  fontSize:8,fontWeight:'400',textAlign:'center',}}>Find your online shop at </Text>
        <Text style={{  fontSize:8,fontWeight:'400',textAlign:'center',}}>your online mall</Text>
      </TouchableOpacity>
      
    </View>
    
    <View style={{backgroundColor:'#EEEEEE',top:Metrics.ratio(5),}}>
    <Text style={{ fontSize:15,fontWeight:'700',textAlign:'left',paddingTop:Metrics.ratio(10),paddingLeft:Metrics.ratio(20),
       color:'black',}}>How it Works</Text>
        <View style={styles.AnotherrowContainer}>
      <View style={styles.cartContainer}>
        <Image style={styles.ovalImageCarts} source={require('../assets/Join.png')} />
        <Text style={{ fontSize:8,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>Join Free</Text>
        <Text style={{ fontSize:8,fontWeight:'500',textAlign:'center',}}>SignUp for A Free</Text>
        <Text style={{ fontSize:8,fontWeight:'500',textAlign:'center',}}>Membership & Get 42</Text>
        <Text style={{ fontSize:8,fontWeight:'500',textAlign:'center',}}>Ample Points Valued at $5</Text>
        <View style={styles.horizontalLine} />
        <Text style={{ color:'#FF2E00',fontSize:8,fontWeight:'400',textAlign:'center',bottom:Metrics.ratio(10)}}>1 Ample Point=12 cents</Text>
      </View>

      {/* Second Cart Component */}
      <View style={styles.cartContainer}>
        <Image style={styles.ovalImageCarts} source={require('../assets/Earn.png')} />
        <Text style={{ fontSize:8,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>Earn More</Text>
        <Text style={{ fontSize:9,fontWeight:'500',textAlign:'center',}}>Earn Ample Points For</Text>
        <Text style={{ fontSize:9,fontWeight:'500',textAlign:'center',}}>Shopping, Sharing Links &</Text>
        <Text style={{ fontSize:9,fontWeight:'500',textAlign:'center',}}>Watching Personlized Ads</Text>
        <View style={styles.horizontalLine1} />
        <Text style={{ color:'#FF2E00',fontSize:8,fontWeight:'400',textAlign:'center',bottom:Metrics.ratio(7)}}>60 min = 60 AmplePoints =$7.20</Text>
      </View>

      <View style={styles.cartContainer}>
        <Image style={styles.ovalImageCarts} source={require('../assets/Cards.png')} />
        <Text style={{ fontSize:8,fontWeight:'700',textAlign:'center',
       color:'black',fontStyle:'italic'}}>Use Amples</Text>
        <Text style={{ fontSize:8,fontWeight:'500',textAlign:'center',}}>Use Your Ample Points </Text>
        <Text style={{  fontSize:8,fontWeight:'500',textAlign:'center',}}>To Get Free Products &</Text>
        <Text style={{ fontSize:8,fontWeight:'500',textAlign:'center',}}>Discounts</Text>
        <View style={styles.horizontalLine} />
        <Text style={{ color:'#FF2E00',fontSize:8,fontWeight:'400',textAlign:'center',bottom:Metrics.ratio(10)}}>100 AmplePoints= $12.00</Text>
      </View>
    </View>
    <View >  
    </View>
    <View style={{alignItems:'center',paddingTop:Metrics.ratio(30),paddingBottom:Metrics.ratio(40),backgroundColor:'white'}}>
    <Image style={{width:'100%',height:Metrics.ratio(200)}} source={{uri:'https://amplepoints.com/images/vthumbnail.png'}}/>
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
    marginVertical: verticalScale(10), // Adjust the margin as needed
  },
  horizontalLine1: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#B6B8B5', // Adjust the color as needed
    alignSelf: 'stretch',
    marginVertical: verticalScale(5.5), // Adjust the margin as needed
  },
  AnotherrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
    borderRadius:11,
    elevation:4,
    backgroundColor:'white',
    margin:moderateScale(5)

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
    height:'25%'
   
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    top:Metrics.ratio(10),
    paddingVertical:Metrics.ratio(10)
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
    width: Metrics.ratio(85), // Adjust the width and height as needed
    height: verticalScale(100),
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
const CustomHeader = ({ navigation }) => (
  
  <View style={{ backgroundColor: '#EEEEEE' }}>
    <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.openDrawer()}>
      <Image source={require('../assets/SideBar.png')} style={styles.SideMenu}  />
      </TouchableOpacity>
      <Image source={require('../assets/Ample.png')} style={styles.Logo} />
      <View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Cart", { user_Id })}>
        <Image source={require('../assets/Trolley.png')} style={styles.Icon} />
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      // onPress={() => navigation.navigate("Search", { user_Id })}
      // initialParams={{ user_Id: user_Id }}
      style={styles.searchBar2Container}
    >
      <View style={styles.searchInput}>
        <Image source={require('../assets/Search.png')} style={{ width: Metrics.ratio(20), height: Metrics.ratio(20) }} />
        <Text>Search...</Text>
      </View>
    </TouchableOpacity>
  </View>
);
