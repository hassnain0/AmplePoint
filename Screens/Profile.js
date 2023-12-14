import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Metrics } from '../themes';
import axios from 'axios';

// import ProgressBar from 'react-native-progress';

const Profile= () => {
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
  const userData = {
    name: 'John Doe',
    points: 75,
    progress: 0.75, // Should be between 0 and 1
    email: 'john.doe@example.com',
    phoneNumber: '+1 555-555-5555',
    // Add the path to the user's picture
    profilePicture: require('../assets/Profile.png'), // Replace with your actual image path
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={userData.profilePicture} style={styles.profilePicture} />

        <Text style={styles.userName}>{data.first_name} {data.last_name}</Text>
        
       <View style={{flex:1,flexDirection:'row'}}>
        <Text style={styles.points}> Ample</Text>
        <Text style={styles.amplepoints}>{data.total_ample}</Text>
        </View>      
<View style={{flex:1, flexDirection:'row'}}>
<View>
    <Text style={styles.userInfo}>Email Id:</Text>
    <Text style={styles.userEmail}>{data.email}</Text>
    </View>
<View style={styles.line1}/>
<View>
    <Text style={styles.userInfo}>Phone Number</Text>
    <Text style={{ 
    fontSize: 8,
    marginBottom: 4,
  }}>{data.mobile}</Text>
    </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  line1: {
    height: Metrics.ratio(40), // Adjust the height of the line
    width: Metrics.ratio(2), // Adjust the width of the line
    backgroundColor: '#D1D3D0',

    // Change the color of the line
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems:'center',
    alignSelf:'center',
    bottom:Metrics.ratio(20)
  },
  userName: {
    fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),
    fontSize: 18,
    fontWeight: 'bold'
  },
  points: {
    fontSize: 16,
    fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),
  },
  amplepoints: {
    fontWeight:'800',
    fontSize: 16,
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
    fontSize: 8,
    marginBottom: 4,
  },
});

export default Profile;
