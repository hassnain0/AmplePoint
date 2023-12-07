import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList,Alert, ActivityIndicator,ScrollView,Image, TextInput,TouchableOpacity, BackHandler,} from 'react-native';
import { Metrics } from '../themes';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
const ProductItem = ({ product }) => {
    const vendors = product.vendor_list;
    console.log("Product:", product);
    console.log("Vendors:", vendors);
    return (
      <View>
        <Text>{product.category_name}</Text>
        <View style={styles.productItem}>
          <Image
            source={{
              uri: `https://amplepoints.com/vendor-data/${vendors.tbl_vndr_id}/profile/${vendors.tbl_vndr_img_pro}`,
            }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <Text style={{ fontSize: 10, fontWeight: 'bold', paddingBottom: 20 }}>{vendors.tbl_vndr_dispname}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={require('../assets/pin.jpg')} style={{ width: 15, height: 15 }} />
            <Text style={{ fontSize: 10, fontWeight: 'bold', paddingBottom: 20 }}>{vendors.tbl_vndr_city}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={require('../assets/Pin2.png')} style={{ width: 15, height: 15 }} />
            <Text style={{ fontSize: 10, fontWeight: 'bold', paddingBottom: 20 }}>{vendors.tbl_vndr_zip}</Text>
          </View>
        </View>
      </View>
    );
  };
  

const MallDetail=({navigation})=>{
    const route=useRoute();
    console.log("Route",route.params.Id)
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
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item, index) => item.tbl_vndr_id || index.toString()}
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
    <View style={styles.container}>
        {loading && (
          <View style={styles.overlay}>
            <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
              Loading....
            </Text>
            <ActivityIndicator size="large" color="#FF2E00" />
          </View>
        )}
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
      
      productItem: {
        backgroundColor:'#FFFF',
        margin: Metrics.ratio(10),
        borderRadius:5,
        elevation:3
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