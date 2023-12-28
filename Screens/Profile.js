import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Metrics } from '../themes';
import axios from 'axios';
import EditProfie from './EditProfile';
import { useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';

const Profile= ({navigation}) => {
    const route=useRoute();
   
   
    const user_Id=route.params.user_Id;
    
    const [data,setData]=useState(null)
    useEffect(()=>{    

    get();
        const getHomeContent=async()=>{
            try {
              const apiUrl = 'https://amplepoints.com/apiendpoint/getprofile?';
              const response = await axios.get(apiUrl,{
                params:{
                  user_id:user_Id
                }
              });
              console.log("response.data.data.user_image",response.data.data.user_image)
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
    },[])

    const get=async()=>{
    
     
        try{
          const response1=await AsyncStorage.getItem("KeepLoggedIn");
          console.log("Response of navigation",response1)
          if(response1=="false"){
            navigation.replace("Login")
          }
          
      }
 catch(Error){
        console.log("Error",Error)
      }    }
  // Dummy data (replace with actual user data)
 const Edit_Profie=()=>{
  navigation.navigate("EditProfile",{
    data,
  })
 }

  return (
    <>
{data && data!=null &&(
    <ImageBackground
  source={{ uri: (data && data.user_banner) ||  'https://media.istockphoto.com/id/1573329496/photo/multi-layers-color-texture-3d-papercut-layers-in-gradient-vector-banner-carving-art-cover.webp?b=1&s=612x612&w=0&k=20&c=3vyrUMlb4A8NFTdPuJ_tVsjbKg5B586CJjm9C9Zebbk='}}
  style={styles.containerImage}
>

    <View style={styles.container}>
     
     
        <View>
           <TouchableOpacity style={{alignItems:'flex-end'}} onPress={Edit_Profie}>
      <Image style={{width:40,height:40}} source={require('../assets/EditIcon.png')}></Image>
      </TouchableOpacity>
      <View style={styles.card}>
      <Image
  source={{ uri: data.user_image  ||'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAACUCAMAAAAzmpx4AAAAMFBMVEXk5ueutLfn6erq7O2qsLTZ3N21ur3P0tTIzM6nrrHd3+DU19mxt7rBxsjg4uO6v8I4tUPFAAAE8klEQVR4nO2d0XqkIAxGNSCgiLz/2y7oTLudqqMQ5Lftudlv7+ZsIECEbNMUh4SgZrA6Yof5b3eHms74tg/IwPynMl1zbzHr2l62L8heentTsTDq1pSeYq3rav/C8wQnv6X0FPM384px2nf68LrPQKTBtG+dZi9phpt4UWPVIafZS90jb9BkjiotuAlfizp/OFAPfIeuRVaddFpGITYJUoHRQkfLjilS2FrUjWfn1KdW7R+/SbpUAHSjQVPSnPqIVu3fv8HplP4F6RGnFuk+R6ptewOoNWRKBS28qUW5TlFL1LZ4QZjsUIWp5cC0JgapEKwBamqJvPz3wYgULMpPFQsSaeckstbf/1E4VtQxhSqgYbSEZ5PCCRZNPKliAeVgLE4WKvZBWbOILVdE1FTbZ4Y6Tql2xMgXwrFagQxB3gEYhmBtoZkhsQKzBUQJgzSzVYtweuSeVhgTi3NjseBrK0WYk0Ur1VBbqWk6biuEQm7K54J3VvXXYcGeAhGSoDAFrKonQf7EHlJ7/Vj9Wf1Z/Vn9Wf1mq5+5Xml2KYC9BaVeRtgGYB/4M/fsJc5XAF9S+b6HPEE4C/Of8CHqFvw1JgAr9nogxr069totxOcD7j2TRxiAYR1mlUJYgyPEOrFGiAHIPQQxBmC8bcH5XRhhuzTzI7/hh3zBFyyQXBERbPlixJHiuxwjgUIVN+5MYxBJiuvSWY9yMeaBcAzBkihr1Sf5Um1f2+E7+QmjhziCfIVcppasX9xcIzMPYj6poCkvVABf7tfIunwmAcplG6SfH6Wu/dt3SC66I0tRo9MeliFLRXRCJhzRpeJ74bNSGAXAfWg4WcZwYFvadWg6MQrlqG/wYD1C1Dl5zEs6S/eQamK47JueHTO9tzcJ1AIFL/WuF4kKg+9OUk1cuqbYCmczTDLE6RadLV4IP3nQXq71+OmVGZo7Oj2ZrFFzG6aHTzByFqSUnkWYZJ02M7q75bD7LZD4xo2jRYFpsNo471VsUiTnlVl558zcxe1uWT12mdJOPZu2vabApY2bHL25zyIckl5Ypw7sLFoZtZWxoAWLmfivPliztkDtu/X96PQwAa5fYY5Mc6PAtOKZjF0F7QCV9YmSgvTNrHVhOQPJIXGNNUd26EfEwljsmvpi1HR6ZxObIKZiZqzqRY116uAB8bhYGIkV+++Fo7zL6cC04+VNVyde1Gh/rPdhkpgyFYo0grQvEqdPlLu634qwpZ1mL9Nc+ElVTOy3Ure89FUbfCrx3GATP1wSLsF9I/Udpny4qMRrlzeornC4RF43vVTK3gMq8dTlCL0vt9cgMuWz+TpSlVqTaWJq+5WkVepzZMd1ryxNqzclpOwFm4l9L8M/uWy5nexhLfaO05WS31eYtQhCKmR4Ti0CGH4LvWObW8wPQbLoua7bMXf8yoTpFiFNF+/R3yBZntJRxR3FKtLma1U4ebxjzK5nCA0WqUhuH220SfUgc2rBTaqFMetccmnd5QxZz7+nqoePPTLGIGD+e5LegYDqnhN3Sd9iEMc7nUIkFzIKdBlhJDVYyKFKDhbyrIrItOpMteLfQZL+g6nhqq85ySTUqZEOwOtIl3B5En0AxpX4bLBowNzX/s/5101YxYp1pDk9BBFPi6/4s4fiCXoJfiBPTizCz+uB/uTEusO0Or+9IMt3jawgZ1es3P947BrUxseEf1TZS9u3A43xAAAAAElFTkSuQmCC' }}
  style={styles.profilePicture}
/>
        <Text style={styles.userName}>{data.first_name} {data.last_name}</Text>
        
       <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
        <Text style={styles.points}> Amples: </Text>
        <Text style={styles.amplepoints}>{data.total_ample}</Text>
        </View>      
        <View style={{flex:1, alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:Metrics.ratio(2)}}>
        <Progress.Bar style={{width:Metrics.ratio(60),borderRadius:1,borderColor:'black',borderWidth:0.2}} progress={data.profile_completed} width={200}  color='#ff3d00'/>
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
      
      
        </View>
   
   </ImageBackground>
   )}   
   </>
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
    marginBottom:Metrics.ratio(10),
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
