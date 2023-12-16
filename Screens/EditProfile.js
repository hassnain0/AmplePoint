import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View ,ScrollView,TextInput, SafeAreaView,Alert, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Metrics } from '../themes';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import util from '../helpers/util';
const EditProfie= ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [isFocus4, setIsFocus4] = useState(false);
  const [isFocus5, setIsFocus5] = useState(false);
  const [isFocus6, setIsFocus6] = useState(false);
  const [isFocus7, setIsFocus7] = useState(false);
  const [isFocus8, setIsFocus8] = useState(false);
  const [valuegen, setValueGen] = useState(null);
  const [valueage, setValueAge] = useState(null);
  const [valuequal, setValueQual] = useState(null);
  const [valueinc, setValueInc] = useState(null);
  const [valueemp, setValueEmp] = useState(null);
  const [valuecountry, setValueCountryInc] = useState(null);
  const [valuestate, setValueState] = useState(null);
  const [valueCity, setValueCity] = useState(null);  
  const [countrydata,setCountryData]=useState([]);
  const [stateData,setStateData]=useState([]);
  const [cityData,setCityData]=useState([]);
  const [loader,setLoader]=useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [state, setState] = React.useState({
    first_name: '',
    tag_line:'',
    last_name: '', 
    email: '',  
    date:'',
    address:'',
    phone: '',
    gender:'',
    contact:'',
    country: '',
    state1:'',
    city:'',
    zip:'',
    fax:'',
    address:''
  
  });
  const [selectedImage, setSelectedImage] = useState(null);
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
      console.log(response.uri)
      setSelectedImage(source);
    }
  };
  const validation=()=>{
    console.log("Hello")
    const {tag_line,first_name,last_name,email, contact,zip,fax,address} =
    state;
    if(util.stringIsEmpty(tag_line)){
      setLoader(false);
      util.errorMsg("Please enter tag line");
      return false;
    }
    if(util.stringIsEmpty(first_name)){
      setLoader(false);
      util.errorMsg("Please enter first name");
      return false;
    }
    if(util.stringIsEmpty(last_name)){
      setLoader(false);
      util.errorMsg("Please enter Last Name");
      return false;
    }if(util.stringIsEmpty(valuegen)){
      setLoader(false);
      util.errorMsg("Please Select Gender");
      return false;
    }
    if(util.stringIsEmpty(valueage)){
      setLoader(false);
      util.errorMsg("Please Select Age");
      return false;
    }
    if(util.stringIsEmpty(email)){
      setLoader(false);
      util.errorMsg("Please enter Email");
      return false;
    }
    if(util.stringIsEmpty(contact)){
      setLoader(false);
      util.errorMsg("Please enter Phone");
      return false;
    }
    if(util.stringIsEmpty(selectedDate)){
      setLoader(false);
      util.errorMsg("Please pick your birthday Date");
      return false;
    }
    if(valuecountry==[]){
      setLoader(false);
      util.errorMsg("Please select Country");
      return false;
    }
    if(util.stringIsEmpty(valuestate)){
      setLoader(false);
      util.errorMsg("Please enter State");
      return false;
    }
    if(util.stringIsEmpty(valueCity)){
      setLoader(false);
      util.errorMsg("Please enter City");
      return false;
    }
    if(util.stringIsEmpty(zip)){
      setLoader(false);
      util.errorMsg("Please enter Zip Code");
      return false;
    }
    if(util.stringIsEmpty(fax)){
      setLoader(false);
      util.errorMsg("Please enter fax");
      return false;
    }
    if(util.stringIsEmpty(address)){
      setLoader(false);
      util.errorMsg("Please enter Address");
      return false;
    }
  return true;
  
  }
  const onCheckout=async()=>{
    setLoader(true)
if(!validation()){
  return false;
}
else{
  const apiUrl='https://amplepoints.com/apiendpoint/updateprofile';

  try{
    const response=await axios.post(apiUrl,)
  }
  catch(error){

  }
}
  }
  const handleDateChange =async (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
  
    if (date) {
      // Format the date as 'YYYY/MM/DD'
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })

      console.log("Formatted Date", formattedDate);
      setSelectedDate(formattedDate);
    }
  };
  

  useEffect(() => {
    getcoutrylist();
  }, []);

  const getcoutrylist=async()=>{
    const apiurl='https://amplepoints.com/apiendpoint/getcoutrylist';
    
    axios.get(apiurl)
      .then((response) => {
        if (response.data.status === 'S') {

          var count = Object.keys(response.data.data).length;
          let countryArray = [];
          for (var i = 0; i < count; i++) {
            countryArray.push({
              value: response.data.data[i].id,
              label: response.data.data[i].name,
            });
          }
          setCountryData(countryArray);
        } else {
          console.error('Error fetching countries data');
        }  
      }).catch((error) => {
        console.error('Error fetching countries data:', error);
      });
    }

    const handleState = countryCode => {
      const apiurl='https://amplepoints.com/apiendpoint/getcountrystate?';
    
      axios.get(apiurl,{
        params:{
          country_id:countryCode,
        }
      })
        .then((response) => {
          console.log("Response",response.data.data)
          if (response.data.status === 'S') {
  
            var count = Object.keys(response.data.data).length;
            let countryArray = [];
            for (var i = 0; i < count; i++) {
              countryArray.push({
                value: response.data.data[i].stateid,
                label: response.data.data[i].statename,
              });
            }
            setStateData(countryArray);
          } else {
            console.error('Error fetching countries data');
          }  
        }).catch((error) => {
          console.error('Error fetching countries data:', error);
        });
    };

    const handleCity = countryCode => {
      const apiurl='https://amplepoints.com/apiendpoint/getstatecity?';
    
      axios.get(apiurl,{
        params:{
          state_id:countryCode,
        }
      })
        .then((response) => {
          console.log("Response",response.data.data)
          if (response.data.status === 'S') {
  
            var count = Object.keys(response.data.data).length;
            let countryArray = [];
            for (var i = 0; i < count; i++) {
              countryArray.push({
                value: response.data.data[i].country_id,
                label: response.data.data[i].statename,
              });
            }
            setCityData(countryArray);
          } else {
            console.error('Error fetching countries data');
          }  
        }).catch((error) => {
          console.error('Error fetching countries data:', error);
        });
    };


    const _handleTextChange = (name, val) => {
      setState({
        ...state,
        [name]: val,
      });
    };
