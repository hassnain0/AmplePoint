import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList, TextInput,ScrollView,Image, TouchableOpacity,} from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';


const ProductItem = ({ product }) => {
  return (

    <View style={styles.productItem}>
  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'black' }}>
  {product.pname}
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
  const handleProductPress = (productData) => {
    // Navigate to the next screen, passing the productId as a parameter
    navigation.navigate('GiftDetails',{ productData,route });
  };
  useEffect(()=>{

    getProductDetails();
  },[])
  const [pageNumber, setPageNumber] = useState(1);
  const [storeProducts, setStoreProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);
  useEffect(() => {
   
    filterProducts();
    getProductDetails();
  },  [searchQuery, storeProducts, pageNumber]);
  const filterProducts = () => {
    if (searchQuery && storeProducts && storeProducts.data) {
      const filteredData = storeProducts.data.filter((product) =>
      product.pname && product.pname.includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(null);
    }
  };

const getProductDetails = async () => {
  try{
    // const vendorId = route.params.Id;
    // Specify the initial page number
    
    const apiUrl = 'https://amplepoints.com/apiendpoint/searchproduct?';
        const response = await axios.get(apiUrl, {
          params: {
            search_query:searchQuery,
            page: pageNumber,
          },
        });
       

      if (setStoreProducts && typeof setStoreProducts === 'function') {
        setStoreProducts(response.data);
        setPageNumber((prevPage) => prevPage + 1);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., set an error state or display an error message
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
  <ScrollView>
    <View style={styles.searchBar2Container}>
      <TextInput style={styles.searchInput}
      onChangeText={(text)=>setSearchQuery(text)}
      placeholder="Search..."
      value={searchQuery}
      ></TextInput>
    </View>
      <View style={styles.container}>
      {filteredProducts
          ? renderFlatList(filteredProducts)
          : chunkedData.map((chunk, index) => (
              <View key={index}>{renderFlatList(chunk)}</View>
            ))}
    </View>
    </ScrollView>
)}
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
        width: Metrics.ratio(190),
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