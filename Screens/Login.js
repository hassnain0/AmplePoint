import { useFocusEffect } from "@react-navigation/native"
import { BackHandler, StyleSheet } from "react-native";
import { Colors, Metrics } from '../themes';
import  React, { useEffect } from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image,Alert} from 'react-native';
import MainTextInput from '../components/MainTextInput';
import Icon from '../helpers/Icons';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import util from '../helpers/util';
import { signInWithEmailAndPassword, } from "@firebase/auth";
import NetInfo from '@react-native-community/netinfo'
import { useState } from "react";
import Register from "./Register";
import Home from "./Home";
import { auth,  } from "./Firebase";


const   Login=({navigation}) =>{

  const [loader, setLoader] = React.useState(false);
  const [state, setState] = React.useState({email: '', password: ''});
  const _handleTextChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    });
  };

const [isConnected,setIsConnected]=useState(true)
                   
 
React.useEffect(()=>{
  
  const unsubscribe=NetInfo.addEventListener(state=>{
  setIsConnected(state.isConnected);
  })
  return ()=>{
    unsubscribe();
  }
}) 

const RegisterScreen=()=>{
  navigation.navigate('Register')
}
// const checkUser=async(email)=>{
//   try {
//     const mechanicsCollection = db.collection('Registration');
//     const querySnapshot = await mechanicsCollection.where('Email', '==', email).get();

    
//   // Check if there's a matching document
//   if (!querySnapshot.empty) {
//     // Assuming there's only one matching document
//     const doc = querySnapshot.docs[0];

//     // Access the "Identity" field from the document data
//     const value = doc.data().Identity;
   
    
//         if (doc.exists) {
       
//           if(value=='Admin'){
//           return value;
//           }
//           else if(value=='User'){
        
//             return value;
//           }
//           else if(value=='Mechanic'){
//             if(doc.data().Status=='Enabled'){
//               return value;
//             }
//             else
//             { 
//               util.errorMsg("Please wait until adminsitrator allows you") 
//               return  false;
//               }
//           }
//           else{
//             return false
//           }
//     }
//   };

//   } catch (error) {
//     console.error('Error fetching identity:', error);
//     return null; // Return null in case of an error.
//   }
// }
const SignUpUser=()=>{
  navigation.navigate("Register")
}

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
  const loginUserCheck = async () => {
    if(!isConnected){
      util.errorMsg("Please connect Internet Connection")
      return false;
    }
    setLoader(true)
    try {
      if (state.email == '') {
        setLoader(false)
        util.errorMsg('Enter Email Address');
        return;
      } else if (state.password == '') {
        setLoader(false)
        util.errorMsg('Enter Password');
        return;
      }
      await login();
    } catch (error) {
      console.log('exception', error);
    }
  };

  const login = async () => {
    navigation.navigate("GiftCard");
    try {
      
      
      
    } catch (e) {
  
      console.log('Exception => login', e);
    }


  };

  const resetForm=()=>{
    setState({
      email:'',
      password:'',
    })
  }
  return (
   
      <SafeAreaView style={styles.container}>
        <View style={styles.logoView}>
       <Text style={{fontSize:30,color:'black'}}>Login Screen</Text>
        </View>
        
        <MainTextInput
          Icon={
            <Icon.MaterialCommunityIcons
              name="email"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('email', t)}
          value={state.email}
          label={'Email'}
          
          placeholder=""
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />

        <MainTextInput
          secureTextEntry={true}
          onChangeText={t => _handleTextChange('password', t)}
          value={state.password}
          label={'Password'}
          color={Colors.themeColor}
          autoCapitalize={'none'}
          rightIcon={true}
          passowrdhide={true}
        />

        <View style={styles.bottomContainer}>
          <View style={styles.buttonView}>
            <Button loader={loader} btnPress={login}  label={'Login'} />
          </View>
        
          
        <TouchableOpacity
           
            style={styles.RegisterView}>
            <Text style={styles.registerText}>Forgot Password ?</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',paddingTop:Metrics.ratio(20), alignContent:'center',alignSelf:'center'}}>
  <Text style={{ color: 'black', fontSize: 15 , }}>Don't have an account?</Text>
  <TouchableOpacity onPress={RegisterScreen} style={{ paddingRight: Metrics.ratio(10) }}>
    <Text style={{ color: '#FF2F00', fontSize: 15, fontWeight: '600'  }}>Sign UP</Text>
  </TouchableOpacity>
</View>
        </View>
        
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
   
  );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.background.primary,
      },
      scrollContainer: {
        flex: 1,
        paddingHorizontal: Metrics.smallMargin,
      },
      logoView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: Metrics.ratio(10),
        height: Metrics.screenHeight * 0.3,
        // marginBottom: Metrics.ratio(10),
        // backgroundColor: "red",
      },
    
      logo: {
        resizeMode: "contain",
        width: Metrics.ratio(200),
        height: Metrics.ratio(900),
      },
      logoText: {
        color: Colors.descriptionColor,
        marginTop: Metrics.ratio(-20),
        marginBottom: Metrics.ratio(20),
      },
      forgotPassowordView: {
        alignItems: "flex-end",
        padding: Metrics.ratio(10),
      },
      forgotPasswordText: {
        color: Colors.descriptionColor,
        textDecorationLine: "underline",
        fontSize: Metrics.ratio(12),
      },
      buttonView: {
        height:Metrics.vh*5,
        backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
        marginTop: Metrics.ratio(20),
        width: Metrics.vw * 80,
        marginHorizontal: Metrics.vw * 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center'
      },
      RegisterView:{ 
      

        marginTop: Metrics.ratio(10),
        width: Metrics.vw * 60,
        marginHorizontal: Metrics.vw * 20,
        justifyContent: "center",
        alignItems: "center",
      },
      registerText:{
        marginLeft:Metrics.smallMargin,
        textAlign:'right',
        paddingTop:Metrics.ratio(10),
        fontSize:Metrics.ratio(16),
      },
      iconStyle: {
        fontSize: Metrics.ratio(20),
        color: '#083166',
      },
      bottomContainer: {
        flex: 1,
        marginBottom: Metrics.baseMargin,
        // backgroundColor: "red",
      },
      socialButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: Metrics.ratio(20),
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
})
export default Login;

