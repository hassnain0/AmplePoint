import React, { useEffect, useState } from 'react';
import {ProgressBarAndroidBase, View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Metrics } from '../themes';
import Button from '../components/Button';
import axios from 'axios';
import EditProfie from './EditProfile';

// import ProgressBar from 'react-native-progress';

const Profile= ({navigation}) => {
    //Feidls
    const [data,setData]=useState(null)
    useEffect(()=>{
        const getHomeContent=async()=>{
            try {
              const apiUrl = 'https://amplepoints.com/apiendpoint/getprofile?user_id=126';
              const response = await axios.get(apiUrl);
                console.log("response.data.data",response.data.data)
              if(response.data.data)
              {
                setData(response.data.data)
              }
              }
             catch (err) {
              console.log("Error fetching data:", err);
            }
            
            } 
        
          getHomeContent();
    },)
  // Dummy data (replace with actual user data)
 const EditProfie=()=>{
  navigation.navigate("EditProfile")
 }

  return (
    
    <ImageBackground source={require('../assets/EditBane.jpg')} style={styles.containerImage}>
     <View style={styles.container}>
      <TouchableOpacity onPress={EditProfie}>
      <Image style={{left:Metrics.ratio(100),width:40,height:40}} source={require('../assets/EditIcon.png')}></Image>
      </TouchableOpacity>
      {data &&(
      <View style={styles.card}>
        <Image source={require('../assets/Profile.png')} style={styles.profilePicture} />

        <Text style={styles.userName}>{data.first_name} {data.last_name}</Text>
        
       <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.points}> Amples: </Text>
        <Text style={styles.amplepoints}>{data.total_ample}</Text>
        </View>      
        
<View style={{flexDirection:'row',justifyContent:'left'}}>
<View style={{marginLeft:Metrics.ratio(20)}}>  
<View>
    <Text style={styles.userInfo}>Email Id:</Text>
    <Text style={styles.userEmail}>{data.email}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Tag Line:</Text>
    <Text style={styles.userEmail}>{data.tag_desc}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Gender:</Text>
    <Text style={styles.userEmail}>{data.gender}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Birthday:</Text>
    <Text style={styles.userEmail}>{data.birthday}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Income:</Text>
    <Text style={styles.userEmail}>{data.income}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Zip Code:</Text>
    <Text style={styles.userEmail}>{data.zip_code}</Text>
    </View>
        </View>
        <View style={styles.line1}/>
        <View style={{flex:1, flexDirection:'column',marginLeft:Metrics.ratio(50)}}>
<View>
    <Text style={styles.userInfo}>Phone Number:</Text>
    <Text style={styles.userEmail}>{data.mobile}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Age:</Text>
    <Text style={styles.userEmail}>{data.age}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Education:</Text>
    <Text style={styles.userEmail}>{data.education}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Birthday:</Text>
    <Text style={styles.userEmail}>{data.employment}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>Country:</Text>
    <Text style={styles.userEmail}>{data.user_country}</Text>
    </View>
    <View>
    <Text style={styles.userInfo}>City:</Text>
    <Text style={styles.userEmail}>{data.user_city}</Text>
    </View>
        </View>

        </View>
        <View  >
        <Text style={styles.address}>Address:</Text>
    <Text style={styles.address1}>{data.address}</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',alignItems:'flex-end'}}>
        <View style={styles.buttonView}>
      <Button
        label={"View More"}
      />
    </View>
    </View>
      </View>
      )}
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  userEmail:{
fontSize:10,
color:'black'
  },
  buttonView: {
    height:Metrics.vh*5,
    backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 30,
    justifyContent: "center",
    alignSelf:'right',
    marginHorizontal:Metrics.ratio(100),

    bottom:Metrics.ratio(5)
  },
  containerImage: {
   
    height:'60%',
    width:'100%'
  },
  container: {
    flex: 1,
    top:Metrics.ratio(70),
   alignItems:'center',
justifyContent:'center',
  },
  card: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  line1: {
    height:'100%', // Adjust the height of the line
    width: Metrics.ratio(2), // Adjust the width of the line
    backgroundColor: '#D1D3D0',
    left:Metrics.ratio(20),
    alignItems:'center',
    justifyContent:'center'
    // Change the color of the line
  },
  profilePicture: {
    width: Metrics.ratio(70),
    height: Metrics.ratio(70),
    borderRadius: 50,
    alignItems:'center',
    alignSelf:'center',
  },
  userName: {
    textAlign:'center',
    color:'black',
    fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),fontStyle:'italic',
    fontSize: 15,
    fontWeight: 'bold'
  },
  points: {
    fontSize: 13,
    fontStyle:'italic',
    color:'black',
    fontWeight:'800',
    fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),
  },
  amplepoints: {
    fontWeight:'900',
    fontSize: 13,
    fontStyle:'italic',
  
    color:'#ff3d00',
    fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),
  },
  progressBar: {
    height: 10,
    marginBottom: 8,
    color:'#ff3d00',
  },
  userInfo: {
    marginTop:Metrics.ratio(10),
    fontSize: 8,
    textAlign:"left",
marginLeft:Metrics.ratio(0)
  },
  address: {
    marginTop:Metrics.ratio(10),
    fontSize: 8,
    textAlign:"center",
  },
  address1: {
    color:'black',
    fontSize: 8,
    textAlign:"center",
    paddingBottom:Metrics.ratio(20)
  },
});

export default Profile;
