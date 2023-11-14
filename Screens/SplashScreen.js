import React ,{useEffect} from 'react';
import {StyleSheet,ImageBackground} from 'react-native';
import Login from './Login';
import { Metrics } from '../themes/Matrics';

const  SplashScreen = ({navigation}) => {

  
  useEffect(() => {
   setTimeout(() => {
      navigation.navigate('Login');
    },3000 );

    return () => {
    };
  }, []);
  return (
   <ImageBackground source={require('../assets/SplashScreen.jpg')} style={styles.image}>
   </ImageBackground>
  );
};
const styles = StyleSheet.create({
    image: {
        width:(380),
        height: (900),
      
      },
      LottieView:{
        paddingTop:650,
        left:160,
        width:(50),
        height:(100),
        
      }
 
});

export default SplashScreen;