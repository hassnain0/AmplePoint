import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, ScrollView, Image, TextInput, TouchableOpacity, BackHandler, SafeAreaView, } from 'react-native';
import { Colors, Metrics } from '../themes';
import axios from 'axios';
import {  useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const ProductItem = ({ product,navigation,randomColor }) => {

  const vendors = product.vendor_list;
  console.log("Vendors",vendors)
  return (
    <>
      <View style={styles.productItem}>
        <Text style={{fontSize:13,color:'black',fontWeight:'600',fontFamily:'Arial',paddingTop:verticalScale(10)}}>{product.category_name}</Text>
        {vendors && vendors.length > 0 && (renderFlatList(vendors,navigation,randomColor))}
      </View>
    </>
  );
};
const handleProductPress = (productData,navigation) => {
  const Name = productData.vendor_name
  const Id = productData.tbl_vndr_id
  navigation.navigate('DemoScreen', {
    productData,
    Id,
    Name,
  });
};
const renderFlatList = (data,navigation,randomColor) => (
<View>
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      numColumns={3}
      keyExtractor={(item) => item.tbl_vndr_id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleProductPress(item,navigation)}>
          <View style={{padding : scale(5), backgroundColor : "#f5f5f5", borderRadius : Metrics.ratio(10),margin : scale(2),elevation:3}}>
          <View style={{backgroundColor:randomColor,borderRadius:moderateScale(100),alignContent:'center',
        alignItems:'center',
        height:verticalScale(70),
        width:Metrics.ratio(70),
        alignSelf:'center', 
        margin:moderateScale(15),
        }}>   
            <Image
              source={{
                uri: `https://amplepoints.com/vendor-data/${item.tbl_vndr_id}/profile/${item.vendor_profileimage}`,
              }}
              style={styles.productImage}
              resizeMode="cover"
            />
            </View>
            <Text style={{ fontSize: 10, fontWeight: '700', paddingBottom: 10,textAlign:'center' }}>
              {item.vendor_name.split(' ').slice(0, 1).join(' ')}
            </Text>
            <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',alignSelf:'flex-start'}}>
              <Image source={require('../assets/pin.jpg')} style={{ width: 15, height: 15 }} />
              <Text style={{ fontSize: 8, fontWeight: 'bold', paddingBottom: Metrics.ratio(5) }}>
                {item.tbl_vndr_city}
              </Text>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',alignSelf:'flex-start'}}>
              <Image source={require('../assets/Pin2.png')} style={{ width: 15, height: 15 }} />
              <Text style={{ fontSize: 8, fontWeight: 'bold',}}>
                {item.tbl_vndr_zip}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);
const MallDetail = ({ navigation }) => {
  const route = useRoute();
  const Name = route.params.Name


  useEffect(() => {

    getProductDetails();
  }, [])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductDetails = async () => {
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/getvendorbymall?';
      await axios.get(apiUrl, {
        params: {
          mall_id: route.params.Id,
        }
      })
        .then(response => {
          if (setStoreProducts && typeof setStoreProducts === 'function') {
            setStoreProducts(response.data.data);
          } 
        })
        .catch(error => {
          // Handle the error
          setLoading(false)
          console.error('Error:', error);
        });
    }
    catch (err) {
      setLoading(false);
      console.log(err)
    }
    finally {
      // Set loading to false when the API call is complete
      setLoading(false);
    }
  }
  const backgroundColors = ['#ffcccb', '#b0e57c', '#add8e6', '#f0e68c', '#dda0dd'];
const randomColor = backgroundColors[Math.floor(Math.random()* backgroundColors.length)];

  return (
    <SafeAreaView style={{backgroundColor:'white'}} >
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.leftIconView}
          onPress={() => console.log('navigation', navigation.goBack())}>
          <Image source={require('../assets/ArrowBack.png')} style={{ width: 28, height: 28 }} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>{Name}</Text>
      </View>
      <ScrollView style={{backgroundColor:'white'}}>

        <View style={{backgroundColor:'white'}} >
          <Spinner
            visible={loading}
            size={'large'}
            textContent={'Loading...'}
            textStyle={{ color: '#ff3d00' }}

          />

          <View>
            {storeProducts && storeProducts.map(e =>
              <ProductItem product={e} navigation={navigation} randomColor={randomColor}/>
              // renderFlatList(storeProducts)
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    height: 50,
  },
  textHeader: {
    textAlign: 'center',
    alignContent: 'center',
    color: Colors.white,
    fontSize: Metrics.ratio(15),
    paddingLeft: Metrics.ratio(20),
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'serif', // You may need to adjust this for Android
    }),
  },
  leftIconView: {
    paddingHorizontal: Metrics.ratio(25),
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
    justifyContent: 'center',
    alignItems: 'center',

  },
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center',
  },
  searchInput: {
    top: Metrics.ratio(1),
    height: 35,
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 10,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  ImageContainer: {
    width: Metrics.ratio(200),
    height: Metrics.ratio(130),
    borderRadius: 20,
  },
  textContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#083166',
    marginLeft: Metrics.ratio(20),
  },
  productList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TouchContainer2: {
    position: 'absolute',
    top: Metrics.ratio(10), // Adjust as needed
    right: Metrics.ratio(15), // Adjust as needed// Optional: add a background color to make the text more readable
    paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
  },
  TextContainer2: {
    fontSize: 15,
    color: 'black', // Optional: set the text color
    fontWeight: 'bold'
  },
  productItem: {
    
    margin: scale(6),

  },
  header: {
    backgroundColor: '#ff3d00',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: verticalScale(1),
    // paddingHorizontal:Metrics.ratio(5),
  },
  TextContainer: {
    fontSize: 15,
    color: 'black', // Optional: set the text color
    fontWeight: 'bold'
  },
  TouchContainer: {
    position: 'absolute',
    bottom: Metrics.ratio(10), // Adjust as needed
    left: Metrics.ratio(15), // Adjust as needed// Optional: add a background color to make the text more readable
    paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
  },
  productImage: {

    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    margin:moderateScale(20),
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    
  },
  ProductContainer: {
    fontWeight: 'bold',
    paddingTop: 50,
    color: 'black'

  },
  heartButton: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: Metrics.borderRadius,
  },

  trolleyIconContainer: {
    position: 'absolute',
    bottom: Metrics.ratio(5),
    right: Metrics.ratio(5),
    backgroundColor: 'transparent',
  },
  trolleyIcon: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  colorContainer: {
    width: Metrics.ratio(15),
    height: Metrics.ratio(15),
    borderColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.ratio(5),
    margin: Metrics.ratio(1),
  },
  OptionContainer: {

    flexDirection: 'row',
    justifyContent: 'left'
  },
  SizeContainer: {
    borderColor: 'black',

    marginLeft: Metrics.ratio(25)
  },
  OptionTextContainer: {
    color: '#E8A08D'
  },

})
export default MallDetail;