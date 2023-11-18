import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Metrics } from '../themes';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const OTP= () => {
  const [otp, setOTP] = useState('');

  const handleOTPEnter = () => {
    // Handle OTP submission logic here
    console.log('Entered OTP:', otp);
    // You can validate the OTP and navigate to the next screen
  };

  return (
    <OTPInputView
    style={{width: '80%', height: Metrics.ratio(200)}}
    pinCount={4}
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
        console.log(`Code is ${code}, you are good to go!`)
    })}
/>

);
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default OTP;
