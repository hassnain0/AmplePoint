import React,{useState,useEffect} from 'react';
import {View,Text, StyleSheet,FlatList, ActivityIndicator,ScrollView,Image, TouchableOpacity,} from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';


const ProductItem = ({ product }) => {

  return (

    <View style={styles.productItem}>     
    <Text style={{fontSize:12,fontWeight:'bold', color:'black',paddingBottom:20}}>{product.price}</Text>
        <View >
            <Image   source={{ uri: `data:image/png;base64,${product.img_name}` }} style={styles.productImage} resizeMode="cover" />
          <View style={styles.TouchContainer}>
  <Text style={styles.TextContainer}>{product.pprice}$</Text>
  </View>
  <View style={styles.TouchContainer2}>
  <Text style={styles.TextContainer2}>Gift Card</Text>
  </View>
        </View>
      <Text style={styles.ProductContainer}>{product.pname}</Text>

       <View style={{flex:1, flexDirection:'row'}}>
       <Text style={{paddingRight:Metrics.ratio(10),fontWeight:'800',color:'#618ED7'}} >$ {product.pprice}</Text>
       <View style={{paddingLeft:Metrics.ratio(5),backgroundColor:'#C1D0EC',borderRadius:5,}}>
       <Text style={{color:'#618ED7',fontWeight:'600',}} >{product.pdiscountprice} % Back</Text>
       </View>
       </View>
       <View>
  <Text style={{paddingRight: Metrics.ratio(10), fontWeight: '600', color: 'black'}}>
    Get <Text style={{color: '#CC8C63'}}>{product.pamples}</Text> AmplePoints $<Text style={{color: '#CC8C63'}}>7.50</Text>
  </Text>
</View>
<Text style={{paddingRight: Metrics.ratio(10), fontWeight: '600', color: 'black'}}>
  or get it <Text style={{color: '#CC8C63'}}>FREE</Text> with <Text style={{color: '#CC8C63'}}>125.00</Text> points
</Text>
    </View>

  );
};

const DemoScreen=({navigation})=>{
  
  const handleProductPress = (productData) => {
    // Navigate to the next screen, passing the productId as a parameter
    navigation.navigate('GiftDetails',{ productData });
  };
  useEffect(()=>{
    getProductDetails();
  },[])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);

const getProductDetails = async () => {
  try{
      const vendorId = 182;
      const page = 1;
       const apiUrl = 'https://amplepoints.com/apiendpoint/productsbyseller'; 
        await axios.get(apiUrl, {
          params: {
            vendor_id: vendorId,
            page: page
          }
        })
        .then(response => {
          // Handle the successful response
         
          if (setStoreProducts && typeof setStoreProducts === 'function') {
            setStoreProducts(response.data);
          }
          
        })
        .catch(error => {
          // Handle the error
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
   
      <FlatList
      data={storeProducts?.data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.pid}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleProductPress(item)}>
          <ProductItem product={item} />
          </TouchableOpacity>
           )}/>
   
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
          <Text style={{textAlign:'center',alignSelf:'center'}}>Loading....</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {chunkedData.map((chunk, index) => (
        <View key={index}>
          {renderFlatList(chunk)}
        </View>
      ))}
    </View>
    </ScrollView>
)
      }

const styles=StyleSheet.create({
   
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
        borderRadius:10,
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:Metrics.smallMargin,
        width: Metrics.ratio(200),
        height: Metrics.ratio(180),
        
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
export default DemoScreen;