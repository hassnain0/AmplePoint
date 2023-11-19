import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Metrics } from '../themes';
import { OtpInput } from "react-native-otp-entry";
const OTP= () => {
  const [otp, setOTP] = useState('');

  const handleOTPEnter = () => {
    // Handle OTP submission logic here
    console.log('Entered OTP:', otp);
    // You can validate the OTP and navigate to the next screen
  };
const [count,setCount]=useState(60);
useEffect(()=>{
  setInterval(()=>{
    setCount(count-1) 
  })
})
  return (
    <View>
      <Text style={{color:'black',fontSize:20,alignSelf:'center',alignContent:'center',marginBottom:Metrics.ratio(50)}}>OTP Verification</Text>
 <OtpInput
  numberOfDigits={4}
  focusColor="orange"
  focusStickBlinkingDuration={500}
  onTextChange={(text) => console.log(text)}
  onFilled={(text) => console.log(`OTP is ${text}`)}
/>
<Text style={{alignItems:'center',alignSelf:"center",marginTop:Metrics.ratio(20)}}>Resend</Text>
<Text style={{alignItems:'center',alignSelf:"center",marginTop:Metrics.ratio(20)}}>{count}</Text>
</View>
);
};

const styles = StyleSheet.create({
  resendView:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginTop:Metrics.ratio(30),
    marginLeft:Metrics.ratio(10),
  }
});

export default OTP;
