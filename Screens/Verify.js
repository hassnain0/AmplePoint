import React, { useState }  from "react";
import { View,ImageBackground,StyleSheet, Text, } from "react-native";
import { Metrics } from "../themes";
import { useRoute } from '@react-navigation/native';
import Button from "../components/Button";
import axios from "axios";
import util from "../helpers/util";

const Verify=({navigation})=>{
    const route=useRoute();
    const [loader,setLoader]=useState(false);
    const data=route.params.data
    
    const Resend=async()=>{
        setLoader(true);
     
        const apiUrl="https://amplepoints.com/apiendpoint/sendverificationemail?"
        const response = await axios.get(apiUrl, {
            params: {
              user_id: data.user_id,
            },
            
          }).then(()=>{
            setLoader(false);
            util.successMsg("Resend Successfull")
            navigation.navigate("Login")
console.log(response)
          }).catch((err)=>{
            console.log(err)
          })

    }
   return(    <
    ImageBackground style={styles.ImageContainer} source={require('../assets/Email.jpg')}>
    <View>
    <View style={{alignContent:'center',alignSelf:'center',paddingTop:Metrics.ratio(400)}}>
    <Text style={{color:'black',fontSize:15,backgroundColor:'white',borderRadius:Metrics.borderRadius,left:Metrics.ratio(10),marginRight:Metrics.ratio(20)}}>We have send a verification link email to {data.email} and verification link SMS to phone {data.mobile} you can verify your accoun by clicking on verification link send to email or phone.
    Please double check your spam folder if you didn't received verification email
    Didn't recieve yet?
    </Text>
    </View>
    <View style={styles.buttonView}>
    <Button 
    loader={loader}
      btnPress={Resend}
      label={"Resend Verification email"}
    />
  </View>
    </View>
</ImageBackground>
)
}
const styles=StyleSheet.create({
    ImageContainer: {
        bottom:Metrics.ratio(60),
        // Your image styles here
        width: Metrics.ratio(400), // Adjust as needed
        height: Metrics.ratio(800), // Adjust as needed
  
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
})
export default Verify;