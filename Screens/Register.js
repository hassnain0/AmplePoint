import  React,{useState,
  State} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { StyleSheet,} from 'react-native';
import {Colors, Metrics} from '../themes';
import MainTextInput from '../components/MainTextInput';
import NetInfo from '@react-native-community/netinfo'
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import util from '../helpers/util';
import Login from './Login';
import OTP from './OTP';
 import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
const Register=({navigation})=> {
 const [loader,setLoader]=React.useState(false);
  const [state, setState] = React.useState({
    email: '',
    password: '', 
    confirmPassword: '',  
    first_name: '',
    last_name: '',
    mobile:'',
    referral_no:'',
    Store_referral_no:'',
    term_accepted:false

  });
  const [isConnected,setIsConnected]=React.useState(true)

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
const [isChecked, setIsChecked] = useState(false);


  const _validation = () => {
    if(!isConnected){
      setLoader(false)
      util.errorMsg("Please connect your internet Connection");
      return false;
    }
    const {email,last_name, first_name, referral_no,password,confirmPassword,mobile,Store_referral_no,} =
      state;
    if (util.stringIsEmpty(first_name)) {
      util.errorMsg('Enter First Name');
      setLoader(false);
      return false;
    }
    if (util.stringIsEmpty(last_name)) {
      util.errorMsg('Enter Last Name');
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
    if(password!=confirmPassword){
      setLoader(false);
      util.errorMsg("Password and Confirm Password must be same")
      return false;
    }
    if (util.stringIsEmpty(mobile)) {
      util.errorMsg('Enter Mobile Number');
      setLoader(false);
      return false;
    }
  
    if (util.stringIsEmpty(referral_no)) {
        util.errorMsg('Enter Referral Number');
        setLoader(false);
        return false;
      }

      if (util.stringIsEmpty(Store_referral_no)) {
        util.errorMsg('Enter Store Referral Number');
        setLoader(false);
        return false;
      }

      if (!isChecked) {
        util.errorMsg('Please Accept terms and condition');
        setLoader(false);
        return false;
      }

    
    return true;
  };

  const Bounce=()=>{
    setIsChecked(true)
  }
  const onRegister = async() => {
  
    setLoader(true);
    if (!_validation()) {
      return false;

      
    } else{
      // Call the async function
postData();

// resetForm();
// navigation.navigate('Login')
  };
}
async function postData() {
  try {
    const apiUrl = "https://amplepoints.com/apiendpoint/register";

 
    const formData = new FormData();
    formData.append("first_name",state.first_name);
    formData.append("last_name",state.last_name);
    formData.append("email", state.email);
    formData.append("password",state.password);
    formData.append("mobile", state.mobile);
    formData.append("referral_no", state.referral_no);
    formData.append("store_referral_no", state.Store_referral_no);
    formData.append("term_accepted", state.term_accepted);

    const headers = {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
    };


    const response = await axios.post(apiUrl, formData, { headers });
console.log("Response of Hello",response.data)
if(response.data.message=='You are Register Successfully'){
  setLoader(false);
  resetForm();
  util.successMsg(response.data.message)
  navigation.navigate("Login")
}    
if(response.data.message=='Email Already Exists'){
      setLoader(false);
      util.errorMsg("Email Already Exist")
      return false;
    }
    if(response.data.message=='Invalid data'){
      setLoader(false);
      util.errorMsg("Invalid data")
      return false;
    }
    
    // Handle the response as needed
   
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
}

const resetForm = () => {
    setState({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword:'',
        referral_no: '',
        Store_referral_no:'',
      Term_accepted:'',
    });
  };

  return (
      <SafeAreaView style={styles.container}>
       <ImageBackground style={styles.ImageContainer} source={require('../assets/Register.jpg')}>

     <ScrollView>
        
          <View style={{top:Metrics.ratio(120)}}>
            <MainTextInput
              onChangeText={t => _handleTextChange('first_name', t)}
              value={state.first_name}
              label="First Name"
              placeholder=""
              //   keyboardType=''
              autoCapitalize={'none'}
            />
              <MainTextInput
             
             onChangeText={t => _handleTextChange('last_name', t)}
             value={state.last_name}
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
            
              onChangeText={t => _handleTextChange('mobile', t)}
              value={state.mobile}
              label="Mobile "
              placeholder=""
              keyboardType="number-pad"
              autoCapitalize={'none'}
            />
              <MainTextInput
            
            onChangeText={t => _handleTextChange('referral_no', t)}
            value={state.referral_no}
            label="Referral No"
            placeholder=""
            keyboardType="number-pad"
            autoCapitalize={'none'}
          />
           <MainTextInput
            
            onChangeText={t => _handleTextChange('Store_referral_no', t)}
            value={state.Store_referral_no}
            label="Store Referral No"
            placeholder=""
            keyboardType="number-pad"
            autoCapitalize={'none'}
          />
          <View style={{flex:1,flexDirection:'row',top:Metrics.ratio(10)}}>
        <BouncyCheckbox
        style={{marginTop: Metrics.ratio(1),left:Metrics.ratio(10)}}
        isChecked={isChecked}
        onPress={Bounce}/>
           <View>
  <Text style={{right: Metrics.ratio(5), fontWeight: '600', color: 'black',}}>By Creating an account, you agree to AmplePoint.com's  </Text>
</View>
      </View>
      <Text style={{fontWeight: '600', color: 'black',left:Metrics.ratio(30)}}> <Text style={{color: '#487BBC'}}>Terms of Use </Text>AND<Text style={{color: '#487BBC'}}>Privacy Policy</Text>
</Text>
     <View style={styles.bottomContainer}>
              <View style={styles.buttonView}>
                <Button loader={loader}
                  btnPress={onRegister}
                  label={"SignUp"}
                />
              </View>
            </View>
            <View style={styles.socialButtonContainer}>
<View style={{flexDirection:'row',}}>
</View>
        </View>
        <Text style={{ color: 'black', fontSize: 15,fontWeight:'500',left:Metrics.ratio(120) }}>Continue with Google</Text>
        <View style={styles.socialButtonContainer}>
          
          <TouchableOpacity style={styles.socialButton}>  
            <Image source={require('../assets/google.png')} style={styles.socialButtonIcon} />
          </TouchableOpacity>
        </View>            
          </View>
          <Toast ref={ref => Toast.setRef(ref)} />
        </ScrollView>
        </ImageBackground>
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
        marginTop: Metrics.ratio(5)
      },
      ImageContainer: {
        bottom:Metrics.ratio(60),
        // Your image styles here
        width: Metrics.ratio(400), // Adjust as needed
        height: Metrics.ratio(800), // Adjust as needed
  
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
