// components/ForgotPassword.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import util from '../helpers/util';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const ForgotScreen = ({ navigation }) => {

    const [isConnected,setIsConnected]=React.useState(true)
   const [email_password,setEmail]=React.useState('');
   
    
    React.useEffect(()=>{
  
        const unsubscribe=NetInfo.addEventListener(state=>{
        setIsConnected(state.isConnected);
        })
        return ()=>{
          unsubscribe();
        }
    }) 
 const handleChange=async()=>{
 
  if(!isConnected){
    util.errorMsg("Please connect internet connection")
    return;
  }
  if(util.stringIsEmpty(email_password)){
    util.errorMsg("Please enter Email"); 
    return ;  
  }
  else{
              try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/forgotpassword'; 
    
      const requestData = {
          email:email_password
      };
      await axios.post(apiUrl, requestData);
      // this.setState({ responseData: response.data, error: null });
    setEmail('');
    util.successMsg("Done")
    navigation.navigate("Login")
    } catch (error) {
     
      console.log(error)
    }
  }
 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Forgot Password</Text>
      
     
            <TextInput
              style={styles.input}
              placeholder="Email"
              textAlign='center'
              value={email_password} 
              onChangeText={text=>setEmail(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleChange}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          
          </View>
      
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ForgotScreen;
