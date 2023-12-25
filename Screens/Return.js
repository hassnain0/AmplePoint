import React,{useState,} from 'react';
import {Image,TextInput, View,Text, StyleSheet,ScrollView, TouchableOpacity,Alert} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Metrics } from '../themes';
import { Dropdown } from 'react-native-element-dropdown';
import Button from '../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import util from '../helpers/util';
import Toast from 'react-native-toast-message';
import axios from 'axios';
// import { Camera } from 'react-native-vision-camera';

const Return=()=>{
  
const route=useRoute();
const item=route.params.item;
console.log("Item",item)
  const [isRecording, setIsRecording] = useState(false);
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [reason,setReason]=useState('');
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImage2, setSelectedImage2] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [selectedImage3, setSelectedImage3]= useState('');
  // const { devices, selectCamera, currentCamera } =  useCameraDevice('back')

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
  const handleChooseVideo = () => {
    const options = {
      mediaType: 'video', // Set mediaType to 'video' for picking videos
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (!response.didCancel && !response.error && !response.customButton) {
        const firstVideo = response.assets[0];
        console.log("firstVideo.uri", firstVideo.uri);
        const source = { uri: firstVideo.uri };

        console.log('Video URI = ', source.uri);

        setSelectedVideo(source);
        util.successMsg("Video Selected");
      }
    });
  };

  const LaunchimageLibrary = () => {
    

    const options = {
      quality: 1.0,
      maxWidth: 50,
      maxHeight: 50,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options,(response) => {
      console.log('Response = ', response);
    
      if (!response.didCancel && !response.error && !response.customButton) {
        // Log the entire response for debugging
        console.log('Response = ', response);

        const firstImage = response.assets[0];
        console.log("firstImage.uri",firstImage.uri)
        const source = { uri: firstImage.uri };

        // Log the URI to check if it looks correct
        console.log('Image URI = ', source.uri);

        setSelectedImage(source);
        util.successMsg("Image Selected")
     }
    });
  };
  const pickImage2= () => {
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
          onPress: () => LaunchimageLibrary2(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };


  const LaunchimageLibrary2 = () => {
    

    const options = {
      quality: 1.0,
      maxWidth: 50,
      maxHeight: 50,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options,(response) => {
      console.log('Response = ', response);
    
      if (!response.didCancel && !response.error && !response.customButton) {
        // Log the entire response for debugging
        console.log('Response = ', response);

        const firstImage = response.assets[0];
        console.log("firstImage.uri",firstImage.uri)
        const source = { uri: firstImage.uri };

        // Log the URI to check if it looks correct
        console.log('Image URI = ', source.uri);

        setSelectedImage2(source);
        util.successMsg("Image Selected")
     }
    });
  }
  const pickImage3 = () => {
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
          onPress: () => LaunchimageLibrary3(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };


  const LaunchimageLibrary3 = () => {
    

    const options = {
      quality: 1.0,
      maxWidth: 50,
      maxHeight: 50,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options,(response) => {
      console.log('Response = ', response);
    
      if (!response.didCancel && !response.error && !response.customButton) {
        // Log the entire response for debugging
        console.log('Response = ', response);

        const firstImage = response.assets[0];
        console.log("firstImage.uri",firstImage.uri)
        const source = { uri: firstImage.uri };

        // Log the URI to check if it looks correct
        console.log('Image URI = ', source.uri);

        setSelectedImage3(source);
        util.successMsg("Image Selected")
     }
    });
  }
  const data = [
    { label: 'Refund Only', value: '1' },
    { label: 'Refund Dispute', value: '2' },
    
  ];

  const validation=()=>{
    if(util.stringIsEmpty(value)){
      setLoader(false);
      util.errorMsg("Please select choice")
      return false;
    }
    if(reason==''){
      setLoader(false);
      util.errorMsg("Please enter Reason")
      return false;
    }
    if(selectedImage==''){
      setLoader(false);
      util.errorMsg("Please choose Image1")
      return false;
    }
    if(selectedImage2==''){
      setLoader(false);
      util.errorMsg("Please Choose Image2 ")
      return false;
    }
    if(selectedVideo==''){
      setLoader(false);
      util.errorMsg("Please Choose Video")
      return false;
    }
    return true;
  }
 
  const Submit=async()=>{
setLoader(true);
    if(!validation()){
      return false;

    }
   

    try{

    const apiUrl='https://amplepoints.com/apiendpoint/submitdispute';
    const formData = new FormData();
    formData.append('product_added_id',item.productadded_id);
    formData.append('order_id', item.order_id);
    formData.append('product_id',  item.product_id);
    formData.append('user_id', 38518);
    formData.append('vendor_id', item.vendor_id);
    formData.append('apply_for', value);
    formData.append('resone', reason);
    formData.append('evidance', [selectedImage,selectedImage2,selectedImage3]);
    formData.append('videofile',selectedVideo);
    
   const headers = {
  "Content-Type": "multipart/form-data",
  "Accept": "application/json",
};

const response = await axios.post(apiUrl, formData, { headers });
console.log("Response of Return",response.data);

if(response.data.status=='S')
{setLoader(false);
  util.successMsg("Successfully Submitted")
}
    }
    catch(error){
      setLoader(false)
      console.log("Error",error)
    }
  }

        return (
            <ScrollView style={{flex:1, flexDirection:"column",backgroundColor:'white',}}>
                   <View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(10),width:'100%',marginRight:Metrics.ratio(100)}}></View>
              <View style={{flex:1, flexDirection:'row',marginTop:Metrics.ratio(30),marginLeft:Metrics.ratio(10),}} >
        <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${item.id}/${item.image_name}` }} />
        <View style={{flex:1, flexDirection:'column',left:Metrics.ratio(7)}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ fontSize:13,fontWeight:'800',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Times New Roman',android: 'serif', // You may need to adjust this for Android
      }), }}>{item.item_added}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ fontSize:8,fontWeight:'00',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
      }), }}>Invoice No: {item.order_id}</Text>
      <View style={{backgroundColor:'#EEEEEE',borderRadius:Metrics.ratio(2),marginRight:Metrics.ratio(25),width:Metrics.ratio(40),height:Metrics.ratio(15),bottom:Metrics.ratio(20),left:Metrics.ratio(10),borderWidth:Metrics.ratio(0.5),}}>
      <Text style={{ fontSize:8,textAlign:'center',
              fontWeight:'600',color:'black', fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Arial', // You may need to adjust this for Android
        }), }}>Qty:{item.quantity}</Text>
        </View>
      
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
      }), }}>SKU:#{item.product_sku}</Text>
      <Text style={{ fontSize:12,
        fontWeight:'800',bottom:Metrics.ratio(20),color:'black',marginRight:Metrics.ratio(25), fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>${item.total_amount}</Text>
        </View>
        <View>
      
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
      }), }}>By:{item.supplier_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ fontSize:8,fontWeight:'700',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Arial', // You may need to adjust this for Android
        }), }}>Order Status:<Text style={{ color: '#FF2E00' }}>{item.product_order_status}</Text>
            </Text>
        </View>
         </View>
        
        </View>
        <View>
        <View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(30),width:'100%',}}> 
        <Text style={{color:'black',fontWeight:'800',textAlign:'left',marginLeft:Metrics.ratio(10),fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Arial', // You may need to adjust this for Android
        }),}}>Enter the Following Details to Return your order</Text></View>
          <View style={{padding:Metrics.ratio(20)}}>
          <Text style={{fontSize:15,fontWeight:'400',}}>I want to Apply For:</Text>
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#F1F0F7',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Apply For' : '...'}
          searchPlaceholder="Select Apply For"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
         <Text style={{fontSize:15,fontWeight:'400',marginTop:20}}>Reason for Dispute</Text>
    <TextInput placeholder='Enter Reason for Dispute'  value={reason} onChangeText={(text)=>setReason(text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
    <Text style={{fontSize:15,fontWeight:'400',}}>Please Upload Your Evidence</Text>
    <TouchableOpacity onPress={pickImage}>
    <View style={{flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35),marginBottom:Metrics.ratio(10)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}>{selectedImage ? `${selectedImage.uri}` : 'Choose File 1'}</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={pickImage2}>
    <View style={{flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35),marginBottom:Metrics.ratio(10)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}> {selectedImage2 ? `${selectedImage2.uri}` : 'Choose File 2'}</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={pickImage3}>
    <View style={{flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35),marginBottom:Metrics.ratio(10)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}>{selectedImage3 ? `${selectedImage3.uri}` : 'Choose File 3'}</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
    <Text style={{fontSize:15,fontWeight:'400',marginTop:30}}>Upload Video</Text>
    <TouchableOpacity onPress={handleChooseVideo}>
    <View style={{flex:1,flexDirection:"row",backgroundColor:'#F1F0F7',borderRadius:10,height:Metrics.ratio(35),marginBottom:Metrics.ratio(10)}}>
      <Image style={{top:2,width:25,height:25,alignItems:'center'}} source={require('../assets/Attach.png')}></Image>
    <View style={{flex:1,flexDirection:'row' ,justifyContent:'space-between'}}>
    <Text style={{top:5,textAlign:'center',color:'black'}}>{selectedVideo ? `${selectedVideo.uri}` : 'Choose File 1'}</Text>
    <Image style={{top:5,right:Metrics.ratio(10),width:25,height:25,alignItems:'center'}} source={require('../assets/Cross.png')}></Image>
    </View>
    </View>
    </TouchableOpacity>
</View>

        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
        <View style={styles.buttonView}>
    <Button 
    loader={loader}
      btnPress={Submit}
      label={"Submit"}
    />
  </View>
       </ScrollView>
         
    )
}
const styles = StyleSheet.create({
  buttonView: {
    height:Metrics.vh*5,
    backgroundColor:'#FF2F00',
    borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    
  },
    InputContainer:{
      marginTop:Metrics.ratio(3),
      marginBottom:Metrics.ratio(10),
      backgroundColor:'#F1F0F7',
      borderRadius:5,
      fontSize:15,
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
export default Return;