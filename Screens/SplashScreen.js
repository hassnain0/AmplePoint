import React ,{useEffect, useState} from 'react';
import {StyleSheet,ImageBackground, View} from 'react-native';
import HomeScreen from './HomeScreen';

const  SplashScreen = ({navigation}) => {

  useEffect(() => {
   setTimeout(() => {
   
      navigation.navigate('HomeScreen');
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
        width:'100%',
        height: '100%',
      },
});

export default SplashScreen;