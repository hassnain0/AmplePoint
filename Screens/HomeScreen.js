import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, Alert, BackHandler, Image, ScrollView, Dimensions } from "react-native";
import Mall from './Mall';
import VideoPlayer from 'react-native-video-player';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import Store from './Store';
import { Metrics } from '../themes';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { CarouselSlider } from "react-native-carousel-image-slider";
import Cart from './Cart';
import Brands from './Brands';
import MyPurchase from './MyPurchase';
import LocalPurchase from './LocalPurchase';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import Video1 from './Video';

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const [images, setImages] = useState(null);
  const [amplePoints, setAmplePoints] = useState(0);
  const [data, setData] = useState(null);
  console.log("CompleteProfile", route.params.CompleteProfile)
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
  const MoveStore = () => {
   navigation.navigate("Store")
  }
  useEffect(() => {

    const getHomeContent = async () => {
      try {
        const apiUrl = 'https://amplepoints.com/apiendpoint/gethomecontent';
        const response = await axios.get(apiUrl);

        if (response.data && response.data.data) {
          setData(response.data.data)
          setImages(response.data.data.sider_images);
        }
      }
      catch (err) {
        console.log("Error fetching data:", err);
      }
    }
    getHomeContent();

  }, []);



  return (
    <SafeAreaView>
      <ScrollView>
        {images && (
          <Swiper style={styles.wrapper} showsButtons={false} dotColor='white' activeDotColor='#ff3d00'>
            {images.map((imageUrl, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
              </View>
            ))}

          </Swiper>
        )}
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.itemContainer} onPress={MoveStore}>

            <Image style={styles.ovalImage2} source={require('../assets/Store.jpeg')} />
            <Text style={{
              fontSize: 12, fontWeight: '700', textAlign: 'center',
              color: 'black', fontStyle: 'italic'
            }}>Store</Text>
            <Text style={{ fontSize: 8, fontWeight: '400', textAlign: 'center', }}>Create your own store to</Text>
            <Text style={{ fontSize: 8, fontWeight: '400', textAlign: 'center', }}>maximizes the sale</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("Brands")}>

            <Image style={styles.ovalImage2} source={require('../assets/Brand.jpeg')} />
            <Text style={{
              fontSize: 12, fontWeight: '700', textAlign: 'center',
              color: 'black', fontStyle: 'italic'
            }}>BRANDS</Text>
            <Text style={{ fontSize: 8, fontWeight: '400', textAlign: 'center', }}>Add your brand to promote</Text>
            <Text style={{ fontSize: 8, fontWeight: '400', textAlign: 'center', }}>on an interactive platform</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("Mall")}>

            <Image style={styles.ovalImage2} source={require('../assets/Mall.jpeg')} />
            <Text style={{
              fontSize: 12, fontWeight: '700', textAlign: 'center',
              color: 'black', fontStyle: 'italic'
            }}>MALL</Text>
            <Text style={{ fontSize: 8, fontWeight: '400', textAlign: 'center', }}>Find your online shop at </Text>
            <Text style={{ fontSize: 8, fontWeight: '400', textAlign: 'center', }}>your online mall</Text>
          </TouchableOpacity>

        </View>

        <View style={{ backgroundColor: '#EEEEEE',  }}>
          <Text style={{
            fontSize: 15, fontWeight: '700', textAlign: 'left', paddingTop: Metrics.ratio(10), paddingLeft: Metrics.ratio(20),
            color: 'black',
          }}>How it Works</Text>
          <View style={styles.AnotherrowContainer}>
            <View style={styles.cartContainer}>
              <Image style={styles.ovalImageCarts} source={require('../assets/Join.png')} />
              <Text style={{
                fontSize: 8, fontWeight: '700', textAlign: 'center',
                color: 'black', fontStyle: 'italic'
              }}>Join Free</Text>
              <Text style={{ fontSize: 8, fontWeight: '500', textAlign: 'center', }}>SignUp for A Free</Text>
              <Text style={{ fontSize: 8, fontWeight: '500', textAlign: 'center', }}>Membership & Get 42</Text>
              <Text style={{ fontSize: 8, fontWeight: '500', textAlign: 'center', }}>Ample Points Valued at $5</Text>
              <View style={styles.horizontalLine} />
              <Text style={{ color: '#FF2E00', fontSize: 8, fontWeight: '400', textAlign: 'center', bottom: Metrics.ratio(10) }}>1 Ample Point=12 cents</Text>
            </View>

            {/* Second Cart Component */}
            <View style={styles.cartContainer}>
              <Image style={styles.ovalImageCarts} source={require('../assets/Earn.png')} />
              <Text style={{
                fontSize: 8, fontWeight: '700', textAlign: 'center',
                color: 'black', fontStyle: 'italic'
              }}>Earn More</Text>
              <Text style={{ fontSize: 9, fontWeight: '500', textAlign: 'center', }}>Earn Ample Points For</Text>
              <Text style={{ fontSize: 9, fontWeight: '500', textAlign: 'center', }}>Shopping, Sharing Links &</Text>
              <Text style={{ fontSize: 9, fontWeight: '500', textAlign: 'center', }}>Watching Personlized Ads</Text>
              <View style={styles.horizontalLine1} />
              <Text style={{ color: '#FF2E00', fontSize: 8, fontWeight: '400', textAlign: 'center', bottom: Metrics.ratio(7) }}>60 min = 60 AmplePoints =$7.20</Text>
            </View>

            <View style={styles.cartContainer}>
              <Image style={styles.ovalImageCarts} source={require('../assets/Cards.png')} />
              <Text style={{
                fontSize: 8, fontWeight: '700', textAlign: 'center',
                color: 'black', fontStyle: 'italic'
              }}>Use Amples</Text>
              <Text style={{ fontSize: 8, fontWeight: '500', textAlign: 'center', }}>Use Your Ample Points </Text>
              <Text style={{ fontSize: 8, fontWeight: '500', textAlign: 'center', }}>To Get Free Products &</Text>
              <Text style={{ fontSize: 8, fontWeight: '500', textAlign: 'center', }}>Discounts</Text>
              <View style={styles.horizontalLine} />
              <Text style={{ color: '#FF2E00', fontSize: 8, fontWeight: '400', textAlign: 'center', bottom: Metrics.ratio(10) }}>100 AmplePoints= $12.00</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Image source={{ uri: data?.how_it_work_video_poster }} style={{ width: '100%', height: verticalScale(200), marginBottom: scale(20) }} />
            <TouchableOpacity style={styles.playButtonContainer} onPress={()=>navigation.navigate("Video1",{
              data:data.how_it_work_video
            })}>
              <Image source={require(".././assets/play.png")} style={styles.playButton} />
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom : 15
  },
  playButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: Metrics.ratio(150),
    height: Metrics.ratio(50),
    // Add other styles for the play button as needed
  },
  container: {
    flex: 1,

  },
  wrapper: {
    height: 150,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: scale(10), // Set border radius for the Swiper
  },
  horizontalLine: {
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
    flexDirection: 'column',
    borderRadius: 11,
    elevation: 4,
    backgroundColor: 'white',
    margin: moderateScale(4)

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
    flexDirection: 'row',
    padding: Metrics.ratio(10),
    bottom: Metrics.ratio(20)
  },
  searchInput: {
    top: Metrics.ratio(1),
    height: Metrics.ratio(40),
    borderColor: '#F0F0F0',
    borderWidth: 2,
    padding: Metrics.ratio(10),
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'white'
  },

  dotContainerStyle: {
    position: 'absolute',
    bottom: 10, // Adjust this value based on your design
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'orange',
    margin: 5,
  },
  Logo: {
    marginLeft: Metrics.ratio(50),
    width: Metrics.ratio(200),
    height: Metrics.ratio(30),
  },
  Icon: {
    width: Metrics.ratio(27),
    height: Metrics.ratio(32),
    left: Metrics.ratio(10)
  },
  SideMenu: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
    left: Metrics.ratio(10)
  },
  header: {
    backgroundColor: "#EEEEEE",

    flexDirection: 'row',
    paddingVertical: Metrics.ratio(10),
    // paddingHorizontal:Metrics.ratio(5),
  }, 
  rowContainer: {
    marginTop: Metrics.ratio(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: '25%'

  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    top: Metrics.ratio(10),
    paddingVertical: Metrics.ratio(5)
  },
  ovalImage: {
    width: Metrics.ratio(90), // Adjust the width and height as needed
    height: Metrics.ratio(120),
    borderRadius: Metrics.ratio(40),
    borderColor: 'skyblue',
    borderWidth: 0.7
  },
  ovalImageCarts: {
    width: Metrics.ratio(40), // Adjust the width and height as needed
    height: Metrics.ratio(40),
    borderRadius: Metrics.ratio(40),
    borderColor: 'skyblue',
    borderWidth: 0.7
  },
  ovalImage1: {
    paddingTop: Metrics.ratio(10),
    width: Metrics.ratio(90), // Adjust the width and height as needed
    height: Metrics.ratio(120),
    borderRadius: Metrics.ratio(40),
    borderColor: 'skygreen',
    borderWidth: 0.7
  },
  ovalImage2: {
    width: Metrics.ratio(85), // Adjust the width and height as needed
    height: verticalScale(100),
    borderRadius: Metrics.ratio(40),
    borderColor: 'purple',
    borderWidth: 0.7
  },
  text: {
    fontSize: 16,
    marginTop: 8, // Adjust the margin as needed
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'cover',
    borderRadius: 10, // Set border radius for the Image
  },
})
export default HomeScreen;
