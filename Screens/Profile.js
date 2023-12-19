import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Colors, Metrics } from '../themes';
import axios from 'axios';
import EditProfie from './EditProfile';
import { useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

const Profile= ({navigation}) => {
    const route=useRoute();
    const user_Id=route.params.user_Id
    const [data,setData]=useState(null)
    useEffect(()=>{
        const getHomeContent=async()=>{
            try {
              const apiUrl = 'https://amplepoints.com/apiendpoint/getprofile?';
              const response = await axios.get(apiUrl,{
                params:{
                  user_id:user_Id
                }
              });
              console.log(response.data.data.profile_completed)
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
  navigation.navigate("EditProfile",{
    data
  })
 }

  return (
    
    <ImageBackground source={require('../assets/EditBane.jpg')} style={styles.containerImage}>
     <View style={styles.container}>
     
      {data &&(
        <View>
           <TouchableOpacity style={{alignItems:'flex-end'}} onPress={EditProfie}>
      <Image style={{width:40,height:40}} source={require('../assets/EditIcon.png')}></Image>
      </TouchableOpacity>
      <View style={styles.card}>
        <Image source={require('../assets/Profile.png')} style={styles.profilePicture} />

        <Text style={styles.userName}>{data.first_name} {data.last_name}</Text>
        
       <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.points}> Amples: </Text>
        <Text style={styles.amplepoints}>{data.total_ample}</Text>
        </View>      
        <View style={{flex:1, alignItems:'center',justifyContent:'center',flexDirection:'row',top:Metrics.ratio(2)}}>
        <Progress.Bar style={{width:Metrics.ratio(60),borderRadius:1}} progress={29} width={200}  color='#ff3d00'/>
        <Text style={{color:'#ff3d00',fontSize:10,left:Metrics.ratio(5)}}>{data.profile_completed}%</Text>
        <Text style={{color:'black',fontSize:10,left:Metrics.ratio(15),fontWeight:'400'}}>completed</Text>
        </View>
        
<View style={{flexDirection:'row',justifyContent:'left',top:Metrics.ratio(10)}}>
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
        <View style={{flex:1,flexDirection:'row',alignItems:'flex-end', justifyContent: "center",
    alignSelf:'right',
    marginHorizontal:Metrics.ratio(100),}}>
        <View style={styles.buttonView}>
      {/* <Button
        label={"View More"}
      /> */}
    </View>
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
    backgroundColor:Colors.transparent,
borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 30,
   

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
    fontSize: 10,
    textAlign:"left",

  },
  address: {
    marginTop:Metrics.ratio(10),
    fontSize: 10,
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
