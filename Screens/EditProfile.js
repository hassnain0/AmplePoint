import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View ,ScrollView,TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Metrics } from '../themes';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
const EditProfie= ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [countrydata,setCountryData]=useState([]);
  const [loader,setLoader]=useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getcoutrylist();
  }, []);

  const getcoutrylist=async()=>{
    const apiurl='https://amplepoints.com/apiendpoint/getcoutrylist';
    
    axios.get(apiurl)
      .then((response) => {
        console.log("response.data",response.data)
        if (response.data.status === 'S') {

          setCountryData(response.data);
        } else {
          console.error('Error fetching countries data');
        }  
      }).catch((error) => {
        console.error('Error fetching countries data:', error);
      });
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
  
      
      }
    };

//Getting Country List


// const {initPaymentSheet,presentPaymentSheet}=useStripe();

// const onCheckout=async()=>{
//     try {
           
//         const apiUrl = 'https://amplepoints.com/apiendpoint/createpaymentintend?user_id=126&total_amount=118.00&order_id=AMPLI9Zd27&customer_name=Hiren Buhecha';
  
//         const response = await axios.get(apiUrl);
// // Created","status":"S","data":{"clientSecret":"pi_3OIDtVGY4n5u6WbI0ofZt1tT_secret_MidriThIfH8dy7r57yRgkOO8u"}}


       
//   const key=response.data.data.clientSecret
//   const {initResponse}=await initPaymentSheet({
//     merchantDisplayName:'notJust.dev',
//     paymentIntentClientSecret:key,
//     customFlow: false,
//     style: 'alwaysDark',
//   })
//   console.log("init Response",initResponse)
// if(initResponse){
// console.log("Int ",initResponse);
// }
//   const { error } = await presentPaymentSheet({key});

//   if (error) {
//     Alert.alert(`Error code: ${error.code}`, error.message);
//   } else {
//     Alert.alert('Success', 'The payment was confirmed successfully');
//   }
 
 
// }catch(error){
//           console.log("Error",error)
//       }

    
// }'
const data = [
  { label: 'Refund Only', value: '1' },
  { label: 'Refund Dispute', value: '2' },
  
];

const onCheckout=()=>{
  navigation.navigate("OrderSummary")
}

const Pay=()=>{
navigation.navigate("Payement")
}

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
    <TextInput placeholder='Tag Line'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
    <Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:8,
    color: '#FF2E00',
    left: 0,
    fontWeight:'700',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR NAME YOU WILL EARN 5 AMPLEPOINTS</Text>
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
    <TextInput placeholder='First Name'   textAlign='left' auto style={styles.InputContainer2} ></TextInput>
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
    <TextInput placeholder='Last Name'   textAlign='left' auto style={styles.InputContainer2} ></TextInput>
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
          style={[styles.InputContainer2, isFocus && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Gender' : '...'}
          searchPlaceholder="Search City"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
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
          style={[styles.InputContainer2, isFocus && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Age' : '...'}
          searchField={false}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
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
    <TextInput placeholder='Email'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:8,
    color: '#FF2E00',
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR CELL PHONE YOU WILL EARN 4 AMPLEPOINTS</Text>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Contact Number - Cell Phone</Text>
    <TextInput placeholder='Contact Number' keyboardType='numeric'  textAlign='left' auto style={styles.InputContainer} ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:8,
    color: '#FF2E00',
    left: 0,
    fontWeight:'600',
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
      fontSize:8,
    color: '#FF2E00',
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR EDUCATION YOU WILL EARN 5 AMPLEPOINTS</Text>
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
          style={[styles.InputContainer, isFocus && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select qualification' : '...'}
          searchField={false}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
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
          style={[styles.InputContainer, isFocus && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Employment' : '...'}
          searchField={false}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:8,
    color: '#FF2E00',
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR ZIP CODE YOU WILL EARN 5 AMPLEPOINTS</Text>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:12,
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>Zip Code</Text>
    <TextInput placeholder='Zip Code' keyboardType='numeric'  textAlign='left' auto style={styles.InputContainer} ></TextInput>
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
          style={[styles.InputContainer, isFocus && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Country' : '...'}
          searchField={false}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
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
          style={[styles.InputContainer, isFocus && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select State' : '...'}
          searchField={false}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
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
          style={[styles.InputContainer, isFocus && { borderColor: 'black',backgroundColor:'#D8D9D8',alignItems:'center' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select City' : '...'}
          searchField={false}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
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
    <TextInput placeholder='Address' keyboardType='numeric'  textAlign='left' auto style={styles.InputContainer3} ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
<Text style={{ top: Metrics.ratio(10),
      paddingBottom:Metrics.ratio(10),
      fontSize:8,
    color: '#FF2E00',
    left: 0,
    fontWeight:'600',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'Times New Roman',
    }),}}>BY ENTERING YOUR PROFILE IMAGE YOU WILL EARN 4 AMPLEPOINTS</Text>
</View>
<View style={{flex:1,flexDirection:'row',alignItems:'center', paddingTop:Metrics.ratio(10),paddingBottom:Metrics.ratio(20),justifyContent:'center'}}>
  <View style={{marginRight:Metrics.ratio(50)}}>
    <Text style={{fontSize:8,textAlign:'center'}}>Profile Picture</Text>
    <Image source={require('../assets/Profile.png')} style={{ width: 80,
    height: 80,
    borderRadius: 100,}} />
  </View>
  <View>
    <Text style={{fontSize:8,}}>Profile Banner</Text>
    <Image source={require('../assets/Profile.png')} style={{ width: 80,
    height: 80,
    borderRadius: 100,}} />
  </View>
</View>
<View style={styles.buttonView}>
      <Button
        loader={loader}
        btnPress={onCheckout}
        
        label={"Save Changes"}
      />
    </View>
<Toast ref={ref => Toast.setRef(ref)} /> 
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
    bottom:Metrics.ratio(10)
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
    fontSize: 10,
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