import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Metrics } from '../themes';
import Button from '../components/Button';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import util from '../helpers/util';
import { useRoute } from '@react-navigation/native';

const EditProfie = ({ navigation }) => {
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
  const [countrydata, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const route = useRoute();
  const data = route.params.data;

  const [state, setState] = React.useState({
    first_name: data.first_name,
    tag_line: data.tag_desc,
    last_name: data.last_name,
    email: data.email,
    date: data.birthday,
    phone: data.mobile,
    gender: data.gender,
    country: data.user_country,
    state1: data.user_state,
    employment: data.employment,
    city: data.user_city,
    zip: data.zip_code,
    address: data.address,
    age: data.age,
    income: data.income,
    education: data.education,

  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
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
      quality: 5.0,
      maxWidth: 50,
      maxHeight: 50,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (!response.didCancel && !response.error && !response.customButton) {
        // Log the entire response for debugging
        console.log('Response = ', response);

        const firstImage = response.assets[0];
        const source = { uri: firstImage.uri };

        // Log the URI to check if it looks correct
        console.log('Image URI = ', source.uri);

        setSelectedImage(source);
      }
    });
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
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (!response.didCancel && !response.error && !response.customButton) {
        // Log the entire response for debugging
        console.log('Response = ', response);

        const firstImage = response.assets[0];
        console.log("firstImage.uri", firstImage.uri)
        const source = { uri: firstImage.uri };

        // Log the URI to check if it looks correct
        console.log('Image URI = ', source.uri);

        setSelectedImage2(source);
      }
    });
  };



  const validation = () => {
    const { tag_line, first_name, last_name, email, phone, zip, address, age, country, state1, city, income, employment, education, gender } =
      state;
    if (util.stringIsEmpty(tag_line)) {
      setLoader(false);
      util.errorMsg("Please enter tag line");
      return false;
    }
    if (util.stringIsEmpty(first_name)) {
      setLoader(false);
      util.errorMsg("Please enter first name");
      return false;
    }
    if (util.stringIsEmpty(last_name)) {
      setLoader(false);
      util.errorMsg("Please enter Last Name");
      return false;
    } if (util.stringIsEmpty(gender)) {
      setLoader(false);
      util.errorMsg("Please Select Gender");
      return false;
    }
    if (util.stringIsEmpty(age)) {
      setLoader(false);
      util.errorMsg("Please Select Age");
      return false;
    }
    if (util.stringIsEmpty(email)) {
      setLoader(false);
      util.errorMsg("Please enter Email");
      return false;
    }
    if (util.stringIsEmpty(phone)) {
      setLoader(false);
      util.errorMsg("Please enter Phone");
      return false;
    }
    if (util.stringIsEmpty(selectedDate)) {
      setLoader(false);
      util.errorMsg("Please pick your birthday Date");
      return false;
    }
    if (util.stringIsEmpty(education)) {
      setLoader(false);
      util.errorMsg("Please select education");
      return false;
    }
    if (util.stringIsEmpty(employment)) {
      setLoader(false);
      util.errorMsg("Please select employement");
      return false;
    }

    if (util.stringIsEmpty(income)) {
      setLoader(false);
      util.errorMsg("Please select income");
      return false;
    }
    if (util.stringIsEmpty(zip)) {
      setLoader(false);
      util.errorMsg("Please enter Zip Code");
      return false;
    }
    if (util.stringIsEmpty(country)) {
      setLoader(false);
      util.errorMsg("Please select Country");
      return false;
    }
    if (util.stringIsEmpty(state1)) {
      setLoader(false);
      util.errorMsg("Please enter State");
      return false;
    }
    if (util.stringIsEmpty(city)) {
      setLoader(false);
      util.errorMsg("Please enter City");
      return false;
    }


    if (util.stringIsEmpty(address)) {
      setLoader(false);
      util.errorMsg("Please enter Address");
      return false;
    }
    if (selectedImage == null) {
      setLoader(false);
      util.errorMsg("Please pick profile Image");
      return false;
    }
    if (selectedImage2 == null) {
      setLoader(false);
      util.errorMsg("Please pick Banner Image");
      return false;
    }
    return true;

  }
  const onCheckout = async () => {
    setLoader(true)
    if (!validation()) {
      return false;
    }

    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/updateprofile';

      const formData = new FormData();
      formData.append('user_id', data.user_id);
      formData.append('tagline', state.tag_line);
      formData.append('first_name', state.first_name);
      formData.append('last_name', state.last_name);
      formData.append('mobile', state.phone);
      formData.append('birthday', selectedDate);
      formData.append('education', state.education);
      formData.append('income', state.income);
      formData.append('employment', state.employment);
      formData.append('address', state.address);
      formData.append('user_country', state.country);
      formData.append('user_state', state.state1);
      formData.append('user_city', state.city);
      formData.append('age', state.age);
      formData.append('gender', state.gender);
      formData.append('zip_code', state.zip);
      formData.append('profile_pic', selectedImage);
      formData.append('user_banner', selectedImage2);


      const headers = {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
      };

      const response = await axios.post(apiUrl, formData, { headers });
     
      if (response.data.message == 'Profile Updated Sucessfully') {
        setLoader(false)
        util.successMsg("Profile Updated");
      }
      else {
        setLoader(false)
      }

    }
    catch (error) {
      setLoader(false);
      console.error('Error updating profile:', error);
    }

  }
  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');

    if (date) {
      // Format the date as 'YYYY/MM/DD'
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      // Convert the formatted date back to a Date object
      const dateObject = new Date(formattedDate);

      setSelectedDate(formattedDate);
    }

  };


  useEffect(() => {
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

  const handleState = countryCode => {
    const apiurl = 'https://amplepoints.com/apiendpoint/getcountrystate?';

    axios.get(apiurl, {
      params: {
        country_id: countryCode,
      }
    })
      .then((response) => {

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
    const apiurl = 'https://amplepoints.com/apiendpoint/getstatecity?';

    axios.get(apiurl, {
      params: {
        state_id: countryCode,
      }
    })
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
    { label: 'Post Graduate', value: '1' },
    { label: 'Under Graduate', value: '2' },

  ];
  const Employmentdata = [
    { label: 'Government', value: '1' },
    { label: 'Private Jobs', value: '2' },
    { label: 'Self Employeed', value: '3' },
    { label: 'Student', value: '4' },

  ];
  const Incomedata = [

    { label: '$0-$10,000', value: '1' },
    { label: '$10,000-$20,000', value: '2' },
    { label: '$20,000-$$50,000', value: '3' },
    { label: '$50,000-$100,000', value: '4' },
    { label: 'Over $100,000', value: '5' },
    { label: 'Student', value: '6' },

  ];
  const dataAge = Array.from({ length: 150 }, (_, index) => ({
    label: `${index + 1}`, // Labels will be "1", "2", ..., "150"
    value: index + 1,       // Values will be 1, 2, ..., 150
  }));


  let options = {

    storageOptions: {

      skipBackup: true,

      path: 'images',

    },

  };
  const Bounce = () => {
    setIsChecked(!isChecked);
    setHiddenFields(!isChecked); // Toggle the visibility of fields
  }

  return (
    <SafeAreaView style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#eeeeee', height: Metrics.ratio(40) }}>
          <Text style={{
            top: Metrics.ratio(10), left: 0, color: 'black', fontSize: 10, fontWeight: '600', textAlign: 'center', left: Metrics.ratio(10), fontFamily: Platform.select({
              ios: 'Times New Roman',
              android: 'Times New Roman', // You may need to adjust this for Android
            })
          }}>BY GIVING US ACCURATE INFORMATION WE CAN SERVE YOU BETTER</Text>
        </View>
        <View style={{ marginLeft: Metrics.ratio(2) }}>
          <View style={{ left: 7, position: 'relative', }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 10,
              color: 'black',
              left: 0,
              fontWeight: '700',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Personal Information</Text>
            <View style={{
              position: 'absolute',
              top: Metrics.ratio(25),
              left: 0,
              height: 2,
              backgroundColor: '#FF2E00', // Set the color you want for the underline
              width: '10%', // Make the underline span the entire width
            }} />
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Tag Line</Text>
            <TextInput placeholder='Tag Line' textAlign='left' value={state.tag_line} onChangeText={(text) => _handleTextChange('tag_line', text)} auto style={styles.InputContainer} ></TextInput>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 10,
              color: '#FF2E00',
              left: 0,
              fontWeight: '700',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
            <View style={{ flex: 1, flexDirection: 'row', }}>
              <View style={{ width: '45%' }}>
                <Text style={{
                  top: Metrics.ratio(10),
                  paddingBottom: Metrics.ratio(10),
                  fontSize: 12,
                  left: 0,
                  fontWeight: '600',
                  fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'Times New Roman',
                  }),
                }}>First Name</Text>
                <TextInput placeholder='First Name' value={state.first_name} onChangeText={(text) => _handleTextChange('first_name', text)} textAlign='left' auto style={styles.InputContainer2} ></TextInput>
              </View>
              <View style={{ width: '45%', marginLeft: Metrics.ratio(20) }}>
                <Text style={{
                  top: Metrics.ratio(10),
                  paddingBottom: Metrics.ratio(10),
                  fontSize: 12,
                  left: 0,
                  fontWeight: '600',
                  fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'Times New Roman',
                  }),
                }}>Last Name</Text>
                <TextInput placeholder='Last Name' value={state.last_name} onChangeText={(text) => _handleTextChange('last_name', text)} textAlign='left' auto style={styles.InputContainer2} ></TextInput>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
              <View style={{ width: '45%' }}>
                <Text style={{
                  top: Metrics.ratio(10),
                  paddingBottom: Metrics.ratio(10),
                  fontSize: 12,
                  left: 0,
                  fontWeight: '600',
                  fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'Times New Roman',
                  }),
                }}>Gender</Text>
                <Dropdown
                  style={[styles.InputContainer2, isFocus1 && { borderColor: 'black', backgroundColor: '#D8D9D8', alignItems: 'center' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={genderdata}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus1 ? 'Select Gender' : '...'}
                  value={state.gender}
                  onFocus={() => setIsFocus1(true)}
                  onBlur={() => setIsFocus1(false)}
                  onChange={item => {
                    _handleTextChange('gender', item.value)
                    setIsFocus1(false);
                  }}
                />
              </View>
              <View style={{ width: '45%', marginLeft: Metrics.ratio(20) }}>
                <Text style={{
                  top: Metrics.ratio(10),
                  paddingBottom: Metrics.ratio(10),
                  fontSize: 12,
                  left: 0,
                  fontWeight: '600',
                  fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'Times New Roman',
                  }),
                }}>Age</Text>
                <Dropdown
                  style={[styles.InputContainer2, isFocus2 && { borderColor: 'black', backgroundColor: '#D8D9D8', alignItems: 'center' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dataAge}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus2 ? 'Select Age' : '...'}
                  value={state.age}
                  onFocus={() => setIsFocus2(true)}
                  onBlur={() => setIsFocus2(false)}
                  onChange={item => {
                    _handleTextChange('age', item.value)
                    setIsFocus2(false);
                  }}
                />
              </View>
            </View>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Email</Text>
            <TextInput placeholder='Email' value={state.email} onChangeText={(text) => _handleTextChange('email', text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 10,
              color: '#FF2E00',
              left: 0,
              fontWeight: '700',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Contact Number - Cell Phone</Text>
            <TextInput placeholder='Contact Number' keyboardType='numeric' value={state.phone} onChangeText={(text) => _handleTextChange('phone', text)} textAlign='left' auto style={styles.InputContainer}  ></TextInput>
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 10,
              color: '#FF2E00',
              left: 0,
              fontWeight: '700',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Birthday</Text>
            <TouchableOpacity
              style={{
                flex: 1, flexDirection: 'row', backgroundColor: '#eeeeee',
                margin: Metrics.ratio(5),
                right: Metrics.ratio(10),
                borderRadius: 2,
                borderWidth: 0.5,
                borderColor: '#C1C3C0',
                fontSize: 12,
                width: '100%',
                alignItems: 'center',
                height: Metrics.ratio(38), justifyContent: 'space-between', top: Metrics.ratio(5), backgroundColor: '#eeeeee'
              }}
              onPress={() => setShowDatePicker(true)}
            >

              <Text style={{
                left: Metrics.ratio(10), textAlign: 'center', top: 2, fontWeight: '300', fontFamily: Platform.select({
                  ios: 'Arial',
                  android: 'Arial', // You may need to adjust this for Android
                }),
              }}>{selectedDate ? `${selectedDate}` : 'PickUp Date'}</Text>
              <Image source={require('../assets/Date.png')} style={{ right: Metrics.ratio(10), width: 25, height: 25 }} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 10,
              color: '#FF2E00',
              left: 0,
              fontWeight: '700',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Education</Text>
            <Dropdown
              style={[styles.InputContainer, isFocus3 && { borderColor: 'black', alignItems: 'center' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={qualificationdata}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus3 ? 'Select qualification' : '...'}
              value={state.education}
              onFocus={() => setIsFocus3(true)}
              onBlur={() => setIsFocus3(false)}
              onChange={item => {
                _handleTextChange('education', item.value)
                setIsFocus3(false);
              }}
            />
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>EMPLOYEEMENT</Text>
            <Dropdown
              style={[styles.InputContainer, isFocus4 && { borderColor: 'black', alignItems: 'center' }]}
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
              value={state.employment}
              onFocus={() => setIsFocus4(true)}
              onBlur={() => setIsFocus4(false)}
              onChange={item => {
                _handleTextChange('employment', item.value)
                setIsFocus4(false);
              }}
            />
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>INCOME</Text>
            <Dropdown
              style={[styles.InputContainer, isFocus8 && { borderColor: 'black', alignItems: 'center' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={Incomedata}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus8 ? 'Select Income' : '...'}
              value={state.income}
              onFocus={() => setIsFocus4(true)}
              onBlur={() => setIsFocus4(false)}
              onChange={item => {
                _handleTextChange('income', item.value)
                setIsFocus8(false);
              }}
            />
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 10,
              color: '#FF2E00',
              left: 0,
              fontWeight: '700',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>BY ENTERING YOUR BIRTH DATE YOU WILL EARN 5 AMPLEPOINTS</Text>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Zip Code</Text>
            <TextInput placeholder='Zip Code' keyboardType='numeric' value={state.zip} onChangeText={(text) => _handleTextChange('zip', text)} textAlign='left' auto style={styles.InputContainer} ></TextInput>
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Country</Text>
            <Dropdown
              style={[styles.InputContainer, isFocus5 && { borderColor: 'black', backgroundColor: '#D8D9D8', alignItems: 'center' }]}
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
              value={state.country}
              onFocus={() => setIsFocus5(true)}
              onBlur={() => setIsFocus5(false)}
              onChange={item => {
                _handleTextChange('country', item.value)
                setIsFocus5(false);
                handleState(item.value);
              }}
            />
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>State</Text>
            <Dropdown
              style={[styles.InputContainer, isFocus6 && { borderColor: 'black', backgroundColor: '#D8D9D8', alignItems: 'center' }]}
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
              value={state.state1}
              onFocus={() => setIsFocus6(true)}
              onBlur={() => setIsFocus6(false)}
              onChange={item => {
                _handleTextChange('state1', item.value)
                setIsFocus6(false);
                handleCity(item.value)
              }}
            />
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>City</Text>
            <Dropdown
              style={[styles.InputContainer, isFocus7 && { borderColor: 'black', backgroundColor: '#D8D9D8', alignItems: 'center' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={cityData}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus7 ? 'Select City' : '...'}
              value={state.city}
              onFocus={() => setIsFocus7(true)}
              onBlur={() => setIsFocus7(false)}
              onChange={item => {
                _handleTextChange('city', item.value)
                setIsFocus7(false);
              }}
            />
          </View>

          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 12,
              left: 0,
              fontWeight: '600',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>Address</Text>
            <TextInput placeholder='Address' value={state.address} onChangeText={(text) => _handleTextChange('address', text)} textAlign='left' auto style={styles.InputContainer3} ></TextInput>
          </View>
          <View style={{ left: Metrics.ratio(10), marginRight: Metrics.ratio(10) }}>
            <Text style={{
              top: Metrics.ratio(10),
              paddingBottom: Metrics.ratio(10),
              fontSize: 10,
              color: '#FF2E00',
              left: 0,
              fontWeight: '700',
              fontFamily: Platform.select({
                ios: 'Times New Roman',
                android: 'Times New Roman',
              }),
            }}>BY ENTERING YOUR PROFILE IMAGE YOU WILL EARN 5 AMPLEPOINTS</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: Metrics.ratio(10), paddingBottom: Metrics.ratio(20), justifyContent: 'center' }}>
            <View style={{ marginRight: Metrics.ratio(50) }}>

              <Text style={{ fontSize: 8, textAlign: 'center', fontWeight: '500' }}>Profile Picture</Text>

              {selectedImage ? (

                <Image
                  source={selectedImage}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    resizeMode: 'contain',
                  }}
                />
              ) : (
                <TouchableOpacity onPress={LaunchimageLibrary}>
                  <Image
                    source={{ uri: data.user_image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAACUCAMAAAAzmpx4AAAAMFBMVEXk5ueutLfn6erq7O2qsLTZ3N21ur3P0tTIzM6nrrHd3+DU19mxt7rBxsjg4uO6v8I4tUPFAAAE8klEQVR4nO2d0XqkIAxGNSCgiLz/2y7oTLudqqMQ5Lftudlv7+ZsIECEbNMUh4SgZrA6Yof5b3eHms74tg/IwPynMl1zbzHr2l62L8heentTsTDq1pSeYq3rav/C8wQnv6X0FPM384px2nf68LrPQKTBtG+dZi9phpt4UWPVIafZS90jb9BkjiotuAlfizp/OFAPfIeuRVaddFpGITYJUoHRQkfLjilS2FrUjWfn1KdW7R+/SbpUAHSjQVPSnPqIVu3fv8HplP4F6RGnFuk+R6ptewOoNWRKBS28qUW5TlFL1LZ4QZjsUIWp5cC0JgapEKwBamqJvPz3wYgULMpPFQsSaeckstbf/1E4VtQxhSqgYbSEZ5PCCRZNPKliAeVgLE4WKvZBWbOILVdE1FTbZ4Y6Tql2xMgXwrFagQxB3gEYhmBtoZkhsQKzBUQJgzSzVYtweuSeVhgTi3NjseBrK0WYk0Ur1VBbqWk6biuEQm7K54J3VvXXYcGeAhGSoDAFrKonQf7EHlJ7/Vj9Wf1Z/Vn9Wf1mq5+5Xml2KYC9BaVeRtgGYB/4M/fsJc5XAF9S+b6HPEE4C/Of8CHqFvw1JgAr9nogxr069totxOcD7j2TRxiAYR1mlUJYgyPEOrFGiAHIPQQxBmC8bcH5XRhhuzTzI7/hh3zBFyyQXBERbPlixJHiuxwjgUIVN+5MYxBJiuvSWY9yMeaBcAzBkihr1Sf5Um1f2+E7+QmjhziCfIVcppasX9xcIzMPYj6poCkvVABf7tfIunwmAcplG6SfH6Wu/dt3SC66I0tRo9MeliFLRXRCJhzRpeJ74bNSGAXAfWg4WcZwYFvadWg6MQrlqG/wYD1C1Dl5zEs6S/eQamK47JueHTO9tzcJ1AIFL/WuF4kKg+9OUk1cuqbYCmczTDLE6RadLV4IP3nQXq71+OmVGZo7Oj2ZrFFzG6aHTzByFqSUnkWYZJ02M7q75bD7LZD4xo2jRYFpsNo471VsUiTnlVl558zcxe1uWT12mdJOPZu2vabApY2bHL25zyIckl5Ypw7sLFoZtZWxoAWLmfivPliztkDtu/X96PQwAa5fYY5Mc6PAtOKZjF0F7QCV9YmSgvTNrHVhOQPJIXGNNUd26EfEwljsmvpi1HR6ZxObIKZiZqzqRY116uAB8bhYGIkV+++Fo7zL6cC04+VNVyde1Gh/rPdhkpgyFYo0grQvEqdPlLu634qwpZ1mL9Nc+ElVTOy3Ure89FUbfCrx3GATP1wSLsF9I/Udpny4qMRrlzeornC4RF43vVTK3gMq8dTlCL0vt9cgMuWz+TpSlVqTaWJq+5WkVepzZMd1ryxNqzclpOwFm4l9L8M/uWy5nexhLfaO05WS31eYtQhCKmR4Ti0CGH4LvWObW8wPQbLoua7bMXf8yoTpFiFNF+/R3yBZntJRxR3FKtLma1U4ebxjzK5nCA0WqUhuH220SfUgc2rBTaqFMetccmnd5QxZz7+nqoePPTLGIGD+e5LegYDqnhN3Sd9iEMc7nUIkFzIKdBlhJDVYyKFKDhbyrIrItOpMteLfQZL+g6nhqq85ySTUqZEOwOtIl3B5En0AxpX4bLBowNzX/s/5101YxYp1pDk9BBFPi6/4s4fiCXoJfiBPTizCz+uB/uTEusO0Or+9IMt3jawgZ1es3P947BrUxseEf1TZS9u3A43xAAAAAElFTkSuQmCC' }}
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
              <Text style={{ fontSize: 8, fontWeight: '500', textAlign: 'center', }}>Profile Banner</Text>
              {selectedImage2 ? (

                <Image
                  source={selectedImage2}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    resizeMode: 'contain',
                  }}
                />
              ) : (
                <TouchableOpacity onPress={LaunchimageLibrary2}>
                  <Image
                    source={{ uri: data.user_banner || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAACUCAMAAAAzmpx4AAAAMFBMVEXk5ueutLfn6erq7O2qsLTZ3N21ur3P0tTIzM6nrrHd3+DU19mxt7rBxsjg4uO6v8I4tUPFAAAE8klEQVR4nO2d0XqkIAxGNSCgiLz/2y7oTLudqqMQ5Lftudlv7+ZsIECEbNMUh4SgZrA6Yof5b3eHms74tg/IwPynMl1zbzHr2l62L8heentTsTDq1pSeYq3rav/C8wQnv6X0FPM384px2nf68LrPQKTBtG+dZi9phpt4UWPVIafZS90jb9BkjiotuAlfizp/OFAPfIeuRVaddFpGITYJUoHRQkfLjilS2FrUjWfn1KdW7R+/SbpUAHSjQVPSnPqIVu3fv8HplP4F6RGnFuk+R6ptewOoNWRKBS28qUW5TlFL1LZ4QZjsUIWp5cC0JgapEKwBamqJvPz3wYgULMpPFQsSaeckstbf/1E4VtQxhSqgYbSEZ5PCCRZNPKliAeVgLE4WKvZBWbOILVdE1FTbZ4Y6Tql2xMgXwrFagQxB3gEYhmBtoZkhsQKzBUQJgzSzVYtweuSeVhgTi3NjseBrK0WYk0Ur1VBbqWk6biuEQm7K54J3VvXXYcGeAhGSoDAFrKonQf7EHlJ7/Vj9Wf1Z/Vn9Wf1mq5+5Xml2KYC9BaVeRtgGYB/4M/fsJc5XAF9S+b6HPEE4C/Of8CHqFvw1JgAr9nogxr069totxOcD7j2TRxiAYR1mlUJYgyPEOrFGiAHIPQQxBmC8bcH5XRhhuzTzI7/hh3zBFyyQXBERbPlixJHiuxwjgUIVN+5MYxBJiuvSWY9yMeaBcAzBkihr1Sf5Um1f2+E7+QmjhziCfIVcppasX9xcIzMPYj6poCkvVABf7tfIunwmAcplG6SfH6Wu/dt3SC66I0tRo9MeliFLRXRCJhzRpeJ74bNSGAXAfWg4WcZwYFvadWg6MQrlqG/wYD1C1Dl5zEs6S/eQamK47JueHTO9tzcJ1AIFL/WuF4kKg+9OUk1cuqbYCmczTDLE6RadLV4IP3nQXq71+OmVGZo7Oj2ZrFFzG6aHTzByFqSUnkWYZJ02M7q75bD7LZD4xo2jRYFpsNo471VsUiTnlVl558zcxe1uWT12mdJOPZu2vabApY2bHL25zyIckl5Ypw7sLFoZtZWxoAWLmfivPliztkDtu/X96PQwAa5fYY5Mc6PAtOKZjF0F7QCV9YmSgvTNrHVhOQPJIXGNNUd26EfEwljsmvpi1HR6ZxObIKZiZqzqRY116uAB8bhYGIkV+++Fo7zL6cC04+VNVyde1Gh/rPdhkpgyFYo0grQvEqdPlLu634qwpZ1mL9Nc+ElVTOy3Ure89FUbfCrx3GATP1wSLsF9I/Udpny4qMRrlzeornC4RF43vVTK3gMq8dTlCL0vt9cgMuWz+TpSlVqTaWJq+5WkVepzZMd1ryxNqzclpOwFm4l9L8M/uWy5nexhLfaO05WS31eYtQhCKmR4Ti0CGH4LvWObW8wPQbLoua7bMXf8yoTpFiFNF+/R3yBZntJRxR3FKtLma1U4ebxjzK5nCA0WqUhuH220SfUgc2rBTaqFMetccmnd5QxZz7+nqoePPTLGIGD+e5LegYDqnhN3Sd9iEMc7nUIkFzIKdBlhJDVYyKFKDhbyrIrItOpMteLfQZL+g6nhqq85ySTUqZEOwOtIl3B5En0AxpX4bLBowNzX/s/5101YxYp1pDk9BBFPi6/4s4fiCXoJfiBPTizCz+uB/uTEusO0Or+9IMt3jawgZ1es3P947BrUxseEf1TZS9u3A43xAAAAAElFTkSuQmCC' }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
              )}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  buttonView: {
    height: Metrics.ratio(30),
    backgroundColor: '#FF2F00',
    borderRadius: Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: Metrics.ratio(50),
    paddingBottom: Metrics.ratio(20)
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
  InputContainer2: {
    backgroundColor: '#eeeeee',
    margin: Metrics.ratio(5),
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C1C3C0',
    fontSize: 12,
    width: '100%',
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