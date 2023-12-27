import React,{useState,} from 'react';
import {Image,TextInput, View,Text, StyleSheet,ScrollView, TouchableOpacity,Alert} from 'react-native';
import { Colors, Metrics } from '../themes';
import Button from '../components/Button';
import util from '../helpers/util';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
// import { Camera } from 'react-native-vision-camera';

const Contact=()=>{
  
  const [value, setValue] = useState('');
  const [reason,setReason]=useState('');
  const [loader, setLoader] = useState(false);
  const [message,setMessage]=useState(null)
  const [email,setEmail]=useState(null);
  const [phone,SetPhone]=useState(null);
  const [subject,SetSubject]=useState(null);
  const [isCustomer,setIsCustomer]=useState(true);
  const [isBussiness,setIsBussiness]=useState(false);
  const validation=()=>{
    setLoader(true)
    if(util.stringIsEmpty(email)){
      setLoader(false);
      util.errorMsg("Please enter  Email")
      return false;
    }
    if(util.stringIsEmpty(subject)){
      setLoader(false);
      util.errorMsg("Please enter subject")
      return false;
    }
    if(util.stringIsEmpty(phone)){
      setLoader(false);
      util.errorMsg("Please enter Phone Number")
      return false;
    }
    if(util.stringIsEmpty(message)){
      setLoader(false);
      util.errorMsg("Please enter Message")
      return false;
    }
    return true;
  }
 
  const Submit=async()=>{
setLoader(true);
    if(!validation()){
      return false;

    }
  try{

    const apiUrl='https://amplepoints.com/apiendpoint/submitcontact';
    let role='user';
    if(isCustomer){
        role='Customer'
    }
    else{
        role='Bussiness'
    }
    const formData = new FormData();
    formData.append('email',email);
    formData.append('role', 'Customer');
    formData.append('subject',subject);
    formData.append('phone', phone);
    formData.append('message', message);
    
   const headers = {
  "Content-Type": "multipart/form-data",
  "Accept": "application/json",
};

const response = await axios.post(apiUrl, formData, { headers });
console.log("Response of Return",response.data);

if(response.data.status=='S')
{setLoader(false);
  util.successMsg("Successfully Submitted")
}
else{
    setLoader(false);
    util.errorMsg("Something went wrong")
}
    }
    catch(error){
      setLoader(false)
      console.log("Error",error)
    }
  }

  const handleCustomer=()=>{
    setIsCustomer(true)
    setIsBussiness(false)
 }
 const handleBussiness=()=>{
     setIsCustomer(false)
     setIsBussiness(true)
  }
        return (
            <>
              <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.leftIconView}
            onPress={() => console.log('navigation', navigation.goBack())}>
          <Image source={require('../assets/ArrowBack.png')} style={{width:28,height:28}}/>
          </TouchableOpacity>
          <Text style={styles.textHeader}>Contact Us</Text>
        </View>
        
            <ScrollView style={{flex:1, flexDirection:"column",backgroundColor:'white',}}>
            <View  style={{flex:1,flexDirection:'row',backgroundColor:'#F1F0F7',height:Metrics.ratio(25),justifyContent: 'space-between',}}>
                  <Text style={{left:0,color:'black',fontSize:10,textAlign:'center',fontWeight:'500',marginLeft:Metrics.ratio(10),fontFamily: Platform.select({
    ios: 'Times New Roman',
    android: 'Times New Roman', // You may need to adjust this for Android
  }),}}>Contact Info</Text>
                    </View>
             <View >
                <Text style={{fontSize:15,fontWeight:'600', color:'black',marginLeft:Metrics.ratio(10)}}>
                    Ample Points
                </Text>
                <Text style={{fontSize:10,fontWeight:'400', color:'black',marginLeft:Metrics.ratio(10)}}>
                    3070 w post Road suite # 105 Las Vegas  NV 89118
                </Text>
          <View style={styles.horizontalLine} />
          <View style={{flex:1, flexDirection:'row'}}>
            <Image source={require('../assets/Phone.png')} style={{width:20,height:20,marginLeft:Metrics.ratio(10)}}></Image>
            <Text style={{fontSize:12,fontWeight:'400', color:'black',marginLeft:Metrics.ratio(10)}}>
                    702 799 9321
                </Text>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <Image source={require('../assets/Mail.png')} style={{width:20,height:20,marginLeft:Metrics.ratio(10)}}></Image>
            <Text style={{fontSize:12,fontWeight:'400', color:'black',marginLeft:Metrics.ratio(10)}}>
                    hello@amplepoints.com
                </Text>
          </View>
          <View style={{backgroundColor:'#B6B8B5',height:Metrics.ratio(10),width:'100%',marginTop:Metrics.ratio(20)}}>
</View>
<Text style={{fontSize:15,fontWeight:'600', color:'black',marginLeft:Metrics.ratio(10)}}>
                    How can we Help you ?
                </Text>
                <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      marginLeft:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    color:'black',
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Email Address</Text>
    <TextInput placeholder='Email Address'  value={email} onChangeText={(text)=>setEmail(text)}   textAlign='left'   auto style={styles.InputContainer} ></TextInput>
    <Text style={{ top: Metrics.ratio(10),
     marginLeft:Metrics.ratio(10), paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    color:'black',
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Subject</Text>
    <TextInput placeholder='Subject' onChangeText={(text)=>SetSubject(text)} value={subject} textAlign='left'   auto style={styles.InputContainer} ></TextInput>
    <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
      marginLeft:Metrics.ratio(10),
    left: 0,
    color:'black',
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Phone Number</Text>
    <TextInput placeholder='Phone Number'  onChangeText={(text)=>SetPhone(text)} value={phone}  textAlign='left'   auto style={styles.InputContainer} ></TextInput>
    <Text style={{fontSize:12,fontWeight:'400', color:'black',marginLeft:Metrics.ratio(10)}}>
                    I am a
                </Text>
                <View style={styles.rowContainer}>
        {/* First Radio Button */}
        <RadioButton.Group onValueChange={handleCustomer} value={isCustomer.toString()}>
          <RadioButton.Item color='red' label={"Customer"} labelStyle={styles.radioButtonLabel} value="true" />
        </RadioButton.Group>

        {/* Second Radio Button */}
        <RadioButton.Group onValueChange={handleBussiness} value={isBussiness.toString()}>
          <RadioButton.Item color='red' label={"Bussiness"} labelStyle={styles.radioButtonLabel} value="true" />
        </RadioButton.Group>
      </View>
                <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
      marginLeft:Metrics.ratio(10),
    left: 0,
    color:'black',
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Message</Text>
     <TextInput placeholder='Message' value={message}  onChangeText={(text)=>setMessage(text)} textAlign='left'   auto style={styles.InputContainer2} ></TextInput>
                   </View>
             
        <Toast ref={ref => Toast.setRef(ref)} />
        <View style={styles.buttonView}>
    <Button 
    loader={loader}
      btnPress={Submit}
      label={"Submit"}
    />
  </View>
       </ScrollView>
       </>
    )
}
const styles = StyleSheet.create({
  buttonView: {
    height:Metrics.vh*5,
    backgroundColor:'#FF2F00',
    borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    

  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'left', // Align items at the center horizontally
    alignItems: 'center', // Align items at the center vertically
    marginVertical: 10,
  },
  radioButtonLabel: {
    color: 'black',
    fontSize:10,
  },
    InputContainer:{
     marginLeft:Metrics.ratio(10),
      marginTop:Metrics.ratio(3),
      marginBottom:Metrics.ratio(10),
      backgroundColor:'#F1F0F7',
      borderRadius:5,
      fontSize:15,
     width:'100%',
     height:Metrics.ratio(80),
    },
    InputContainer2:{
        marginTop:Metrics.ratio(3),
        marginBottom:Metrics.ratio(10),
        backgroundColor:'#F1F0F7',
        borderRadius:5,
        fontSize:15,
       width:'100%',
       height:Metrics.ratio(80),
      },
    icon: {
      width: Metrics.ratio(15),
      height:  Metrics.ratio(15),
    },
    button4: {
      color:'white',
      backgroundColor: '#FC3F01',
  borderRadius: 5,
  top:Metrics.ratio(40),
  width:Metrics.ratio(80),
  height:Metrics.ratio(40),
  left:Metrics.ratio(110)
    },
    buttonText: {
      color: 'white',
      fontSize:15,
      top:Metrics.ratio(5),
      textAlign:'center',
      borderRadius:20
    },
    ImageContainer:{
      width: Metrics.ratio(90), 
      height: Metrics.ratio(90),
      bottom:Metrics.ratio(30)
    },
    button: {
      color:'white',
      backgroundColor: '#FC3F01',
  borderRadius: 5,
  bottom:Metrics.ratio(30),
  right:Metrics.ratio(40)
    },container3: {
      right:Metrics.ratio(30),
    left:Metrics.ratio(20),
     top:Metrics.ratio(20),
      alignItems: 'center',
      flex:1,
      flexDirection:'row'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: Metrics.ratio(20),
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
      marginBottom: Metrics.ratio(20),
    },
    otpInput: {
      borderBottomWidth: 2,
      borderBottomColor: '#333',
      fontSize: 20,
      textAlign: 'center',
      width: '20%',
    },
    submitButton: {
      backgroundColor: '#FF4001',
      paddingVertical: Metrics.ratio(12),
      paddingHorizontal: Metrics.ratio(20),
      borderRadius: Metrics.ratio(8),
    },
    container2: {
      left:Metrics.ratio(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      justifyContent: 'space-around',
    },
    quantityText: {
      backgroundColor:'white',
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      bottom:Metrics.ratio(30),
      marginLeft:Metrics.ratio(10),
      marginRight:Metrics.ratio(10)
  
      
    },
    header: {
        backgroundColor:'#ff3d00',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal:Metrics.ratio(5),
      },
      leftIconView: {
        paddingHorizontal: Metrics.ratio(25),
        height: Metrics.ratio(20),
        width:Metrics.ratio(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparent,
      },
      textHeader: {
        textAlign:'center',
        alignContent:'center',
        color: Colors.white,
        fontSize: Metrics.ratio(15),
        paddingLeft: Metrics.ratio(20),
        
      },
    button1: {
      backgroundColor: '#C9CBC8',
  borderRadius: 1,
  bottom:Metrics.ratio(30),
  left:Metrics.ratio(40)
    },button3: {
      color:'white',
      backgroundColor: '#FC3F01',
  borderRadius: 5,
  width:Metrics.ratio(80),
  height:Metrics.ratio(40),
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    }, 
    TouchContainer1:{
      position: 'absolute',
      top: Metrics.ratio(-40), // Adjust as needed
      left: Metrics.ratio(55), // Adjust as needed// Optional: add a background color to make the text more readable
      paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
    },
    TouchContainer2:{
      position: 'absolute',
      bottom: Metrics.ratio(50), // Adjust as needed
      left: Metrics.ratio(-30), // Adjust as needed// Optional: add a background color to make the text more readable
      // Optional: add padding for better visibility
    },
    TextContainer1:{
      paddingTop:Metrics.ratio(20),
      paddingLeft:Metrics.ratio(20),
      fontSize:15,
      color:'white',
      fontWeight:'bold',
  },
  TextContainer2:{
    paddingTop:Metrics.ratio(20),
    paddingLeft:Metrics.ratio(20),
    fontSize:15,
    color:'white',
    fontWeight:'bold',
  },
  dropdown: {
    height: 35,
    borderWidth: 0.5,
    backgroundColor:'#F1F0F7',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },container: {
    backgroundColor: '#D5D5D5',
    padding: 16,
  },
  horizontalLine: {
    borderBottomColor: 'black', // Change the color as needed
    borderBottomWidth: 0.5,
    marginVertical: 10, // Adjust the margin as needed
  },
  InputContainer:{
    backgroundColor:'#eeeeee',
    margin:Metrics.ratio(5),
    right:Metrics.ratio(10),
    borderRadius:2,
    borderWidth:0.5,
    borderColor:'#C1C3C0',
    fontSize:12,
   width:'100%',
   alignItems:'center',
   height:Metrics.ratio(38),
  },
  });
export default Contact;