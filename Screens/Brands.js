import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, Image, TextInput, TouchableOpacity, } from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';
import MallDetail from './MallDetail';
import Spinner from 'react-native-loading-spinner-overlay';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import GridView from '../components/GridLayout/GridItems';

const Brands = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [randomColor, setRandomColor] = useState("#ffcccb");
  const backgroundColors = ['#ffcccb', '#b0e57c', '#add8e6', '#f0e68c', '#dda0dd'];
  useEffect(() => {
    // Filter products based on search query
    if (searchQuery) {
      let filteredData = storeProducts[0].data.filter((product) =>
        product.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      let tempData = [];
      tempData.push({
        data: filteredData
      })
      setFilteredProducts(tempData);
    } else {
      setFilteredProducts(null);
    }
  }, [searchQuery]);


  const handleProductPress = (productData) => {
    const Id=productData.tbl_vndr_id;
    const Name=productData.vendor_name
    navigation.navigate('DemoScreen',{
      productData,
      Id,
      Name,
    });
  }
  useEffect(() => {

    getProductDetails();
  }, [])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductDetails = async () => {
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/getbrands';
      await axios.get(apiUrl)
        .then(response => {
          let tempData = [];
          tempData.push({
            data: response.data.data,
          })
          setStoreProducts(tempData);

        })
        .catch(error => {
          // Handle the error
          setLoading(false)
          console.error('Error:', error);
        });
    }
    catch (err) {
      setLoading(false);
      console.log(err.message)
    }
    finally {
      // Set loading to false when the API call is complete
      setLoading(false);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>

          <TextInput

            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)} add
          />
        </View>

        <Spinner
          visible={loading}
          size={'large'}
          textContent={'Loading...'}
          textStyle={{ color: '#ff3d00' }}

        />
        {filteredProducts && filteredProducts.length > 0 ? (
          <GridView sections={filteredProducts} handleProductPress={handleProductPress} navigation={navigation}>
            {(item) => {
              setRandomColor(backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);
              return (
                <>
                  <View style={{
                    backgroundColor: randomColor, borderRadius: 100, alignContent: 'center',
                    alignItems: 'center',
                    height: verticalScale(70),
                    width: Metrics.ratio(70),
                    alignSelf: 'center',
                    margin: scale(5),
                  }}>
                    <Image source={{ uri: `https://amplepoints.com/vendor-data/${item.tbl_vndr_id}/profile/${item.vendor_profileimage}` }} style={styles.productImage} resizeMode="cover" />
                  </View>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: 'black', textAlign: 'center' }}>{item.vendor_name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/pin.png')} style={{ width: 10, height: 10 }} />
                    <Text style={{ fontSize: 10, fontWeight: '400', }}>{item.vendor_city}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/Pin2.png')} style={{ width: 10, height: 10 }} />
                    <Text style={{ fontSize: 10, fontWeight: '400', }}>{item.tbl_vndr_zip}</Text>
                  </View>
                </>
              )
            }}
          </GridView>) :
          storeProducts && storeProducts.length > 0 ?
            (
              <GridView sections={storeProducts} handleProductPress={handleProductPress} navigation={navigation} itemDimension={90}>
                {(item) => {
                  setRandomColor(backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);
                  return (
                    <>
                      <View style={{
                        backgroundColor: randomColor, borderRadius: 100, alignContent: 'center',
                        alignItems: 'center',
                        height: verticalScale(70),
                        width: Metrics.ratio(70),
                        alignSelf: 'center',
                        margin: scale(5),
                      }}>
                        <Image source={{ uri: `https://amplepoints.com/vendor-data/${item.tbl_vndr_id}/profile/${item.vendor_profileimage}` }} style={styles.productImage} resizeMode="cover" />
                      </View>
                      <Text style={{ fontSize: 10, fontWeight: '600', color: 'black', textAlign: 'center' }}>{item.vendor_name}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/pin.png')} style={{ width: 10, height: 10 }} />
                        <Text style={{ fontSize: 10, fontWeight: '400', }}>{item.vendor_city}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/Pin2.png')} style={{ width: 10, height: 10 }} />
                        <Text style={{ fontSize: 10, fontWeight: '400', }}>{item.tbl_vndr_zip}</Text>
                      </View>
                    </>
                  )
                }}
              </GridView>) : (<></>)
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: '#eeeeee',
    height: Metrics.ratio(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center',
  },
  searchInput: {
    top: Metrics.ratio(1),
    height: Metrics.ratio(35),
    borderColor: '#eeeeee',
    borderWidth: 0.5,
    padding: 10,
    width: '90%',
    fontSize: 13,
    borderRadius: 15,
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
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    margin: moderateScale(5),
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

    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: moderateScale(20),
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
  }
})
export default Brands;