const genderdata = [
 
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
  
];
const qualificationdata = [
 
  { label: 'Select Education', value: '1' },
  { label: 'Post Graduate', value: '2' },
  { label: 'Under Graduate', value: '3' },
 
];
const Employmentdata = [
 
  { label: 'Select Employement', value: '1' },
  { label: 'Government', value: '2' },
  { label: 'Private Jobs', value: '3' },
  { label: 'Self Employeed', value: '4' },
  { label: 'Student', value: '5' },
 
];
const Incomedata = [
 
  { label: 'Select Income', value: '1' },
  { label: '$0-$10,000', value: '2' },
  { label: '$10,000-$20,000', value: '3' },
  { label: '$20,000-$$50,000', value: '4' },
  { label: '$50,000-$100,000', value: '5' },
  { label: 'Over $100,000', value: '5' },
  { label: 'Student', value: '6' },
 
];
const dataAge = Array.from({ length: 150 }, (_, index) => ({
  label: `${index + 1}`, // Labels will be "1", "2", ..., "150"
  value: index + 1,       // Values will be 1, 2, ..., 150
}));



const Bounce=()=>{
  setIsChecked(!isChecked);
  setHiddenFields(!isChecked); // Toggle the visibility of fields
}

  return (
  <SafeAreaView style={{alignContent:'center',justifyContent:'center',backgroundColor:'white'}}>
    <ScrollView style={{backgroundColor:'white'}}>
    <View  style={{flex:1,flexDirection:'row',backgroundColor:'#eeeeee',height:Metrics.ratio(40)}}>
      <Text style={{top:Metrics.ratio(10),left:0,color:'black',fontSize:10,fontWeight:'600',textAlign:'center',left:Metrics.ratio(10), fontFamily: Platform.select({
          ios: 'Times New Roman',
          android: 'Times New Roman', // You may need to adjust this for Android
        })}}>BY GIVING US ACCURATE INFORMATION WE CAN SERVE YOU BETTER</Text>
        </View>
        <View style={{marginLeft:Metrics.ratio(2)}}>
        <View style={{left: 7,position: 'relative',}}>
      <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:10,
    color: 'black',
    left: 0,
    fontWeight:'700',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Personal Information</Text>
      <View style={{position: 'absolute',
    top: Metrics.ratio(25),
    left: 0,
    height: 2,
    backgroundColor: '#FF2E00', // Set the color you want for the underline
    width: '10%', // Make the underline span the entire width
  }} />
    </View>
        <View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
        <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Tag Line</Text>
    <TextInput placeholder='Tag Line'   textAlign='left' value={state.tag_line} onChangeText={(text)=>_handleTextChange('tag_line',text)}  auto style={styles.InputContainer} ></TextInput>
    <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:10,
    color: '#FF2E00',
    left: 0,
    fontWeight:'700',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
  <View style={{flex:1, flexDirection:'row',}}>
    <View style={{width:'45%'}}>
  <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>First Name</Text>
    <TextInput placeholder='First Name' value={state.first_name} onChangeText={(text)=>_handleTextChange('first_name',text)}  textAlign='left' auto style={styles.InputContainer2} ></TextInput>
    </View>
    <View style={{width:'45%',marginLeft:Metrics.ratio(20)}}>
  <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Last Name</Text>
    <TextInput placeholder='Last Name' value={state.last_name} onChangeText={(text)=>_handleTextChange('last_name',text)} textAlign='left' auto style={styles.InputContainer2} ></TextInput>
    </View>
  </View>
  <View style={{flex:1, flexDirection:'row',}}>
    <View style={{width:'45%'}}>
  <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Gender</Text>
      <Dropdown
          style={[styles.InputContainer2, isFocus1 && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={genderdata}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus1 ? 'Select Gender' : '...'}
          value={valuegen}
          onFocus={() => setIsFocus1(true)}
          onBlur={() => setIsFocus1(false)}
          onChange={item => {
            setValueGen(item.value);
            setIsFocus1(false);
          }}
        />
    </View>
    <View style={{width:'45%',marginLeft:Metrics.ratio(20)}}>
  <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Age</Text>
     <Dropdown
          style={[styles.InputContainer2, isFocus2 && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataAge}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus2? 'Select Age' : '...'}
          value={valueage}
          onFocus={() => setIsFocus2(true)}
          onBlur={() => setIsFocus2(false)}
          onChange={item => {
            setValueAge(item.value);
            setIsFocus2(false);
          }}
        />
    </View>
  </View>
  <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Email</Text>
    <TextInput placeholder='Email' value={state.email} onChangeText={(text)=>_handleTextChange('email',text)}  textAlign='left' auto style={styles.InputContainer} ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:10,
    color: '#FF2E00',
    left: 0,
    fontWeight:'700',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Contact Number - Cell Phone</Text>
    <TextInput placeholder='Contact Number' keyboardType='numeric' value={state.contact} onChangeText={(text)=>_handleTextChange('contact',text)} textAlign='left' auto style={styles.InputContainer}  ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:10,
    color: '#FF2E00',
    left: 0,
    fontWeight:'700',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Birthday</Text>
     <TouchableOpacity
                style={{flex:1,flexDirection:'row', backgroundColor:'#eeeeee',
                margin:Metrics.ratio(5),
                right:Metrics.ratio(10),
                borderRadius:2,
                borderWidth:0.5,
                borderColor:'#C1C3C0',
                fontSize:12,
               width:'100%',
               alignItems:'center',
               height:Metrics.ratio(38),justifyContent:'space-between',top:Metrics.ratio(5),backgroundColor:'#eeeeee'}}
                onPress={() => setShowDatePicker(true)}
            >
              
        <Text style={{ left:Metrics.ratio(10) ,textAlign: 'center',top:2,fontWeight:'300', fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Arial', // You may need to adjust this for Android
          }),}}>Select Date</Text> 
        <Image source={require('../assets/Date.png')} style={{right:Metrics.ratio(10),width:25,height:25}}/>      
              </TouchableOpacity> 
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  onChange={handleDateChange}
                />
              )}
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:10,
    color: '#FF2E00',
    left: 0,
    fontWeight:'700',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>INCOME</Text>
      <Dropdown
          style={[styles.InputContainer, isFocus3 && { borderColor: 'black',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={qualificationdata}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus3 ? 'Select qualification' : '...'}
          value={valuequal}
          onFocus={() => setIsFocus3(true)}
          onBlur={() => setIsFocus3(false)}
          onChange={item => {
            setValueQual(item.value);
            setIsFocus3(false);
          }}
        />
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>EMPLOYEEMENT</Text>
    <Dropdown
          style={[styles.InputContainer, isFocus4 && { borderColor: 'black',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Employmentdata}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus4 ? 'Select Employment' : '...'}
          value={valueemp}
          onFocus={() => setIsFocus4(true)}
          onBlur={() => setIsFocus4(false)}
          onChange={item => {
            setValueEmp(item.value);
            setIsFocus4(false);
          }}
        />
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:10,
    color: '#FF2E00',
    left: 0,
    fontWeight:'700',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Zip Code</Text>
    <TextInput placeholder='Zip Code' keyboardType='numeric' value={state.zip} onChangeText={(text)=>_handleTextChange('zip',text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Country</Text>
     <Dropdown
          style={[styles.InputContainer, isFocus5 && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={countrydata}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus5 ? 'Select Country' : '...'}
          value={valueinc}
          onFocus={() => setIsFocus5(true)}
          onBlur={() => setIsFocus5(false)}
          onChange={item => {
            setValueInc(item.value);
            setIsFocus5(false);
            handleState(item.value);
          }}
        />
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>State</Text>
   <Dropdown
          style={[styles.InputContainer, isFocus6 && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={stateData}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus6 ? 'Select State' : '...'}
          value={valuestate}
          onFocus={() => setIsFocus6(true)}
          onBlur={() => setIsFocus6(false)}
          onChange={item => {
            setValueState(item.value);
            setIsFocus6(false);
            handleCity(item.value)
          }}
        />
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>City</Text>
  <Dropdown
          style={[styles.InputContainer, isFocus7 && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cityData}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus7 ? 'Select City' : '...'}
          value={valueCity}
          onFocus={() => setIsFocus7(true)}
          onBlur={() => setIsFocus7(false)}
          onChange={item => {
            setValueCity(item.value);
            setIsFocus7(false);
          }}
        />
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Address</Text>
    <TextInput placeholder='Address' value={state.address} onChangeText={(text)=>_handleTextChange('address',text)}  textAlign='left' auto style={styles.InputContainer3} ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:10,
    color: '#FF2E00',
    left: 0,
    fontWeight:'700',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR PROFILE IMAGE YOU WILL EARN 5 AMPLEPOINTS</Text>
</View>
<View style={{flex:1,flexDirection:'row',alignItems:'center', paddingTop:Metrics.ratio(10),paddingBottom:Metrics.ratio(20),justifyContent:'center'}}>
  <View style={{marginRight:Metrics.ratio(50)}}>
  
    <Text style={{fontSize:8,textAlign:'center',fontWeight:'500'}}>Profile Picture</Text>
    {selectedImage ? (
        <Image
          src={selectedImage}
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
          }}
        />
      ) : (
        <TouchableOpacity onPress={LaunchimageLibrary}>
          <Image
            source={require('../assets/EditBane.jpg')} // Default image source
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
      )}
    
  </View>
  <View>
    <Text style={{fontSize:8,fontWeight:'500',textAlign:'center',}}>Profile Banner</Text>
    <TouchableOpacity>
    <Image source={require('../assets/EditBane.jpg')} style={{ width: 80,
    height: 80,
    borderRadius: 100,}} />
    </TouchableOpacity>
  </View>
</View>
<Toast ref={ref => Toast.setRef(ref)} /> 
<View style={styles.buttonView}>
      <Button
        loader={loader}
        btnPress={onCheckout}
        
        label={"Save Changes"}
      />
    </View>

</View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfie;

const styles = StyleSheet.create({  container: {
    backgroundColor: 'white',
    flex:1
  },
  buttonView: {
    height:Metrics.ratio(30),
    backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
   marginTop:Metrics.ratio(50),
    paddingBottom:Metrics.ratio(20)
  },
  dropdown: {
    height: Metrics.ratio(20), 
    width: '90%', 
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems:'center',
    backgroundColor:'#F1F0F7',
    color:'#D8D9D8'
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
    fontSize: 8,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  inputSearchStyle: {
    height: Metrics.ratio(40),
    width:Metrics.ratio(400),
    fontSize: 16,
  },
  InputContainer:{
  backgroundColor:'#eeeeee',
  margin:Metrics.ratio(5),
  right:Metrics.ratio(10),
  borderRadius:2,
  borderWidth:0.5,
  borderColor:'#C1C3C0',
  fontSize:12,
 width:'100%',
 alignItems:'center',
 height:Metrics.ratio(38),
},
InputContainer3:{
  backgroundColor:'#eeeeee',
  margin:Metrics.ratio(5),
  right:Metrics.ratio(10),
  borderRadius:3,
  borderWidth:0.5,
  borderColor:'#C1C3C0',
  fontSize:12,
 width:'100%',
 height:Metrics.ratio(58),
},
InputContainer2:{
  backgroundColor:'#eeeeee',
  margin:Metrics.ratio(5),
  borderRadius:3,
  borderWidth:0.5,
  borderColor:'#C1C3C0',
  fontSize:12,
  width:'100%',
  height:Metrics.ratio(38),
},

  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#D1D3D0',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  buttonView: {
    height:Metrics.vh*5,
    backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    top:Metrics.ratio(0),
    bottom:Metrics.ratio(25)
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
  },
});