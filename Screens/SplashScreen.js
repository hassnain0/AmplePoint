import React ,{useEffect} from 'react';
import {StyleSheet,ImageBackground, View} from 'react-native';
import Login from './Login';
import { Metrics } from '../themes';


const  SplashScreen = ({navigation}) => {

  
  useEffect(() => {
   setTimeout(() => {
      navigation.navigate('Login');
    },3000 );

    return () => {
    };
  }, []);
  return (
   
   <ImageBackground source={require('../assets/Another.png')} style={styles.image}>
   </ImageBackground>
   
  );
};
const styles = StyleSheet.create({
    image: {
     
        width:(395),
        height: (800),
      
      },
      LottieView:{
        paddingTop:650,
        left:160,
        width:(50),
        height:(100),
        
      }
 
});

export default SplashScreen;