import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View ,ScrollView,TextInput, SafeAreaView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Metrics } from '../themes';
import Button from '../components/Button';
import Payement from './Payement';
import Toast from 'react-native-toast-message';
import {API_KEY,BASE_URL} from '@env'
import axios from 'axios';
import BouncyCheckbox from 'react-native-bouncy-checkbox';


const Checkout= ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [hiddenFields, setHiddenFields] = useState(true); // Initially, fields are visible

  const [value, setValue] = useState(null);
  const [countrydata,setCountryData]=useState([]);
  const [loader,setLoader]=useState(false);
  const [statedata,setstate]=useState([]);
  const [cityydata,setCity]=useState([])
  const [isFocus, setIsFocus] = useState(false);
useEffect(()=>{
  var config = {
    method: 'get',
    url: 'https://amplepoints.com/apiendpoint/getcoutrylist',
    headers: {
      'X-CSCAPI-KEY': API_KEY
    }
  };
  
  axios(config)
  .then( response =>{
    
    var count=Object.keys(response.data).length;
    let countryArray=[];
    for(var i=0; i<count; i++){
    countryArray.push({
      value:response.data[i].id,
      label:response.data[i].name,
    });
    setCountryData(countryArray);
  }
  })
  .catch(function (error) {
    console.log(error);
  });
})
const handleState = (countryCode) => {
  console.log("Contry code",countryCode)
  var config = {
    method: 'get',
    url: `'https://api.countrystatecity.in/v1/countries'/countries/AF/states`,
    headers: {
      'X-CSCAPI-KEY': API_KEY,
    },
  };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setStateData(stateArray);
      })
      .catch(function (error) {
        console.log(error);
      });

};

