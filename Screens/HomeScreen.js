import React, { useEffect,useRef,useState } from 'react';
import { Text, View,TouchableOpacity, SafeAreaView, StyleSheet, Image,TextInput,Platform} from "react-native";
import Mall from './Mall';
import Store from './Store';
import Ionicons from 'react-native-vector-icons'
import { Metrics } from '../themes';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { ImageSlider } from 'react-native-image-slider-banner';
import Cart from './Cart';
import Brands from './Brands';
// import { createDrawerNavigator} from '@react-navigation/drawer';
// const Drawer=createDrawerNavigator();
// import Animated from 'react-native-reanimated';

// Animated.initializeReanimated();

const HomeScreen=({navigation})=>{
const Route=useRoute();
const [images,setImages]=useState(null);
const [amplePoints,setAmplePoints]=useState(0);
const user_ID=Route.params.Data;
// const videoUrl = 'https://amplepoints.com/images/HowItWork.mp4';
// const thumbnailUrl = 'https://amplepoints.com/images/vthumbnail.png';

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [thumbnail, setThumbnail] = useState(thumbnailUrl);
//   const videoRef = useRef(null);

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
    // const fetchThumbnail = async () => {
    //   try {
    //     const thumbnailUrl = await getThumbnail({
    //       url: videoUrl,
    //       timeStamp: 10000, // specify the time for the thumbnail in milliseconds
    //     });
    //     setThumbnail(thumbnailUrl);
    //   } catch (error) {
    //     console.error('Error fetching thumbnail:', error);
    //   }
    // };

    // fetchThumbnail();
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
    <View style={{  margin: Metrics.ratio(20),bottom:Metrics.ratio(10),elevation:10,height:'100%'}}>
    {images && (
  <ImageSlider
    data={images.map((imgUrl) => ({ img: imgUrl }))}
    autoPlay={true}
    closeIconColor="white"
  />
)}

</View> 
 {/* <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause}>
     
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            resizeMode="cover"
            style={styles.video}
            paused={!isPlaying}
          />
       
      </TouchableOpacity>
    </View> */}

  </SafeAreaView>)}
const styles=StyleSheet.create({
  container: {
    flex: 1,

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
    paddingVertical: Metrics.ratio(10),
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 300,
    height: 200,
  },
  video: {
    width: 300,
    height: 200,
  },
})
export default HomeScreen;
// export default function Home({ navigation }) {
//   return (
//     <View style={{ flex: 1 ,}}>
//       <DrawerNavigation />
//     </View>
//   );
// }

function DrawerNavigation() {
  return (
      <Drawer.Navigator  initialRouteName="HomeScreen" >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{drawerIcon:({color})=>(<Ionicons name='home-outline' size={22} color={color} />),headerTitleAlign:'center'}} />
  
      </Drawer.Navigator>
  );
}