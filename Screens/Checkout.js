import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Metrics } from '../themes';
import Button from '../components/Button';
import Payement from './Payement';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useStripe } from '@stripe/stripe-react-native';
import OrderSummary from './OrderSummary';
import util from '../helpers/util';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Checkout = ({ navigation }) => {
  const route=useRoute();
  const user_Id = route.params.user_Id;
  const [isChecked, setIsChecked] = useState(false);
  const [hiddenFields, setHiddenFields] = useState(true); // Initially, fields are visible
  const [CompleteProfile, setCompleteProfile] = useState(null);
  const [loader, setLoader] = useState(false);
 
  useEffect(() => {
    getData();

    getcoutrylist();
  }, []);

  const getcoutrylist = async () => {
    const apiurl = 'https://amplepoints.com/apiendpoint/getcoutrylist';

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


  // const onCheckout=async()=>{
  //   const apiurl='https://amplepoints.com/apiendpoint/checkout?';

  //       axios.get(apiurl,{
  //         params:{
  //           user_id:user_Id,
  //         }
  //       })
  //         .then((response) => {
  //           console.log("Response",response.data.data)
  //           if (response.data.status === 'S') {

  //             var count = Object.keys(response.data.data).length;
  //             let countryArray = [];
  //             for (var i = 0; i < count; i++) {
  //               countryArray.push({
  //                 value: response.data.data[i].country_id,
  //                 label: response.data.data[i].statename,
  //               });
  //             }
  //             setCity(countryArray);
  //           }  
  //         }).catch((error) => {
  //           console.error('Error :', error);
  //         });
  // }
  const getData = async () => {

    try {
      const storedProfileString = await AsyncStorage.getItem('CompleteProfile');

      // Convert the string back to an object
      const storedProfile = JSON.parse(storedProfileString);

      if (storedProfileString != null) {
        setCompleteProfile(storedProfile)
      }
      console.log(storedProfileString)

    }
    catch (error) {
      console.error('Error checking authentication:', error);
    }

  }

  const Pay = async () => {
    navigation.navigate("OrderSummary", {
      user_Id,
      CompleteProfile
    })
  }

  const Bounce = () => {
    setIsChecked(!isChecked);
    setHiddenFields(!isChecked); // Toggle the visibility of fields
  }

  return (
    <SafeAreaView>
      {CompleteProfile != null && (
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#CED0CD', height: Metrics.ratio(40) }}>
            <Text style={{
              top: Metrics.ratio(10), left: 0, color: 'black', fontSize: 15, fontWeight: '500', fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman', // You may need to adjust this for Android
              }), textAlign: 'center', marginRight: Metrics.ratio(190), marginLeft: Metrics.ratio(10)
            }}>Biling Details</Text>
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>First Name</Text>
            <TextInput placeholder='First Name' value={CompleteProfile.first_name} onChangeText={(text) => _handleTextChange('first_name', text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
            <Text style={{ fontSize: 15, color: '#7D7D7D', fontWeight: '400', color: 'black' }}>Last Name</Text>
            <TextInput placeholder='Last Name' value={CompleteProfile.last_name} onChangeText={(text) => _handleTextChange('last_name', text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
            <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>Email</Text>
            <TextInput placeholder='Email' value={CompleteProfile.email} onChangeText={(text) => _handleTextChange('email', text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>Phone</Text>
            <TextInput placeholder='Phone' value={CompleteProfile.mobile} onChangeText={(text) => _handleTextChange('phone', text)} keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>

            <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>Country</Text>
            <TextInput placeholder='Country' value={CompleteProfile.user_country} onChangeText={(text) => _handleTextChange('phone', text)} keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>

            <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>State</Text>
            <TextInput placeholder='State' value={CompleteProfile.user_state} onChangeText={(text) => _handleTextChange('phone', text)} keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>

            <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>City</Text>
            <TextInput placeholder='City' value={CompleteProfile.user_city} onChangeText={(text) => _handleTextChange('phone', text)} keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>

            <Text style={{
              fontSize: 15, fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'serif', // You may need to adjust this for Android
              }), color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black'
            }}>Zip Code</Text>
            <TextInput placeholder='Zip Code' value={CompleteProfile.zip_code} onChangeText={(text) => _handleTextChange('zip', text)} textAlign='left' keyboardType='numeric' auto style={styles.InputContainer} ></TextInput>
            <Text style={{ fontSize: 15, color: '#F0F0F0', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black', textAlign: 'auto' }}>Address</Text>
            <TextInput placeholder='Address' value={CompleteProfile.address} textAlign='left' auto style={styles.InputContainer3} ></TextInput>

            <View style={{ flex: 1, flexDirection: 'row', top: Metrics.ratio(1) }}>

              <BouncyCheckbox
                style={{ marginTop: Metrics.ratio(7), left: Metrics.ratio(5), }}
                fillColor="red"
                unfillColor="#FFFFFF"
                isChecked={isChecked}
                onPress={Bounce} />
              <Text style={{ color: 'black', fontWeight: '900', paddingLeft: Metrics.ratio(5), fontSize: 18, bottom: Metrics.ratio(20), top: Metrics.ratio(5) }}>Shipping (As above)</Text>
            </View>
          </View>
          {!hiddenFields && (
            <View>
              <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
                <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>First Name</Text>
                <TextInput placeholder='First Name' value={CompleteProfile.first_name} onChangeText={(text) => _handleTextChange('first_name', text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
                <Text style={{ fontSize: 15, color: '#7D7D7D', fontWeight: '400', color: 'black' }}>Last Name</Text>
                <TextInput placeholder='Last Name' value={CompleteProfile.last_name} onChangeText={(text) => _handleTextChange('last_name', text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
                <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>Email</Text>
                <TextInput placeholder='Email' textAlign='left' auto style={styles.InputContainer} value={CompleteProfile.email} onChangeText={(text) => _handleTextChange('email', text)} ></TextInput>
              </View>
              <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
                <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>Phone</Text>
                <TextInput placeholder='Phone' value={CompleteProfile.mobile} onChangeText={(text) => _handleTextChange('phone', text)} keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>

                <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>Country</Text>
                <TextInput placeholder='Phone' value={CompleteProfile.user_country} onChangeText={(text) => _handleTextChange('phone', text)} keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>

                <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>State</Text>
                <TextInput placeholder='Phone' value={CompleteProfile.user_state} onChangeText={(text) => _handleTextChange('phone', text)} keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>

                <Text style={{ fontSize: 15, color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black' }}>City</Text>
                <TextInput placeholder='Phone' value={CompleteProfile.user_city} onChangeText={(text) => _handleTextChange('phone', text)} keyboardType='numeric' textAlign='left' auto style={styles.InputContainer} ></TextInput>

              </View>
              <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
                <Text style={{
                  fontSize: 15, fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'serif', // You may need to adjust this for Android
                  }), color: '#7D7D7D', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black'
                }}>Zip Code</Text>
                <TextInput placeholder='Zip Code' textAlign='left' value={CompleteProfile.zip_code} keyboardType='numeric' auto style={styles.InputContainer} ></TextInput>
                <Text style={{ fontSize: 15, color: '#F0F0F0', paddingTop: Metrics.ratio(10), fontWeight: '400', color: 'black', textAlign: 'auto' }}>Address</Text>
                <TextInput placeholder='Address' value={CompleteProfile.address} onChangeText={(text) => _handleTextChange('address', text)} textAlign='left' auto style={styles.InputContainer3} ></TextInput>
              </View>
            </View>
          )}
          <View style={styles.buttonView}>
            <Button
              loader={loader}
              btnPress={Pay}

              label={"Pay"}
            />
          </View>
          <Toast ref={ref => Toast.setRef(ref)} />

        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  InputContainer3: {
    backgroundColor: '#eeeeee',
    margin: Metrics.ratio(5),
    right: Metrics.ratio(10),
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C1C3C0',
    fontSize: 12,
    width: '100%',
    height: Metrics.ratio(58),
  },
  buttonView: {
    height: Metrics.vh * 5,
    backgroundColor: '#FF2F00',
    borderRadius: Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: Metrics.ratio(50),
    bottom: Metrics.ratio(5)
  },
  dropdown: {
    height: Metrics.ratio(20),
    width: '90%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F1F0F7',
    color: '#D8D9D8'
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
    width: Metrics.ratio(400),
    fontSize: 16,
  },
  InputContainer: {
    backgroundColor: '#eeeeee',
    margin: Metrics.ratio(5),
    right: Metrics.ratio(10),
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#C1C3C0',
    fontSize: 12,
    width: '100%',
    alignItems: 'center',
    height: Metrics.ratio(38),
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
    height: Metrics.vh * 5,
    backgroundColor: '#FF2F00',
    borderRadius: Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    top: Metrics.ratio(0),
    bottom: Metrics.ratio(25)
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