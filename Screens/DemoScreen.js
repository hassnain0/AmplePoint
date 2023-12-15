import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList,Platform, ActivityIndicator,ScrollView,Image, TouchableOpacity, BackHandler, SafeAreaView,} from 'react-native';
import { Colors, Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
const ProductItem = ({ product }) => {
  return (

    <View style={styles.productItem}>
  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'black' }}>
  {product.pname.split(' ').slice(0, 4).join(' ')}
</Text>
    <View>
      <Image source={{ uri: `https://amplepoints.com/product_images/${product.pid}/${product.img_name}` }} style={styles.productImage} resizeMode="cover" />
    </View>
    <Text style={styles.ProductContainer}>{product.pvendor}</Text>
  
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={{ paddingRight: Metrics.ratio(10), fontWeight: '800', color: '#618ED7', fontSize: 10 }}>{`$ ${product.pprice}`}</Text>
      <View style={{ paddingLeft: Metrics.ratio(5), backgroundColor: '#C1D0EC', borderRadius: 5 }}>
        <Text style={{ color: '#618ED7', fontWeight: '600', fontSize: 10 }}>{`${product.pdiscount} % Back`}</Text>
      </View>
    </View>
    <View>
      <Text style={{ paddingRight: Metrics.ratio(10), fontWeight: '600', color: 'black', fontSize: 10 }}>
        Get <Text style={{ color: '#ff3d00' }}>{product.pamples}</Text> AmplePoints $<Text style={{ color: '#FF2E00' }}>{product.pdiscountprice}</Text>
      </Text>
    </View>
    <Text style={{ paddingRight: Metrics.ratio(10), fontWeight: '600', color: 'black', fontSize: 10 }}>
      or get it <Text style={{ color: '#FF2E00' }}>FREE</Text> with <Text style={{ color: '#FF2E00' }}>{product.pfwamples}</Text> points
    </Text>
  </View>
  
  );
};

const DemoScreen=({navigation})=>{
  const route=useRoute();
  const Name = route.params.Name;
  const productData=route.params.productData
  const handleProductPress = (productData) => {
    // Navigate to the next screen, passing the productId as a parameter
    navigation.navigate('GiftDetails',{ productData,route });
  };
  useEffect(()=>{
    getStoreContent();
    getProductDetails();
  },[])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Content, setContent] = useState(null);
  const [data,setData]=useState(false)
  const vendorId = route.params.Id;

const getProductDetails = async () => {
  try{
    
   
    // Specify the initial page number
    let pageNumber = 1;
    const apiUrl = 'https://amplepoints.com/apiendpoint/productsbyseller?';
        const response = await axios.get(apiUrl, {
          params: {
            vendor_id:vendorId,
            page: pageNumber,
          },
        });
        pageNumber++;

      if (setStoreProducts && typeof setStoreProducts === 'function') {
        setStoreProducts(response.data);
        setLoading(false)
      }
      console.log("Responnse",response.data)
        if (response.data.message === 'Data Not Found') {
          setData(true);
        } else {
          setLoading(false)
          setData(false); // Reset data state if no error
        }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., set an error state or display an error message
    }
  }
  //Get Comments
  const getStoreContent=async()=>{
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/vendortestinomial?';
      const response = await axios.get(apiUrl,{
        params:{
          vendor_id:vendorId,
        }
      });
      setContent(response.data.data);
    console.log("Content",response.data.data)
      }
     catch (err) {
      console.log("Error fetching data:", err);
    }
    
    }
    const renderFlatList = (data) => (
   
      <View>
    <FlatList
      data={data}
      numColumns={2} 
      showsVerticalScrollIndicator={false} 
      keyExtractor={(item) => item.pid}
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
      <SafeAreaView>
          <Spinner
          visible={loading}
          size={'large'}
          textContent={'Loading...'}
          textStyle={{ color: '#ff3d00' }}
          
        />
          <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.leftIconView}
            onPress={() => console.log('navigation', navigation.goBack())}>
          <Image source={require('../assets/ArrowBack.png')} style={{width:28,height:28}}/>
          </TouchableOpacity>
          <Text style={styles.textHeader}>{Name}</Text>
        </View>
  <ScrollView >
    <View style={{backgroundColor:'white'}}>
    <View style={{backgroundColor:'white',height:Metrics.ratio(100),width:'100%',position: 'relative' }}>
    <Image   source={{ uri: `https://amplepoints.com/vendor-data/${productData.tbl_vndr_id}/profile/${productData.vendor_profileimage}` }} style={styles.StoreImage} resizeMode="cover" />
 </View>
    <View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(5)}}></View>

     <View>
    {Content &&(
    <Swiper
      style={{ height: 200 }}
      showsPagination={false}
      autoplay
      autoplayTimeout={4}
    >
      {Content.map((item, index) => (
        <Card
          key={index}
          containerStyle={{
            backgroundColor: 'yellow',
            borderRadius: 10,
            margin: Metrics.ratio(5),
            padding: Metrics.ratio(15),
          }}
        >
          <Image
            style={{ width: Metrics.ratio(50), height:Metrics.ratio(50), resizeMode: 'cover' }}
            source={{ uri: `https://amplepoints.com/home_banners/testinomialsliders/${item.banner_image}` }}
          />
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
            {item.banner_title}
          </Text>
          <Text>{item.tag_line}</Text>
        </Card>
      ))}
    </Swiper>
    )}
  </View> 
      <View style={styles.container}>
    
      {data && (
        <View style={styles.overlay}>
          <Text style={{textAlign:'center',alignSelf:'center',color:'black'}}> Sorry Data Not Found</Text>
        </View>
      )}
      {chunkedData.map((chunk, index) => (
        <View key={index}>
          {renderFlatList(chunk)}
        </View>
      ))}
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
)
      }

const styles=StyleSheet.create({
   
      ImageContainer:{
        width: Metrics.ratio( 150), 
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
        elevation:5
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
      },  textHeader: {
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
      productImage: {
        borderRadius:10,
        width: Metrics.ratio(100),
        height: Metrics.ratio(100),
        
      },
      StoreImage: {
        width: Metrics.ratio(50),
        height: Metrics.ratio(50),
        alignSelf:'left',
        justifyContent:'left',
        position: 'absolute', bottom: 0, width: 60, height: 60
  
        
      },
      header: {
        backgroundColor:'#ff3d00',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: Metrics.ratio(30),
        // paddingHorizontal:Metrics.ratio(5),
      },
      ProductContainer:{
        fontWeight:'bold',
        color:'black',
        fontSize:10
       
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
      leftIconView: {
        paddingHorizontal: Metrics.ratio(25),
        height: Metrics.ratio(20),
        width:Metrics.ratio(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparent,
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