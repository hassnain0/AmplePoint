import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList,Alert, ActivityIndicator,ScrollView,Image, TextInput,TouchableOpacity, BackHandler,} from 'react-native';
import { Colors, Metrics } from '../themes';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const ProductItem = ({ product }) => {
    const vendors = product.vendor_list;
    return (
      <View>
        <Text>{product.category_name}</Text>
        {vendors.map((vendor) => (
        <View style={styles.productItem} key={vendor.tbl_vndr_id}>
          <Image
            source={{
              uri: `https://amplepoints.com/vendor-data/${vendor.tbl_vndr_id}/profile/${vendor.vendor_profileimage}`,
            }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <Text style={{ fontSize: 10, fontWeight: 'bold', paddingBottom: 20 }}>
            {vendor.vendor_name}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={require('../assets/pin.jpg')} style={{ width: 15, height: 15 }} />
            <Text style={{ fontSize: 10, fontWeight: 'bold', paddingBottom: 20 }}>
              {vendor.tbl_vndr_city}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={require('../assets/Pin2.png')} style={{ width: 15, height: 15 }} />
            <Text style={{ fontSize: 10, fontWeight: 'bold', paddingBottom: 20 }}>
              {vendor.tbl_vndr_zip}
            </Text>
          </View>
        </View>
      ))}
      </View>
    );
  };
  

const MallDetail=({navigation})=>{
    const route=useRoute();
    const Name=route.params.Name
    console.log("Route",route.params.Name)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);
  useEffect(() => {
    // Filter products based on search query
    if (searchQuery) {
      const filteredData = storeProducts?.data.filter((product) =>
        product.display_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(null);
    }
  }, [searchQuery, storeProducts]);
   
  const handleProductPress = (productData) => {
    const Id=productData.tbl_vndr_id
    navigation.navigate('DemoScreen',{
      Id,
    });
  };
  useEffect(()=>{
    
    getProductDetails();
  },[])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);

const getProductDetails = async () => {
  try{
        const apiUrl = 'https://amplepoints.com/apiendpoint/getvendorbymall?'; 
        await axios.get(apiUrl,{
            params:{
                mall_id:route.params.Id,
            }
        })
        .then(response => {
          if (setStoreProducts && typeof setStoreProducts === 'function') {
            setStoreProducts(response.data);
          }
          console.log("Response",response.data)
          
        })
        .catch(error => {
          // Handle the error
          setLoading(false)
          console.error('Error:', error);
        });
  }
  catch(err){
    setLoading(false);  
    console.log(err)
    }
    finally {
      // Set loading to false when the API call is complete
      setLoading(false);
    }
  }
    const renderFlatList = (data) => (
   
      <View>
   <FlatList
     numColumns={3} 
    data={data}
    showsVerticalScrollIndicator={false}  // hides the vertical scroll indicator
    keyExtractor={(item) => item.tbl_vndr_id}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => handleProductPress(item)}>
        <ProductItem product={item} />
      </TouchableOpacity>
    )}
  />

  </View>
   
    );
    const chunkArray = (array, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    };

    const chunkedData = storeProducts?.data ? chunkArray(storeProducts.data, 10) : [];

    return (
  <ScrollView>
       <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.leftIconView}
            onPress={() => console.log('navigation', navigation.goBack())}>
          <Image source={require('../assets/ArrowBack.png')} style={{width:28,height:28}}/>
          </TouchableOpacity>
          <Text style={styles.textHeader}>{Name} Mall</Text>
        </View>
    <View style={styles.container}>
    <Spinner
          visible={loading}
          size={'large'}
          textContent={'Loading...'}
          textStyle={{ color: '#ff3d00' }}
          
        />
        {filteredProducts
          ? renderFlatList(filteredProducts)
          : chunkedData.map((chunk, index) => (
              <View key={index}>{renderFlatList(chunk)}</View>
            ))}
      </View>
    </ScrollView>
)
      }

const styles=StyleSheet.create({
  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    height: 50,
},
textHeader: {
  textAlign:'center',
  alignContent:'center',
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
  width:Metrics.ratio(20),
  justifyContent: 'center',
  alignItems: 'center',

},
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
      },
  searchInput: {
    top:Metrics.ratio(1),
    height: 35,
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 10,
    width: '90%',
    borderRadius:10,
    backgroundColor:'white'
  },
      ImageContainer:{
        width: Metrics.ratio(200), 
        height: Metrics.ratio(130),
        borderRadius:20, 
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
      TouchContainer2:{
        position: 'absolute',
        top: Metrics.ratio(10), // Adjust as needed
        right: Metrics.ratio(15), // Adjust as needed// Optional: add a background color to make the text more readable
        paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
      },
      TextContainer2:{
        fontSize:15,
        color: 'black', // Optional: set the text color
        fontWeight:'bold'
      },
      Icon:{
        width:Metrics.ratio(27),
        height:Metrics.ratio(32),
        left:Metrics.ratio(10)
      },
      SideMenu:{
        width:Metrics.ratio(40),
        height:Metrics.ratio(40),
        left:Metrics.ratio(10)
      },
      header: {
        backgroundColor: "#EEEEEE",
        flexDirection: 'row',
        paddingVertical: Metrics.ratio(1),
        // paddingHorizontal:Metrics.ratio(5),
      },
      productItem: {
        backgroundColor:'#FFFF',
        margin: Metrics.ratio(10),
        borderRadius:5,
        elevation:3
      },
      header: {
        backgroundColor:'#FF2E00',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: Metrics.ratio(30),
        // paddingHorizontal:Metrics.ratio(5),
      },
      TextContainer: {
        fontSize:15,
        color: 'black', // Optional: set the text color
        fontWeight:'bold'
      },
      TouchContainer:{
        position: 'absolute',
        bottom: Metrics.ratio(10), // Adjust as needed
        left: Metrics.ratio(15), // Adjust as needed// Optional: add a background color to make the text more readable
        paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
      },
      productImage: {
        borderRadius:100,
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:Metrics.smallMargin,
        width: Metrics.ratio(110),
        height: Metrics.ratio(100),
        
      },
      ProductContainer:{
        fontWeight:'bold',
        paddingTop:50,
        color:'black'
       
            },
      heartButton: {
        width: Metrics.ratio(30),
        height: Metrics.ratio(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'white',
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
    borderColor:'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Metrics.ratio(5),
    margin:Metrics.ratio(1),
  },
  OptionContainer:{
    
  flexDirection:'row',
  justifyContent:'left'
  }  ,
  SizeContainer:{
    borderColor:'black',
    
    marginLeft:Metrics.ratio(25)
  },
  OptionTextContainer:{
    color:'#E8A08D'
  }
})
export default MallDetail;