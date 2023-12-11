import React,{useState} from 'react';
import {Image,TextInput, View,Text, StyleSheet,ScrollView,Alert, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Metrics } from '../themes';
import { Dropdown } from 'react-native-element-dropdown';
import Button from '../components/Button';
import { launchImageLibrary } from 'react-native-image-picker';

const AskQuestion=()=>{
  const route=useRoute();
const navigate=useNavigation();
  const item=route.params.item;
  const [value, setValue] = useState(item.item_added);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const Submit=()=>{

  }
  const pickImage = () => {
    Alert.alert(
      'Select Image Source',
      'Choose the source of the image',
      [
        {
          text: 'Camera',
          onPress: () => LaunchCamera(),
        },
        {
          text: 'Image Library',
          onPress: () => LaunchimageLibrary(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };
  const LaunchimageLibrary = () => {
    const options = {
      mediaType: 'mixed', // Allow both photos and videos
      quality: 0.5, // Adjust image quality as needed
      maxWidth: 800, // Adjust the maximum image width
      maxHeight: 600, // Adjust the maximum image height
      allowsEditing: false, // Whether to allow image editing
      noData: true, // If true, removes the base64-encoded data field from the response
      mimeTypes: ['image/jpeg', 'image/jpg', 'image/png',],
      selectionLimit:5,
    };

    launchImageLibrary(options, (response) => {
      handleImagePickerResponse(response);
    });
  };

  const handleImagePickerResponse = (response) => {
    if (response.didCancel) {
      util.errorMsg('cancelled');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.uri };
      setSelectedImage(source);
    }
  };

        return (
            <ScrollView style={{flex:1, flexDirection:"column",backgroundColor:'#B6B8B5',}}>
               <View style={{backgroundColor:'#B6B8B5',height:Metrics.ratio(20),width:'100%',marginRight:Metrics.ratio(100)}}></View>
        <View style={{backgroundColor:'white'}}>
          
       <Text style={{color:'black',fontWeight:'650',fontSize:12,textAlign:'left',marginLeft:Metrics.ratio(10),top:Metrics.ratio(10),fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Arial', // You may need to adjust this for Android
        }),}}>New Conversation with{}</Text>
          <View style={{padding:Metrics.ratio(10)}}>
         <Text style={{fontSize:12,fontWeight:'500',marginTop:20}}>Subject</Text>
    <TextInput     auto style={styles.InputContainer} value={value} ></TextInput>
    <Text style={{fontSize:12,fontWeight:'500',marginTop:10}}>Message</Text>
    <TextInput  textAlign='left'   auto style={styles.InputContainer2}  placeholder='Enter Message' ></TextInput>
    <Text style={{fontSize:12,fontWeight:'400',}}>Attachements</Text>
    <TouchableOpacity onPress={pickImage}>
    <View style={{marginTop:10,flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}>Choose File 1</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={pickImage}>
    <View style={{marginTop:10,flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}>Choose File 2</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={pickImage}>
    <View style={{marginTop:10,flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}>Choose File 3</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={pickImage}>
    <View style={{marginTop:10,flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}>Choose File 4</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={pickImage}>
    <View style={{marginTop:10,flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}>Choose File 5</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
</View>

        </View>
        <View style={{flex:1, flexDirection:'row',top:Metrics.ratio(10),justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',}}>
        <View style={styles.buttonView}>
    <Button 
      btnPress={()=>navigate.goBack()}
      label={"Close"}
    />
  </View>
  <View style={styles.buttonView}>
    <Button 
    loader={loader}
      btnPress={Submit}
      label={"Submit"}
    />
  </View>
  </View>
       </ScrollView>
         
    )
}
const styles = StyleSheet.create({
  buttonView: {
    height:Metrics.vh*5,
    backgroundColor:'#FF2F00',
    borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    marginHorizontal:Metrics.ratio(10),
    marginVertical:Metrics.ratio(10)
  },
    InputContainer:{
      marginTop:Metrics.ratio(3),
      marginBottom:Metrics.ratio(10),
      backgroundColor:'#F1F0F7',
      borderRadius:5,
      color:'black',
      fontSize:12,
     width:'100%',
     
     height:Metrics.ratio(50),
    },
    InputContainer2:{
     fontWeight:'500',
      marginTop:Metrics.ratio(3),
      marginBottom:Metrics.ratio(10),
      backgroundColor:'#F1F0F7',
      borderRadius:5,
      color:'black',
      fontSize:12,
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
  });
export default AskQuestion;