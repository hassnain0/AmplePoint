import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Metrics } from '../themes';
import Button from '../components/Button';
import axios from 'axios';
import util from '../helpers/util';
import Checkout from './Checkout';
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verticalScale } from 'react-native-size-matters';
const Cart = ({ navigation }) => {
  const route = useRoute();
  console.log("User ID", route.params.user_Id)
  const User_Id = route.params.user_Id;

  const [deleteCount, setDeleteCount] = useState(0);
  const [actulaData, setActualData] = useState(null);


  useEffect(() => {
    checkAuthentication();
    getProductDetails();
    setLoading(false)
  }, [deleteCount])
  const [quantity, setQuantity] = useState(1);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  //Number of Carts recieved from API
  const [product_no, setProduct_no] = useState(0);

  const increaseQuantity = (item) => {
    setActualData((prevData) => {
      console.log('Previous Data:', prevData);

      const newData = [...prevData.data];
      const itemIndex = newData.findIndex((dataItem) => dataItem.id === item.id);

      console.log("Index", itemIndex);

      if (itemIndex !== -1 && parseInt(newData[itemIndex].item_added_quantity, 10) > 0) {
        newData[itemIndex].item_added_quantity = (parseInt(newData[itemIndex].item_added_quantity, 10) + 1).toString();

        const updatedData = { ...prevData, data: newData };


        return updatedData;
      }


      return prevData;
    });
  };
  const decreaseQuantity = (item) => {
    setActualData((prevData) => {

      const newData = [...prevData.data];
      const itemIndex = newData.findIndex((dataItem) => dataItem.id === item.id);
      if (itemIndex !== -1 && parseInt(newData[itemIndex].item_added_quantity, 10) > 1) {
        newData[itemIndex].item_added_quantity = (parseInt(newData[itemIndex].item_added_quantity, 10) - 1).toString();

        const updatedData = { ...prevData, data: newData };


        return updatedData;
      }


      return prevData;
    });
  };


  //CheckOut
  const Checkout = async () => {
    setLoader(true);
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/checkbeforecheckout?';
      const response = await axios.get(apiUrl, {
        params: {
          user_id: User_Id,
        },
      });

      if (response.data.status == 'F') {
        setLoader(false);
        util.errorMsg(response.data.message)
        return;
      }
      else {
        setLoader(false);
        CallCheckoutApi();
      }
    }
    catch (error) {
      // Handle the error
      console.error('Error:', error);
    }

  }

  const CallCheckoutApi = async () => {
    setLoader(true);
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/checkout?';
      const response = await axios.get(apiUrl, {
        params: {
          user_id: User_Id,
        },
      });
      if (response.data.status == 'S') {
        util.successMsg("Sucessfull");
        setLoader(false);
        navigation.navigate("Checkout",
          User_Id)
      }

    }
    catch (error) {
      // Handle the error
      console.error('Error:', error);
    }
  }
  const getProductDetails = async () => {
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/getusercart?';
      const response = await axios.get(apiUrl, {
        params: {
          user_id: User_Id,
        },
      });

      setActualData(response.data)
      setProduct_no(response.data.length || 0);
      const cart_items = response.data.data;
      setProduct_no(cart_items.length || 0)
      if (response.data && response.data.data.item_added_quantity) {
        setQuantity(response.data.data.item_added_quantity)
      }

    } catch (error) {
      // Handle the error
      console.error('Error:', error);
    }
  };
  const checkAuthentication = async () => {
    try {
      // Check if a user token exists in AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');

      // If the token exists, the user is logged in
      if (userToken) {
        console.log('User is logged in');
      } else {
        // If the token doesn't exist, navigate to the login screen
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };
  const delProduct = async (item) => {
    try {

      const apiUrl = 'https://amplepoints.com/apiendpoint/removetocart?';
      console.log("Item ", item)
      const response = await axios.get(apiUrl, {
        params: {
          user_id: User_Id,
          product_id: item.product_id,
          product_added_id: item.productaddedid
        },

      });

      if (response.data.status === 'S') {
        util.successMsg("Item SUccessfully removed")
        setDeleteCount((prev) => prev + 1);
      }

    } catch (error) {
      // Handle the error
      console.error('Error:', error);
    }
  };
  const MyComponent = () => {
    return (
      <View>
        {actulaData?.data?.map((item, index) => (
          <View>
            <View key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', left: Metrics.ratio(10), marginBottom: Metrics.ratio(50) }}>
              <View style={{ top: Metrics.ratio(20), flex: 1, flexDirection: 'column' }}>
                <Text style={{
                  fontSize: 15, color: 'black', fontWeight: 'bold', bottom: Metrics.ratio(10), fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'Times New Roman', // You may need to adjust this for Android
                  }),
                }}>{item.item_added}</Text>
                <View style={{
                  flex: 1, flexDirection: 'row', fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'Times New Roman', // You may need to adjust this for Android
                  }),
                }}>
                  <Text style={{
                    fontSize: 10, color: 'black', fontWeight: 'bold', fontFamily: Platform.select({
                      ios: 'Times New Roman',
                      android: 'Times New Roman', // You may need to adjust this for Android
                    }),
                  }}>By: </Text>
                  <Text style={{ fontSize: 10, fontWeight: '700', }}>{item.supplier_name}</Text>
                </View>

                <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', }}>
                  ${item.item_added_price}
                </Text>
                <Text >Free with{item.no_of_amples}AmplePoints</Text>

              </View>
              <View style={{ top: Metrics.ratio(30), flex: 1, flexDirection: 'column', left: Metrics.ratio(110) }}>
                <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${item.id}/${item.image}` }} />
                {item.apply_amples == 0.00 && (
                  <View style={{ flex: 1, flexDirection: 'row', top: Metrics.ratio(50) }}>
                    <TouchableOpacity onPress={() => increaseQuantity(item)} style={styles.button1} >
                      <Image source={require('../assets/PlusButton.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.item_added_quantity}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(item)}>
                      <Image source={require('../assets/Minus.png')} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity onPress={() => delProduct(item)} style={{
                  color: 'white', right: Metrics.ratio(10),
                  backgroundColor: '#ff3d00',

                  top: verticalScale(15),
                  width: Metrics.ratio(70),
                  height: Metrics.ratio(25),
                  alignSelf: 'left',
                  borderRadius: 10,
                }}>
                  <Text style={{
                    fontSize: 12, textAlign: 'center', color: 'white', alignContent: 'center', fontFamily: Platform.select({
                      ios: 'Times New Roman',
                      android: 'Times New Roman', // You may need to adjust this for Android
                    }),
                  }}>Remove</Text>

                </TouchableOpacity>

              </View>



            </View>
            <View style={{ backgroundColor: '#d0d0d0', height: verticalScale(10), marginTop: Metrics.ratio(10) }}></View>
          </View>
        ))}

      </View>

    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner
        visible={loading}
        size={'large'}
        textContent={'Loading...'}
        textStyle={{ color: '#ff3d00' }}

      />

      {actulaData && (
        <View >
          <ScrollView style={{ backgroundColor: 'white' }}>

            <View style={{ flex: 1 }}>
              <View style={{ height: Metrics.ratio(30), flex: 1, flexDirection: 'row', backgroundColor: '#d0d0d0', justifyContent: 'space-between' }}>
                <Text style={{
                  marginLeft: Metrics.ratio(10), textAlign: 'right', color: 'black', fontSize: 10, fontWeight: '800', fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'Times New Roman', // You may need to adjust this for Android
                  }),
                }}>Item({product_no})</Text>
                <Text style={{
                  marginRight: Metrics.ratio(10), textAlign: 'center', color: 'black', fontSize: 10, fontWeight: '800', fontFamily: Platform.select({
                    ios: 'Times New Roman',
                    android: 'Times New Roman', // You may need to adjust this for Android
                  }),
                }}>
                  Total: {parseFloat(actulaData.cart_total).toFixed(1)} $
                </Text>
              </View>
            </View>
            <MyComponent />
            <Toast ref={ref => Toast.setRef(ref)} />
            <View style={styles.buttonView}>
              <Button
                btnPress={Checkout}
                loader={loader}
                label={"Check Out"}
              />
            </View>


          </ScrollView>

        </View>


      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FF2E00',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(15),

    // paddingHorizontal:Metrics.ratio(5),
  },
  textHeader: {
    color: Colors.white,
    fontSize: Metrics.ratio(15),
    fontWeight: 'bold',
    paddingLeft: Metrics.ratio(100),
    textAlign: 'center'
  },
  buttonView: {
    height: Metrics.vh * 5,
    backgroundColor: '#FF2F00',
    borderRadius: Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',

  },
  icon: {
    width: Metrics.ratio(15),
    height: Metrics.ratio(12),
  },
  button4: {
    color: 'white',
    backgroundColor: '#FC3F01',
    borderRadius: 5,
    top: Metrics.ratio(40),
    width: Metrics.ratio(80),
    height: Metrics.ratio(40),
    left: Metrics.ratio(110)
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    top: Metrics.ratio(5),
    textAlign: 'center',
    borderRadius: 20
  },
  ImageContainer: {

    width: Metrics.ratio(80),
    height: Metrics.ratio(50),
    borderRadius: 10,
    right: Metrics.ratio(20)
  },
  button: {
    backgroundColor: '#d0d0d0',
    borderRadius: 1,
    bottom: Metrics.ratio(30),
    height: Metrics.ratio(15),
    right: Metrics.ratio(40)
  }, container3: {
    right: Metrics.ratio(30),
    left: Metrics.ratio(20),
    top: Metrics.ratio(20),
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
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
    left: Metrics.ratio(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityText: {
    backgroundColor: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    bottom: Metrics.ratio(32),

  },
  button1: {
    backgroundColor: '#ff3f09',
    borderRadius: 1,
    bottom: Metrics.ratio(30),
    height: Metrics.ratio(15),
    left: Metrics.ratio(40)
  }, button3: {
    color: 'white',
    backgroundColor: '#FC3F01',
    borderRadius: 5,
    width: Metrics.ratio(80),
    height: Metrics.ratio(40),
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  TouchContainer1: {
    position: 'absolute',
    top: Metrics.ratio(-40), // Adjust as needed
    left: Metrics.ratio(55), // Adjust as needed// Optional: add a background color to make the text more readable
    paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
  },
  TouchContainer2: {
    position: 'absolute',
    bottom: Metrics.ratio(50), // Adjust as needed
    left: Metrics.ratio(-30), // Adjust as needed// Optional: add a background color to make the text more readable
    // Optional: add padding for better visibility
  },
  TextContainer1: {
    paddingTop: Metrics.ratio(20),
    paddingLeft: Metrics.ratio(20),
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  TextContainer2: {
    paddingTop: Metrics.ratio(20),
    paddingLeft: Metrics.ratio(20),
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Cart;
