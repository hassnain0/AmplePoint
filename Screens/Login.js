import React,{useState,useEffect} from 'react';
import {View,Text, StyleSheet,Image,TouchableOpacity, ImageBackground, BackHandler} from 'react-native';
import { Metrics } from '../themes';
import Button from '../components/Button';
import MainTextInput from '../components/MainTextInput';
import NetInfo from '@react-native-community/netinfo'
import Register from './Register';
import util from '../helpers/util';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import DemoScreen from './DemoScreen';
import ForgotScreen from './ForgotPassword';
import Verify from './Verify';
import { useFocusEffect } from '@react-navigation/native';


const Login=({navigation})=>{

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
  
  const ForgotScreenMove=()=>{
    navigation.navigate("ForgotScreen")
  }
  const _handleTextChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    });
  };
  const SignUPScreen=()=>{
   navigation.navigate("Register")
  }
  //Variables
  const [user,setUser]=useState({});

 
  const [loader,setLoader]=useState(false);
    const [state, setState] = React.useState({
      email: '',
      password: '',  
  
    });

    const _validation = () => {
      const {email,password, } =
        state;
    
      if (util.stringIsEmpty(email)) {
          util.errorMsg('Enter Email Address');
          setLoader(false);
          return false;
        }
        if (util.stringIsEmpty(password)) {
          util.errorMsg('Enter Password');
          setLoader(false);
          return false;
        }
     
      return true;
    };
    const [isConnected,setIsConnected]=React.useState(true);
    React.useEffect(()=>{
  
      const unsubscribe=NetInfo.addEventListener(state=>{
      setIsConnected(state.isConnected);
      })
      return ()=>{
        unsubscribe();
      }
  }) 
  
    const resetForm = () => {
      setState({
          email: ' ',
          password: ' ',
      });
    };
  
  
    const onRegister =async () => {
      setLoader(true);  
      if(!isConnected){
        setLoader(false);
        util.errorMsg("Please connect your internet connection");
        return false;
      }
     
      if (!_validation()) {
        return false;
      } 
      else{
        postData();
    }
  }
  async function postData() {
    try {
      navigation.navigate("DemoScreen")
      const apiUrl = "https://amplepoints.com/apiendpoint/login?";
  
      console.log("stat",state.email)
      const formData = new FormData();
    
      formData.append("username", `"${state.email || ''}"`);
      formData.append("password",`"${state.password || ''}"`);
      const headers = {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
      };
  
  
      const response = await axios.post(apiUrl, formData, { headers });
  console.log("Response ",response.data)

      // if()
    
     if(response.data.message=='Invalid Email and Password'){
      setLoader(false);
      util.errorMsg("Invalid Email and Password");
      return false;
     }
     
     const data=response.data.data.user_id;
     console.log("Verified",data)
      if(response.data.data.is_verified){
        
        setLoader(false);
        util.errorMsg("User not registered");
     
      }
      else{
        resetForm();
        setLoader(false)
        navigation.navigate("DemoScreen")
      }
      console.log("Response ",response.data.data.is_verified)
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  }
    const HomeScreen=()=>{
      navigation.navigate("DemoScreen")
    }
   
return (
<View>
  <ImageBackground style={styles.ImageContainer} source={require('../assets/BackgroundImage.png')}>
  <TouchableOpacity onPress={SignUPScreen} style={styles.TouchContainer}>
  <Text style={styles.TextContainer}>Sign Up</Text>
  </TouchableOpacity>
  <View style={{borderRadius: Metrics.ratio(40), backgroundColor: '#F0F1EC',top:Metrics.ratio(320), padding: Metrics.ratio(20)}}>
  <View style={styles.ViewContainer2}>
    <Text style={{fontSize: 30, color: 'black', fontWeight: '500', paddingLeft: Metrics.ratio(30)}}>Login</Text>
    
    <MainTextInput
      onChangeText={t => _handleTextChange('email', t)}
      value={state.email}
      label="Email"
      placeholder=""
      autoCapitalize={'none'}
    />
    
    <MainTextInput
      onChangeText={t => _handleTextChange('password', t)}
      value={state.password}
      label="Password"
      secureTextEntry={true}
      placeholder=""
      autoCapitalize={'none'}
    />

    <View style={styles.buttonView}>
      <Button
        loader={loader}
        btnPress={onRegister}
        label={"Login"}
      />
    </View>

    <TouchableOpacity onPress={ForgotScreenMove}>
      <Image style={styles.trolleyIcon} source={require('../assets/Lock.png')}></Image>
      <Text style={{fontSize: 13, color: 'black', paddingLeft: Metrics.ratio(130), bottom: Metrics.ratio(4), fontWeight: '500'}}>Forgot Password</Text>
    </TouchableOpacity>

    <View>
    </View>
  </View>
  <Toast ref={ref => Toast.setRef(ref)} />
</View>

</ImageBackground>
</View>  
)
}
const styles=StyleSheet.create({
  ViewContainer2:{
  borderRadius:Metrics.ratio(20),
  backgroundColor:'#F0F1EC',
  },
  socialButtonContainer: {
    marginTop:Metrics.ratio(10),
    paddingBottom:Metrics.ratio(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    
  },
  socialButton: {
    backgroundColor: 'white', // Set your desired background color for the buttons
    width: Metrics.vw * 18,
    height: Metrics.vh * 6,
    borderRadius: Metrics.ratio(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonIcon: {
    width: Metrics.ratio(95),
    height: Metrics.ratio(25),
    resizeMode: 'contain',
  }, 
  buttonView: {
    top:Metrics.ratio(15),
        height:Metrics.vh*5,
        backgroundColor:'#FF2F00',
        borderRadius:Metrics.ratio(70),        
        marginBottom: Metrics.ratio(10),
        width: Metrics.vw * 50,
        marginHorizontal: Metrics.vw * 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center'
      },
    ViewContainer:{
      borderRadius:Metrics.ratio(20),
      backgroundColor:'#FDFDFD',
    },
    ImageContainer: {
      // Your image styles here
      width:300, // Adjust as needed
      height: Metrics.ratio(200), // Adjust as needed

    },
    TextContainer: {
      fontSize:15,
      color: '#FF4001', // Optional: set the text color
      fontWeight:'bold'
    },
    TouchContainer:{
      position: 'absolute',
      top: Metrics.ratio(5), // Adjust as needed
      right: 5, // Adjust as needed// Optional: add a background color to make the text more readable
      paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
    },
    Text2Container:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(190),
        fontSize:15,
        color:'#EC6A31',
        fontWeight:'bold', 
      },
      ImageContainer:{
       backgroundColor:'white',
        width: Metrics.ratio(380), 
        height: Metrics.ratio(420),
      },
      textContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#083166',
        marginLeft: Metrics.ratio(20),
      },
      productList: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      
      productItem: {
        backgroundColor:'#FFFF',
        margin: Metrics.ratio(10),
        borderRadius:5,
        elevation:3
      },
      productImage: {
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:Metrics.smallMargin,
        width: Metrics.ratio(80),
        height: Metrics.ratio(80),
        
      },
      ProductContainer:{
        color:'black',
            },
      heartButton: {
        width: Metrics.ratio(30),
        height: Metrics.ratio(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'white',
        borderRadius: Metrics.borderRadius,
      },
     
      trolleyIconContainer: {
        position: 'absolute',
        bottom: Metrics.ratio(5),
        right: Metrics.ratio(5),
        backgroundColor: 'transparent',
      },
    trolleyIcon: {
    
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    left:Metrics.ratio(100),
    top:Metrics.ratio(15)
  },
  colorContainer: {
    width: Metrics.ratio(15),
    height: Metrics.ratio(15),
    borderColor:'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Metrics.ratio(5),
    margin:Metrics.ratio(1),
  },
  OptionContainer:{
    
  flexDirection:'row',
  justifyContent:'left'
  }  ,
  SizeContainer:{
    borderColor:'black',
    
    marginLeft:Metrics.ratio(25)
  },
  OptionTextContainer:{
    color:'#E8A08D'
  }
})
export default Login;
