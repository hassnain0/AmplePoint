import React, { useState,useEffect } from 'react';
import { View, ActivityIndicator,Text, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { createDrawerNavigator,DrawerContentScrollView ,DrawerItemList,DrawerItem} from '@react-navigation/drawer'; // assuming you have a TabNavigator component
import TabNavigator from './Screens/tabNavigator';
import MyPurchase from './Screens/MyPurchase';
import LocalPurchase from './Screens/LocalPurchase';
import { Metrics } from './themes';
import {  useNavigation,  } from '@react-navigation/native';
import axios from 'axios';
import Search from './Screens/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TermsCondition from './Screens/TermsCondition';
import Contact from './Screens/Contact';
import Login from './Screens/Login';
import Spinner from 'react-native-loading-spinner-overlay';
import { scale } from 'react-native-size-matters';


const Drawer = createDrawerNavigator();


const CustomHeader = ({ navigation,user_Id }) => {
  const [amplePoints,setAmplePoints]=useState(0);
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const getRewards=async()=>{
      try{
        const apiUrl="https://amplepoints.com/apiendpoint/getuserampleandreward?"
       const Response= await axios.get(apiUrl, {
          params: {
            user_id:user_Id.user_id,
          },
        });

        setAmplePoints(Response.data.data.user_total_ample);
        
      }catch(erro){
      console.log("Error",erro)
      }
     }
     getRewards();
     setLoading(false)
    },[user_Id])

    return (
    <View style={{ backgroundColor: '#EEEEEE' }}>
      <Spinner
          visible={loading}
          size={'large'}
          textContent={'Loading...'}
          indicatorStyle={{ color: '#ff3d00' }}
          
        />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('./assets/SideBar.png')} style={styles.SideMenu} />
        </TouchableOpacity>
        <Image source={require('./assets/Ample.png')} style={styles.Logo} />
      {amplePoints>0 &&(
        <View style={{marginLeft:scale(10)}}>
        <Text style={{
      color: 'black',
      fontSize: 9,
      fontWeight:'800',
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
      fontWeight:'800',
      fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),
    }}>
    Amples
    </Text>
        </View>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { user_Id })}>
          <Image source={require('./assets/Trolley.png')} style={styles.Icon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.searchBarContainer} onPress={()=>navigation.navigate("Search")}>
        
        <View

          style={styles.searchInput}
          
        >
          <Text style={{fontSize:12,}}>Search</Text>
          </View>
      </TouchableOpacity>
    
    </View>
  );
};
 function Logout(){
const navigate=useNavigation();
    try{
       AsyncStorage.removeItem('userToken');     
       navigate.replace("HomeScreen");
      }
      catch(Error){
        console.log("Eror",Error)
      }

}
const CustomDrawerContent = ({ CompleteProfile, ...props }) => {
  handleLogout=async()=>{
    try{
      await AsyncStorage.removeItem('userToken');
    }
    catch(Error){
      console.log("Eror",Error)
    }
    
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <ImageBackground source={require('./assets/DrawerBackground.jpg')} style={styles.backgroundImage} >
        <View style={styles.profileSection}>
          
          <Image source={{ uri:`https:\/\/amplepoints.com\/user_images\/${CompleteProfile?.user_id}\/profile_image\/${CompleteProfile?.user_image} ` ||'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAACUCAMAAAAzmpx4AAAAMFBMVEXk5ueutLfn6erq7O2qsLTZ3N21ur3P0tTIzM6nrrHd3+DU19mxt7rBxsjg4uO6v8I4tUPFAAAE8klEQVR4nO2d0XqkIAxGNSCgiLz/2y7oTLudqqMQ5Lftudlv7+ZsIECEbNMUh4SgZrA6Yof5b3eHms74tg/IwPynMl1zbzHr2l62L8heentTsTDq1pSeYq3rav/C8wQnv6X0FPM384px2nf68LrPQKTBtG+dZi9phpt4UWPVIafZS90jb9BkjiotuAlfizp/OFAPfIeuRVaddFpGITYJUoHRQkfLjilS2FrUjWfn1KdW7R+/SbpUAHSjQVPSnPqIVu3fv8HplP4F6RGnFuk+R6ptewOoNWRKBS28qUW5TlFL1LZ4QZjsUIWp5cC0JgapEKwBamqJvPz3wYgULMpPFQsSaeckstbf/1E4VtQxhSqgYbSEZ5PCCRZNPKliAeVgLE4WKvZBWbOILVdE1FTbZ4Y6Tql2xMgXwrFagQxB3gEYhmBtoZkhsQKzBUQJgzSzVYtweuSeVhgTi3NjseBrK0WYk0Ur1VBbqWk6biuEQm7K54J3VvXXYcGeAhGSoDAFrKonQf7EHlJ7/Vj9Wf1Z/Vn9Wf1mq5+5Xml2KYC9BaVeRtgGYB/4M/fsJc5XAF9S+b6HPEE4C/Of8CHqFvw1JgAr9nogxr069totxOcD7j2TRxiAYR1mlUJYgyPEOrFGiAHIPQQxBmC8bcH5XRhhuzTzI7/hh3zBFyyQXBERbPlixJHiuxwjgUIVN+5MYxBJiuvSWY9yMeaBcAzBkihr1Sf5Um1f2+E7+QmjhziCfIVcppasX9xcIzMPYj6poCkvVABf7tfIunwmAcplG6SfH6Wu/dt3SC66I0tRo9MeliFLRXRCJhzRpeJ74bNSGAXAfWg4WcZwYFvadWg6MQrlqG/wYD1C1Dl5zEs6S/eQamK47JueHTO9tzcJ1AIFL/WuF4kKg+9OUk1cuqbYCmczTDLE6RadLV4IP3nQXq71+OmVGZo7Oj2ZrFFzG6aHTzByFqSUnkWYZJ02M7q75bD7LZD4xo2jRYFpsNo471VsUiTnlVl558zcxe1uWT12mdJOPZu2vabApY2bHL25zyIckl5Ypw7sLFoZtZWxoAWLmfivPliztkDtu/X96PQwAa5fYY5Mc6PAtOKZjF0F7QCV9YmSgvTNrHVhOQPJIXGNNUd26EfEwljsmvpi1HR6ZxObIKZiZqzqRY116uAB8bhYGIkV+++Fo7zL6cC04+VNVyde1Gh/rPdhkpgyFYo0grQvEqdPlLu634qwpZ1mL9Nc+ElVTOy3Ure89FUbfCrx3GATP1wSLsF9I/Udpny4qMRrlzeornC4RF43vVTK3gMq8dTlCL0vt9cgMuWz+TpSlVqTaWJq+5WkVepzZMd1ryxNqzclpOwFm4l9L8M/uWy5nexhLfaO05WS31eYtQhCKmR4Ti0CGH4LvWObW8wPQbLoua7bMXf8yoTpFiFNF+/R3yBZntJRxR3FKtLma1U4ebxjzK5nCA0WqUhuH220SfUgc2rBTaqFMetccmnd5QxZz7+nqoePPTLGIGD+e5LegYDqnhN3Sd9iEMc7nUIkFzIKdBlhJDVYyKFKDhbyrIrItOpMteLfQZL+g6nhqq85ySTUqZEOwOtIl3B5En0AxpX4bLBowNzX/s/5101YxYp1pDk9BBFPi6/4s4fiCXoJfiBPTizCz+uB/uTEusO0Or+9IMt3jawgZ1es3P947BrUxseEf1TZS9u3A43xAAAAAElFTkSuQmCC'}}  style={styles.profileImage} />
          
         {CompleteProfile &&( <View style={styles.profileText}>
            <Text style={styles.profileName}>{CompleteProfile?.first_name ||'Guest'}</Text>
            <Text style={styles.profileEmail}>{CompleteProfile?.email}</Text>
            <Text style={styles.profilePoints}>{CompleteProfile?.total_ample }Amples</Text>
            <Text style={styles.profilePoints}>{CompleteProfile?.reward_time}Rewards Time</Text>
          </View>
          )}
        </View>
</ImageBackground>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default function DrawerNavigator() {
const [CompleteProfile,setCompleteProfile]=useState(null)
const [loading,setLoading]=useState(true)
useEffect(()=>{
  getData();
},[CompleteProfile])

const getData=async()=>{


try {
  // Check if a user token exiconst storedProfileString = await AsyncStorage.getItem('CompleteProfile');
// Retrieve the string from AsyncStorage
const storedProfileString = await AsyncStorage.getItem('CompleteProfile');

// Convert the string back to an object
const storedProfile = JSON.parse(storedProfileString);

if(storedProfileString!=null){
setCompleteProfile(storedProfile)
}
}
catch (error)
{
  console.error('Error checking authentication:', error);
}
finally{
  setLoading(false)
}
}
const isCompleteProfileNull = CompleteProfile === null;


  return (
    <>
     {loading ? (
      // Show a loading indicator or splash screen while waiting for data
      <Spinner
      visible={loading}
      size={'large'}
      textContent={'Loading...'}
      indicatorStyle={{ color: '#ff3d00' }}
      
    />
    ) : (
    <Drawer.Navigator
  drawerContent={(props) => <CustomDrawerContent {...props} CompleteProfile={CompleteProfile} />}
  screenOptions={{
    header: (props) => <CustomHeader {...props} user_Id={CompleteProfile} />,
  }}
>
   <Drawer.Screen
  name="Home"
  initialParams={{CompleteProfile}}
  component={TabNavigator}
  options={{
    drawerIcon: ({ color }) => (
      <Image source={require('./assets/home1.png')} style={{ width: 10, height: 15 }} />
    ),
  }}
/>
      <Drawer.Screen name="MyPurchase" component={MyPurchase} initialParams={{ CompleteProfile }} options={{headerShown:false,drawerIcon: ({color}) => (
            <Image source={require('./assets/Purchase.png')} style={{width:10,height:15}}/>
          ),}}   />
      <Drawer.Screen name="LocalPurchase" component={LocalPurchase} initialParams={CompleteProfile}  options={{headerShown:false,drawerIcon: ({color}) => (
            <Image source={require('./assets/Purchase.png')} style={{width:10,height:15}}/>
          ),}}  />
              <Drawer.Screen name="TermsCondition" component={TermsCondition} options={{headerShown:false,drawerIcon: ({color}) => (
            <Image source={require('./assets/letter.png')} style={{width:10,height:15}}/>
          ),}}/>
          <Drawer.Screen name="Contact Us" component={Contact} options={{headerShown:false,drawerIcon: ({color}) => (
            <Image source={require('./assets/Us.png')} style={{width:15,height:20}}/>
          ),}}/>
          <Drawer.Screen name={'Logout'}
          component={Logout}
           options={{headerShown:false,drawerIcon: ({color}) => (
            <Image source={require('./assets/logout.png')} style={{width:20,height:20}}/>
          ),}}/>
    </Drawer.Navigator>
    )}

    </>
  );
}
const styles=StyleSheet.create({
  header: {
    backgroundColor: "#EEEEEE",

    flexDirection: 'row',
    paddingVertical: Metrics.ratio(5),
    // paddingHorizontal:Metrics.ratio(5),
  },  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    height: '50%',
}, Icon:{
  width:Metrics.ratio(27),
  height:Metrics.ratio(32),
  marginLeft:scale(20)
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
      SideMenu:{
        width:Metrics.ratio(40),
        height:Metrics.ratio(40),
        left:Metrics.ratio(10)
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
    marginLeft:'10%',
    width:Metrics.ratio(200),
    height:Metrics.ratio(30),
  },
  drawerContent: {
    flex: 1,
    paddingBottom:Metrics.ratio(50)
  },
  backgroundImage: {
    width: '100%',
    height: Metrics.ratio(200),
  },
  profileSection: {
    justifyContent:'center',
    alignItems: 'center',
    padding: Metrics.ratio(20),
  },
  profileImage: {
    
    width: Metrics.ratio(80),
    height: Metrics.ratio(80),
    borderRadius: Metrics.ratio(100),
    marginRight: Metrics.ratio(10),
  },
  profileText: {
    fontWeight:"600",
    fontStyle:'italic',
    textAlign:'center',
    fontSize:15,
    flexDirection: 'column',
    fontFamily: 'Roboto-Medium',
  },
  profileName: {
    textAlign:'center',
    fontSize:15,
   fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight:"bold",
    color: 'white',
  },
  profileEmail: {
    textAlign:'center',
    fontSize:15,
    fontStyle:'italic',
    color: 'white',
    fontWeight:"600",
  },
  profilePoints: {
        textAlign:'center',
    fontWeight:"600",
    fontStyle:'italic',
    fontSize:15,
    color: 'white',
    fontFamily: 'Roboto-Medium',
  },
  searchBarContainer: {
    backgroundColor: '#eeeeee',
    height: Metrics.ratio(50),
    justifyContent:'center',
    alignItems:'center'
},
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
      },
  searchInput: {
    top:Metrics.ratio(1),
    height: Metrics.ratio(35),
    borderColor: '#eeeeee',
    borderWidth: 0.5,
    padding: 10,
    width: '90%',
    fontSize:13,
    borderRadius:15,
    backgroundColor:'white'
  },
})