const handleCity = (countryCode, stateCode) => {
  var config = {
    method: 'get',
    url: `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
    headers: {
      'X-CSCAPI-KEY': API_KEY,
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      var count = Object.keys(response.data).length;
      let cityArray = [];
      for (var i = 0; i < count; i++) {
        cityArray.push({
          value: response.data[i].id,
          label: response.data[i].name,
        });
      }
      setCity(cityArray);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const Pay=()=>{
navigation.navigate("Payement")
}

const Bounce=()=>{
  setIsChecked(!isChecked);
  setHiddenFields(!isChecked); // Toggle the visibility of fields
}

  return (
  <SafeAreaView>
    <ScrollView style={{backgroundColor:'white'}}>
    <View  style={{flex:1,flexDirection:'row',backgroundColor:'#CED0CD',height:Metrics.ratio(50)}}>
      <Text style={{top:Metrics.ratio(10),left:0,color:'black',fontSize:20,fontWeight:'500',textAlign:'center',marginRight:Metrics.ratio(190),marginLeft:Metrics.ratio(10)}}>Biling Details</Text>
        </View>
        <View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
        <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>First Name</Text>
    <TextInput placeholder='First Name'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
    <Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>Last Name</Text>
    <TextInput placeholder='Last Name'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
<Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Email</Text>
    <TextInput placeholder='Email'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
        <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Phone</Text>
    <TextInput placeholder='Phone' keyboardType='numeric'  textAlign='left' auto style={styles.InputContainer} ></TextInput>
  <View style={{backgroundColor:'#F2F2F2'}}>
   <View style={styles.container}>
   <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Country</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countrydata}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Country' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          handleState(item.value)
          setIsFocus(false);
        }}
       
      />
      </View>
      <View style={styles.container}>
      <Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>State</Text>
       <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={statedata}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select State' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
  
          setIsFocus(false);
        }}
       
       />
       </View>
       <View style={styles.container}>
       <Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>City</Text>
       <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cityydata}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select City' : '...'}
        searchPlaceholder="Search..."
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
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
        <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Zip Code</Text>
    <TextInput placeholder='Zip Code'   textAlign='left' keyboardType='numeric' auto style={styles.InputContainer} ></TextInput>
    <Text style={{fontSize:15,color:'#F0F0F0',fontWeight:'400',color:'black'}}>Fax</Text>
    <TextInput placeholder='Fax'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
<Text style={{fontSize:15,color:'#F0F0F0',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Address</Text>
    <TextInput placeholder='Address'   textAlign='left' auto style={{ marginTop:Metrics.ratio(3),
  marginBottom:Metrics.ratio(10),
  backgroundColor:'#D1D3D0',
  margin:Metrics.ratio(5),
  right:Metrics.ratio(10),
  borderRadius:10,
  fontSize:15,
 width:Metrics.ratio(380),
 height:Metrics.ratio(70),}} ></TextInput>

 <View style={{flex:1, flexDirection:'row',top:Metrics.ratio(1)}}>
  
        <BouncyCheckbox
        style={{marginTop: Metrics.ratio(7),left:Metrics.ratio(5),}}
        fillColor="red"
        unfillColor="#FFFFFF"
        isChecked={!isChecked}
        onPress={Bounce}/>
    <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(5),fontSize:20,bottom:Metrics.ratio(20),top:Metrics.ratio(5)}}>Shipping (As above)</Text>
       </View> 
        </View>
        {hiddenFields ? (
        <View>
       <View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
        <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>First Name</Text>
    <TextInput placeholder='First Name'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
    <Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>Last Name</Text>
    <TextInput placeholder='Last Name'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
<Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Email</Text>
    <TextInput placeholder='Email'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
        <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Phone</Text>
    <TextInput placeholder='Phone' keyboardType='numeric'  textAlign='left' auto style={styles.InputContainer} ></TextInput>
  <View style={{backgroundColor:'#F2F2F2'}}>
   <View style={styles.container}>
   <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Country</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countrydata}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Country' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          handleState(item.value)
          setIsFocus(false);
        }}
       
      />
      </View>
      <View style={styles.container}>
      <Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>State</Text>
       <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={statedata}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select State' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
  
          setIsFocus(false);
        }}
       
/>
       </View>
       <View style={styles.container}>
       <Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>City</Text>
       <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cityydata}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select City' : '...'}
        searchPlaceholder="Search..."
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
</View>
<View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
        <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Zip Code</Text>
    <TextInput placeholder='Zip Code'   textAlign='left' keyboardType='numeric' auto style={styles.InputContainer} ></TextInput>
    <Text style={{fontSize:15,color:'#F0F0F0',fontWeight:'400',color:'black'}}>Fax</Text>
    <TextInput placeholder='Fax'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
<Text style={{fontSize:15,color:'#F0F0F0',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Address</Text>
    <TextInput placeholder='Address'   textAlign='left' auto style={{ marginTop:Metrics.ratio(3),
  marginBottom:Metrics.ratio(10),
  backgroundColor:'#D1D3D0',
  margin:Metrics.ratio(5),
  right:Metrics.ratio(10),
  borderRadius:10,
  fontSize:15,
 width:Metrics.ratio(380),
 height:Metrics.ratio(70),}} ></TextInput>
 </View>
</View>
 ) : null}
<View style={styles.buttonView}>
      <Button
        loader={loader}
        btnPress={Pay}
        label={"Pay"}
      />
    </View>
<Toast ref={ref => Toast.setRef(ref)} /> 
   
    </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({  container: {
    backgroundColor: 'white',
    flex:1
  },
  buttonView: {
    height:Metrics.vh*5,
    backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
   marginTop:Metrics.ratio(50),
    bottom:Metrics.ratio(5)
  },
  dropdown: {
    height: Metrics.ratio(50), 
    width: Metrics.ratio(250), 
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor:'#C1C3C0',
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
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  inputSearchStyle: {
    height: Metrics.ratio(40),
    width:Metrics.ratio(400),
    fontSize: 16,
  },
  InputContainer:{
  marginTop:Metrics.ratio(3),
  marginBottom:Metrics.ratio(10),
  backgroundColor:'#D1D3D0',
  margin:Metrics.ratio(5),
  right:Metrics.ratio(10),
  borderRadius:10,
  fontSize:15,
 width:Metrics.ratio(380),
 height:Metrics.ratio(40),
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