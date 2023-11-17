import {React,useState} from 'react';
import { View, Text,Image, StyleSheet,StatusBar, ScrollView,TextInput,SafeAreaView} from 'react-native';
import { Metrics } from '../themes';
import Button from '../components/Button';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
const Checkout= ({navigation}) => {
  const colorList = [
    {
      label: "White",
      value: "white",
    },
    {
      label: "Red",
      value: "red",
    },
    {
      label: "Blue",
      value: "blue",
    },
    {
      label: "Green",
      value: "green",
    },
    {
      label: "Orange",
      value: "orange",
    },
  ];

  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
 
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  return (
    <ScrollView>
      
      <View  style={{flex:1,flexDirection:'row',backgroundColor:'#CED0CD',height:Metrics.ratio(50)}}>
        <Text style={{top:Metrics.ratio(10),left:0,color:'black',fontSize:20,fontWeight:'500',textAlign:'center',marginRight:Metrics.ratio(190),marginLeft:Metrics.ratio(10)}}>Billing Details</Text>
          </View>
          <View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
          <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),}}>First Name</Text>
      <TextInput placeholder='First Name'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
      <Text style={{fontSize:15,color:'#7D7D7D',}}>Last Name</Text>
      <TextInput placeholder='Last Name'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
      <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),}}>Email</Text>
      <TextInput placeholder='Email'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
      <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),}}>Phone</Text>
      <TextInput placeholder='Phone Number'  keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>
      <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),}}>First Name</Text>
      <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <StatusBar
          backgroundColor={"black"}
          barStyle={"light-content"}
        />
        <Appbar.Header>
          <Appbar.Content title="React Native Paper Dropdown" />
          <Appbar.Action
            icon={nightMode ? "brightness-7" : "brightness-3"}
            onPress={() => setNightmode(!nightMode)}
          />
        </Appbar.Header>
        <Surface style={styles.containerStyle}>
          <SafeAreaView style={styles.safeContainerStyle}>
           
            <View style={styles.spacerStyle} />
            
          </SafeAreaView>
        </Surface>
      </ThemeProvider>
    </Provider>
      </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  
  InputContainer:{
    marginTop:Metrics.ratio(3),
    marginBottom:Metrics.ratio(10),
    backgroundColor:'#EBECF0',
    margin:Metrics.ratio(5),
    borderRadius:20,
    fontSize:15,
   width:'100%',
   height:Metrics.ratio(50),
  },
});

export default Checkout;
