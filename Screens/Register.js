import  React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { StyleSheet,} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {Colors, Metrics} from '../themes';
import MainTextInput from '../components/MainTextInput';
import NetInfo from '@react-native-community/netinfo'
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import util from '../helpers/util';
import { auth, db } from './Firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { CheckBox } from 'react-native-elements';
import Login from './Login';
 

const Register=({navigation})=> {
 const [isChecked,setChecked]=useState(false)
 const [loader,setLoader]=React.useState(false);
  const [state, setState] = React.useState({
    email: '',
    password: '',  
    name: '',
    birthday:'',
   confirmPassword:'',

  });
  const [isConnected,setIsConnected]=React.useState(true)

  const LoginScreen=()=>{
    navigation.navigate("Login")
  }
  const _handleTextChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  React.useEffect(()=>{
  
    const unsubscribe=NetInfo.addEventListener(state=>{
    setIsConnected(state.isConnected);
    })
    return ()=>{
      unsubscribe();
    }
}) 
 

  const _validation = () => {
    const {email, name, confirmPassword,password,birthday } =
      state;
    if (util.stringIsEmpty(name)) {
      util.errorMsg('Enter User Name');
      setLoader(false);
      return false;
    }
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
    if (util.stringIsEmpty(confirmPassword)) {
      util.errorMsg('Enter Confirm Password');
      setLoader(false);
      return false;
    }
  
    if (util.stringIsEmpty(birthday)) {
        util.errorMsg('Enter Birthday Date');
        setLoader(false);
        return false;
      }

   
     
    return true;
  };
  const onRegister = () => {
    setLoader(true);
    if (!_validation()) {
      return false;
    } else{
        if(isConnected){
     createUserWithEmailAndPassword(auth,state.email,state.password).then(userCredentials=>{
        onRegisterApiCall();
      
     })
     .catch((err) => {
      console.log(err)
      if (err.code === 'auth/email-already-in-use') {
        util.errorMsg("Email Already in use")
        setLoader(false);
        return false;
    
      }
      if (err.code === 'auth/wrong-password') {
        util.errorMsg("Wrong Password")
        setLoader(false);
        return false;
    
      }
      if (err.code === 'auth/invalid-email') {
    util.errorMsg("Invalid Email");
    setLoader(false);
    return false;
      }
    });}
    
    else{
      util.errorMsg("Please connect internet connection");
      setLoader(false);
      return false;
    }
}  
  };

  const onRegisterApiCall = async ()=> {
  
    await db.collection("Registration").add({
        Name:state.name,
        Email:state.email,
        BirthdayDate:state.birthday,
       }).then(()=>{
        setLoader(true);
        navigation.navigate("Login") 
       }).catch((error)=>console.log(error))
  
   resetForm();
   util.successMsg("Successfully Registered")
  };

  const resetForm = () => {
    setState({
        email: '',
        password: '',
        cnic: '',
        name: '',
        phone: '',
     vehcile:'',
             password: '',
      
    });
  };

  return (
      <SafeAreaView style={styles.container}>
         <View style={styles.logoView}>
         <Text style={{fontSize:30,color:'black'}}>Register Screen</Text>
        </View>
        
        <ScrollView>
          <View style={styles.registeredContainer}>
            <MainTextInput
             
              onChangeText={t => _handleTextChange('name', t)}
              value={state.name}
              label="First Name"
              placeholder=""
              //   keyboardType=''
              autoCapitalize={'none'}
            />
              <MainTextInput
             
             onChangeText={t => _handleTextChange('name', t)}
             value={state.name}
             label="Last Name"
             placeholder=""
             //   keyboardType=''
             autoCapitalize={'none'}
           />

            <MainTextInput
              
              onChangeText={t => _handleTextChange('email', t)}
              value={state.email}
              label="Email"
              placeholder=""
              keyboardType={'email-address'}
              autoCapitalize={'none'}
            />
            <MainTextInput
            
              secureTextEntry={true}
              onChangeText={t => _handleTextChange('password', t)}
              value={state.password}
              label="Password"
              autoCapitalize={'none'}
              rightIcon={true}
              passowrdhide={true}
            />
             <MainTextInput
             
              secureTextEntry={true}
              onChangeText={t => _handleTextChange('confirmPassword', t)}
              value={state.confirmPassword}
              label="Confirm Password"
              autoCapitalize={'none'}
              rightIcon={true}
              passowrdhide={true}
            />
            <MainTextInput
            
              onChangeText={t => _handleTextChange('birthday', t)}
              value={state.birthday}
              label="Mobile "
              placeholder=""
              keyboardType="number-pad"
              autoCapitalize={'none'}
            />
              <MainTextInput
            
            onChangeText={t => _handleTextChange('birthday', t)}
            value={state.birthday}
            label="Referral No"
            placeholder=""
            keyboardType="number-pad"
            autoCapitalize={'none'}
          />
           <MainTextInput
            
            onChangeText={t => _handleTextChange('birthday', t)}
            value={state.birthday}
            label="Store ReferralNo"
            placeholder=""
            keyboardType="number-pad"
            autoCapitalize={'none'}
          />

            <View style={styles.bottomContainer}>
              <View style={styles.buttonView}>
                <Button loader={loader}
                  btnPress={onRegister}
                  label={"SignUp"}
                />
              </View>
            </View>
            
          </View>
          
         
            <View style={styles.socialButtonContainer}>
          
            <View style={{flexDirection:'row',}}>
  <Text style={{ color: 'black', fontSize: 15 }}>Have an account?</Text>
  <TouchableOpacity onPress={LoginScreen} style={{ paddingRight: Metrics.ratio(10) }}>
    <Text style={{ color: '#FF2F00', fontSize: 15, fontWeight: '600' }}>Login</Text>
  </TouchableOpacity>
</View>
        </View>
        </ScrollView>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    
  );
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.background.primary,
      },
      header: {
        backgroundColor: Colors.themeColor,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: Metrics.ratio(15),
        // paddingHorizontal:Metrics.ratio(5),
      },
      leftIconView: {
        paddingHorizontal: Metrics.ratio(10),
        height: Metrics.ratio(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparent,
      },
      scrollContainer: {
        flex: 1,
        paddingHorizontal: Metrics.smallMargin,
      },
      logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Metrics.ratio(5),
    
        marginBottom: Metrics.ratio(20),
      },
      textHeader: {
        textAlign:'center',
        alignContent:'center',
        color: Colors.white,
        fontSize: Metrics.ratio(20),
        fontWeight: 'bold',
        paddingLeft: Metrics.ratio(20),
      },
      socialButtonContainer: {
        marginTop:Metrics.ratio(20),
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
      logo: {
        resizeMode: 'contain',
        width: Metrics.ratio(200),
        height: Metrics.ratio(170),
      },
      logoText: {
        color: Colors.descriptionColor,
        marginTop: Metrics.ratio(-20),
        marginBottom: Metrics.ratio(20),
      },
      forgotPassowordView: {
        alignItems: 'flex-end',
        padding: Metrics.ratio(10),
      },
      forgotPasswordText: {
        color: Colors.descriptionColor,
        textDecorationLine: 'underline',
        fontSize: Metrics.ratio(12),
      },
      buttonView: {
        height:Metrics.vh*5,
        backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
        marginTop: Metrics.ratio(20),
        width: Metrics.vw * 90,
        marginHorizontal: Metrics.vw * 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center'
      },
     
      backView: {
        
borderRadius:Metrics.ratio(30),
        marginTop: Metrics.ratio(20),
        width: Metrics.vw * 60,
        marginHorizontal: Metrics.vw * 20,
        justifyContent: "center",
        alignItems: "center",
      },
      iconStyle: {
        fontSize: Metrics.ratio(20),
        color: Colors.themeColor,
      },
      bottomContainer: {
        flex: 1,

        // backgroundColor: "red",
      },
    
      genderRow: {
        flex: 1.5,
        flexDirection: 'row',
        paddingVertical: Metrics.ratio(10),
    
        paddingHorizontal: Metrics.ratio(10),
      },
      genderView: {
        borderBottomColor: Colors.borderColor,
        flex: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 50,
      },
      iconsRound: {
        width: Metrics.ratio(45),
        height: Metrics.ratio(45),
        borderRadius: Metrics.ratio(90),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.themeColor,
        backgroundColor: Colors.transparent,
      },
      genderBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Metrics.ratio(10),
        // peddingLeft: Metrics.ratio(10),
      },
      genderText: {
        paddingLeft: Metrics.ratio(5),
        paddingRight: Metrics.ratio(5),
      },
      registeredContainer: {
        marginTop: Metrics.ratio(10),
      },
      rowView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      main: {
        overflow: "hidden",
        borderRadius: Metrics.borderRadius,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        minHeight: Metrics.ratio(50),
        marginVertical: Metrics.ratio(8),
        marginHorizontal: Metrics.ratio(10),
    },
    dropDownView:{
      flex:1,
      borderBottomWidth: 1,
      borderBottomColor:Colors.borderColor
      
    }
})
export default Register;

