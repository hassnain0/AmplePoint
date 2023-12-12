import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList,ActivityIndicator,ScrollView,Image, TextInput,TouchableOpacity, BackHandler,} from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';
import DemoScreen from './DemoScreen';


const ProductItem = ({ product }) => {
    console.log("Image",`https://amplepoints.com/mall/logo/${product.top_logo}`)
  return (

    <View style={styles.productItem}>     
    <Image
            source={{
              uri: `https://amplepoints.com/vendor-data/${product.tbl_vndr_id}/profile/${product.vendor_profileimage}`,
            }}
            style={styles.productImage}
            resizeMode="cover"
          />
    <Text style={{fontSize:10,fontWeight:'bold', color:'black',paddingBottom:20,textAlign:'center'}}>{product.vendor_name}</Text>
    </View>
  );
};

const Brands=({navigation})=>{
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
    const Id=productData.tbl_vndr_id;
    const Name=productData.vendor_name
    console.log("Name",Name)
    navigation.navigate('DemoScreen',{
      Id,
      Name,
    });
  };
  useEffect(()=>{
    
    getProductDetails();
  },[])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);

const getProductDetails = async () => {
  try{
        const apiUrl = 'https://amplepoints.com/apiendpoint/getbrands'; 
        await axios.get(apiUrl)
        .then(response => {
       
          if (setStoreProducts && typeof setStoreProducts === 'function') {
            setStoreProducts(response.data);
          }

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
    keyExtractor={(item) => item.tbl_vndr_id.toString()}
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
        <View style={styles.searchBarContainer}>
        <View style={styles.searchBar2Container}>
          <TextInput

            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        </View>
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
    borderColor: '#C1C3C0',
    borderWidth: 0.4,
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
        height: Metrics.ratio(110),
        
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
export default Brands;