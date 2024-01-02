import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList, TextInput,ScrollView,Image, TouchableOpacity,} from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { moderateScale } from 'react-native-size-matters';


const ProductItem = ({ product }) => {
  return (

    <View style={styles.productItem}>
      
        <View style={{ width: 100, flex: 1 }}>
  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'black',  }}>
    {product.product_name}
  </Text>
</View>
      

    <View>
      <Image source={{ uri: `https://amplepoints.com/product_images/${product.pid}/${product.img_name}` }} style={styles.productImage} resizeMode="cover" />
    </View>
    <Text style={styles.ProductContainer}>{product.pvendor}</Text>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={{ paddingRight: Metrics.ratio(10), fontWeight: '800', color: '#618ED7', fontSize: 10 }}>{`$ ${product.single_price}`}</Text>
      <View style={{ paddingLeft: Metrics.ratio(5), backgroundColor: '#C1D0EC', borderRadius: 5 }}>
        <Text style={{ color: '#618ED7', fontWeight: '600', fontSize: 10 }}>{`${product.pdiscount} % Back`}</Text>
      </View>
    </View>
    <View>
      <Text style={{ paddingRight: Metrics.ratio(10), fontWeight: '600', color: 'black', fontSize: 10 }}>
        Get <Text style={{ color: '#FF2E00' }}>{product.pamples}</Text> AmplePoints $<Text style={{ color: '#FF2E00' }}>{product.pdiscountprice}</Text>
      </Text>
    </View>
    <Text style={{ paddingRight: Metrics.ratio(10), fontWeight: '600', color: 'black', fontSize: 10 }}>
      or get it <Text style={{ color: '#FF2E00' }}>FREE</Text> with <Text style={{ color: '#FF2E00' }}>{product.pfwamples}</Text> points
    </Text>
  </View>

  );
};

const Search=({navigation})=>{
  const route=useRoute();
  const [loading,setLoading]=useState(false);
  const handleProductPress = (productData) => {
    navigation.navigate('GiftDetails',{ productData,route });
  };
  const [data,setData]=useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [storeProducts, setStoreProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
 const [noData,setNoData]=useState(false)
const getProducts = async () => {
  setLoading(true);
if(searchQuery){
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/searchproduct';
      // setLoading(true);

      const response = await axios.get(apiUrl, {
        params: {
          search_query: searchQuery,
          page: pageNumber,
        },
      });
    
      if(response.data.status=='F'){
        setNoData(true);
        setLoading(false);
      }
    
      if (response && response.data.data) {
        setStoreProducts(response.data.data);
        setPageNumber((prevPage) => prevPage + 1);
        setLoading(false); // Set loading to false when the operation completes
        setNoData(false)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }
  else{
  
  }
  };
  const renderFlatList = (data) => {
    return(
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
        )
    };

    return (
  <ScrollView>
     <Spinner
          visible={loading}
          size={'large'}
          textContent={'Loading...'}
          textStyle={{ color: '#ff3d00' }}
          
        />
         {noData && (
                <View style={{display:'flex',flex:1}}>
          <Text style={{textAlign:'center',alignSelf:'center',color:'black'}}> Data Not found</Text>
        </View>
      )}
  <View style={styles.searchBar2Container}>
      <TextInput style={styles.searchInput}
      onChangeText={(text)=>{
        setSearchQuery(text);
      }}
      onSubmitEditing={() => {
        getProducts(searchQuery);
      }}

      placeholder="Search..."
      value={searchQuery}
      ></TextInput>
    </View>
      <View style={styles.container}>
      {storeProducts 
      // && 
      //   storeProducts.map(e=>{
      //     <ProductItem product={e}/>
      // })
          && renderFlatList(storeProducts)
            }
    </View>
    
    </ScrollView>
)}
const styles=StyleSheet.create({
   ImageContainer:{
        width:'100%', 
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
        backgroundColor: 'white',
        margin: moderateScale(10),
        borderRadius: 5,
        elevation: 5,
        left:'1.5%',
        flexDirection: 'column', // Make sure items are stacked vertically
      },
      TextContainer: {
        fontSize:15,
        color: 'black', // Optional: set the text color
        fontWeight:'bold'
      }, searchBar2Container: {
        flex: 1, // This ensures the inner container takes up all available space
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', 
        flexDirection:'row',
        padding: Metrics.ratio(10),
          },
      searchInput: {
        top:Metrics.ratio(1),
        height: Metrics.ratio(40),
        borderColor: '#F0F0F0',
        borderWidth: 2,
        padding: Metrics.ratio(10),
        width: '90%',
        flex:1,
        flexDirection:'row',
        borderRadius:20,
        backgroundColor:'white'
      },
      TouchContainer:{
        position: 'absolute',
        bottom: Metrics.ratio(10), // Adjust as needed
        left: Metrics.ratio(15), // Adjust as needed// Optional: add a background color to make the text more readable
        paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
      },
      productImage: {
        borderRadius:10,
        width: Metrics.ratio(150),
        height: Metrics.ratio(180),

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
export default Search;