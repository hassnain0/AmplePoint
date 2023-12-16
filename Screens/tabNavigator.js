// TabNavigator.js

import React from 'react';
import {Text,StyleSheet,Image, TouchableOpacity, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Metrics } from '../themes';
import HomeScreen from './HomeScreen';
import Store from './Store';
import { useRoute } from '@react-navigation/native';
import Profile from './Profile';
const Tab = createBottomTabNavigator();
const tabBarOptions = {
    activeTintColor: 'blue', // Change this to your desired active tab color
    inactiveTintColor: 'gray', // Change this to your desired inactive tab color
    style: {
      backgroundColor: 'black', // Change this to your desired background color
    },
  };
const TabNavigator = ({navigation}) => {
  const route=useRoute();
  console.log("route.params.Data",route.params.Data)
  const user_Id=route.params.Data;
 
  return (
    
    <Tab.Navigator screenOptions={{
      tabBarStyle: {backgroundColor: "#EEEEEE"}
    }}>
        <Tab.Screen name="Home" component={HomeScreen}initialParams={{ user_Id: user_Id }} options={{tabBarIcon: ({ color, size }) => (
           <Image source={require('../assets/home1.png')}style={{width:22,height:21}} ></Image>
           ),header: () => (
            <View style={{backgroundColor:'#EEEEEE'}}>
            <View style={styles.header}>
            <Image source={require('../assets/SideBar.png') } style={styles.SideMenu}></Image>
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
                user_Id
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
        ), }}/>
            <Tab.Screen name="Store" component={Store} initialParams={{ user_Id:user_Id }} options={{tabBarIcon: ({ color, size }) => (
           <Image source={require('../assets/Shop.png')}style={{width:22,height:21}} ></Image>
           ),header: () => (
            <View style={{backgroundColor:'#EEEEEE'}}>
            <View style={styles.header}>
            <Image source={require('../assets/SideBar.png') } style={styles.SideMenu}></Image>
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
      {/* {amplePoints} */}
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
                user_Id,
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
        ), }}/>
          <Tab.Screen name="Profile" component={Profile} initialParams={{ user_Id: route.params.Data }} options={{tabBarIcon: ({ color, size }) => (
           <Image source={require('../assets/Profile.png')}style={{width:22,height:21}} ></Image>
           ),header: () => (
            <View style={{backgroundColor:'#EEEEEE'}}>
            <View style={styles.header}>
            <Image source={require('../assets/SideBar.png') } style={styles.SideMenu}></Image>
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
      {/* {amplePoints} */}
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
                user_Id,
              })}>
              <Image source={require('../assets/Trolley.png') } style={styles.Icon}></Image>
              </TouchableOpacity>
            </View>
        
           
        
        </View>
        ), }}/>
       
    </Tab.Navigator>
  );
};
const styles=StyleSheet.create({
  IconContainer:{
    width: Metrics.ratio(30),
    height: Metrics.ratio(30) ,
    left:Metrics.ratio(20)
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
  }, header: {
    backgroundColor: "#EEEEEE",

    flexDirection: 'row',
    paddingVertical: Metrics.ratio(10),
    // paddingHorizontal:Metrics.ratio(5),
  },  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    height: '50%',
},
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
    flexDirection:'row',
    padding: Metrics.ratio(10),
    bottom:Metrics.ratio(20),
    paddingTop:Metrics.ratio(30),
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
  })
export default TabNavigator;
