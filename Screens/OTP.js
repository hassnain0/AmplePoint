import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Metrics } from '../themes';


const OTP= () => {
  const [otp, setOTP] = useState('');

  const handleOTPEnter = () => {
    // Handle OTP submission logic here
    console.log('Entered OTP:', otp);
    // You can validate the OTP and navigate to the next screen
  };

  return (
    <ScrollView
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
  >
    <Text style={styles.title}>Enter OTP</Text>

    <View style={styles.otpContainer}>
      {[1, 2, 3, 4].map((_, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          maxLength={1}
          keyboardType="numeric"
          value={otp[index]}
          onChangeText={(text) => {
            const newOTP = [...otp];
            newOTP[index] = text;
            setOTP(newOTP);
          }}
        />
      ))}
    </View>

    <TouchableOpacity style={styles.submitButton} onPress={handleOTPEnter}>
      <Text style={styles.submitButtonText}>Submit OTP</Text>
    </TouchableOpacity>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.ratio(20),
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
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTP;
